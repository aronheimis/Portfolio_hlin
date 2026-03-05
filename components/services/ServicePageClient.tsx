'use client'

import { useState } from 'react'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import PricingModal from './PricingModal'
import type { Photo } from '@/types'
import type { ServicePricing } from '@/data/pricing'

interface ServicePageClientProps {
  photos: Photo[]
  pricing?: ServicePricing
}

export default function ServicePageClient({ photos, pricing }: ServicePageClientProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      {/* ── Tab bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-8 border-b border-parchment-200 mb-16">
        {/* "Myndir" — always the active view */}
        <span
          className="
            py-3 -mb-px
            text-[11px] font-sans tracking-widest uppercase
            text-parchment-900 border-b-[1.5px] border-parchment-700
          "
        >
          Myndir
        </span>

        {/* "Verð" — opens the pricing modal */}
        {pricing && (
          <button
            onClick={() => setModalOpen(true)}
            className="
              py-3 -mb-px
              text-[11px] font-sans tracking-widest uppercase
              text-parchment-400 border-b-[1.5px] border-transparent
              hover:text-parchment-700 transition-colors duration-200
            "
          >
            Verð
          </button>
        )}
      </div>

      {/* ── Photo wall ──────────────────────────────────────────────── */}
      {photos.length > 0 ? (
        <GalleryGrid photos={photos} />
      ) : (
        <div className="py-40 flex flex-col items-center gap-4">
          <p className="text-parchment-400 text-xs font-sans tracking-widest uppercase">
            Myndir bráðum
          </p>
        </div>
      )}

      {/* ── Pricing modal ───────────────────────────────────────────── */}
      {pricing && (
        <PricingModal
          pricing={pricing}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
