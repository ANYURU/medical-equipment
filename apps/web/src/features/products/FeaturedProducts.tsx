import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { client } from '@/lib/sanity';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types/sanity';

async function getFeaturedProducts(): Promise<Product[]> {
  return client.fetch(`
    *[_type == "product" && featured == true] | order(orderRank) [0...6] {
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

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (!products.length) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Featured Products
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore our top medical equipment and supplies
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/products">View All →</Link>
          </Button>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
