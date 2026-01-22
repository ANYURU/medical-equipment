import { Skeleton } from '@/components/ui/skeleton'

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumbs skeleton */}
      <div className="border-b bg-muted/30">
        <div className="container px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-1" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Product Header */}
      <div className="border-b">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Info - First on mobile */}
            <div className="flex flex-col lg:order-2">
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-3">
                  <Skeleton className="h-10 w-3/4 md:h-12" />
                </div>

                {/* SKU + Share */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-2/3" />
                </div>

                {/* Quick Specs */}
                <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>

                {/* CTA */}
                <Skeleton className="h-11 w-full" />
              </div>
            </div>

            {/* Images - Second on mobile, first on desktop */}
            <div className="lg:order-1 space-y-4">
              {/* Main image */}
              <Skeleton className="aspect-square w-full rounded-lg" />
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container px-4 py-12 md:px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Product Details */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="divide-y rounded-lg border">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-2 gap-4 px-6 py-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
