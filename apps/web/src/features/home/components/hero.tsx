import {Button} from '@/components/ui/button'
import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle?: string
}

export function Hero({title, subtitle}: HeroProps) {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {subtitle}
            </p>
          )}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
