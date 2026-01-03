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
    <section className="bg-slate-50 border-y py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-4">
            {heading || 'Authorized Customer for Global Medical Leaders'}
          </h2>
          <p className="text-muted-foreground">
            We partner directly with the world&apos;s most trusted manufacturers to bring you genuine, high-quality medical equipment backed by full warranties.
          </p>
        </div>

        <div className="relative w-full overflow-hidden mb-12 py-4">
          <div className="flex w-max animate-[scroll_40s_linear_infinite] hover:paused gap-12 md:gap-24 items-center">
            {[...displayDistributors, ...displayDistributors].map((distributor, i) => (
              <div
                key={`${distributor._id}-${i}`}
                className="flex items-center justify-center shrink-0 w-32 md:w-40 relative opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                {distributor.logo?.asset?._ref ? (
                  <Image
                    src={urlFor(distributor.logo).width(160).height(80).url()}
                    alt={distributor.name}
                    width={160}
                    height={80}
                    className="max-h-12 w-auto object-contain"
                  />
                ) : (
                  <span className="text-lg font-semibold whitespace-nowrap">{distributor.name}</span>
                )}
              </div>
            ))}
          </div>
          {/* Gradient Edges for smooth fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-50 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-50 to-transparent"></div>
        </div>

        {/* Certifications / Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 border-t border-slate-200 pt-8">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs">✓</span>
               ISO 9001:2015 Certified
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs">✓</span>
               Authorized Distributor
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs">✓</span>
               FDA/CE Approved Products
            </div>
        </div>
      </div>
    </section>
  )
}
