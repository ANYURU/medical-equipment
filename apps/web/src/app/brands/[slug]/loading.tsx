import { Skeleton } from '@/components/ui/skeleton'

export default function BrandLoading() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <header className="mb-12 text-center">
        <Skeleton className="mx-auto mb-6 h-32 w-64" />
        <Skeleton className="mx-auto h-10 w-48" />
        <Skeleton className="mx-auto mt-4 h-6 w-96" />
      </header>

      <section>
        <Skeleton className="mb-6 h-8 w-32" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
