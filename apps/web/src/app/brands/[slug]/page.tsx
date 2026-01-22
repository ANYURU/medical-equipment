import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity';
import { ProductCard } from '@/components/products/ProductCard';
import { PortableText } from '@portabletext/react';
import type { Brand, Product } from '@/types/sanity';

async function getBrandWithProducts(slug: string): Promise<{
  brand: Brand;
  products: Product[];
} | null> {
  const brand = await client.fetch<Brand>(
    `*[_type == "brand" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      logo,
      description,
      content,
      website,
      bannerImage,
      country,
      certifications,
      featured
    }`,
    { slug }
  );

  if (!brand) return null;

  const products = await client.fetch<Product[]>(
    `*[_type == "product" && brand._ref == $brandId] {
      _id,
      name,
      slug,
      description,
      price,
      mainImage,
      featured
    }`,
    { brandId: brand._id }
  );

  return { brand, products };
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getBrandWithProducts(slug);

  if (!data) notFound();

  const { brand, products } = data;

  return (
    <div className="min-h-screen">
      {/* Banner */}
      {brand.bannerImage && (
        <div className="relative h-64 w-full md:h-96">
          <Image
            src={urlFor(brand.bannerImage).width(1920).height(600).url()}
            alt={brand.bannerImage.alt || brand.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container">
              {brand.logo && (
                <div className="relative mb-4 h-16 w-32">
                  <Image
                    src={urlFor(brand.logo).width(200).height(100).url()}
                    alt={brand.logo.alt || brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <h1 className="text-3xl font-bold text-white md:text-4xl">{brand.name}</h1>
              {brand.country && (
                <p className="mt-2 text-sm text-white/90">Made in {brand.country}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container px-4 py-12 md:px-6 md:py-16">
        {/* No banner fallback */}
        {!brand.bannerImage && (
          <header className="mb-12 text-center">
            {brand.logo && (
              <div className="relative mx-auto mb-6 h-32 w-64">
                <Image
                  src={urlFor(brand.logo).width(400).height(200).url()}
                  alt={brand.logo.alt || brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{brand.name}</h1>
            {brand.country && (
              <p className="mt-2 text-sm text-muted-foreground">Made in {brand.country}</p>
            )}
          </header>
        )}

        <div className="mx-auto max-w-5xl">
          {/* Description & Content */}
          <div className="mb-12">
            {brand.description && (
              <p className="text-lg text-muted-foreground">{brand.description}</p>
            )}
            {brand.content && (
              <div className="prose prose-gray mt-6 max-w-none">
                <PortableText value={brand.content} />
              </div>
            )}
          </div>

          {/* Certifications & Website */}
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {brand.certifications && brand.certifications.length > 0 && (
              <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-semibold">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {brand.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="rounded-full border bg-muted px-3 py-1 text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {brand.website && (
              <div className="rounded-lg border p-6">
                <h3 className="mb-4 text-lg font-semibold">Official Website</h3>
                <Link
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                >
                  Visit {brand.name} Website
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Products */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">Products from {brand.name}</h2>
          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No products available yet</p>
          )}
        </section>
      </div>
    </div>
  );
}
