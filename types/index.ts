export type ServiceCategoryValue =
  | 'portrettmyndataka'
  | 'fjolskyldumyndataka'
  | 'medgongu-og-ungbarnamyndataka'
  | 'skirnarmyndataka'
  | 'brudkaupsmyndataka'
  | 'starfsmannamyndataka'
  | 'ithrottaljósmyndun'

export interface ServiceCategory {
  value: ServiceCategoryValue
  label: string
  description: string
}

export const SERVICES: ServiceCategory[] = [
  {
    value: 'portrettmyndataka',
    label: 'Portrettmyndataka',
    description:
      'Hlín skapar einlægar og náttúrulegar portrettmyndir sem endurspegla persónuleika og einstaklingssérkenni hvers og eins.',
  },
  {
    value: 'fjolskyldumyndataka',
    label: 'Fjölskyldumyndataka',
    description:
      'Náttúrulegar fjölskyldumyndir á útivist eða í heimili. Hlín skapar hlýlegt andrúmsloft þar sem kjarni fjölskyldunnar kemur fram.',
  },
  {
    value: 'medgongu-og-ungbarnamyndataka',
    label: 'Meðgöngu- og ungbarnamyndataka',
    description:
      'Fagleg og hlýleg myndataka sem fangar þessa sérstöku stund — bæði meðgöngu og fyrstu daga nýbura.',
  },
  {
    value: 'skirnarmyndataka',
    label: 'Skírnarmyndataka',
    description:
      'Hlín fangar þessa merkilegu stund í lífi barnsins og fjölskyldunnar með hlýlegum og vandvirkum hætti.',
  },
  {
    value: 'brudkaupsmyndataka',
    label: 'Brúðkaupsmyndataka',
    description:
      'Hlín fylgist með hverju augnabliki brúðkaupsins og flytur fram tilfinningarnar með listrænum og náttúrulegum hætti.',
  },
  {
    value: 'starfsmannamyndataka',
    label: 'Starfsmannamyndataka',
    description:
      'Faglegar portrett- og starfsmannamyndir sem sýna menninguna og líf fyrirtækisins. Hentar bæði fyrir vefsíður og markaðsefni.',
  },
  {
    value: 'ithrottaljósmyndun',
    label: 'Íþróttaljósmyndun',
    description:
      'Hlín hefur reynslu af íþróttaljósmyndun fyrir Frjálsíþróttasamband Íslands og fangar hreyfingu og kraft íþróttafólks.',
  },
]

// ─── SEO fields (matches sanity/schemas/seo.ts) ───────────────────────────────

export interface SeoFields {
  seoTitle?: string
  seoDescription?: string
  ogImage?: SanityImage
  canonicalUrl?: string
}

export interface SanityImageAsset {
  _id: string
  url: string
  metadata?: {
    lqip?: string
    dimensions?: {
      width: number
      height: number
      aspectRatio: number
    }
  }
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface Photo {
  _id: string
  _type: 'photo'
  title: string
  slug: { current: string }
  image: SanityImage
  lqip?: string
  dimensions?: {
    width: number
    height: number
    aspectRatio: number
  }
  alt: string
  caption?: string
  location?: string
  shotDate?: string
  tags?: string[]
  category?: ServiceCategoryValue
  featured: boolean
  showInPortfolio: boolean
  order?: number
}

export interface Gallery {
  _id: string
  _type: 'gallery'
  title: string
  slug: { current: string }
  coverImage: SanityImage
  coverLqip?: string
  description?: string
  serviceCategory: ServiceCategoryValue
  publishedAt?: string
  photos?: Photo[]
  featured: boolean
  order?: number
  seo?: SeoFields
}

export interface SiteSettings {
  _id: string
  siteTitle: string
  tagline?: string
  description?: string
  contactEmail?: string
  instagramUrl?: string
  facebookUrl?: string
  behanceUrl?: string
  aboutShort?: string
  aboutLong?: Array<{ _type: string; [key: string]: unknown }>
  aboutImage?: SanityImage
  aboutImageLqip?: string
  ogImage?: SanityImage
}
