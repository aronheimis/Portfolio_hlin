import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import SiteChrome from '@/components/layout/SiteChrome'
import { getSiteSettings } from '@/lib/sanity/queries'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: {
      default: settings?.siteTitle ?? 'Hlín Guðmundsdóttir',
      template: `%s — ${settings?.siteTitle ?? 'Hlín Guðmundsdóttir'}`,
    },
    description:
      settings?.description ??
      'Fagleg ljósmyndun í Reykjavík, Íslandi. Portrett, viðburðir, brúðkaup og fleira.',
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hlin.is'
    ),
    openGraph: {
      type: 'website',
      locale: 'is_IS',
      siteName: settings?.siteTitle ?? 'Hlín Guðmundsdóttir',
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <html
      lang="is"
      className={`${cormorant.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-parchment-50 text-parchment-900">
        <SiteChrome settings={settings}>
          {children}
        </SiteChrome>
      </body>
    </html>
  )
}
