# Hlín Guðmundsdóttir — Portfolio Website

Next.js 15 · Sanity CMS · Tailwind CSS · TypeScript · Resend

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| CMS | Sanity v3 (Studio at `/admin`) |
| Styling | Tailwind CSS v3 + Framer Motion |
| Images | `next/image` + Sanity CDN |
| Email | Resend |
| Deploy | Vercel |

---

## 1 — Create your Sanity project

```bash
# Install the Sanity CLI globally (one-time)
npm install -g sanity

# Log in
sanity login

# Create a new project (choose "Empty" template, dataset name: "production")
sanity init --bare
```

Note the **Project ID** shown at the end — you will need it in the next step.

---

## 2 — Set environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz      # from sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=                       # see below
RESEND_API_KEY=re_xxxxxxxxxxxx               # from resend.com
SANITY_REVALIDATE_SECRET=some-random-string  # generate with: openssl rand -hex 16
NEXT_PUBLIC_SITE_URL=https://hlin.is         # your production URL
```

### Getting a Sanity read token

1. Go to [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **Tokens**
2. Add token → Name: `Next.js Read` → Permission: **Viewer** → Save
3. Paste the token into `SANITY_API_READ_TOKEN`

### Resend setup

1. Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
2. Create an API key → paste into `RESEND_API_KEY`
3. For production: verify your domain in Resend and update the `from` address in `app/api/contact/route.ts`:
   ```ts
   from: 'Hlín Guðmundsdóttir <contact@yourdomain.is>',
   ```
4. Until then, `onboarding@resend.dev` only sends to your Resend account email.

---

## 3 — Run locally

```bash
npm install
npm run dev
```

- Portfolio site → http://localhost:3000
- Sanity Studio → http://localhost:3000/admin

Log in to the Studio with your Sanity account. No extra password needed.

---

## 4 — Deploy to Vercel

### One-time setup

```bash
# Install Vercel CLI
npm install -g vercel

# Link and deploy
vercel
```

Or connect via the [Vercel dashboard](https://vercel.com/new) → Import Git repo.

### Add environment variables in Vercel

Go to your project → **Settings** → **Environment Variables** and add:

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN
RESEND_API_KEY
SANITY_REVALIDATE_SECRET
NEXT_PUBLIC_SITE_URL
```

### Add your Vercel domain to Sanity CORS

1. [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **CORS Origins**
2. Add: `https://your-site.vercel.app` (and your custom domain when ready)
3. Check **Allow credentials**

---

## 5 — Logging into the Studio

1. Go to `https://your-site.vercel.app/admin` (or `http://localhost:3000/admin`)
2. Click **Sign in with Sanity** — use your Sanity account
3. You now have full access to the content manager

---

## 6 — Adding your first content

### Step 1 — Site settings (do this first)

1. Studio → **Stillingar síðu**
2. Fill in:
   - **Heiti síðu**: Hlín Guðmundsdóttir
   - **Undirskrift**: Ljósmyndari · Reykjavík, Ísland
   - **Lýsing (SEO)**: Fagleg ljósmyndun í Reykjavík...
   - **Netfang**: hlingudmunds@gmail.com
   - **Instagram slóð**: https://www.instagram.com/ljosmyndunhlin
   - **Um mig — stutt**: one or two sentences
   - **Um mig — löng**: full bio (rich text)
   - **Mynd af ljósmyndara**: upload a portrait photo
3. **Publish**

### Step 2 — Upload hero photos

Hero photos cycle on the homepage.

1. Studio → **Ljósmyndir** → **Create new**
2. Fill in: Title, upload image, write alt text
3. Toggle **Í forsíðumyndakerfi** ON
4. Set **Röðun** (1 = shows first, 2 = second, etc.)
5. **Publish**
6. Repeat for 3–6 photos

### Step 3 — Create a gallery

1. Studio → **Söfn / Verkefni** → **Create new**
2. Fill in:
   - **Titill**: e.g. "Brúðkaup á Snæfellsnesi"
   - **Þjónustuflokk**: choose the matching service (e.g. Brúðkaup)
   - **Forsíðumynd**: upload a cover image
   - **Lýsing**: brief description
3. **Publish** (you can add photos to it after step 4)

### Step 4 — Add photos to a gallery

Each gallery holds references to Photo documents.

1. First, create the individual photos (Studio → **Ljósmyndir**)
   - Upload image, write alt text
   - Set **Flokkur** to match the gallery's service category
   - To also show in the main Portfolio feed: toggle **Sýna í safni** ON
2. Open the gallery → **Myndir** → **Add item** → search for your photos
3. Order them by setting **Röðun** on each photo
4. **Publish**

### Step 5 — Portfolio feed

Any photo with **Sýna í safni** toggled ON will appear in `/portfolio`.
Control the order with the **Röðun** number field (lower = earlier).

---

## 7 — Monthly update workflow

1. Go to `/admin`
2. Upload new photos (Ljósmyndir) — remember to write alt text
3. Add them to existing or new galleries
4. Toggle **Sýna í safni** for photos to appear in Portfolio
5. Publish all changes
6. The site updates automatically (ISR / on-demand tags)

---

## File structure

```
/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (Header, Footer, fonts)
│   ├── page.tsx                # Home (hero + services preview)
│   ├── portfolio/page.tsx      # Portfolio feed with filters
│   ├── services/page.tsx       # All 8 service sections
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact page
│   ├── gallery/[slug]/page.tsx # Gallery detail
│   ├── admin/[[...tool]]/      # Sanity Studio (embedded)
│   ├── api/contact/route.ts    # Contact form API (Resend)
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # robots.txt
│
├── components/
│   ├── layout/                 # Header, Footer
│   ├── home/                   # HeroSlider, ServicesPreview
│   ├── portfolio/              # PortfolioClient, MasonryGrid, CategoryFilter
│   ├── gallery/                # GalleryGrid
│   ├── services/               # ServiceSection
│   ├── contact/                # ContactForm
│   └── ui/                     # AnimatedSection, PageHeader, PortableText
│
├── lib/sanity/
│   ├── client.ts               # Sanity client
│   ├── image.ts                # URL builder
│   └── queries.ts              # All GROQ queries
│
├── sanity/
│   ├── schemas/                # Photo, Gallery, SiteSettings schemas
│   ├── structure.ts            # Studio sidebar structure
│   └── constants.ts            # Service category options
│
├── types/index.ts              # TypeScript types + SERVICES constant
├── sanity.config.ts            # Sanity Studio config
└── sanity.cli.ts               # Sanity CLI config
```

---

## GROQ queries reference

All queries live in `lib/sanity/queries.ts` with Next.js cache tags for ISR.

| Function | Used on |
|---|---|
| `getSiteSettings()` | Layout, About, Contact |
| `getFeaturedPhotos()` | Home hero slider |
| `getPortfolioPhotos()` | /portfolio |
| `getAllGalleries()` | /services, home preview |
| `getGalleriesByCategory(cat)` | /services (per section) |
| `getGalleryBySlug(slug)` | /gallery/[slug] |
| `getAllGallerySlugs()` | Static path generation |

---

## Customisation tips

- **Colors**: Edit `tailwind.config.ts` → `colors.parchment`
- **Fonts**: Swap `Cormorant_Garamond` / `DM_Sans` in `app/layout.tsx`
- **Service descriptions**: Edit `SERVICES` array in `types/index.ts`
- **Hero interval**: Change `INTERVAL_MS` in `components/home/HeroSlider.tsx`
- **Contact from-address**: Update in `app/api/contact/route.ts`
