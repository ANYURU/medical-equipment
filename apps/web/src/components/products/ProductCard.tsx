import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types/sanity';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug.current}`} className="group block cursor-pointer">
      <div className="overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.mainImage && (
            <Image
              src={urlFor(product.mainImage).width(400).height(400).url()}
              alt={product.mainImage.alt || product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          )}
          {product.featured && (
            <Badge className="absolute left-2 top-2">Featured</Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold group-hover:text-primary">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
          )}
          {product.price && (
            <p className="mt-2 text-lg font-bold">
              ${product.price.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
