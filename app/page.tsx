import { getFeaturedPhotos, getSiteSettings, getAllGalleries } from '@/lib/sanity/queries'
import HeroSlider from '@/components/home/HeroSlider'
import ServicesPreview from '@/components/home/ServicesPreview'
import { SERVICES } from '@/types'

export default async function HomePage() {
  const [featuredPhotos, settings, galleries] = await Promise.all([
    getFeaturedPhotos(),
    getSiteSettings(),
    getAllGalleries(),
  ])

  return (
    <>
      <HeroSlider
        photos={featuredPhotos}
        name={settings?.siteTitle ?? 'Hlín Guðmundsdóttir'}
        tagline={settings?.tagline ?? 'Ljósmyndari · Reykjavík, Ísland'}
      />
      <ServicesPreview services={SERVICES} galleries={galleries} />
    </>
  )
}
