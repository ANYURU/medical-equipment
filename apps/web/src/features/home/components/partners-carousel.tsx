'use client'

interface Partner {
  name: string
  logo?: string
}

const partners: Partner[] = [
  {name: 'Mulago Hospital'},
  {name: 'Kampala International Hospital'},
  {name: 'Nakasero Hospital'},
  {name: 'Case Hospital'},
  {name: 'Nsambya Hospital'},
  {name: 'Mengo Hospital'},
  {name: 'Lubaga Hospital'},
  {name: 'Kiruddu Hospital'},
]

export function PartnersCarousel() {
  return (
    <section className="overflow-hidden border-y bg-background py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <h2 className="mb-6 text-center text-xl font-semibold text-muted-foreground md:mb-8 md:text-2xl">
          Trusted by Leading Healthcare Facilities
        </h2>
        <div className="relative">
          <div className="flex animate-scroll gap-8 md:gap-12">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="flex min-w-[150px] items-center justify-center rounded-lg border bg-card px-6 py-4 transition-colors hover:bg-accent md:min-w-[200px] md:px-8 md:py-6"
              >
                <span className="whitespace-nowrap text-sm font-medium md:text-base">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
