/**
 * Single source of truth for all service pricing.
 * Both /verdskra and individual service subpage modals read from here.
 * Replace demo content with real data when ready (or swap for Sanity/Excel import).
 */

import type { ServiceCategoryValue } from '@/types'

export interface PricingPackage {
  name: string
  priceISK: number
  includes: string[]
  /** Delivery time, session duration, etc. */
  notes?: string
}

export interface ServicePricing {
  slug: ServiceCategoryValue
  title: string
  packages: PricingPackage[]
}

export const PRICING: ServicePricing[] = [
  {
    slug: 'fjolskyldurmyndir',
    title: 'Fjölskyldumyndataka',
    packages: [
      {
        name: 'Mini',
        priceISK: 29900,
        includes: [
          '30 mín myndataka',
          '10 fullunnar myndir',
          '1 staðsetning',
        ],
        notes: 'Myndir afhentar innan 2 vikna',
      },
      {
        name: 'Standard',
        priceISK: 49900,
        includes: [
          '60 mín myndataka',
          '25 fullunnar myndir',
          '1–2 staðsetningar',
        ],
        notes: 'Myndir afhentar innan 2 vikna',
      },
      {
        name: 'Premium',
        priceISK: 79900,
        includes: [
          '90 mín myndataka',
          '40 fullunnar myndir',
          '2 staðsetningar',
          'Forgangsafgreiðsla',
        ],
        notes: 'Myndir afhentar innan 1 viku',
      },
    ],
  },
  {
    slug: 'brudkaup',
    title: 'Brúðkaupsmyndataka',
    packages: [
      {
        name: 'Ceremony',
        priceISK: 149900,
        includes: [
          'Athöfn og hópmyndir',
          '80–120 fullunnar myndir',
        ],
        notes: 'Allt að 3 klst nærvera',
      },
      {
        name: 'Half-day',
        priceISK: 249900,
        includes: [
          '4 klst nærvera',
          '250–350 fullunnar myndir',
        ],
        notes: 'Frá undirbúningi til kvöldmatar',
      },
      {
        name: 'Full-day',
        priceISK: 399900,
        includes: [
          '8–10 klst nærvera',
          '500+ fullunnar myndir',
          'Stutt highlight album',
        ],
        notes: 'Allt frá morgunundirbúningi til danssins',
      },
    ],
  },
]

export function getPricingForService(slug: string): ServicePricing | undefined {
  return PRICING.find((p) => p.slug === slug)
}

export function formatPrice(priceISK: number): string {
  return priceISK.toLocaleString('is-IS') + ' kr.'
}
