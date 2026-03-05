import type { Metadata } from 'next'
import { getFeaturedPhotos, getSiteSettings, getAllGalleries } from '@/lib/sanity/queries'
import HeroSlider from '@/components/home/HeroSlider'
import ServicesPreview from '@/components/home/ServicesPreview'
import JsonLd from '@/components/JsonLd'
import { buildPhotographerJsonLd } from '@/lib/seo'
import { SERVICES } from '@/types'
import { SITE_URL, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '@/lib/siteConfig'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  const description = settings?.description ?? DEFAULT_DESCRIPTION

  return {
    title: DEFAULT_TITLE,
    description,
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: DEFAULT_TITLE,
      description,
      url: SITE_URL,
      type: 'website',
    },
    twitter: {
      title: DEFAULT_TITLE,
      description,
    },
  }
}

export default async function HomePage() {
  const [featuredPhotos, settings, galleries] = await Promise.all([
    getFeaturedPhotos(),
    getSiteSettings(),
    getAllGalleries(),
  ])

  const jsonLd = buildPhotographerJsonLd({
    instagramUrl: settings?.instagramUrl,
    description: settings?.description,
  })

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroSlider
        photos={featuredPhotos}
        name={settings?.siteTitle ?? 'Hlín Guðmundsdóttir'}
        tagline={settings?.tagline ?? 'Ljósmyndari · Reykjavík, Ísland'}
      />
      <ServicesPreview services={SERVICES} galleries={galleries} />
    </>
  )
}
