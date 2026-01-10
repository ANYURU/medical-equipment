'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {useState} from 'react'
import * as z from 'zod'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'

interface EnhancedCTAProps {
  data?: {
    heading?: string
    description?: string
    primaryButtonText?: string
    primaryButtonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
  }
}

const formSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone required'),
  message: z.string().optional(),
})

export function EnhancedCTA({data}: EnhancedCTAProps) {
  const [isSuccess, setIsSuccess] = useState(false)
  const heading = data?.heading || 'Ready to Equip Your Healthcare Facility?'
  const description =
    data?.description ||
    "Get in touch with our team to discuss your equipment needs and receive a customized quote. We're here to support your mission of delivering exceptional healthcare."

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {name: '', email: '', phone: '', message: ''},
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSuccess(true)
    form.reset()
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-600 to-blue-700 py-16 md:py-20">
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-size-[32px_32px]"></div>
      </div>
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Content */}
          <div className="text-white">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{heading}</h2>
            <p className="mt-4 text-lg text-blue-100 md:text-xl">{description}</p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Free Consultation & Quote</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Expert Installation & Training</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>24/7 Support & Maintenance</span>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" size="lg" className="border-white bg-transparent text-white hover:bg-white hover:text-blue-600 cursor-pointer">
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-lg border bg-white p-6 shadow-xl md:p-8">
            {isSuccess ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Thank You!</h3>
                <p className="text-gray-600">We'll call you back within 24 hours</p>
              </div>
            ) : (
              <>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Get a Free Quote</h3>
                <p className="mb-6 text-sm text-gray-600">Fill out the form and we'll contact you within 24 hours</p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Your Name *" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <Input type="email" placeholder="Email Address *" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <Input type="tel" placeholder="Phone Number *" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <Textarea placeholder="Equipment you're interested in..." rows={3} className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full cursor-pointer" size="lg" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Sending...' : 'Request Call Back'}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
