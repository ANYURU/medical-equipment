import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="mt-2 h-6 w-96" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-6 space-y-4">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-16 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
