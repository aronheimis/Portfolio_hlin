import type { ServiceCategory, Gallery, Photo } from '@/types'
import ServiceCarousel from './ServiceCarousel'
import ServiceSectionActions from './ServiceSectionActions'

interface ServiceSectionProps {
  service: ServiceCategory
  galleries: Gallery[]
  /** Description from Sanity — overrides the hardcoded fallback when present */
  description?: string
}

const PREVIEW_LIMIT = 6

export default function ServiceSection({ service, galleries, description }: ServiceSectionProps) {
  // Flatten all photos from every gallery in this service category
  const allPhotos: Photo[] = galleries.flatMap((g) => g.photos ?? [])

  // Show up to 6 photos in the services-page carousel; full set lives on the subpage
  const previewPhotos = allPhotos.slice(0, PREVIEW_LIMIT)

  // Use Sanity description if available, fall back to hardcoded default
  const displayDescription = description ?? service.description

  return (
    <section id={service.value} style={{ scrollMarginTop: 'var(--scroll-offset, 160px)' }}>
      {/* Section header */}
      <div className="mb-10">
        <h2 className="font-serif text-4xl md:text-5xl font-light text-parchment-900 mb-4">
          {service.label}
        </h2>

        {displayDescription && (
          <p className="max-w-lg font-sans text-base leading-relaxed text-parchment-700">
            {displayDescription}
          </p>
        )}
      </div>

      {/* Photo carousel — capped at 6 photos */}
      <ServiceCarousel photos={previewPhotos} serviceLabel={service.label} />

      {/* "Sjá meira" + "Verð" actions (client — modal lives here) */}
      <ServiceSectionActions serviceSlug={service.value} />
    </section>
  )
}
