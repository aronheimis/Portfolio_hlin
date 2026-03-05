'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { SiteSettings } from '@/types'

const NAV_LINKS = [
  { href: '/portfolio', label: 'Ljósmyndir' },
  { href: '/services', label: 'Þjónusta' },
  { href: '/about', label: 'Um mig' },
  { href: '/contact', label: 'Hafa samband' },
]

interface HeaderProps {
  settings: SiteSettings | null
}

export default function Header({ settings }: HeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const headerBg = isHome
    ? scrolled
      ? 'bg-parchment-50/95 backdrop-blur-sm shadow-sm'
      : 'bg-transparent'
    : 'bg-parchment-50/95 backdrop-blur-sm border-b border-parchment-200'

  const textColor = isHome && !scrolled ? 'text-white' : 'text-parchment-900'
  const logoColor = isHome && !scrolled ? 'text-white' : 'text-parchment-900'
  const burgerColor = isHome && !scrolled ? 'bg-white' : 'bg-parchment-900'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className={`font-serif text-lg tracking-[0.15em] uppercase transition-colors duration-300 ${logoColor}`}
        >
          {settings?.siteTitle ?? 'Hlín Guðmundsdóttir'}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`text-xs font-sans tracking-widest uppercase transition-colors duration-300 ${
                  active
                    ? `${textColor} border-b border-current pb-0.5`
                    : `${textColor} opacity-70 hover:opacity-100`
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Loka valmynd' : 'Opna valmynd'}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
        >
          <span
            className={`block w-6 h-px transition-all duration-300 ${burgerColor} ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${burgerColor} ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${burgerColor} ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden bg-parchment-50 border-t border-parchment-200"
          >
            <nav className="flex flex-col px-6 py-6 gap-6">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`font-serif text-2xl font-light transition-colors duration-200 ${
                      active ? 'text-parchment-900' : 'text-parchment-600 hover:text-parchment-900'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
