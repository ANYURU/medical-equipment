'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  images: any[]
  productName: string
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) return null

  const selectedImage = images[selectedIndex]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={urlFor(selectedImage).width(800).height(800).url()}
          alt={selectedImage.alt || `${productName} ${selectedIndex + 1}`}
          fill
          className="object-cover"
          priority={selectedIndex === 0}
        />
      </div>

      {/* Thumbnails - Single scrollable row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-1 px-1">
          {images.map((image: any, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted transition-all cursor-pointer',
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
  )
}
