import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiter (resets on cold start; fine for Vercel)
const rateLimitMap = new Map<string, { count: number; windowStart: number }>()
const RATE_LIMIT_COUNT = 3
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now })
    return false
  }

  if (entry.count >= RATE_LIMIT_COUNT) return true

  entry.count++
  return false
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Of margar beiðnir. Reyndu aftur síðar.' },
      { status: 429 }
    )
  }

  const body = await req.json()
  const { name, email, subject, message, website } = body

  // Honeypot — bots fill this hidden field
  if (website) {
    return NextResponse.json({ success: true })
  }

  // Validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Vinsamlegast fylltu út öll nauðsynleg svæði.' },
      { status: 400 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Ógilt netfang.' }, { status: 400 })
  }

  if (message.trim().length < 10) {
    return NextResponse.json({ error: 'Skilaboðin eru of stutt.' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      // Use your verified domain in production.
      // For testing, use: onboarding@resend.dev (only sends to your Resend account email).
      from: 'Hlín Portfolio <onboarding@resend.dev>',
      to: 'hlingudmunds@gmail.com',
      replyTo: email,
      subject: `Fyrirspurn: ${subject?.trim() || name.trim()}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 580px; margin: 0 auto; padding: 48px 24px; color: #1a1916; background: #faf7f2;">
          <h2 style="font-size: 26px; font-weight: 400; margin: 0 0 8px; letter-spacing: 0.03em;">Ný fyrirspurn</h2>
          <div style="height: 1px; background: #e8ddd0; margin: 16px 0 28px;"></div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b5a45; font-size: 13px; width: 100px; vertical-align: top;">Nafn</td>
              <td style="padding: 8px 0; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b5a45; font-size: 13px; vertical-align: top;">Netfang</td>
              <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #8b7355; text-decoration: none;">${email}</a></td>
            </tr>
            ${subject ? `<tr><td style="padding: 8px 0; color: #6b5a45; font-size: 13px; vertical-align: top;">Efni</td><td style="padding: 8px 0; font-size: 15px;">${subject}</td></tr>` : ''}
          </table>

          <div style="margin-top: 28px;">
            <p style="color: #6b5a45; font-size: 13px; margin: 0 0 8px;">Skilaboð</p>
            <p style="font-size: 15px; line-height: 1.8; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e8ddd0;">
            <p style="font-size: 12px; color: #a98e70; margin: 0;">
              Sent frá hlin.is · ${new Date().toLocaleDateString('is-IS', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[contact] email send error:', error)
    return NextResponse.json(
      { error: 'Villa kom upp. Vinsamlegast reyndu aftur eða sendu tölvupóst beint.' },
      { status: 500 }
    )
  }
}
