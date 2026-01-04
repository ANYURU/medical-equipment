import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-b">
      <nav className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <span className="text-xl font-bold">MedSupply</span>
        </Link>
        
        <div className="flex-1 flex items-center justify-between">
          <div className="hidden lg:flex gap-6">
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="h-9 w-9 bg-gray-200 animate-pulse rounded-md" />
            <Button size="sm" disabled className="hidden md:inline-flex">
              Request Quote
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
