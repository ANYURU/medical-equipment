'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, Search } from 'lucide-react'

interface SearchSuggestionsProps {
  query: string
  onSelect: () => void
}

export function SearchSuggestions({ query, onSelect }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([])
      setIsLoading(false)
      setError(false)
      return
    }

    const controller = new AbortController()
    setIsLoading(true)
    setError(false)

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        })
        const results = await res.json()
        setSuggestions(results)
        setError(false)
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          setError(true)
        }
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(fetchSuggestions, 300)

    return () => {
      clearTimeout(debounce)
      controller.abort()
    }
  }, [query])

  if (!query || query.length < 2) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      {isLoading ? (
        <div className="p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching...
        </div>
      ) : error ? (
        <Link
          href={`/products?search=${encodeURIComponent(query)}`}
          onClick={onSelect}
          className="flex flex-col items-center gap-2 p-4 text-sm hover:bg-accent"
        >
          <span className="text-muted-foreground">Search taking too long</span>
          <span className="text-primary">Click to see all results for "{query}"</span>
        </Link>
      ) : suggestions.length > 0 ? (
        <>
          <div className="p-2 text-xs text-muted-foreground border-b">
            Suggestions
          </div>
          {suggestions.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug.current}`}
              onClick={onSelect}
              className="flex items-center gap-3 p-3 hover:bg-accent transition-colors"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{product.name}</span>
            </Link>
          ))}
          <Link
            href={`/products?search=${encodeURIComponent(query)}`}
            onClick={onSelect}
            className="flex items-center justify-center gap-2 p-3 text-sm text-primary hover:bg-accent border-t"
          >
            See all results for "{query}"
          </Link>
        </>
      ) : (
        <div className="p-4 text-sm text-muted-foreground text-center">
          No suggestions found
        </div>
      )}
    </div>
  )
}
