import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
