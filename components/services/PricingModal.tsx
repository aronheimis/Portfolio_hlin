'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { ServicePricing } from '@/data/pricing'
import { formatPrice } from '@/data/pricing'

interface PricingModalProps {
  pricing: ServicePricing
  open: boolean
  onClose: () => void
}

export default function PricingModal({ pricing, open, onClose }: PricingModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // ESC to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Move focus into the panel when it opens
  useEffect(() => {
    if (open) {
      // Small delay lets the animation start before focus jumps
      const id = setTimeout(() => panelRef.current?.focus(), 60)
      return () => clearTimeout(id)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-parchment-900/55 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* ── Panel ───────────────────────────────────────────────── */}
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Verðskrá — ${pricing.title}`}
            tabIndex={-1}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="
              fixed inset-x-4 top-[8%] z-50 outline-none
              max-w-2xl mx-auto
              bg-parchment-50 border border-parchment-200 shadow-2xl
              max-h-[84vh] overflow-y-auto
            "
          >
            {/* Header */}
            <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-parchment-200">
              <div>
                <p className="text-[10px] font-sans tracking-ultra uppercase text-parchment-500 mb-1.5">
                  Verðskrá
                </p>
                <h2 className="font-serif text-2xl md:text-3xl font-light text-parchment-900">
                  {pricing.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Loka"
                className="mt-1 ml-6 flex-none text-parchment-400 hover:text-parchment-900 transition-colors duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Packages */}
            <div className="px-8 py-8 space-y-5">
              {pricing.packages.map((pkg, i) => (
                <div
                  key={i}
                  className="border border-parchment-200 p-6 hover:border-parchment-400 transition-colors duration-300"
                >
                  <div className="flex items-baseline justify-between mb-5">
                    <h3 className="font-serif text-xl font-light text-parchment-900">
                      {pkg.name}
                    </h3>
                    <span className="font-sans text-base text-parchment-900 tabular-nums">
                      {formatPrice(pkg.priceISK)}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {pkg.includes.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm font-sans text-parchment-700"
                      >
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-parchment-400 flex-none" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {pkg.notes && (
                    <p className="mt-4 pt-4 border-t border-parchment-100 text-xs font-sans text-parchment-500">
                      {pkg.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="px-8 pb-8 flex items-center justify-between">
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-3 text-xs font-sans tracking-widest uppercase text-parchment-700 hover:text-parchment-900 transition-colors duration-300 border-b border-parchment-300 hover:border-parchment-700 pb-0.5"
              >
                Hafa samband
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/verdskra"
                onClick={onClose}
                className="text-xs font-sans tracking-widest uppercase text-parchment-400 hover:text-parchment-700 transition-colors duration-200"
              >
                Sjá allt verðlag
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
