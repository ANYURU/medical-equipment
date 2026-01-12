import { Skeleton } from '@/components/ui/skeleton'

export default function ServicesLoading() {
  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-linear-to-b from-blue-50 to-background py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-12 w-64" />
            <Skeleton className="mx-auto mt-4 h-6 w-96" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-6 md:p-8 space-y-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
