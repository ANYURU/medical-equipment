'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

export function Logo() {
  const [siteName, setSiteName] = useState("Gombaland Medical Supplies")
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => {
        if (data.siteName) setSiteName(data.siteName)
        if (data.logo?.asset?.url) setLogoUrl(data.logo.asset.url)
      })
      .catch(() => {})
  }, [])

  const [firstWord, ...rest] = siteName.split(" ")
  const subtitle = rest.join(" ") || "Medical Supplies"

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="flex items-center">
        {logoUrl ? (
          <div className="relative h-10 w-10">
            <Image
              src={logoUrl}
              alt={siteName}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="relative h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
            <svg
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </div>
        )}
        <div className="ml-3">
          <div className="text-xl font-bold leading-none text-foreground uppercase tracking-wide">
            {firstWord}
          </div>
          <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">
            {subtitle}
          </div>
        </div>
      </div>
    </Link>
  )
}
