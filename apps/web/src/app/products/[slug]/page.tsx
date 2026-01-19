import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { generateSEO } from '@/lib/seo'
import type { Product } from '@/types/sanity'
import { RequestQuoteDialog } from './request-quote-dialog'
import { ImageGallery } from './image-gallery'
import { ShareButtons } from './share-buttons'
import { StickyMobileCTA } from './sticky-mobile-cta'
import { CheckCircle2, ChevronRight } from 'lucide-react'

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
    <>
      <div className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="border-b bg-muted/30">
          <div className="container px-4 py-3 md:px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/products">Products</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {product.categories?.[0] && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={`/categories/${product.categories[0].slug.current}`}>
                          {product.categories[0].title}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Product Header */}
        <div className="border-b">
          <div className="container px-4 py-8 md:px-6 md:py-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Product Info - First on mobile */}
              <div className="flex flex-col lg:order-2">
                <div className="space-y-6">
                  {/* Status + Title */}
                  <div className="space-y-3">
                    {product.status && product.status !== 'available' && (
                      <Badge variant={product.status === 'coming_soon' ? 'secondary' : 'outline'}>
                        {product.status === 'coming_soon' ? 'Coming Soon' : 'Discontinued'}
                      </Badge>
                    )}
                    
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                      {product.name}
                    </h1>
                  </div>

                  {/* SKU + Share */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b">
                    {product.sku && (
                      <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                    )}
                    <ShareButtons productName={product.name} />
                  </div>

                  {/* Description */}
                  {product.description && (
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  {/* Quick Specs Highlight */}
                  {product.specifications && product.specifications.length > 0 && (
                    <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                      <p className="text-sm font-medium">Key Specifications</p>
                      <div className="grid gap-2 text-sm">
                        {product.specifications.slice(0, 3).map((spec, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-muted-foreground">{spec.label}</span>
                            <span className="font-medium">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                      {product.specifications.length > 3 && (
                        <p className="text-xs text-muted-foreground pt-1">
                          +{product.specifications.length - 3} more specifications below
                        </p>
                      )}
                    </div>
                  )}

                  {/* Brand + Categories */}
                  {(product.brand || product.categories?.length) && (
                    <div className="flex flex-wrap gap-2">
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
                  )}

                  {/* Primary CTA */}
                  <div className="pt-2">
                    <RequestQuoteDialog productName={product.name} />
                  </div>
                </div>
              </div>

              {/* Images - Second on mobile, first on desktop */}
              <div className="lg:order-1">
                <ImageGallery images={allImages} productName={product.name} />
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="container px-4 py-12 md:px-6">
          <div className="mx-auto max-w-4xl space-y-12">
            {product.content && Array.isArray(product.content) && product.content.length > 0 && (
              <div>
                <h2 className="mb-6 text-2xl font-bold">Product Details</h2>
                <div className="prose prose-gray max-w-none">
                  {product.content.map((block: any, index: number) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {block.children?.map((child: any) => child.text).join('') || ''}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h2 className="mb-6 text-2xl font-bold">Technical Specifications</h2>
                <div className="divide-y rounded-lg border bg-card">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 px-6 py-4">
                      <dt className="font-medium">{spec.label}</dt>
                      <dd className="text-muted-foreground">{spec.value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div>
                <h2 className="mb-6 text-2xl font-bold">Key Features</h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.applications && product.applications.length > 0 && (
              <div>
                <h2 className="mb-6 text-2xl font-bold">Applications</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {product.applications.map((application: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                      <span className="text-muted-foreground">{application}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA productName={product.name} />
    </>
  )
}
