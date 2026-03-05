import type { ServiceCategory, Gallery, Photo } from '@/types'
import ServiceCarousel from './ServiceCarousel'

interface ServiceSectionProps {
  service: ServiceCategory
  galleries: Gallery[]
}

export default function ServiceSection({ service, galleries }: ServiceSectionProps) {
  // Flatten all photos from every gallery in this service category
  const photos: Photo[] = galleries.flatMap((g) => g.photos ?? [])

  return (
    <section id={service.value} className="scroll-mt-28 md:scroll-mt-32">
      {/* Section header */}
      <div className="mb-10">
        <h2 className="font-serif text-4xl md:text-5xl font-light text-parchment-900 mb-4">
          {service.label}
        </h2>
        <div className="w-10 h-px bg-parchment-600 mb-5" />
        <p className="max-w-lg font-sans text-base leading-relaxed text-parchment-700">
          {service.description}
        </p>
      </div>

      {/* Photo carousel */}
      <ServiceCarousel photos={photos} serviceLabel={service.label} />
    </section>
  )
}
