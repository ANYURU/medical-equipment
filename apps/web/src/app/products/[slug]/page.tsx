import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/lib/sanity';
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

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

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
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {product.name}
          </h1>
          {product.price && (
            <p className="mt-4 text-3xl font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </p>
          )}
          {product.description && (
            <p className="mt-6 text-gray-600">{product.description}</p>
          )}
          {product.brand && (
            <div className="mt-6">
              <span className="text-sm font-semibold text-gray-700">Brand: </span>
              <span className="text-sm text-gray-600">{product.brand.name}</span>
            </div>
          )}
          {product.categories && product.categories.length > 0 && (
            <div className="mt-4">
              <span className="text-sm font-semibold text-gray-700">Categories: </span>
              <span className="text-sm text-gray-600">
                {product.categories.map((cat) => cat.title).join(', ')}
              </span>
            </div>
          )}
          <button className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto">
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}
