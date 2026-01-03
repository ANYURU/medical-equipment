import {client} from '@/lib/sanity'
import {
  Hero,
  StatsSection,
  PartnersCarousel,
  WhyChooseUs,
  MissionVision,
  Testimonials,
  EnhancedCTA,
} from '@/features/home'
import {FeaturedProducts} from '@/features/products/FeaturedProducts'
import {CategoriesGrid} from '@/features/categories/CategoriesGrid'
import {ServicesOverview} from '@/features/services/ServicesOverview'
import type {SiteSettings} from '@/types/sanity'

export default async function Home() {
  const siteSettings = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0]{
      siteName,
      siteUrl
    }`,
  )

  return (
    <>
      <Hero
        title={siteSettings?.siteName || 'Medical Equipment Supply Platform'}
        subtitle="Premium medical equipment and supplies for healthcare facilities across Uganda and East Africa. Complete solutions with installation, service, and 24/7 support."
      />
      <StatsSection />
      <PartnersCarousel />
      <WhyChooseUs />
      <MissionVision />
      <CategoriesGrid />
      <FeaturedProducts />
      <ServicesOverview />
      <Testimonials />
      <EnhancedCTA />
    </>
  )
}
