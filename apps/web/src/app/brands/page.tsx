import { client } from '@/lib/sanity';
import { BrandCard } from '@/components/brands/BrandCard';
import type { Brand } from '@/types/sanity';

async function getBrands(): Promise<Brand[]> {
  return client.fetch(`
    *[_type == "brand"] | order(order asc) {
      _id,
      name,
      slug,
      logo,
      description
    }
  `);
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Our Brands
        </h1>
        <p className="mt-2 text-muted-foreground">
          Trusted manufacturers we partner with
        </p>
      </header>
      {brands.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No brands available</p>
      )}
    </div>
  );
}
