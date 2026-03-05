import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Skilmálar',
  description:
    'Skilmálar og höfundarréttarstefna Hlínar Guðmundsdóttur – pantanir, afpantanir og réttindi yfir myndum.',
  alternates: { canonical: '/skilmalar' },
  openGraph: {
    title: `Skilmálar | ${SITE_NAME}`,
    description: 'Skilmálar, höfundarréttur og pöntunarfyrirkomulag.',
  },
}

const UPDATED = 'Mars 2026'

export default function SkilmalarPage() {
  return (
    <>
      <PageHeader title="Skilmálar" />

      <div className="max-w-2xl mx-auto px-6 lg:px-12 pb-32">
        <AnimatedSection delay={0.05}>
          <p className="font-sans text-xs text-parchment-400 tracking-wide mb-12">
            Síðast uppfært: {UPDATED}
          </p>

          {/* Almennt */}
          <Section title="1. Almennt">
            <p>
              Þessir skilmálar gilda um alla þjónustu sem {SITE_NAME}
              (hér eftir „ljósmyndarinn") veitir viðskiptavinum (hér eftir
              „viðskiptavinur") í tengslum við ljósmyndatöku. Með því að panta
              þjónustu samþykkir viðskiptavinur þessa skilmála.
            </p>
          </Section>

          {/* Pantanir og staðfesting */}
          <Section title="2. Pantanir og staðfesting">
            <ul className="space-y-2">
              <Li>
                Pöntun telst staðfest þegar ljósmyndarinn staðfestir hana
                skriflega (tölvupósti).
              </Li>
              <Li>
                Til að tryggja sér dag og tíma er viðskiptavini bent á að hafa
                samband sem fyrst. Dagsetning er ekki frátekin fyrr en móttekið
                er bókunargjald þar sem við á.
              </Li>
              <Li>
                Verð og pakkar eru þeir sem birtast á{' '}
                <a
                  href="/verdskra"
                  className="underline underline-offset-2 hover:text-parchment-900 transition-colors"
                >
                  Verðskrársíðu
                </a>{' '}
                vefsíðunnar eða þau sem ljósmyndarinn tilgreinir sérstaklega.
              </Li>
            </ul>
          </Section>

          {/* Greiðslur */}
          <Section title="3. Greiðslur">
            <ul className="space-y-2">
              <Li>
                Greiðsla fer fram með þeim hætti og á þeim tíma sem tilgreindur
                er í staðfestingartölvupósti.
              </Li>
              <Li>
                Ef greiðsla berst ekki á gjalddaga áskilur ljósmyndarinn sér
                rétt til að frestast eða hætta við pöntunina.
              </Li>
            </ul>
          </Section>

          {/* Afpantanir */}
          <Section title="4. Afpantanir og breyting á tíma">
            <ul className="space-y-2">
              <Li>
                <strong className="font-medium text-parchment-800">
                  Meira en 14 dagar fyrir tökudag:
                </strong>{' '}
                Afpöntun er gjaldfrjáls. Bókunargjald er endurgreitt að fullu.
              </Li>
              <Li>
                <strong className="font-medium text-parchment-800">
                  7–14 dagar fyrir tökudag:
                </strong>{' '}
                50% af heildarverði er innheimt sem afbókunargjald.
              </Li>
              <Li>
                <strong className="font-medium text-parchment-800">
                  Minna en 7 dagar fyrir tökudag:
                </strong>{' '}
                Heildarverð er innheimt.
              </Li>
              <Li>
                Breyting á tíma er heimil með minnst 48 klukkustunda fyrirvara
                og er gjaldfrjáls svo fremi sem nýr tími er í boði.
              </Li>
              <Li>
                Ef taka er aflýst af völdum ljósmyndarans (vegna veikinda eða
                óviðráðanlegra atvika) verður boðið upp á nýjan tíma eða
                endurgreiðsla á bókunargjaldi.
              </Li>
            </ul>
          </Section>

          {/* Veðurlag */}
          <Section title="5. Veðurlag og sérstakar aðstæður">
            <p>
              Við útitökur áskilur ljósmyndarinn sér rétt til að flytja tökuna
              ef veðurlag er talið óhæft eða hættulegt. Í slíkum tilvikum er
              leitast við að finna viðskiptavininum nýjan tíma án aukakostnaðar.
            </p>
          </Section>

          {/* Afhending mynda */}
          <Section title="6. Afhending ljósmynda">
            <ul className="space-y-2">
              <Li>
                Ljósmyndir eru afhentar í gegnum einkatengi (veflykil) til
                niðurhals.
              </Li>
              <Li>
                Afhendingartími fer eftir tegund þjónustu og er tilgreindur í
                pöntunarlýsingu.
              </Li>
              <Li>
                Tengilinn er virkur í að lágmarki 30 daga. Viðskiptavinur ber
                ábyrgð á að hlaða niður myndunum á meðan tengilinn er virkur.
              </Li>
            </ul>
          </Section>

          {/* Höfundarréttur */}
          <Section title="7. Höfundarréttur">
            <p>
              Allar ljósmyndir sem teknar eru af {SITE_NAME} eru{' '}
              <strong className="font-medium text-parchment-900">
                einkaréttur höfundar
              </strong>{' '}
              og vernduð af höfundalögum nr. 73/1972.
            </p>
            <ul className="mt-4 space-y-2">
              <Li>
                Viðskiptavinur fær óframseljanlegan rétt til að nota myndir í
                persónulegum tilgangi (til dæmis á samfélagsmiðlum, prentun til
                einkanota) nema annað sé sérstaklega samið.
              </Li>
              <Li>
                Óheimilt er að nota myndir í viðskiptalegum tilgangi, selja
                þær, breyta þeim verulega eða birta án heimildar.
              </Li>
              <Li>
                Ljósmyndarinn áskilur sér rétt til að birta myndir í
                kynningar- og safnskyni (til dæmis á vefsíðu, Instagram og í
                kynningarefni) nema viðskiptavinur óski sérstaklega eftir
                öðruvísi fyrirkomulagi.
              </Li>
              <Li>
                Ef viðskiptavinur deilir myndum á samfélagsmiðlum er farið að
                þakka höfundi eða tagga reikning ljósmyndarans.
              </Li>
            </ul>
          </Section>

          {/* Líkanasamþykki */}
          <Section title="8. Líkanasamþykki (Model Release)">
            <p>
              Með því að panta þjónustu og gengast undir tökuna gefur
              viðskiptavinur (og þátttakendur ef við á) samþykki sitt til að
              ljósmyndarinn noti myndir í kynningarskyni eins og lýst er í gr. 7.
              Ef um börn er að ræða gefur forráðamaður samþykki.
            </p>
            <p className="mt-4">
              Ef viðskiptavinur óskar eftir að myndir verði ekki notaðar í
              kynningarskyni ber að gera það ljóst áður en taka hefst og gera
              sérsamning.
            </p>
          </Section>

          {/* Takmarkaðar ábyrgð */}
          <Section title="9. Takmörkun ábyrgðar">
            <p>
              Ljósmyndarinn er ekki ábyrgur fyrir tjóni sem hlýst af utanaðkomandi
              ástæðum utan hans vald, svo sem bilun tækja (þegar allt kapp er
              lagt á að nota varatæki), veikindi eða náttúruhamfarir. Í slíkum
              tilvikum er endurgreiðsla á bókunargjaldi hámarksábyrgð
              ljósmyndarans.
            </p>
          </Section>

          {/* Lög og lögsaga */}
          <Section title="10. Lög og lögsaga">
            <p>
              Þessir skilmálar lúta íslenskum lögum. Ágreiningur sem upp kann
              að koma er lagður fyrir Héraðsdóm Reykjavíkur.
            </p>
          </Section>

          {/* Samband */}
          <Section title="11. Samband">
            <p>
              Spurningar varðandi þessa skilmála má senda á:{' '}
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

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm font-sans text-parchment-700 leading-relaxed">
      <span className="mt-[7px] w-1 h-1 rounded-full bg-parchment-400 flex-none" />
      {children}
    </li>
  )
}
