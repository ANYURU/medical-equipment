import { Skeleton } from '@/components/ui/skeleton'

export default function BlogPostLoading() {
  return (
    <article className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <Skeleton className="mb-4 h-12 w-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        </header>

        <Skeleton className="mb-8 h-px w-full" />

        <Skeleton className="mb-8 h-24 w-full" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </article>
  )
}
