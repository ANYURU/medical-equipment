import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { client } from '@/lib/sanity';
import { CategoryCard } from '@/components/categories/CategoryCard';
import type { Category } from '@/types/sanity';

async function getCategories(): Promise<Category[]> {
  return client.fetch(`
    *[_type == "category"] | order(order asc) [0...6] {
      _id,
      title,
      slug,
      description,
      image
    }
  `);
}

export async function CategoriesGrid() {
  const categories = await getCategories();

  if (!categories.length) return null;

  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Browse Categories
            </h2>
            <p className="mt-2 text-muted-foreground">
              Find the right equipment for your needs
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/categories">View All →</Link>
          </Button>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
