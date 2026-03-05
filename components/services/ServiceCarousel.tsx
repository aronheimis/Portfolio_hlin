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

export default function ServiceCarousel({ photos, serviceLabel }: ServiceCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateButtons = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const { scrollLeft, scrollWidth, clientWidth } = track
    setCanPrev(scrollLeft > 4)
    setCanNext(scrollLeft < scrollWidth - clientWidth - 4)
    const firstChild = track.children[0] as HTMLElement | undefined
    const itemWidth = firstChild ? firstChild.offsetWidth + 16 : 1 // 16 = gap-4
    setCurrent(Math.round(scrollLeft / itemWidth))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateButtons()
    track.addEventListener('scroll', updateButtons, { passive: true })
    window.addEventListener('resize', updateButtons)
    return () => {
      track.removeEventListener('scroll', updateButtons)
      window.removeEventListener('resize', updateButtons)
    }
  }, [updateButtons])

  const scroll = (dir: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) return
    const firstChild = track.children[0] as HTMLElement | undefined
    const itemWidth = firstChild ? firstChild.offsetWidth + 16 : 300
    track.scrollBy({ left: dir === 'next' ? itemWidth : -itemWidth, behavior: 'smooth' })
  }

  if (!photos.length) {
    return (
      <div className="h-80 flex items-center justify-center bg-parchment-100">
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
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="flex-none w-[78vw] sm:w-[44vw] lg:w-[28vw] snap-start"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-parchment-100">
              <Image
                src={urlFor(photo.image)
                  .width(900)
                  .height(1200)
                  .fit('crop')
                  .auto('format')
                  .url()}
                alt={photo.alt || photo.title || serviceLabel}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                placeholder={photo.lqip ? 'blur' : 'empty'}
                blurDataURL={photo.lqip}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 28vw"
              />
            </div>
            {photo.caption && (
              <p className="mt-2 text-xs font-sans text-parchment-500 leading-relaxed">
                {photo.caption}
              </p>
            )}
          </div>
        ))}
        {/* Trailing spacer so last card isn't flush to edge */}
        <div className="flex-none w-1" aria-hidden />
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
            className="absolute left-0 top-[38%] -translate-y-1/2 -translate-x-1 z-10
                       w-10 h-10 flex items-center justify-center
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
            className="absolute right-0 top-[38%] -translate-y-1/2 translate-x-1 z-10
                       w-10 h-10 flex items-center justify-center
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
        {/* Dot indicators (up to 10) */}
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
