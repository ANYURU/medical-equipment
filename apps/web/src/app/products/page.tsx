import { client } from '@/lib/sanity';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { Product } from '@/types/sanity';

const ITEMS_PER_PAGE = 12;

async function getProducts(
  page: number,
  search?: string,
  category?: string,
  brand?: string
): Promise<{ products: Product[]; total: number }> {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  // Build filter conditions
  const filters = ['_type == "product"'];
  
  if (search) {
    filters.push(`(name match "${search}*" || description match "${search}*")`);
  }
  
  if (category) {
    filters.push(`references(*[_type == "category" && slug.current == "${category}"]._id)`);
  }
  
  if (brand) {
    filters.push(`brand._ref in *[_type == "brand" && slug.current == "${brand}"]._id`);
  }

  const filterQuery = filters.join(' && ');
  
  console.log('🔍 Filter Query:', filterQuery);
  console.log('📊 Params:', { search, category, brand, page });

  const [products, total] = await Promise.all([
    client.fetch(
      `*[${filterQuery}] | order(_createdAt desc) [$start...$end] {
        _id,
        name,
        slug,
        description,
        price,
        mainImage,
        featured
      }`,
      { start, end }
    ),
    client.fetch(`count(*[${filterQuery}])`),
  ]);

  console.log('✅ Found products:', products.length, 'of', total);

  return { products, total };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; category?: string; brand?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const { products, total } = await getProducts(
    page,
    params.search,
    params.category,
    params.brand
  );
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-linear-to-b from-blue-50 to-background py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Medical Equipment & Supplies
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse our complete range of premium medical equipment for healthcare facilities
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{total}</span> products available
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <div className="container px-4 py-12 md:px-6 md:py-16">
        {/* Filters */}
        <div className="mb-8">
          <ProductFilters />
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href={`/products?page=${page - 1}`} />
                    </PaginationItem>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink href={`/products?page=${p}`} isActive={p === page}>
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={`/products?page=${page + 1}`} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              {params.search || params.category || params.brand
                ? `No products found matching your filters`
                : 'No products available at the moment'}
            </p>
            {(params.search || params.category || params.brand) && (
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/products">Clear filters</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
