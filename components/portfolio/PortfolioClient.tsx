'use client'

import { useState, useMemo } from 'react'
import type { Photo } from '@/types'
import { SERVICES } from '@/types'
import CategoryFilter from './CategoryFilter'
import MasonryGrid from './MasonryGrid'

interface PortfolioClientProps {
  photos: Photo[]
}

export default function PortfolioClient({ photos }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  // Derive available categories from actual photo data
  const availableCategories = useMemo(() => {
    const used = new Set(photos.map((p) => p.category).filter(Boolean))
    return SERVICES.filter((s) => used.has(s.value))
  }, [photos])

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? photos
        : photos.filter((p) => p.category === activeCategory),
    [photos, activeCategory]
  )

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
      {availableCategories.length > 0 && (
        <CategoryFilter
          categories={availableCategories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      )}

      {filtered.length > 0 ? (
        <MasonryGrid photos={filtered} />
      ) : (
        <p className="text-center text-parchment-600 font-sans py-24">
          Engar myndir í þessum flokki.
        </p>
      )}
    </div>
  )
}
