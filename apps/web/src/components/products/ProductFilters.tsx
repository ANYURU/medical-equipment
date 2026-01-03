'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'
import { useState, useTransition, useEffect } from 'react'

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchValue, setSearchValue] = useState('')
  
  // Sync state with URL params
  useEffect(() => {
    const search = searchParams.get('search')
    setSearchValue(search || '')
  }, [searchParams])
  
  const activeFilters = {
    search: searchParams.get('search'),
    category: searchParams.get('category'),
    brand: searchParams.get('brand'),
  }

  const hasActiveFilters = Object.values(activeFilters).some(Boolean)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    
    if (searchValue.trim()) {
      params.set('search', searchValue.trim())
    } else {
      params.delete('search')
    }
    params.delete('page') // Reset to page 1
    
    startTransition(() => {
      router.push(`/products?${params.toString()}`)
    })
  }

  const clearFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    params.delete('page')
    
    if (key === 'search') setSearchValue('')
    
    startTransition(() => {
      router.push(`/products?${params.toString()}`)
    })
  }

  const clearAllFilters = () => {
    setSearchValue('')
    startTransition(() => {
      router.push('/products')
    })
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 pr-10"
            disabled={isPending}
          />
          {searchValue && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => {
                setSearchValue('')
                if (searchParams.get('search')) {
                  clearFilter('search')
                }
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {activeFilters.search}
              <button
                onClick={() => clearFilter('search')}
                className="ml-1 hover:text-destructive"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {activeFilters.category && (
            <Badge variant="secondary" className="gap-1">
              Category: {activeFilters.category}
              <button
                onClick={() => clearFilter('category')}
                className="ml-1 hover:text-destructive"
                aria-label="Clear category"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {activeFilters.brand && (
            <Badge variant="secondary" className="gap-1">
              Brand: {activeFilters.brand}
              <button
                onClick={() => clearFilter('brand')}
                className="ml-1 hover:text-destructive"
                aria-label="Clear brand"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-7 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
