'use client'

import { useEffect, useState } from 'react'
import { RequestQuoteDialog } from './request-quote-dialog'

interface StickyMobileCTAProps {
  productName: string
}

export function StickyMobileCTA({ productName }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg md:hidden">
      <RequestQuoteDialog productName={productName} />
    </div>
  )
}
