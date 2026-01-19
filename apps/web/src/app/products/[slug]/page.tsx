import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { generateSEO } from '@/lib/seo'
import type { Product } from '@/types/sanity'
import { RequestQuoteDialog } from './request-quote-dialog'

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

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-gray-100">
            {product.mainImage && (
              <Image
                src={urlFor(product.mainImage).width(800).height(800).url()}
                alt={product.mainImage.alt || product.name}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.gallery.map((image: any, index: number) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg border bg-gray-100">
                  <Image
                    src={urlFor(image).width(200).height(200).url()}
                    alt={image.alt || `${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {product.name}
              </h1>
              {product.status && product.status !== 'available' && (
                <Badge variant={product.status === 'coming_soon' ? 'secondary' : 'outline'}>
                  {product.status === 'coming_soon' ? 'Coming Soon' : 'Discontinued'}
                </Badge>
              )}
            </div>
            {product.sku && (
              <p className="mt-2 text-sm text-muted-foreground">SKU: {product.sku}</p>
            )}
          </div>

          <Separator />

          {product.description && (
            <div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          )}

          <div className="space-y-4">
            {product.brand && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Brand:</span>
                <Link href={`/brands/${product.brand.slug.current}`}>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {product.brand.name}
                  </Badge>
                </Link>
              </div>
            )}
            {product.categories && product.categories.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-sm font-semibold">Categories:</span>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((cat) => (
                    <Link key={cat.slug.current} href={`/categories/${cat.slug.current}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                        {cat.title}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <RequestQuoteDialog productName={product.name} />
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 space-y-8">
        {product.content && Array.isArray(product.content) && product.content.length > 0 && (
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-bold">Product Details</h2>
            <div className="prose max-w-none">
              {product.content.map((block: any, index: number) => (
                <p key={index} className="mb-4 text-muted-foreground">
                  {block.children?.map((child: any) => child.text).join('') || ''}
                </p>
              ))}
            </div>
          </div>
        )}

        {product.specifications && product.specifications.length > 0 && (
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-bold">Specifications</h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              {product.specifications.map((spec: any, index: number) => (
                <div key={index} className="flex flex-col">
                  <dt className="text-sm font-semibold">{spec.label}</dt>
                  <dd className="text-sm text-muted-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {product.features && product.features.length > 0 && (
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-bold">Key Features</h2>
            <ul className="space-y-2">
              {product.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
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
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-bold">Applications</h2>
            <ul className="space-y-2">
              {product.applications.map((application: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
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
  )
}
