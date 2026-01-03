import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { ProductCard } from '@/components/products/ProductCard';
import type { Category, Product } from '@/types/sanity';

async function getCategoryWithProducts(slug: string): Promise<{
  category: Category;
  products: Product[];
} | null> {
  const category = await client.fetch<Category>(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description
    }`,
    { slug }
  );

  if (!category) return null;

  const products = await client.fetch<Product[]>(
    `*[_type == "product" && references($categoryId)] {
      _id,
      name,
      slug,
      description,
      price,
      mainImage,
      featured
    }`,
    { categoryId: category._id }
  );

  return { category, products };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCategoryWithProducts(slug);

  if (!data) notFound();

  const { category, products } = data;

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {category.title}
        </h1>
        {category.description && (
          <p className="mt-2 text-gray-600">{category.description}</p>
        )}
      </div>
      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products in this category</p>
      )}
    </div>
  );
}
