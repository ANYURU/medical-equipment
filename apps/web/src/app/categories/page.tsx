import { client } from '@/lib/sanity';
import { CategoryCard } from '@/components/categories/CategoryCard';
import type { Category } from '@/types/sanity';

async function getCategories(): Promise<Category[]> {
  return client.fetch(`
    *[_type == "category"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      image
    }
  `);
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-linear-to-b from-blue-50 to-background py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Equipment Categories
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our comprehensive range of medical equipment organized by specialty
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="container px-4 py-12 md:px-6 md:py-16">
        {categories.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No categories available at the moment</p>
          </div>
        )}
      </div>
    </>
  );
}
