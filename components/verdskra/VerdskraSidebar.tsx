'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export interface SidebarService {
  slug: string
  title: string
}

interface VerdskraSidebarProps {
  services: SidebarService[]
}

/** Walk the offsetParent chain to get a stable absolute document top.
 *  Same technique used in ServicesNav — immune to in-progress smooth scroll. */
function getDocumentTop(el: HTMLElement): number {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

export default function VerdskraSidebar({ services }: VerdskraSidebarProps) {
  const [active, setActive] = useState<string>(services[0]?.slug ?? '')
  const mobileNavRef = useRef<HTMLElement>(null)

  // ── Active section detection ─────────────────────────────────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    services.forEach((service) => {
      const el = document.getElementById(service.slug)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(service.slug)
        },
        // Section is "active" when it occupies the upper-centre band of the viewport
        { rootMargin: '-15% 0px -60% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [services])

  // ── Scroll active mobile pill into view ──────────────────────────────────
  useEffect(() => {
    const nav = mobileNavRef.current
    if (!nav) return
    const activeEl = nav.querySelector<HTMLElement>(`[data-nav="${active}"]`)
    if (activeEl) {
      activeEl.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' })
    }
  }, [active])

  // ── Click: smooth scroll with header offset ──────────────────────────────
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault()
    const el = document.getElementById(slug)
    if (!el) return
    const headerH = document.querySelector('header')?.offsetHeight ?? 80
    window.scrollTo({ top: getDocumentTop(el) - headerH - 24, behavior: 'smooth' })
    setActive(slug)
  }

  return (
    <>
      {/* ── Mobile: horizontal scrollable pills ─────────────────────────── */}
      <nav
        ref={mobileNavRef}
        aria-label="Hoppa á þjónustu"
        className="lg:hidden flex flex-nowrap overflow-x-auto gap-2 mb-12 -mx-1 px-1 pb-0.5"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service) => {
          const isActive = active === service.slug
          return (
            <a
              key={service.slug}
              data-nav={service.slug}
              href={`#${service.slug}`}
              onClick={(e) => handleClick(e, service.slug)}
              aria-current={isActive ? 'true' : undefined}
              className={`
                flex-none whitespace-nowrap
                text-[11px] font-sans tracking-widest uppercase
                px-4 py-2 border transition-colors duration-500
                outline-none focus-visible:ring-2 focus-visible:ring-parchment-700 focus-visible:ring-offset-1
                ${isActive
                  ? 'border-parchment-700 text-parchment-900 bg-parchment-100'
                  : 'border-parchment-200 text-parchment-500 hover:border-parchment-400 hover:text-parchment-700'
                }
              `}
            >
              {service.title}
            </a>
          )
        })}
      </nav>

      {/* ── Desktop: sticky left sidebar ────────────────────────────────── */}
      {/*                                                                    */}
      {/* WHY sticky is on <aside> and NOT on the inner <nav>:              */}
      {/*   The parent flex container uses `items-start`, which means the   */}
      {/*   aside's height equals its content (~2 links).                   */}
      {/*   Putting `sticky` on a child of that short aside gives it zero   */}
      {/*   sticking room — it can't scroll within its own parent.           */}
      {/*                                                                    */}
      {/*   Putting `sticky` on the <aside> itself (a flex child) means it  */}
      {/*   sticks within the FLEX CONTAINER's bounds — which is as tall as */}
      {/*   the main content column. This gives it the full page height to  */}
      {/*   stick through, which is exactly what we want.                   */}
      <motion.aside
        aria-label="Þjónustuflokkar"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="hidden lg:block w-48 flex-none sticky top-[104px] self-start"
      >
        <nav aria-label="Þjónustuflokkar" className="space-y-0">

          {/* Label */}
          <p className="text-[10px] font-sans tracking-[0.35em] uppercase text-parchment-300 mb-6 pl-4">
            Þjónusta
          </p>

          {/* Service links — left border acts as a continuous track,
              color transitions between inactive/active states          */}
          {services.map((service) => {
            const isActive = active === service.slug
            return (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                onClick={(e) => handleClick(e, service.slug)}
                aria-current={isActive ? 'true' : undefined}
                className={`
                  block py-3 pl-4 pr-2 font-sans text-sm
                  border-l-[1.5px]
                  transition-[color,border-color] duration-500 ease-out
                  outline-none focus-visible:ring-2 focus-visible:ring-parchment-700 focus-visible:ring-offset-2
                  ${isActive
                    ? 'border-parchment-800 text-parchment-900'
                    : 'border-parchment-100 text-parchment-400 hover:border-parchment-300 hover:text-parchment-700'
                  }
                `}
              >
                {service.title}
              </a>
            )
          })}
        </nav>
      </motion.aside>
    </>
  )
}
