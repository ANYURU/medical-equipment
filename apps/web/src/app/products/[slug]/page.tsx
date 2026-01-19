import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { Badge } from '@/components/ui/badge'
import { generateSEO } from '@/lib/seo'
import type { Product } from '@/types/sanity'
import { RequestQuoteDialog } from './request-quote-dialog'
import { ImageGallery } from './image-gallery'

async function getProduct(slug: string): Promise<Product | null> {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      sku,
      description,
      content,
      price,
      mainImage,
      gallery,
      brand->{name, slug},
      categories[]->{title, slug},
      specifications,
      features,
      applications,
      status
    }`,
    { slug }
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {}
  }

  const image = product.mainImage
    ? urlFor(product.mainImage).width(1200).height(630).url()
    : undefined

  return generateSEO({
    title: product.name,
    description: product.description || `${product.name} - Premium medical equipment`,
    path: `/products/${product.slug.current}`,
    image,
  })
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  const allImages = [
    product.mainImage,
    ...(product.gallery || [])
  ].filter(Boolean)

  return (
    <div className="min-h-screen">
      {/* Product Header */}
      <div className="border-b bg-muted/30">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Images */}
            <div>
              <ImageGallery images={allImages} productName={product.name} />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="space-y-4">
                {product.status && product.status !== 'available' && (
                  <Badge variant={product.status === 'coming_soon' ? 'secondary' : 'outline'}>
                    {product.status === 'coming_soon' ? 'Coming Soon' : 'Discontinued'}
                  </Badge>
                )}
                
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {product.name}
                </h1>

                {product.sku && (
                  <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                )}

                {product.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {product.brand && (
                    <Link href={`/brands/${product.brand.slug.current}`}>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                        {product.brand.name}
                      </Badge>
                    </Link>
                  )}
                  {product.categories?.map((cat) => (
                    <Link key={cat.slug.current} href={`/categories/${cat.slug.current}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                        {cat.title}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <RequestQuoteDialog productName={product.name} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container px-4 py-12 md:px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          {product.content && Array.isArray(product.content) && product.content.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Product Details</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {product.content.map((block: any, index: number) => (
                  <p key={index}>
                    {block.children?.map((child: any) => child.text).join('') || ''}
                  </p>
                ))}
              </div>
            </div>
          )}

          {product.specifications && product.specifications.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Specifications</h2>
              <div className="divide-y rounded-lg border">
                {product.specifications.map((spec: any, index: number) => (
                  <div key={index} className="flex justify-between gap-4 px-4 py-3">
                    <dt className="font-medium">{spec.label}</dt>
                    <dd className="text-muted-foreground text-right">{spec.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Key Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.applications && product.applications.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Applications</h2>
              <ul className="space-y-3">
                {product.applications.map((application: string, index: number) => (
                  <li key={index} className="flex gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted-foreground">{application}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
