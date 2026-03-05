'use client'

import { useState, useEffect, useRef } from 'react'
import type { ServiceCategory } from '@/types'

interface ServicesNavProps {
  services: ServiceCategory[]
}

export default function ServicesNav({ services }: ServicesNavProps) {
  const [active, setActive] = useState<string>(services[0]?.value ?? '')
  const navRef = useRef<HTMLDivElement>(null)

  // Highlight the section currently in view
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    services.forEach((service) => {
      const el = document.getElementById(service.value)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(service.value)
        },
        // Fire when section occupies the centre band of the viewport
        { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [services])

  // Scroll the active nav pill into view inside the nav bar
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const activeEl = nav.querySelector<HTMLAnchorElement>(
      `[data-nav="${active}"]`
    )
    if (activeEl) {
      activeEl.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' })
    }
  }, [active])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, value: string) => {
    e.preventDefault()
    const el = document.getElementById(value)
    if (!el) return

    // Measure the actual bottom edge of the sticky nav at click time so the
    // scroll offset is always exact regardless of nav height (1 or 2 rows).
    const navBottom = navRef.current?.getBoundingClientRect().bottom ?? 120
    const elTop = el.getBoundingClientRect().top
    const scrollTarget = window.scrollY + elTop - navBottom - 16 // 16px breathing room

    window.scrollTo({ top: scrollTarget, behavior: 'smooth' })
    setActive(value)
  }

  return (
    <div className="sticky top-20 z-40 bg-parchment-50/95 backdrop-blur-sm border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <nav
          ref={navRef}
          aria-label="Þjónustuflokkar"
          className="flex flex-nowrap overflow-x-auto md:flex-wrap md:overflow-x-visible gap-x-6 md:gap-x-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service) => (
            <a
              key={service.value}
              data-nav={service.value}
              href={`#${service.value}`}
              onClick={(e) => handleClick(e, service.value)}
              className={`
                flex-none py-4
                text-[11px] font-sans tracking-widest uppercase whitespace-nowrap
                border-b-[1.5px] transition-colors duration-300 outline-none
                ${
                  active === service.value
                    ? 'text-parchment-900 border-parchment-700'
                    : 'text-parchment-400 border-transparent hover:text-parchment-600 hover:border-parchment-300'
                }
              `}
            >
              {service.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
