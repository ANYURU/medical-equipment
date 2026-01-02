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
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          All Categories
        </h1>
        <p className="mt-2 text-gray-600">
          Browse products by category
        </p>
      </div>
      {categories.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No categories available</p>
      )}
    </div>
  );
}
