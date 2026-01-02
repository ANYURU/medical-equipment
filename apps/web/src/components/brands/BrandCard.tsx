import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { Card, CardContent } from '@/components/ui/card';
import type { Brand } from '@/types/sanity';

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand.slug.current}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
        <CardContent className="flex items-center justify-center p-8">
          {brand.logo && (
            <div className="relative h-24 w-full">
              <Image
                src={urlFor(brand.logo).width(300).height(100).url()}
                alt={brand.logo.alt || brand.name}
                fill
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
