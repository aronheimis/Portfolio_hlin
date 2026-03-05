import { client } from './client'
import type { Photo, Gallery, SiteSettings } from '@/types'

// ─── Image fragment ──────────────────────────────────────────────────────────

const IMAGE_FIELDS = `
  asset,
  hotspot,
  crop,
`

// ─── Helper — returns null/empty gracefully when Sanity isn't configured ──────

const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: object = {}
): Promise<T | null> {
  if (!isSanityConfigured) return null
  try {
    return await client.fetch<T>(query, params, options)
  } catch {
    return null
  }
}

// ─── Site settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safeFetch(
    `*[_type == "siteSettings"][0]{
      _id,
      siteTitle,
      tagline,
      description,
      contactEmail,
      instagramUrl,
      facebookUrl,
      behanceUrl,
      aboutShort,
      aboutLong,
      "aboutImageLqip": aboutImage.asset->metadata.lqip,
      aboutImage { ${IMAGE_FIELDS} },
      ogImage { ${IMAGE_FIELDS} },
    }`,
    {},
    { next: { tags: ['siteSettings'] } }
  )
}

// ─── Hero / featured photos ───────────────────────────────────────────────────

export async function getFeaturedPhotos(): Promise<Photo[]> {
  const result = await safeFetch<Photo[]>(
    `*[_type == "photo" && featured == true] | order(order asc) {
      _id,
      title,
      slug,
      image { ${IMAGE_FIELDS} },
      "lqip": image.asset->metadata.lqip,
      alt,
      caption,
    }`,
    {},
    { next: { tags: ['photo'] } }
  )
  return result ?? []
}

// ─── Portfolio photos ─────────────────────────────────────────────────────────

export async function getPortfolioPhotos(): Promise<Photo[]> {
  const result = await safeFetch<Photo[]>(
    `*[_type == "photo" && showInPortfolio == true] | order(order asc, _createdAt desc) {
      _id,
      title,
      slug,
      image { ${IMAGE_FIELDS} },
      "lqip": image.asset->metadata.lqip,
      alt,
      caption,
      category,
      tags,
    }`,
    {},
    { next: { tags: ['photo'] } }
  )
  return result ?? []
}

// ─── Galleries ────────────────────────────────────────────────────────────────

export async function getAllGalleries(): Promise<Gallery[]> {
  const result = await safeFetch<Gallery[]>(
    `*[_type == "gallery"] | order(order asc, publishedAt desc) {
      _id,
      title,
      slug,
      coverImage { ${IMAGE_FIELDS} },
      "coverLqip": coverImage.asset->metadata.lqip,
      description,
      serviceCategory,
      publishedAt,
      featured,
      order,
    }`,
    {},
    { next: { tags: ['gallery'] } }
  )
  return result ?? []
}

export async function getGalleriesWithPhotos(): Promise<Gallery[]> {
  const result = await safeFetch<Gallery[]>(
    `*[_type == "gallery"] | order(order asc, publishedAt desc) {
      _id,
      title,
      slug,
      coverImage { ${IMAGE_FIELDS} },
      "coverLqip": coverImage.asset->metadata.lqip,
      description,
      serviceCategory,
      featured,
      order,
      "photos": photos[]->{
        _id,
        title,
        image { ${IMAGE_FIELDS} },
        "lqip": image.asset->metadata.lqip,
        alt,
        caption,
        order,
      },
    }`,
    {},
    { next: { tags: ['gallery', 'photo'] } }
  )
  return result ?? []
}

export async function getGalleriesByCategory(category: string): Promise<Gallery[]> {
  const result = await safeFetch<Gallery[]>(
    `*[_type == "gallery" && serviceCategory == $category] | order(order asc, publishedAt desc) {
      _id,
      title,
      slug,
      coverImage { ${IMAGE_FIELDS} },
      "coverLqip": coverImage.asset->metadata.lqip,
      description,
      serviceCategory,
      publishedAt,
      featured,
      order,
    }`,
    { category },
    { next: { tags: ['gallery'] } }
  )
  return result ?? []
}

export async function getGalleryBySlug(slug: string): Promise<Gallery | null> {
  return safeFetch(
    `*[_type == "gallery" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      coverImage { ${IMAGE_FIELDS} },
      "coverLqip": coverImage.asset->metadata.lqip,
      description,
      serviceCategory,
      publishedAt,
      featured,
      "photos": photos[]->{
        _id,
        title,
        slug,
        image { ${IMAGE_FIELDS} },
        "lqip": image.asset->metadata.lqip,
        alt,
        caption,
        order,
      },
    }`,
    { slug },
    { next: { tags: ['gallery', `gallery-${slug}`] } }
  )
}

// ─── Static paths ─────────────────────────────────────────────────────────────

export async function getAllGallerySlugs(): Promise<string[]> {
  const result = await safeFetch<Array<{ slug: { current: string } }>>(
    `*[_type == "gallery"]{ slug }`,
    {},
    { next: { tags: ['gallery'] } }
  )
  return (result ?? []).map((g) => g.slug.current)
}
