import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGalleryBySlug, getAllGallerySlugs } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { SERVICES } from '@/types'
import { SITE_URL, SITE_NAME } from '@/lib/siteConfig'
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

  // Prefer Sanity SEO overrides, fall back to gallery content
  const title =
    gallery.seo?.seoTitle ??
    `${gallery.title}${serviceName ? ` – ${serviceName}` : ''}`

  const description =
    gallery.seo?.seoDescription ??
    gallery.description ??
    `${gallery.title}${serviceName ? ` — ${serviceName}` : ''} eftir Hlínu Guðmundsdóttur, ljósmyndara í Reykjavík.`

  const canonical = gallery.seo?.canonicalUrl ?? `${SITE_URL}/gallery/${slug}`

  // OG image: prefer seo.ogImage → coverImage — guard against missing asset
  const ogImageSource = gallery.seo?.ogImage?.asset
    ? gallery.seo.ogImage
    : gallery.coverImage?.asset
    ? gallery.coverImage
    : null

  const ogImageSrc = ogImageSource
    ? urlFor(ogImageSource).width(1200).height(630).fit('crop').auto('format').url()
    : null

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      type: 'website',
      ...(ogImageSrc && {
        images: [{ url: ogImageSrc, width: 1200, height: 630, alt: gallery.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      ...(ogImageSrc && { images: [ogImageSrc] }),
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
