'use client'

import {useEffect, useRef, useState} from 'react'
import type {Stat} from '@/types/sanity'

interface StatsSectionProps {
  heading?: string
  stats?: Stat[]
}

const defaultStats: Stat[] = [
  {_id: '1', _type: 'stat', value: 500, suffix: '+', label: 'Facilities Served', order: 0},
  {_id: '2', _type: 'stat', value: 50, suffix: '+', label: 'Global Brands', order: 1},
  {_id: '3', _type: 'stat', value: 15, suffix: '+', label: 'Years Experience', order: 2},
  {_id: '4', _type: 'stat', value: 24, suffix: '/7', label: 'Support Available', order: 3},
]

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {threshold: 0.3}
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [isVisible, end, duration])

  return {count, ref}
}

function StatCard({stat, className}: {stat: Stat; className?: string}) {
  const {count, ref} = useCountUp(stat.value)

  return (
    <div ref={ref} className={`text-center ${className || ''}`}>
      <div className="text-4xl font-bold text-blue-400 md:text-5xl mb-2 tracking-tight">
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm font-medium text-slate-300 md:text-base uppercase tracking-wider">{stat.label}</div>
    </div>
  )
}

export function StatsSection({heading, stats}: StatsSectionProps) {
  const displayStats = stats && stats.length > 0 ? stats.sort((a, b) => (a.order || 0) - (b.order || 0)) : defaultStats

  return (
    <section className="bg-slate-900 border-y py-12 md:py-16 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-800/50">
            {displayStats.map((stat, i) => (
              <StatCard key={stat._id} stat={stat} className={i % 2 !== 0 ? 'pl-4 md:pl-0' : ''} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
