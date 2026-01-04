import type {Feature} from '@/types/sanity'
import {getFeatureIcon} from '@/lib/icons'

interface WhyChooseUsProps {
  heading?: string
  description?: string
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  {_id: '1', _type: 'feature', title: 'Quality Guaranteed', description: 'ISO-certified equipment from world-leading manufacturers with full warranty coverage', icon: 'shield', order: 0},
  {_id: '2', _type: 'feature', title: '24/7 Support', description: 'Round-the-clock technical support and emergency response for critical equipment', icon: 'clock', order: 1},
  {_id: '3', _type: 'feature', title: 'Expert Installation', description: 'Professional installation and training by certified technicians for optimal performance', icon: 'settings', order: 2},
  {_id: '4', _type: 'feature', title: 'Flexible Financing', description: 'Affordable pricing with flexible payment plans tailored to your budget', icon: 'dollar', order: 3},
  {_id: '5', _type: 'feature', title: 'Complete Documentation', description: 'Full compliance support with certifications, manuals, and regulatory documentation', icon: 'document', order: 4},
  {_id: '6', _type: 'feature', title: 'Fast Delivery', description: 'Quick turnaround times with efficient logistics across East Africa', icon: 'lightning', order: 5},
]

export function WhyChooseUs({heading, description, features}: WhyChooseUsProps) {
  const displayFeatures = features && features.length > 0 ? features.sort((a, b) => (a.order || 0) - (b.order || 0)) : defaultFeatures

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="text-2xl font-bold md:text-3xl">
              {heading || 'Why Healthcare Facilities Choose Us'}
            </h2>
            {description && (
              <p className="mt-2 text-muted-foreground">{description}</p>
            )}
            {!description && (
              <p className="mt-2 text-muted-foreground">
                Comprehensive solutions backed by expertise and reliability
              </p>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {displayFeatures.map((feature) => (
              <div
                key={feature._id}
                className="group rounded-lg border bg-card p-6 transition-all hover:border-blue-600 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  {getFeatureIcon(feature.icon)}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
