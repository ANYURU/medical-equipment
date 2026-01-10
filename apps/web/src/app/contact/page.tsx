import { ContactForm } from './contact-form'

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-linear-to-b from-blue-50 to-background py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Get In Touch
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have questions? We're here to help. Reach out to our team for inquiries and support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </>
  )
}
