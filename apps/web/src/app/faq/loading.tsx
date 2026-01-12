import { Skeleton } from '@/components/ui/skeleton'

export default function FAQLoading() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <Skeleton className="mx-auto h-10 w-96" />
          <Skeleton className="mx-auto mt-2 h-6 w-80" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
