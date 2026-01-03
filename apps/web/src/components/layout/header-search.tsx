'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import { useState, useEffect, useTransition, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchSuggestions } from '@/components/search/SearchSuggestions'

export function HeaderSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Sync state with URL params
  useEffect(() => {
    const search = searchParams?.get('search')
    setQuery(search || '')
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuggestions(false)
    if (query.trim()) {
      setIsOpen(false)
      startTransition(() => {
        router.push(`/products?search=${encodeURIComponent(query.trim())}`)
      })
    } else if (searchParams?.get('search')) {
      // Clear search if empty
      setIsOpen(false)
      startTransition(() => {
        router.push('/products')
      })
    }
  }

  const handleClear = () => {
    setQuery('')
    setShowSuggestions(false)
    // Only navigate if we're on products page with search param
    if (searchParams?.get('search')) {
      startTransition(() => {
        router.push('/products')
      })
    }
  }

  return (
    <>
      {/* Desktop Search */}
      <div className="hidden md:block" ref={wrapperRef}>
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search equipment..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            className="pl-9 pr-20 w-64 lg:w-80"
          />
          {query && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {isPending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleClear}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          {showSuggestions && (
            <SearchSuggestions
              query={query}
              onSelect={() => {
                setShowSuggestions(false)
                setIsOpen(false)
              }}
            />
          )}
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
        <div className="fixed inset-0 z-60 bg-background md:hidden">
          <div className="flex h-16 items-center gap-4 border-b px-4">
            <form onSubmit={handleSubmit} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search equipment..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9 pr-16 w-full"
                  autoFocus
                />
                {query && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {isPending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={handleClear}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
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
