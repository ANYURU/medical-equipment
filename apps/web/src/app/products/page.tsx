import { client } from '@/lib/sanity';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types/sanity';

async function getProducts(): Promise<Product[]> {
  return client.fetch(`
    *[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      slug,
      description,
      price,
      mainImage,
      featured
    }
  `);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          All Products
        </h1>
        <p className="mt-2 text-gray-600">
          Browse our complete range of medical equipment
        </p>
      </div>
      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
}
