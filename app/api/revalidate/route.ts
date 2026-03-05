import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const docType: string = body?._type ?? ''

    // Revalidate the relevant cache tags based on document type
    if (docType === 'photo') {
      revalidateTag('photo')
    } else if (docType === 'gallery') {
      revalidateTag('gallery')
      revalidateTag('photo')
    } else if (docType === 'siteSettings') {
      revalidateTag('siteSettings')
    } else {
      // Unknown type — revalidate everything
      revalidateTag('photo')
      revalidateTag('gallery')
      revalidateTag('siteSettings')
    }

    return NextResponse.json({ revalidated: true, type: docType || 'all' })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
