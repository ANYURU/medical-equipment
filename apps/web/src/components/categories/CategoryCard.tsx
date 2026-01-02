import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import type { Category } from '@/types/sanity';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug.current}`}
      className="group block overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg"
    >
      {category.image && (
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <Image
            src={urlFor(category.image).width(600).height(400).url()}
            alt={category.image.alt || category.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
          {category.title}
        </h3>
        {category.description && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
}
