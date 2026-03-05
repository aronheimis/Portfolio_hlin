import type { MetadataRoute } from 'next'
import { getAllGallerySlugs } from '@/lib/sanity/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hlin.is'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const gallerySlugs = await getAllGallerySlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ]

  const galleryRoutes: MetadataRoute.Sitemap = gallerySlugs.map((slug) => ({
    url: `${BASE_URL}/gallery/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...galleryRoutes]
}
