import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY

export const resend = apiKey ? new Resend(apiKey) : null

export const emailConfig = {
  from: process.env.RESEND_FROM_EMAIL || 'noreply@mail.biomedengsug.org',
  to: process.env.RESEND_TO_EMAIL || 'gombaland@biomedengsug.org',
}

export const runtime = 'nodejs'
