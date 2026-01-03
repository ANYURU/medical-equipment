import {Button} from '@/components/ui/button'
import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle?: string
}

export function Hero({title, subtitle}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-background py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-block rounded-full border bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
            Serving Uganda and Beyond Since 2011
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Empowering East African Healthcare with{' '}
            <span className="text-blue-600">Innovative Equipment</span>
          </h1>
          {subtitle && (
            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg md:text-xl md:leading-8">
              {subtitle}
            </p>
          )}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/categories">Explore Our Categories</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/contact">Request a Free Quote</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Trusted by leading hospitals across East Africa
          </p>
        </div>
      </div>
    </section>
  )
}
