'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { Photo } from '@/types'

interface HeroSliderProps {
  photos: Photo[]
  name: string
  tagline: string
}

const INTERVAL_MS = 5500

export default function HeroSlider({ photos, name, tagline }: HeroSliderProps) {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % Math.max(photos.length, 1))
  }, [photos.length])

  useEffect(() => {
    if (photos.length <= 1) return
    const id = setInterval(advance, INTERVAL_MS)
    return () => clearInterval(id)
  }, [advance, photos.length])

  // Trigger entrance animation after mount
  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(id)
  }, [])

  const photo = photos[current]

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden"
      aria-label="Forsíðumyndir"
    >
      {/* ── Background images ─────────────────────────────────────────── */}
      <AnimatePresence>
        {photo ? (
          <motion.div
            key={photo._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={urlFor(photo.image).width(1920).height(1080).fit('crop').auto('format').url()}
              alt={photo.alt}
              fill
              priority={current === 0}
              className="object-cover"
              placeholder={photo.lqip ? 'blur' : 'empty'}
              blurDataURL={photo.lqip}
              sizes="100vw"
            />
            {/* Gradient overlay — warm earthy tint */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950/25 via-amber-900/10 to-amber-950/45" />
          </motion.div>
        ) : (
          /* Placeholder when no photos are in Sanity yet */
          <div className="absolute inset-0 bg-parchment-800" />
        )}
      </AnimatePresence>

      {/* ── Text content ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-white text-5xl sm:text-7xl md:text-8xl font-light tracking-wide"
        >
          {name}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={loaded ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-px bg-white/50 my-6 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/75 text-xs font-sans tracking-widest uppercase"
        >
          {tagline}
        </motion.p>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="text-white/50 text-[10px] font-sans tracking-ultra uppercase">
          Skoda
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>

      {/* ── Slide indicators ──────────────────────────────────────────── */}
      {photos.length > 1 && (
        <div
          className="absolute bottom-10 right-8 flex gap-2"
          role="tablist"
          aria-label="Myndir"
        >
          {photos.map((p, i) => (
            <button
              key={p._id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Mynd ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current
                  ? 'w-6 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
