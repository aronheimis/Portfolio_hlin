import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGalleryBySlug, getAllGallerySlugs } from '@/lib/sanity/queries'
import { SERVICES } from '@/types'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GalleryGrid from '@/components/gallery/GalleryGrid'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllGallerySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const gallery = await getGalleryBySlug(slug)

  if (!gallery) return {}

  const serviceName = SERVICES.find((s) => s.value === gallery.serviceCategory)?.label

  return {
    title: gallery.title,
    description:
      gallery.description ??
      `${gallery.title}${serviceName ? ` — ${serviceName}` : ''} eftir Hlínu Guðmundsdóttur.`,
    openGraph: {
      title: gallery.title,
      description: gallery.description,
      type: 'website',
    },
  }
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params
  const gallery = await getGalleryBySlug(slug)

  if (!gallery) notFound()

  const serviceName = SERVICES.find((s) => s.value === gallery.serviceCategory)?.label

  return (
    <div className="min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <AnimatedSection>
          <div className="mb-16">
            {serviceName && (
              <p className="text-xs font-sans tracking-ultra uppercase text-parchment-600 mb-4">
                {serviceName}
              </p>
            )}
            <h1 className="font-serif text-5xl md:text-6xl font-light tracking-wide text-parchment-900 mb-4">
              {gallery.title}
            </h1>

            {gallery.description && (
              <p className="max-w-xl font-sans text-base leading-relaxed text-parchment-700">
                {gallery.description}
              </p>
            )}
          </div>
        </AnimatedSection>

        {/* ── Photos ─────────────────────────────────────────────────── */}
        {gallery.photos && gallery.photos.length > 0 ? (
          <GalleryGrid photos={gallery.photos} />
        ) : (
          <AnimatedSection delay={0.2}>
            <p className="font-sans text-parchment-600 text-center py-24">
              Engar myndir í þessu safni enn sem komið er.
            </p>
          </AnimatedSection>
        )}

      </div>
    </div>
  )
}
