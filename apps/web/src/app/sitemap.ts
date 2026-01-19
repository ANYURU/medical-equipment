import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import type { SiteSettings } from '@/types/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch site URL from Sanity
  const settings = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0] { siteUrl }`
  )
  const baseUrl = settings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://biomedengsug.org'

  // Fetch dynamic content
  const [products, categories, brands, blogPosts, services, pages] = await Promise.all([
    client.fetch(`*[_type == "product" && !(_id in path("drafts.**"))] { "slug": slug.current, _updatedAt, mainImage }`),
    client.fetch(`*[_type == "category" && !(_id in path("drafts.**"))] { "slug": slug.current, _updatedAt }`),
    client.fetch(`*[_type == "brand" && !(_id in path("drafts.**"))] { "slug": slug.current, _updatedAt }`),
    client.fetch(`*[_type == "post" && !(_id in path("drafts.**"))] { "slug": slug.current, _updatedAt }`),
    client.fetch(`*[_type == "service" && !(_id in path("drafts.**"))] { "slug": slug.current, _updatedAt }`),
    client.fetch(`*[_type == "page" && !(_id in path("drafts.**"))] { "slug": slug.current, _updatedAt }`),
  ])

  // Static pages
  const staticPages = [
    { url: '', changeFrequency: 'daily' as const, priority: 1 },
    { url: '/products', changeFrequency: 'daily' as const, priority: 0.9 },
    { url: '/categories', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/brands', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/services', changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: '/blog', changeFrequency: 'daily' as const, priority: 0.8 },
    { url: '/about', changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: '/contact', changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: '/faq', changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  return [
    ...staticPages.map(page => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...products.map((product: any) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: product.mainImage ? [`${baseUrl}/products/${product.slug}`] : undefined,
    })),
    ...categories.map((category: any) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(category._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...brands.map((brand: any) => ({
      url: `${baseUrl}/brands/${brand.slug}`,
      lastModified: new Date(brand._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...services.map((service: any) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(service._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...blogPosts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...pages.map((page: any) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
