import { client } from '@/lib/sanity';
import { ProductCard } from '@/components/products/ProductCard';
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

async function getProducts(page: number): Promise<{ products: Product[]; total: number }> {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const [products, total] = await Promise.all([
    client.fetch(
      `*[_type == "product"] | order(_createdAt desc) [$start...$end] {
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
    client.fetch(`count(*[_type == "product"])`),
  ]);

  return { products, total };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { products, total } = await getProducts(page);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          All Products
        </h1>
        <p className="mt-2 text-gray-600">
          Browse our complete range of medical equipment
        </p>
      </div>
      {products.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination className="mt-8">
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
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
}
