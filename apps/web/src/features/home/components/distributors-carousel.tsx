'use client'

import Image from 'next/image'
import {urlFor} from '@/lib/sanity'
import type {Distributor} from '@/types/sanity'

interface DistributorsCarouselProps {
  heading?: string
  distributors?: Distributor[]
}

const defaultDistributors: Distributor[] = [
  {_id: '1', _type: 'distributor', name: 'Medtronic', logo: {asset: {_ref: '', _type: 'reference'}}, order: 0},
  {_id: '2', _type: 'distributor', name: 'GE Healthcare', logo: {asset: {_ref: '', _type: 'reference'}}, order: 1},
  {_id: '3', _type: 'distributor', name: 'Philips Healthcare', logo: {asset: {_ref: '', _type: 'reference'}}, order: 2},
  {_id: '4', _type: 'distributor', name: 'Siemens Healthineers', logo: {asset: {_ref: '', _type: 'reference'}}, order: 3},
  {_id: '5', _type: 'distributor', name: 'Mindray', logo: {asset: {_ref: '', _type: 'reference'}}, order: 4},
  {_id: '6', _type: 'distributor', name: 'Dräger', logo: {asset: {_ref: '', _type: 'reference'}}, order: 5},
  {_id: '7', _type: 'distributor', name: 'Stryker', logo: {asset: {_ref: '', _type: 'reference'}}, order: 6},
  {_id: '8', _type: 'distributor', name: 'B. Braun', logo: {asset: {_ref: '', _type: 'reference'}}, order: 7},
]

export function DistributorsCarousel({heading, distributors}: DistributorsCarouselProps) {
  const displayDistributors = distributors && distributors.length > 0 ? distributors.sort((a, b) => (a.order || 0) - (b.order || 0)) : defaultDistributors
  return (
    <section className="overflow-hidden border-y bg-background py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <h2 className="mb-6 text-center text-xl font-semibold text-muted-foreground md:mb-8 md:text-2xl">
          {heading || 'Authorized Distributors of Leading Brands'}
        </h2>
        <div className="relative">
          <div className="flex gap-8 md:gap-12 animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused]">
            {[...displayDistributors, ...displayDistributors].map((distributor, i) => (
              <div
                key={`${distributor._id}-${i}`}
                className="flex min-w-37.5 items-center justify-center rounded-lg border bg-card px-6 py-4 transition-colors hover:bg-accent md:min-w-50 md:px-8 md:py-6"
              >
                {distributor.logo?.asset?._ref ? (
                  <Image
                    src={urlFor(distributor.logo).width(120).height(60).url()}
                    alt={distributor.name}
                    width={120}
                    height={60}
                    className="h-auto w-auto max-h-12 max-w-30 object-contain grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100"
                  />
                ) : (
                  <span className="whitespace-nowrap text-sm font-medium md:text-base">
                    {distributor.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
