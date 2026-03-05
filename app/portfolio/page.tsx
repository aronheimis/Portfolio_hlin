import type { Metadata } from 'next'
import { getPortfolioPhotos } from '@/lib/sanity/queries'
import PageHeader from '@/components/ui/PageHeader'
import PortfolioClient from '@/components/portfolio/PortfolioClient'

export const metadata: Metadata = {
  title: 'Ljósmyndir',
  description: 'Handvaldar ljósmyndir eftir Hlín Guðmundsdóttir.',
}

export default async function PortfolioPage() {
  const photos = await getPortfolioPhotos()

  return (
    <>
      <PageHeader
        title="Ljósmyndir"
        subtitle="Handvalið úrval mynda"
      />
      <PortfolioClient photos={photos} />
    </>
  )
}
