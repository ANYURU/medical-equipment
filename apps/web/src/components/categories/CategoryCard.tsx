import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import type { Category } from '@/types/sanity';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug.current}`} className="group block">
      <div className="overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent">
        {category.image && (
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={urlFor(category.image).width(600).height(400).url()}
              alt={category.image.alt || category.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold group-hover:text-primary">
            {category.title}
          </h3>
          {category.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {category.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
