import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import type { Brand } from '@/types/sanity';

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand.slug.current}`} className="group block">
      <div className="overflow-hidden rounded-lg border bg-card p-8 transition-colors hover:bg-accent">
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
      </div>
    </Link>
  );
}
