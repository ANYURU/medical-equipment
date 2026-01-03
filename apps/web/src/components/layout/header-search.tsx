'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function HeaderSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  // Sync state with URL params on mount/update
  useEffect(() => {
    const search = searchParams?.get('search')
    if (search) {
      setQuery(search)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      const params = new URLSearchParams(searchParams?.toString())
      params.set('search', query.trim())
      router.push(`/products?${params.toString()}`)
    }
  }

  return (
    <>
      {/* Desktop Search */}
      <div className="hidden md:block">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search equipment..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-4 w-64 lg:w-80"
          />
        </form>
      </div>

      {/* Mobile Search Trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Mobile Search Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-background md:hidden">
          <div className="flex h-16 items-center gap-4 border-b px-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search equipment..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9 pr-4 w-full"
                  autoFocus
                />
              </div>
            </form>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
