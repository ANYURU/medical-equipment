import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types/sanity';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug.current}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="p-0">
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
              <Badge className="absolute left-2 top-2">Featured</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
              {product.description}
            </p>
          )}
        </CardContent>
        {product.price && (
          <CardFooter className="p-4 pt-0">
            <p className="text-lg font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </p>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
