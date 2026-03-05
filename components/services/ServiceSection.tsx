import type { ServiceCategory, Gallery, Photo } from '@/types'
import ServiceCarousel from './ServiceCarousel'

interface ServiceSectionProps {
  service: ServiceCategory
  galleries: Gallery[]
  /** Description from Sanity — overrides the hardcoded fallback when present */
  description?: string
}

export default function ServiceSection({ service, galleries, description }: ServiceSectionProps) {
  // Flatten all photos from every gallery in this service category
  const photos: Photo[] = galleries.flatMap((g) => g.photos ?? [])

  // Use Sanity description if available, fall back to hardcoded default
  const displayDescription = description ?? service.description

  return (
    <section id={service.value} className="scroll-mt-36 md:scroll-mt-40">
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

      {/* Photo carousel */}
      <ServiceCarousel photos={photos} serviceLabel={service.label} />
    </section>
  )
}
