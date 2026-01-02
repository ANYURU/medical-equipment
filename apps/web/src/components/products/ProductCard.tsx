import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import type { Product } from '@/types/sanity';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug.current}`}
      className="group block overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.mainImage && (
          <Image
            src={urlFor(product.mainImage).width(400).height(400).url()}
            alt={product.mainImage.alt || product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}
        {product.featured && (
          <span className="absolute left-2 top-2 rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">
            {product.description}
          </p>
        )}
        {product.price && (
          <p className="mt-2 text-lg font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </p>
        )}
      </div>
    </Link>
  );
}
