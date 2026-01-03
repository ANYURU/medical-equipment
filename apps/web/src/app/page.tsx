import {client} from '@/lib/sanity'
import {
  Hero,
  StatsSection,
  DistributorsCarousel,
  WhyChooseUs,
  MissionVision,
  Testimonials,
  EnhancedCTA,
  ServiceGuarantees,
} from '@/features/home'
import {FeaturedProducts} from '@/features/products/FeaturedProducts'
import {CategoriesGrid} from '@/features/categories/CategoriesGrid'
import {ServicesOverview} from '@/features/services/ServicesOverview'
import type {Homepage} from '@/types/sanity'

export default async function Home() {
  let homepage: Homepage | null = null
  
  try {
    homepage = await client.fetch<Homepage>(
      `*[_type == "homepage"][0]{
        hero,
        statsSection{
          heading,
          stats[]->{
            _id,
            value,
            suffix,
            label,
            order
          }
        },
        distributorsSection{
          heading,
          distributors[]->{
            _id,
            name,
            logo,
            order
          }
        },
        whyChooseUsSection{
          heading,
          description,
          features[]->{
            _id,
            title,
            description,
            icon,
            order
          }
        },
        missionVisionSection{
          heading,
          description,
          mission,
          missionMetric,
          vision,
          visionMetric
        },
        testimonialsSection{
          heading,
          description,
          testimonials[]->{
            _id,
            quote,
            author,
            role,
            facility,
            photo,
            order
          }
        },
        ctaSection{
          heading,
          description,
          primaryButtonText,
          primaryButtonLink,
          secondaryButtonText,
          secondaryButtonLink
        }
      }`,
      {},
      { next: { revalidate: 60 } }
    )
  } catch (error) {
    console.error('Failed to fetch homepage data:', error)
  }

  return (
    <>
      <Hero
        title={homepage?.hero?.title || 'Medical Equipment Supply Platform'}
        subtitle={homepage?.hero?.subtitle || 'Premium medical equipment and supplies for healthcare facilities across Uganda and East Africa. Complete solutions with installation, service, and 24/7 support.'}
      />
      
      {/* Metrics immediately after hero to build credibility */}
      <StatsSection 
        heading={homepage?.statsSection?.heading || "Our Impact in Numbers"}
        stats={homepage?.statsSection?.stats}
      />
      
      {/* Service Guarantees for fast value prop */}
      <ServiceGuarantees />
      
      {/* Trust section before products */}
      <DistributorsCarousel 
        heading={homepage?.distributorsSection?.heading}
        distributors={homepage?.distributorsSection?.distributors}
      />
      
      <WhyChooseUs 
        heading={homepage?.whyChooseUsSection?.heading}
        description={homepage?.whyChooseUsSection?.description}
        features={homepage?.whyChooseUsSection?.features}
      />
      
      <CategoriesGrid />
      <FeaturedProducts />
      
      {/* Mission lower down */}
      <MissionVision data={homepage?.missionVisionSection} />
      
      <ServicesOverview />
      
      <Testimonials 
        heading={homepage?.testimonialsSection?.heading}
        description={homepage?.testimonialsSection?.description}
        testimonials={homepage?.testimonialsSection?.testimonials}
      />
      <EnhancedCTA data={homepage?.ctaSection} />
    </>
  )
}
