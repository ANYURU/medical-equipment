import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import { resend, emailConfig } from '@/lib/resend'
import { writeClient } from '@/lib/sanity'
import { ContactNotificationEmail } from '@/emails/contact-notification'
import { ContactConfirmationEmail } from '@/emails/contact-confirmation'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Simple in-memory rate limiting (production should use Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = 5 // 5 requests
  const window = 60 * 1000 // per minute

  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + window })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      )
    }
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    // Save to Sanity
    let submissionId: string | null = null
    try {
      const submission = await writeClient.create({
        _type: 'contactSubmission',
        ...validatedData,
        status: 'new',
        emailSent: false,
        submittedAt: new Date().toISOString(),
      })
      submissionId = submission._id
    } catch (sanityError) {
      console.error('Sanity save error:', sanityError)
      // Continue even if Sanity fails
    }

    // Send emails
    const emailPromises = []

    // Admin notification
    emailPromises.push(
      resend.emails.send({
        from: emailConfig.from,
        to: emailConfig.to,
        subject: `New Contact Form: ${validatedData.subject || 'No Subject'}`,
        react: ContactNotificationEmail(validatedData),
      })
    )

    // Customer confirmation
    emailPromises.push(
      resend.emails.send({
        from: emailConfig.from,
        to: validatedData.email,
        subject: 'Thank you for contacting MedSupply Uganda',
        react: ContactConfirmationEmail({ name: validatedData.name }),
      })
    )

    // Wait for emails
    const emailResults = await Promise.allSettled(emailPromises)
    const emailsSent = emailResults.every(result => result.status === 'fulfilled')

    // Update Sanity with email status
    if (submissionId && emailsSent) {
      try {
        await writeClient.patch(submissionId).set({ emailSent: true }).commit()
      } catch (updateError) {
        console.error('Sanity update error:', updateError)
      }
    }

    // Log any email failures
    emailResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Email ${index} failed:`, result.reason)
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
    })

  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data', details: error },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    )
  }
}
