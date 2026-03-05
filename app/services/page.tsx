import type { Metadata } from 'next'
import { getAllGalleries } from '@/lib/sanity/queries'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ServiceSection from '@/components/services/ServiceSection'
import { SERVICES } from '@/types'

export const metadata: Metadata = {
  title: 'Þjónusta',
  description: 'Yfirlit yfir ljósmyndaþjónustu Hlínar Guðmundsdóttur.',
}

export default async function ServicesPage() {
  const galleries = await getAllGalleries()

  return (
    <>
      <PageHeader
        title="Þjónusta"
        subtitle="Hvernig get ég hjálpað þér?"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32 space-y-32">
        {SERVICES.map((service, i) => {
          const serviceGalleries = galleries.filter(
            (g) => g.serviceCategory === service.value
          )
          return (
            <AnimatedSection key={service.value} delay={i * 0.05}>
              <ServiceSection service={service} galleries={serviceGalleries} />
            </AnimatedSection>
          )
        })}
      </div>
    </>
  )
}
