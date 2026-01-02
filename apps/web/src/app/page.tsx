import {client} from '@/lib/sanity'
import {Hero} from '@/features/home'
import {FeaturedProducts} from '@/features/products/FeaturedProducts'
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
        subtitle="Premium medical equipment and supplies for healthcare facilities across Uganda"
      />
      <FeaturedProducts />
    </>
  )
}
