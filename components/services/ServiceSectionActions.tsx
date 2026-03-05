'use client'

import { useState } from 'react'
import Link from 'next/link'
import PricingModal from './PricingModal'
import { getPricingForService } from '@/data/pricing'

interface ServiceSectionActionsProps {
  serviceSlug: string
}

export default function ServiceSectionActions({ serviceSlug }: ServiceSectionActionsProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const pricing = getPricingForService(serviceSlug)

  return (
    <>
      <div className="mt-7 flex items-center gap-5">
        <Link
          href={`/services/${serviceSlug}`}
          className="inline-flex items-center gap-3 text-xs font-sans tracking-widest uppercase text-parchment-700 hover:text-parchment-900 transition-colors duration-300 border-b border-parchment-300 hover:border-parchment-700 pb-0.5"
        >
          Sjá meira
          <span aria-hidden>→</span>
        </Link>

        {pricing && (
          <>
            <span className="text-parchment-200 select-none" aria-hidden>·</span>
            <button
              onClick={() => setModalOpen(true)}
              className="text-[10px] font-sans tracking-widest uppercase text-parchment-500 hover:text-parchment-900 border border-parchment-300 hover:border-parchment-600 px-3 py-1.5 transition-colors duration-200"
            >
              Verðskrá
            </button>
          </>
        )}
      </div>

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
