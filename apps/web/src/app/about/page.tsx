import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-linear-to-b from-blue-50 to-background py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              About Gombaland Medical Supplies
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your trusted partner in medical equipment supply since 2011
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 rounded-lg border bg-card p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
            <p className="leading-relaxed text-muted-foreground">
              We are committed to providing high-quality medical equipment and supplies to healthcare facilities across Uganda and East Africa. Our mission is to ensure that every healthcare provider has access to reliable, affordable, and cutting-edge medical technology.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="group rounded-lg border bg-card p-6 transition-all hover:border-blue-600 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quality Assurance</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                All our products meet international quality standards and are sourced from reputable manufacturers.
              </p>
            </div>
            <div className="group rounded-lg border bg-card p-6 transition-all hover:border-blue-600 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expert Support</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Our team of experts provides technical support and training to ensure optimal equipment usage.
              </p>
            </div>
            <div className="group rounded-lg border bg-card p-6 transition-all hover:border-blue-600 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fast Delivery</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We maintain local inventory to ensure quick delivery and minimize downtime for your facility.
              </p>
            </div>
            <div className="group rounded-lg border bg-card p-6 transition-all hover:border-blue-600 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Competitive Pricing</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We offer competitive pricing without compromising on quality or service excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
