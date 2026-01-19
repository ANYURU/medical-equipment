'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

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

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.slice(0, 10).map((image: any, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square overflow-hidden rounded border-2 bg-muted transition-all cursor-pointer ${
                selectedIndex === index
                  ? 'border-blue-600 ring-2 ring-blue-600 ring-offset-2'
                  : 'border-transparent hover:border-gray-300'
              }`}
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
