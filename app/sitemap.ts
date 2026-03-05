import type { MetadataRoute } from 'next'
import { getAllGallerySlugs } from '@/lib/sanity/queries'
import { SITE_URL } from '@/lib/siteConfig'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const gallerySlugs = await getAllGallerySlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 1   },
    { url: `${SITE_URL}/services`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`,       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
  ]

  const galleryRoutes: MetadataRoute.Sitemap = gallerySlugs.map((slug) => ({
    url: `${SITE_URL}/gallery/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...galleryRoutes]
}
