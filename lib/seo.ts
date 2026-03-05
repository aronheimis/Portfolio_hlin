import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from './siteConfig'

interface JsonLdOptions {
  instagramUrl?: string | null
  description?: string | null
}

/**
 * Builds a Schema.org ProfessionalService (LocalBusiness) JSON-LD payload
 * for Hlín's photography business.  Inject with <JsonLd data={buildJsonLd()} />.
 */
export function buildPhotographerJsonLd(opts: JsonLdOptions = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    alternateName: 'Hlín – Ljósmyndari',
    description: opts.description ?? DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`, // update when OG image is added to /public
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Reykjavík',
      addressRegion: 'Höfuðborgarsvæðið',
      addressCountry: 'IS',
    },
    areaServed: [
      { '@type': 'City', name: 'Reykjavík' },
      { '@type': 'AdministrativeArea', name: 'Höfuðborgarsvæðið og nágrenni' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Ljósmyndaþjónusta',
      itemListElement: [
        'Portrettmyndatökur',
        'Stjórnendamyndatökur',
        'Starfsmannamyndatökur',
        'Fjölskyldurmyndir',
        'Brúðkaupsljósmyndun',
        'Viðburðaljósmyndun',
        'Vöruljósmyndun',
        'Fermingamyndir',
      ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    },
    ...(opts.instagramUrl ? { sameAs: [opts.instagramUrl] } : {}),
  }
}
