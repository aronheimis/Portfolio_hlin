'use client'

import { useState, useEffect, useRef } from 'react'
import type { ServiceCategory } from '@/types'

/** Walk the offsetParent chain to get an element's distance from the page top.
 *  Unlike getBoundingClientRect, this is unaffected by scroll position or
 *  any smooth-scroll animation currently in progress. */
function getDocumentTop(el: HTMLElement): number {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

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

    // Use absolute document positions (walk the offsetParent chain) so the
    // calculation is unaffected by any smooth-scroll animation already in progress.
    const elDocTop = getDocumentTop(el)

    // Fixed header height + sticky nav height (works for 1-row or 2-row nav).
    const headerH = document.querySelector('header')?.offsetHeight ?? 80
    const navH = navRef.current?.offsetHeight ?? 52

    window.scrollTo({ top: elDocTop - headerH - navH - 16, behavior: 'smooth' })
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
