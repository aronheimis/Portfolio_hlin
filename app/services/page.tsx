import type { Metadata } from 'next'
import { getGalleriesWithPhotos, getServiceDescriptions } from '@/lib/sanity/queries'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ServiceSection from '@/components/services/ServiceSection'
import ServicesNav from '@/components/services/ServicesNav'
import { SERVICES } from '@/types'

export const metadata: Metadata = {
  title: 'Þjónusta',
  description:
    'Portrettmyndatökur, brúðkaupsljósmyndun, fjölskyldurmyndir, viðburðir og vöruljósmyndun í Reykjavík. Hlín Guðmundsdóttir – fagleg ljósmyndun með náttúrulegum stíl.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Þjónusta | Hlín Guðmundsdóttir',
    description:
      'Portrettmyndatökur, brúðkaupsljósmyndun, fjölskyldurmyndir, viðburðir og vöruljósmyndun í Reykjavík.',
  },
}

export default async function ServicesPage() {
  const [galleries, serviceDescriptions] = await Promise.all([
    getGalleriesWithPhotos(),
    getServiceDescriptions(),
  ])

  return (
    <>
      <PageHeader title="Þjónusta" />

      {/* Sticky scroll-navigation — shows all service categories */}
      <ServicesNav services={SERVICES} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20 space-y-16 md:space-y-32 mt-16 md:mt-24">
        {SERVICES.map((service, i) => {
          const serviceGalleries = galleries.filter(
            (g) => g.serviceCategory === service.value
          )
          return (
            <AnimatedSection key={service.value} delay={i * 0.05}>
              <ServiceSection
                service={service}
                galleries={serviceGalleries}
                description={serviceDescriptions[service.value]}
              />
            </AnimatedSection>
          )
        })}
      </div>
    </>
  )
}
