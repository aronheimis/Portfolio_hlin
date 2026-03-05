'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import type { SiteSettings } from '@/types'

export default function SiteChrome({
  settings,
  children,
}: {
  settings: SiteSettings | null
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <>
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  )
}
