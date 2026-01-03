'use client'

import {useEffect, useRef, useState} from 'react'

interface Stat {
  value: number
  suffix?: string
  label: string
}

const stats: Stat[] = [
  {value: 13, suffix: '+', label: 'Years of Excellence'},
  {value: 50, suffix: '+', label: 'Dedicated Employees'},
  {value: 98, suffix: '%', label: 'Client Satisfaction'},
  {value: 1000, suffix: '+', label: 'Happy Clients'},
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

function StatCard({stat}: {stat: Stat}) {
  const {count, ref} = useCountUp(stat.value)

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-blue-600 md:text-5xl">
        {count}
        {stat.suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground md:text-base">{stat.label}</div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="border-y bg-muted/30 py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold md:mb-12 md:text-3xl">
            Why Choose Medequip Uganda
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
