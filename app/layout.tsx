import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import SiteChrome from '@/components/layout/SiteChrome'
import { getSiteSettings } from '@/lib/sanity/queries'
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  TITLE_TEMPLATE,
} from '@/lib/siteConfig'

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

  const title = settings?.siteTitle ?? DEFAULT_TITLE
  const description = settings?.description ?? DEFAULT_DESCRIPTION

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: DEFAULT_TITLE,
      template: TITLE_TEMPLATE,
    },
    description,
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: 'website',
      locale: 'is_IS',
      url: SITE_URL,
      siteName: title,
      title: DEFAULT_TITLE,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: DEFAULT_TITLE,
      description,
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
