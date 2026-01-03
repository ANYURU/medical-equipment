'use client'

import { useEffect, useState } from 'react'

export function useScroll(threshold: number = 10) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > threshold
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    // Check on mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled, threshold])

  return scrolled
}
