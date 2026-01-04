import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-bold">MedSupply Uganda</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Premium medical equipment and supplies for healthcare facilities across Uganda and East Africa.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-muted-foreground">Kampala, Uganda</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+256700000000" className="text-muted-foreground hover:text-foreground">+256 700 000 000</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@medequip.ug" className="text-muted-foreground hover:text-foreground">info@medequip.ug</a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground transition-colors hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground transition-colors hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-muted-foreground transition-colors hover:text-foreground">
                  Brands
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground transition-colors hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Location</h3>
            <div className="overflow-hidden rounded-lg border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.98093077!2d32.5!3d0.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbd4f8c8e8e8f%3A0x8e8e8e8e8e8e8e8e!2sKampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="150"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MedSupply Location"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>&copy; {new Date().getFullYear()} MedSupply Uganda. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
