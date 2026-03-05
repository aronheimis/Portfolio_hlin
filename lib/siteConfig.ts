// ─── Site-wide constants ──────────────────────────────────────────────────────
// Update NEXT_PUBLIC_SITE_URL in Vercel env vars to your real production domain.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hlingudmunds.is'

export const SITE_NAME = 'Hlín Guðmundsdóttir'
export const SITE_NAME_SHORT = 'Hlín'

// ─── Default SEO copy ────────────────────────────────────────────────────────

export const DEFAULT_TITLE =
  'Hlín Guðmundsdóttir | Ljósmyndari – Portrett, Brúðkaup, Viðburðir & Vörur'

export const DEFAULT_DESCRIPTION =
  'Ég er ljósmyndari í Reykjavík og á höfuðborgarsvæðinu og tek portrett-, fjölskyldu-, para- og viðburðamyndir með náttúrulegum og tímalausum stíl.'

// ─── Title template for sub-pages  (%s → page title) ─────────────────────────
// Result: "Þjónusta | Hlín Guðmundsdóttir"
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`
