'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import type { Photo } from '@/types'

interface PhotosModalProps {
  photos: Photo[]
  serviceTitle: string
  serviceSlug: string
  open: boolean
  onClose: () => void
}

export default function PhotosModal({
  photos,
  serviceTitle,
  serviceSlug,
  open,
  onClose,
}: PhotosModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // ESC to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Focus panel on open
  useEffect(() => {
    if (open) {
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
            aria-label={serviceTitle}
            tabIndex={-1}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="
              fixed inset-x-4 top-[5%] z-50 outline-none
              max-w-4xl mx-auto
              bg-parchment-50 border border-parchment-200 shadow-2xl
              max-h-[90vh] flex flex-col
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-parchment-200 flex-none">
              <div>
                <p className="text-[10px] font-sans tracking-ultra uppercase text-parchment-500 mb-1">
                  Myndir
                </p>
                <h2 className="font-serif text-xl md:text-2xl font-light text-parchment-900">
                  {serviceTitle}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Loka"
                className="ml-6 flex-none text-parchment-400 hover:text-parchment-900 transition-colors duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable photo grid */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8">
              {photos.length > 0 ? (
                <div className="columns-2 md:columns-3 gap-3 md:gap-4">
                  {photos.map((photo, i) => (
                    <motion.div
                      key={photo._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min(i * 0.05, 0.4),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="mb-3 md:mb-4 break-inside-avoid overflow-hidden bg-parchment-100 group"
                    >
                      <Image
                        src={urlFor(photo.image).width(700).auto('format').url()}
                        alt={photo.alt || photo.title || serviceTitle}
                        width={700}
                        height={0}
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                        placeholder={photo.lqip ? 'blur' : 'empty'}
                        blurDataURL={photo.lqip}
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center">
                  <p className="text-parchment-400 text-xs font-sans tracking-widest uppercase">
                    Myndir bráðum
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-t border-parchment-200 flex-none bg-parchment-50">
              <Link
                href={`/services/${serviceSlug}`}
                onClick={onClose}
                className="inline-flex items-center gap-3 text-xs font-sans tracking-widest uppercase text-parchment-700 hover:text-parchment-900 transition-colors duration-300 border-b border-parchment-300 hover:border-parchment-700 pb-0.5"
              >
                Sjá allt safn
                <span aria-hidden>→</span>
              </Link>
              <button
                onClick={onClose}
                className="text-xs font-sans tracking-widest uppercase text-parchment-400 hover:text-parchment-700 transition-colors duration-200"
              >
                Loka
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
