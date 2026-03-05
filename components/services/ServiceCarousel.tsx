'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/lib/sanity/image'
import type { Photo } from '@/types'

interface ServiceCarouselProps {
  photos: Photo[]
  serviceLabel: string
}

function getDisplayHeight() {
  if (typeof window === 'undefined') return 520
  if (window.innerWidth < 640) return 260
  if (window.innerWidth < 1024) return 380
  return 520
}

export default function ServiceCarousel({ photos, serviceLabel }: ServiceCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [displayHeight, setDisplayHeight] = useState(520)

  const updateState = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const { scrollLeft, scrollWidth, clientWidth } = track
    setCanPrev(scrollLeft > 4)
    setCanNext(scrollLeft < scrollWidth - clientWidth - 4)
    // Approximate current index using first child width
    const firstChild = track.children[0] as HTMLElement | undefined
    const itemWidth = firstChild ? firstChild.offsetWidth + 16 : 1
    setCurrent(Math.round(scrollLeft / itemWidth))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onResize = () => {
      setDisplayHeight(getDisplayHeight())
      updateState()
    }
    onResize()
    track.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      track.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', onResize)
    }
  }, [updateState])

  const scroll = (dir: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) return
    const firstChild = track.children[0] as HTMLElement | undefined
    const itemWidth = firstChild ? firstChild.offsetWidth + 16 : 300
    track.scrollBy({ left: dir === 'next' ? itemWidth : -itemWidth, behavior: 'smooth' })
  }

  if (!photos.length) {
    return (
      <div className="h-80 flex items-center justify-center">
        <p className="text-parchment-400 text-xs font-sans tracking-widest uppercase">
          Myndir bráðum
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {photos.map((photo) => {
          // Use real aspect ratio from Sanity metadata; fall back to 3:4 portrait
          const ratio = photo.dimensions?.aspectRatio ?? 0.75
          const displayWidth = Math.round(displayHeight * ratio)

          return (
            <div key={photo._id} className="flex-none snap-start">
              <Image
                src={urlFor(photo.image)
                  .height(displayHeight * 2)
                  .auto('format')
                  .url()}
                alt={photo.alt || photo.title || serviceLabel}
                width={displayWidth}
                height={displayHeight}
                className="block"
                style={{ height: displayHeight, width: displayWidth }}
                placeholder={photo.lqip ? 'blur' : 'empty'}
                blurDataURL={photo.lqip}
              />
              {photo.caption && (
                <p className="mt-2 text-xs font-sans text-parchment-500 leading-relaxed" style={{ width: displayWidth }}>
                  {photo.caption}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Prev arrow */}
      <AnimatePresence>
        {canPrev && (
          <motion.button
            key="prev"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.2 }}
            onClick={() => scroll('prev')}
            aria-label="Fyrri mynd"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10
                       w-10 h-10 items-center justify-center
                       bg-parchment-50/90 backdrop-blur-sm border border-parchment-200
                       text-parchment-800 hover:bg-parchment-50 transition-colors duration-200
                       shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Next arrow */}
      <AnimatePresence>
        {canNext && (
          <motion.button
            key="next"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.2 }}
            onClick={() => scroll('next')}
            aria-label="Næsta mynd"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10
                       w-10 h-10 items-center justify-center
                       bg-parchment-50/90 backdrop-blur-sm border border-parchment-200
                       text-parchment-800 hover:bg-parchment-50 transition-colors duration-200
                       shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Counter */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          {photos.slice(0, 10).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const track = trackRef.current
                if (!track) return
                const firstChild = track.children[0] as HTMLElement | undefined
                const itemWidth = firstChild ? firstChild.offsetWidth + 16 : 300
                track.scrollTo({ left: i * itemWidth, behavior: 'smooth' })
              }}
              aria-label={`Fara í mynd ${i + 1}`}
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-5 h-[3px] bg-parchment-700'
                  : 'w-[3px] h-[3px] bg-parchment-300 hover:bg-parchment-500'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-sans text-parchment-400 tabular-nums">
          {current + 1} / {photos.length}
        </span>
      </div>
    </div>
  )
}
