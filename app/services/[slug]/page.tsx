import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES } from '@/types'
import type { Photo } from '@/types'
import { getGalleriesWithPhotos } from '@/lib/sanity/queries'
import { getPricingForService } from '@/data/pricing'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ServicePageClient from '@/components/services/ServicePageClient'
import { SITE_NAME } from '@/lib/siteConfig'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.value }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.value === slug)
  if (!service) return {}

  return {
    title: service.label,
    description: service.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.label} | ${SITE_NAME}`,
      description: service.description,
    },
  }
}

export default async function ServiceSubPage({ params }: Props) {
  const { slug } = await params

  const service = SERVICES.find((s) => s.value === slug)
  if (!service) notFound()

  const galleries = await getGalleriesWithPhotos()
  const serviceGalleries = galleries.filter((g) => g.serviceCategory === service.value)
  const photos: Photo[] = serviceGalleries.flatMap((g) => g.photos ?? [])

  const pricing = getPricingForService(slug)

  return (
    <div className="min-h-screen">
      <PageHeader title={service.label} subtitle="Þjónusta" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">

        {/* ── Back link ─────────────────────────────────────────────── */}
        <AnimatedSection duration={0.8}>
          <div className="mb-10 -mt-4 flex items-center justify-between">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[11px] font-sans tracking-widest uppercase text-parchment-500 hover:text-parchment-800 transition-colors duration-200"
            >
              <span aria-hidden>←</span>
              Þjónusta
            </Link>
          </div>
        </AnimatedSection>

        {/* ── Description ───────────────────────────────────────────── */}
        {service.description && (
          <AnimatedSection delay={0.1}>
            <p className="max-w-xl font-sans text-base leading-relaxed text-parchment-700 mb-16">
              {service.description}
            </p>
          </AnimatedSection>
        )}

        {/* ── Tabs + photo wall + pricing modal (all client-side) ───── */}
        <ServicePageClient photos={photos} pricing={pricing} />

      </div>
    </div>
  )
}
