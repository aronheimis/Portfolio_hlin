import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Persónuverndarstefna',
  description:
    'Persónuverndarstefna Hlínar Guðmundsdóttur – hvernig við meðhöndlum persónuupplýsingar þínar.',
  alternates: { canonical: '/personuvernd' },
  openGraph: {
    title: `Persónuverndarstefna | ${SITE_NAME}`,
    description: 'Hvernig við meðhöndlum persónuupplýsingar þínar.',
  },
}

const UPDATED = 'Mars 2026'

export default function PersonuverndPage() {
  return (
    <>
      <PageHeader title="Persónuverndarstefna" />

      <div className="max-w-2xl mx-auto px-6 lg:px-12 pb-32">
        <AnimatedSection delay={0.05}>
          <p className="font-sans text-xs text-parchment-400 tracking-wide mb-12">
            Síðast uppfært: {UPDATED}
          </p>

          {/* Inngangur */}
          <Section title="1. Inngangur">
            <p>
              {SITE_NAME} (hér eftir „við" eða „okkur") leggur mikla áherslu á
              friðhelgi einkalífs og öryggi persónuupplýsinga. Þessi
              persónuverndarstefna lýsir því hvaða gögn við söfnum, hvernig við
              notum þau og hvaða réttindi þú hefur sem skráningarskylt einstaklingur
              samkvæmt lögum um persónuvernd og vinnslu persónuupplýsinga nr.
              90/2018 og reglugerð Evrópuþingsins og ráðsins (ESB) 2016/679
              (GDPR).
            </p>
            <p className="mt-4">
              Vefsíðan er rekin á{' '}
              <a
                href={SITE_URL}
                className="underline underline-offset-2 hover:text-parchment-900 transition-colors"
              >
                {SITE_URL}
              </a>
              .
            </p>
          </Section>

          {/* Ábyrgðaraðili */}
          <Section title="2. Ábyrgðaraðili">
            <p>
              Ábyrgðaraðili vinnslu persónuupplýsinga er:
            </p>
            <address className="mt-3 not-italic font-sans text-sm text-parchment-700 leading-relaxed bg-parchment-100 px-5 py-4 border-l-2 border-parchment-300">
              {SITE_NAME}<br />
              Reykjavík, Ísland<br />
              <a
                href="mailto:hlingudmunds@gmail.com"
                className="underline underline-offset-2 hover:text-parchment-900 transition-colors"
              >
                hlingudmunds@gmail.com
              </a>
            </address>
          </Section>

          {/* Hvaða gögn við söfnum */}
          <Section title="3. Hvaða gögn við söfnum">
            <p>
              Við söfnum aðeins þeim gögnum sem þú gefur okkur sjálfviljugur þegar
              þú hefur samband í gegnum samskiptaeyðublað vefsíðunnar:
            </p>
            <ul className="mt-3 space-y-2">
              <Li>Nafn</Li>
              <Li>Netfang</Li>
              <Li>Skilaboðatexti</Li>
            </ul>
            <p className="mt-4">
              Við söfnum <strong className="font-medium text-parchment-900">ekki</strong> sjálfkrafa
              upplýsingum um vafra þinn, IP-tölu eða hegðun þína á vefsíðunni nema
              þú hafi veitt samþykki fyrir greiningarköku.
            </p>
          </Section>

          {/* Tilgangur og lagaleg grundvöllur */}
          <Section title="4. Tilgangur og lagalegur grundvöllur">
            <p>
              Við vinnum persónuupplýsingarnar í eftirfarandi tilgangi:
            </p>
            <ul className="mt-3 space-y-2">
              <Li>
                <strong className="font-medium text-parchment-800">Svar við fyrirspurn:</strong>{' '}
                Til að svara erindi þínu og gera ráðningar og samninga (GDPR gr. 6(1)(b)).
              </Li>
              <Li>
                <strong className="font-medium text-parchment-800">Lögbundnar skyldur:</strong>{' '}
                Ef við erum skyld að geyma gögn samkvæmt íslenskum lögum (GDPR gr. 6(1)(c)).
              </Li>
            </ul>
          </Section>

          {/* Þriðji aðilar */}
          <Section title="5. Þriðji aðilar og millifærsla gagna">
            <p>
              Samskiptaeyðublað vefsíðunnar notar þjónustuna{' '}
              <strong className="font-medium text-parchment-800">Resend</strong> til að senda
              tölvupóst. Resend er gagnavinnsluaðili sem við höfum gert
              gagnavinnslusamning við. Gögn eru geymd á netþjónum innan
              Evrópska efnahagssvæðisins (EES).
            </p>
            <p className="mt-4">
              Við sefjum ekki né seljum persónuupplýsingar til þriðja aðila í
              markaðslegum tilgangi.
            </p>
          </Section>

          {/* Geymslutími */}
          <Section title="6. Geymslutími">
            <p>
              Við geymum samskiptagögn (nafn, netfang, skilaboð) þar til
              málunum er lokið og í að hámarki 12 mánuði eftir það nema lagalegar
              skyldur krefjist lengri geymslu.
            </p>
          </Section>

          {/* Vafrakökur */}
          <Section title="7. Vafrakökur">
            <p>
              Vefsíðan notar vafrakökur. Nánar er fjallað um þetta í{' '}
              <a href="/cookies" className="underline underline-offset-2 hover:text-parchment-900 transition-colors">
                Cookie-stefnu
              </a>{' '}
              okkar.
            </p>
          </Section>

          {/* Réttindi þín */}
          <Section title="8. Réttindi þín">
            <p>
              Samkvæmt GDPR átt þú rétt á:
            </p>
            <ul className="mt-3 space-y-2">
              <Li>Aðgangi að þeim persónuupplýsingum sem við geymum um þig</Li>
              <Li>Leiðréttingu á röngum eða ófullnægjandi gögnum</Li>
              <Li>Eyðingu gagna („réttur til gleymsku") þar sem það á við</Li>
              <Li>Takmörkun á vinnslu gagna í tilteknum tilvikum</Li>
              <Li>Andmælarétti gagnvart vinnslu á grundvelli lögmætra hagsmuna</Li>
              <Li>Gagnaflutningstæki (gögn á skipulögðu sniði)</Li>
            </ul>
            <p className="mt-4">
              Til að nýta réttindi þín skaltu hafa samband við{' '}
              <a
                href="mailto:hlingudmunds@gmail.com"
                className="underline underline-offset-2 hover:text-parchment-900 transition-colors"
              >
                hlingudmunds@gmail.com
              </a>
              . Við munum svara innan 30 daga.
            </p>
          </Section>

          {/* Kæra */}
          <Section title="9. Kæra til Persónuverndar">
            <p>
              Ef þú telur að vinnsla á persónuupplýsingum þínum brjóti í bága
              við lög um persónuvernd geturðu lagt fram kvörtun hjá{' '}
              <a
                href="https://www.personuvernd.is"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-parchment-900 transition-colors"
              >
                Persónuvernd
              </a>{' '}
              (personuvernd.is).
            </p>
          </Section>

          {/* Breytingar */}
          <Section title="10. Breytingar á þessari stefnu">
            <p>
              Við kunnum að uppfæra þessa persónuverndarstefnu reglulega.
              Uppfærð útgáfa verður birt á þessari síðu með nýjustu dagsetningu.
              Við mælum með að þú yfirfarir hana reglulega.
            </p>
          </Section>
        </AnimatedSection>
      </div>
    </>
  )
}

// ─── Small helpers ────────────────────────────────────────────────────────────

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

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm font-sans text-parchment-700 leading-relaxed">
      <span className="mt-[7px] w-1 h-1 rounded-full bg-parchment-400 flex-none" />
      {children}
    </li>
  )
}
