'use client'

interface Testimonial {
  quote: string
  author: string
  role: string
  facility: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Medequip Uganda transformed our ICU with state-of-the-art equipment and exceptional installation service. Their support team is always responsive.',
    author: 'Dr. Sarah Namukasa',
    role: 'Head of ICU',
    facility: 'Mulago Hospital',
  },
  {
    quote:
      'The quality of their medical equipment is outstanding, and their after-sales service is unmatched. We trust them for all our equipment needs.',
    author: 'Dr. James Okello',
    role: 'Medical Director',
    facility: 'Kampala International Hospital',
  },
  {
    quote:
      'From consultation to installation, the entire process was seamless. Their team truly understands the needs of healthcare facilities.',
    author: 'Nurse Margaret Achieng',
    role: 'Procurement Manager',
    facility: 'Nsambya Hospital',
  },
]

export function Testimonials() {
  return (
    <section className="bg-muted/30 py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="text-2xl font-bold md:text-3xl">What Our Clients Say</h2>
            <p className="mt-2 text-muted-foreground">
              Trusted by healthcare professionals across East Africa
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-6 transition-all hover:border-blue-600 hover:shadow-lg"
              >
                <div className="mb-4 text-blue-600">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="mb-4 leading-relaxed text-muted-foreground">{testimonial.quote}</p>
                <div className="border-t pt-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.facility}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
