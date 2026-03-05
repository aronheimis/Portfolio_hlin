'use client'

import { useState } from 'react'
import PhotosModal from './PhotosModal'
import type { Photo } from '@/types'

interface VerdskraServiceActionsProps {
  photos: Photo[]
  serviceTitle: string
  serviceSlug: string
}

export default function VerdskraServiceActions({
  photos,
  serviceTitle,
  serviceSlug,
}: VerdskraServiceActionsProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-3 text-xs font-sans tracking-widest uppercase text-parchment-600 hover:text-parchment-900 transition-colors duration-300 border-b border-parchment-300 hover:border-parchment-700 pb-0.5"
      >
        Skoða myndir
        <span aria-hidden>→</span>
      </button>

      <PhotosModal
        photos={photos}
        serviceTitle={serviceTitle}
        serviceSlug={serviceSlug}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
