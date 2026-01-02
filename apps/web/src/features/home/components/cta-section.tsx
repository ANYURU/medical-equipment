import Link from 'next/link';

export function CTASection() {
  return (
    <section className="bg-blue-600 py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Equip Your Healthcare Facility?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Get in touch with our team to discuss your equipment needs and receive a customized quote
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
