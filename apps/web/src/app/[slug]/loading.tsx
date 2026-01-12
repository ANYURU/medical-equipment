import { Skeleton } from '@/components/ui/skeleton'

export default function DynamicPageLoading() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <article className="mx-auto max-w-3xl">
        <Skeleton className="mb-8 h-12 w-3/4" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </article>
    </div>
  )
}
