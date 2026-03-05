export type ServiceCategoryValue =
  | 'stjornendamyndatokur'
  | 'starfsmannamyndatokur'
  | 'idn-og-heimildaljósmyndun'
  | 'vidburadaljósmyndun'
  | 'voruljósmyndun'
  | 'fermingamyndir'
  | 'fjolskyldurmyndir'
  | 'brudkaup'

export interface ServiceCategory {
  value: ServiceCategoryValue
  label: string
  description: string
}

export const SERVICES: ServiceCategory[] = [
  {
    value: 'stjornendamyndatokur',
    label: 'Stjórnendamyndatökur',
    description:
      'Faglegar portrettmyndir af stjórnendum og leiðtogum fyrirtækja. Hlín skapar myndir sem endurspegla bæði fagmennsku og einstaklingssérkenni.',
  },
  {
    value: 'starfsmannamyndatokur',
    label: 'Starfsmannamyndatökur',
    description:
      'Heildstæðar myndir af starfsfólki sem sýna menninguna og líf fyrirtækisins. Hentar bæði fyrir vefsíður og markaðsefni.',
  },
  {
    value: 'idn-og-heimildaljósmyndun',
    label: 'Iðn- og Heimildaljósmyndun',
    description:
      'Skjölun á iðnaði, framleiðsluferlum og sérhæfðum verkum. Myndir sem segja sögu vinnunnar.',
  },
  {
    value: 'vidburadaljósmyndun',
    label: 'Viðburðaljósmyndun',
    description:
      'Hlín fangar sérhvert augnablik á ráðstefnum, opnunum og viðburðum með nákvæmni og þögulu handlagi.',
  },
  {
    value: 'voruljósmyndun',
    label: 'Vöruljósmyndun',
    description:
      'Myndir sem kynna vörur þínar í besta ljósi. Frá hreinum hvítum bakgrunni yfir í lífsstílsmyndir.',
  },
  {
    value: 'fermingamyndir',
    label: 'Fermingamyndir',
    description:
      'Hlín hefur þjálfun í að búa til hlýlegar og vandvirktar fermingamyndir sem fjölskyldur geta geymt um langan aldur.',
  },
  {
    value: 'fjolskyldurmyndir',
    label: 'Fjölskyldurmyndir',
    description:
      'Náttúrulegar fjölskylduímyndir á útivist eða í heimili. Hlín skapar slakandi andrúmsloft þar sem kjarni fjölskyldunnar kemur fram.',
  },
  {
    value: 'brudkaup',
    label: 'Brúðkaup',
    description:
      'Hlín fylgist með hverju augnabliki brúðkaupsins með hlutlægu auganu og flytur fram tilfinningarnar með listrænum hætti.',
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
