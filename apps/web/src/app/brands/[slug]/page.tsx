import { notFound } from 'next/navigation';
import Image from 'next/image';
import { client, urlFor } from '@/lib/sanity';
import { ProductCard } from '@/components/products/ProductCard';
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
      description
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
  params: { slug: string };
}) {
  const data = await getBrandWithProducts(params.slug);

  if (!data) notFound();

  const { brand, products } = data;

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
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
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {brand.name}
        </h1>
        {brand.description && (
          <p className="mt-4 text-muted-foreground">{brand.description}</p>
        )}
      </header>

      <section>
        <h2 className="mb-6 text-2xl font-bold">Products</h2>
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No products from this brand</p>
        )}
      </section>
    </div>
  );
}
