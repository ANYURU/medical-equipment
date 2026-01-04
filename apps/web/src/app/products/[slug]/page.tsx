import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { client, urlFor } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { generateSEO } from '@/lib/seo';
import type { Product } from '@/types/sanity';

async function getProduct(slug: string): Promise<Product | null> {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      description,
      price,
      mainImage,
      brand->{name, slug},
      categories[]->{title, slug}
    }`,
    { slug }
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {};
  }

  const image = product.mainImage
    ? urlFor(product.mainImage).width(1200).height(630).url()
    : undefined;

  return generateSEO({
    title: product.name,
    description: product.description || `${product.name} - Premium medical equipment`,
    path: `/products/${product.slug.current}`,
    image,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
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
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {product.name}
            </h1>
            {product.price && (
              <p className="mt-4 text-3xl font-bold text-gray-900">
                ${product.price.toLocaleString()}
              </p>
            )}
          </div>
          
          <Separator />
          
          {product.description && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700">Description</h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>
          )}
          
          <Separator />
          
          <div className="space-y-4">
            {product.brand && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Brand:</span>
                <Badge variant="secondary">{product.brand.name}</Badge>
              </div>
            )}
            {product.categories && product.categories.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Categories:</span>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((cat) => (
                    <Badge key={cat.slug.current} variant="outline">{cat.title}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Button size="lg" className="w-full sm:w-auto">
            Request Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
