import { Skeleton } from '@/components/ui/skeleton'

export default function ProductDetailLoading() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image skeleton */}
        <Skeleton className="aspect-square w-full rounded-lg" />
        
        {/* Details skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="mt-4 h-9 w-32" />
          </div>
          
          <Skeleton className="h-px w-full" />
          
          <div>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="mt-2 h-20 w-full" />
          </div>
          
          <Skeleton className="h-px w-full" />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          
          <Skeleton className="h-11 w-full sm:w-40" />
        </div>
      </div>
    </div>
  )
}
