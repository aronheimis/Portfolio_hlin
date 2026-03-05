import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { SITE_NAME } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Cookie-stefna',
  description:
    'Cookie-stefna Hlínar Guðmundsdóttur – hvernig við notum vafrakökur og hvernig þú getur stjórnað stillingum þínum.',
  alternates: { canonical: '/cookies' },
  openGraph: {
    title: `Cookie-stefna | ${SITE_NAME}`,
    description: 'Hvernig við notum vafrakökur á vefsíðunni.',
  },
}

const UPDATED = 'Mars 2026'

export default function CookiesPage() {
  return (
    <>
      <PageHeader title="Cookie-stefna" />

      <div className="max-w-2xl mx-auto px-6 lg:px-12 pb-32">
        <AnimatedSection delay={0.05}>
          <p className="font-sans text-xs text-parchment-400 tracking-wide mb-12">
            Síðast uppfært: {UPDATED}
          </p>

          {/* Hvað eru vafrakökur */}
          <Section title="1. Hvað eru vafrakökur?">
            <p>
              Vafrakaka (e. <em>cookie</em>) er lítill textaskrár sem er geymdur
              í vafra þínum þegar þú heimsækir vefsíðu. Vafrakökur geta geymt
              stillingar eða hjálpað okkur að skilja hvernig gestir nota
              vefsíðuna.
            </p>
          </Section>

          {/* Hvaða vafrakökur við notum */}
          <Section title="2. Hvaða vafrakökur við notum">
            <p className="mb-6">
              Við flokkum vafrakökur á eftirfarandi hátt:
            </p>

            {/* Nauðsynlegar */}
            <CookieCategory
              name="Nauðsynlegar vafrakökur"
              badge="Alltaf virkar"
              description="Þessar vafrakökur eru nauðsynlegar til að vefsíðan virki rétt. Þær geyma til dæmis samþykki þitt fyrir vafrakökum (í localStorage) til að við sýnum þér ekki tilkynninguna aftur. Þær innihalda engar persónugreinanlegar upplýsingar og geta ekki verið slökkt á þeim."
            >
              <CookieRow
                name="hlin_cookie_consent"
                purpose="Geymir val þitt á vafrakökusamþykki (nauðsynlegar / tölfræði / markaðssetning)."
                duration="Þar til þú hreinsir geymslu vafra"
                type="localStorage"
              />
            </CookieCategory>

            {/* Tölfræði */}
            <CookieCategory
              name="Tölfræði og greining"
              badge="Valfrjálsar"
              description="Þessar vafrakökur hjálpa okkur að skilja hvernig gestir nota vefsíðuna — til dæmis hvaða síður eru vinsælastar. Gögnin eru notuð til að bæta upplifunina. Þær eru aðeins virkjaðar ef þú gefur samþykki þitt."
            >
              <p className="font-sans text-xs text-parchment-500 italic">
                Engar greiningarkökur eru í notkun eins og er. Þessi flokkur er
                tilbúinn ef greiningar verða bætt við síðar.
              </p>
            </CookieCategory>

            {/* Markaðssetning */}
            <CookieCategory
              name="Markaðssetning"
              badge="Valfrjálsar"
              description="Þessar vafrakökur eru notaðar til að birta þér viðeigandi auglýsingar og mæla árangur markaðsherferða. Þær eru aðeins virkjaðar ef þú gefur samþykki þitt."
            >
              <p className="font-sans text-xs text-parchment-500 italic">
                Engar markaðssetningarkökur eru í notkun eins og er.
              </p>
            </CookieCategory>
          </Section>

          {/* Hvernig þú stjórnar vafrakökum */}
          <Section title="3. Hvernig þú stjórnar vafrakökum">
            <p>
              Þú getur breytt samþykki þínu hvenær sem er með því að smella á
              hlekinn <strong className="font-medium text-parchment-800">Cookie-stillingar</strong> í
              neðanverðu spjaldinu á vefsíðunni.
            </p>
            <p className="mt-4">
              Þú getur einnig eytt öllum vafrakökum í stillingum vafrans þíns.
              Athugaðu að það getur haft áhrif á virkni sumra vefsíðna.
            </p>

            <p className="mt-4">
              Leiðbeiningar fyrir algengasta vafrana:
            </p>
            <ul className="mt-3 space-y-2">
              <Li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-parchment-900 transition-colors"
                >
                  Google Chrome
                </a>
              </Li>
              <Li>
                <a
                  href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-parchment-900 transition-colors"
                >
                  Mozilla Firefox
                </a>
              </Li>
              <Li>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-parchment-900 transition-colors"
                >
                  Apple Safari
                </a>
              </Li>
              <Li>
                <a
                  href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-parchment-900 transition-colors"
                >
                  Microsoft Edge
                </a>
              </Li>
            </ul>
          </Section>

          {/* Persónuvernd */}
          <Section title="4. Tengill á persónuverndarstefnu">
            <p>
              Nánari upplýsingar um hvernig við meðhöndlum persónuupplýsingar
              má finna í{' '}
              <a
                href="/personuvernd"
                className="underline underline-offset-2 hover:text-parchment-900 transition-colors"
              >
                Persónuverndarstefnu
              </a>{' '}
              okkar.
            </p>
          </Section>

          {/* Samband */}
          <Section title="5. Samband">
            <p>
              Ef þú hefur spurningar varðandi notkun vafrakaka skaltu hafa
              samband:{' '}
              <a
                href="mailto:hlingudmunds@gmail.com"
                className="underline underline-offset-2 hover:text-parchment-900 transition-colors"
              >
                hlingudmunds@gmail.com
              </a>
            </p>
          </Section>
        </AnimatedSection>
      </div>
    </>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10">
      <h2 className="font-serif text-2xl font-light text-parchment-900 mb-4">
        {title}
      </h2>
      <div className="font-sans text-sm text-parchment-700 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function CookieCategory({
  name,
  badge,
  description,
  children,
}: {
  name: string
  badge: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8 border border-parchment-200 p-5">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-sans text-sm font-medium text-parchment-900">
          {name}
        </h3>
        <span className="text-[10px] font-sans tracking-widest uppercase text-parchment-400 border border-parchment-200 px-2 py-0.5">
          {badge}
        </span>
      </div>
      <p className="text-xs font-sans text-parchment-600 leading-relaxed mb-4">
        {description}
      </p>
      {children}
    </div>
  )
}

function CookieRow({
  name,
  purpose,
  duration,
  type,
}: {
  name: string
  purpose: string
  duration: string
  type: string
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs font-sans border-t border-parchment-100 pt-3">
      <span className="font-medium text-parchment-800 font-mono">{name}</span>
      <span className="text-parchment-600">{purpose}</span>
      <span className="text-parchment-400 sm:col-start-2">
        Gildistími: {duration} · Tegund: {type}
      </span>
    </div>
  )
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm font-sans text-parchment-700 leading-relaxed">
      <span className="mt-[7px] w-1 h-1 rounded-full bg-parchment-400 flex-none" />
      {children}
    </li>
  )
}
