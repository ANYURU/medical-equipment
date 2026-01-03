interface MissionVisionProps {
  data?: {
    heading?: string
    description?: string
    mission?: string
    missionMetric?: string
    vision?: string
    visionMetric?: string
  }
}

export function MissionVision({data}: MissionVisionProps) {
  const heading = data?.heading || 'Our Story'
  const description = data?.description || 'Empowering East African Healthcare Since 2011'
  const mission = data?.mission || 'To provide high-quality, complete medical equipment solutions tailored to our clients\' needs, including installation, service, repair, and affordable pricing. We\'re committed to supporting healthcare facilities with reliable equipment and exceptional service that saves lives.'
  const missionMetric = data?.missionMetric || '98% Support Satisfaction Rate'
  const vision = data?.vision || 'To lead as the top medical equipment distributor in Africa and beyond, setting the standard for quality, innovation, and customer service. We envision a future where every healthcare facility has access to world-class equipment and support.'
  const visionMetric = data?.visionMetric || 'Serving Multiple East African Countries'

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="group rounded-lg border bg-card p-6 transition-all hover:border-blue-600 hover:shadow-lg md:p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold md:text-2xl">Our Mission</h3>
              <p className="leading-relaxed text-muted-foreground">{mission}</p>
              <div className="mt-4 text-sm font-semibold text-blue-600">{missionMetric}</div>
            </div>

            <div className="group rounded-lg border bg-card p-6 transition-all hover:border-blue-600 hover:shadow-lg md:p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold md:text-2xl">Our Vision</h3>
              <p className="leading-relaxed text-muted-foreground">{vision}</p>
              <div className="mt-4 text-sm font-semibold text-blue-600">{visionMetric}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
