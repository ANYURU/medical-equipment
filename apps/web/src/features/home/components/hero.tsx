import {Button} from '@/components/ui/button'
import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle?: string
}

export function Hero({title, subtitle}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50 to-background pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      </div>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border bg-blue-50/50 px-3 py-1 text-sm font-medium text-blue-600 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            Serving East Africa Since 2011
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            Empowering Healthcare with <br className="hidden md:block" />
            <span className="text-blue-600">World-Class Equipment</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl mb-8 leading-relaxed">
            {subtitle || 'Your trusted partner for premium medical supplies, professional installation, and lifetime technical support across Uganda and East Africa.'}
          </p>

          {/* Service Highlights */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-muted-foreground mb-10">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              Professional Installation
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              24/7 Technical Support
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              Official Manufacturer Warranty
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button asChild size="lg" className="h-12 w-full px-8 text-base sm:w-auto shadow-lg shadow-blue-600/20">
              <Link href="/contact">Request a Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 w-full px-8 text-base sm:w-auto bg-white/50 backdrop-blur-sm hover:bg-white/80">
              <Link href="/categories">Browse Catalog</Link>
            </Button>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground/50 overflow-hidden">
                  {/* Placeholder avatars - in production use real images or icons */}
                  <div className="w-full h-full bg-slate-200"></div>
                </div>
              ))}
            </div>
            <p className="ml-2 font-medium">Trusted by 500+ Healthcare Facilities</p>
          </div>
        </div>
      </div>
    </section>
  )
}
