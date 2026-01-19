'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageGalleryProps {
  images: any[]
  productName: string
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  if (!images || images.length === 0) return null

  const selectedImage = images[selectedIndex]
  const showNavigation = images.length > 1

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showNavigation) return
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showNavigation, isLightboxOpen])

  // Auto-scroll selected thumbnail into view
  useEffect(() => {
    thumbnailRefs.current[selectedIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    })
  }, [selectedIndex])

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted group">
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="relative w-full h-full cursor-zoom-in"
          >
            <Image
              src={urlFor(selectedImage).width(800).height(800).url()}
              alt={selectedImage.alt || `${productName} ${selectedIndex + 1}`}
              fill
              className="object-cover"
              priority={selectedIndex === 0}
            />
            
            {/* Zoom hint */}
            <div className="absolute top-4 right-4 rounded-full bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="h-4 w-4 text-white" />
            </div>
          </button>
          
          {/* Navigation Arrows */}
          {showNavigation && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={goToNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {showNavigation && (
            <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails Grid */}
        {showNavigation && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-50 overflow-y-auto p-1">
            {images.map((image: any, index: number) => (
              <button
                key={index}
                ref={(el) => { thumbnailRefs.current[index] = el }}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-lg bg-muted transition-all cursor-pointer',
                  selectedIndex === index
                    ? 'ring-2 ring-blue-600 ring-offset-2'
                    : 'opacity-60 hover:opacity-100'
                )}
              >
                <Image
                  src={urlFor(image).width(200).height(200).url()}
                  alt={image.alt || `${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 cursor-pointer"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation */}
          {showNavigation && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 cursor-pointer"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 cursor-pointer"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          {/* Main lightbox image */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={urlFor(selectedImage).width(1920).height(1920).url()}
              alt={selectedImage.alt || `${productName} ${selectedIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Counter */}
          {showNavigation && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/20 px-4 py-2 text-sm text-white">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  )
}
