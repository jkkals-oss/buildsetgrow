import React, { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Eyebrow, Headline } from './ui'

const CONTENTS = [
  ['information', 'Information we collect'],
  ['use', 'How we use information'],
  ['sharing', 'Information sharing'],
  ['technology', 'Website technology'],
  ['retention', 'Retention and security'],
  ['choices', 'Your choices'],
  ['third-party', 'Third-party websites'],
  ['children', 'Children’s privacy'],
  ['changes', 'Policy changes'],
  ['privacy-contact', 'Contact us'],
] as const

function Section({ id, heading, children }: { id: string; heading: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={id + '-heading'} className="scroll-mt-28 border-t border-graphite/15 py-10 sm:py-12">
      <h2 id={id + '-heading'} className="font-display text-[30px] font-light leading-tight text-graphite sm:text-[37px]">{heading}</h2>
      <div className="mt-5 space-y-4 text-[15px] leading-[1.85] text-graphite-2">{children}</div>
    </section>
  )
}

export function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | BuildSetGrow'
    const description = 'How BuildSetGrow collects, uses, and handles information submitted through its website.'
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink font-sans text-ivory selection:bg-ember/30">
      <a href="#privacy-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ivory focus:px-4 focus:py-2 focus:text-graphite">Skip to content</a>
      <Header />
      <main id="privacy-main">
        <section id="top" className="relative overflow-hidden border-b border-ivory/10">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(65% 75% at 86% 26%, rgba(198,106,61,0.16), transparent 75%)' }} />
          <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-20 sm:px-8 lg:pb-24 lg:pt-28">
            <a href="/" className="inline-flex items-center gap-2 text-[13px] text-stone transition-colors hover:text-ember"><ArrowLeft size={15} /> Back to home</a>
            <Eyebrow className="mt-10">Legal &amp; privacy</Eyebrow>
            <Headline as="h1" className="mt-6 max-w-[850px] text-[52px] sm:text-[72px] lg:text-[84px]">Privacy <em className="font-light text-ember">Policy.</em></Headline>
            <p className="mt-7 max-w-[700px] text-[17px] leading-[1.8] text-stone">We respect the information you share when you contact us about your business. This policy explains what we collect through our website and how we handle it.</p>
            <p className="mt-7 text-[12px] uppercase tracking-[0.12em] text-stone">Effective November 19, 2026</p>
          </div>
        </section>

        <section className="bg-ivory text-graphite">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-24">
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">On this page</p>
                <nav aria-label="Privacy policy sections" className="mt-5">
                  <ul className="space-y-2">
                    {CONTENTS.map(([id, name]) => (
                      <li key={id}><a href={'#' + id} className="block border-l border-graphite/15 py-1.5 pl-4 text-[13.5px] text-graphite-2 transition-colors hover:border-clay hover:text-clay">{name}</a></li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            <article className="lg:col-span-8">
              <p className="pb-10 text-[15px] leading-[1.85] text-graphite-2">
                This policy applies to <a className="text-clay underline underline-offset-4" href="https://buildsetgrow.com">buildsetgrow.com</a> and our website contact inquiries. The website operates under the name BuildSetGrow. It does not describe personal information that might be processed on a client’s behalf under a future services agreement; those arrangements are governed separately.
              </p>
              <Section id="information" heading="1. Information we collect">
                <p>When you use our contact form or correspond with us, you may provide your name, work email address, company name, optional company website, optional role, the service you are interested in, and details about your business and technology needs.</p>
                <p>We also receive information you choose to include in follow-up correspondence. Please avoid submitting passwords, payment card numbers, sensitive personal information, or confidential system credentials through the website form.</p>
                <p>Our hosting and communications services may process limited technical information, such as IP address, browser details, and request or security logs, as necessary to operate and protect the website. The exact technical data retained depends on the services in use.</p>
              </Section>
              <Section id="use" heading="2. How we use information">
                <p>We use information submitted to us to respond to your inquiry, understand your business needs, discuss services you have requested, prepare potential project conversations, and maintain the correspondence needed to follow up.</p>
                <p>We do not use website inquiries to enroll you in an unrelated marketing mailing list. If we introduce optional marketing communications later, we will update our practices and provide appropriate choices.</p>
              </Section>
              <Section id="sharing" heading="3. Information sharing">
                <p>We may make information available to service providers needed to operate our website, receive contact-form submissions, deliver email, store correspondence, and maintain website security. These providers process information as part of delivering their services. We do not publish submitted inquiries or sell the contact information you provide through our form.</p>
                <p>We may also disclose information where legally required or reasonably necessary to protect our rights, users, or the security of our services. We do not disclose inquiry details to prospective clients or unrelated third parties for their own marketing.</p>
              </Section>
              <Section id="technology" heading="4. Website technology, cookies, and tracking">
                <p>We do not currently intend to use advertising pixels, behavioral advertising, or third-party analytics cookies on this website. The site’s hosting infrastructure may still use essential technical mechanisms or logs to deliver pages, troubleshoot errors, and protect against abuse.</p>
                <p>We do not currently operate a separate behavioral tracking program in response to browser “Do Not Track” signals. If analytics, advertising tools, or optional tracking are introduced, we will review the resulting disclosures and consent or choice requirements before enabling them.</p>
              </Section>
              <Section id="retention" heading="5. Retention and security">
                <p>We retain inquiries and related correspondence for as long as reasonably needed to respond, assess a potential engagement, maintain relevant business records, and meet applicable legal obligations. The precise period may vary according to the nature of the inquiry.</p>
                <p>We intend to use reasonable administrative and technical safeguards appropriate to the information we handle. However, no internet transmission or storage service can be guaranteed to be completely secure. We will not ask you to send passwords or system access credentials through the public inquiry form.</p>
              </Section>
              <Section id="choices" heading="6. Your choices and privacy requests">
                <p>You can contact us to ask what personal information you have provided through the website, request a correction, or ask us to delete an inquiry or correspondence, subject to information we need to retain for legitimate business or legal reasons.</p>
                <p>Email <a href="mailto:jkkals@gmail.com" className="font-medium text-clay underline underline-offset-4">jkkals@gmail.com</a> with the subject “Privacy Request.” We may need to verify your identity before acting on a request. Additional rights may apply depending on your location and applicable law.</p>
              </Section>
              <Section id="third-party" heading="7. Third-party websites">
                <p>Our website may link to external websites or services. Their privacy practices are governed by their own policies, which we encourage you to review.</p>
              </Section>
              <Section id="children" heading="8. Children’s privacy">
                <p>BuildSetGrow provides business services and does not direct its website to children under 13. We do not knowingly seek personal information from children. If you believe a child has submitted information through our website, please contact us so we can review and address it.</p>
              </Section>
              <Section id="changes" heading="9. Changes to this policy">
                <p>We may update this policy as our website, technology providers, or information practices change. The effective date at the top of the page will be updated when the policy changes. Where required by law, we will provide additional notice.</p>
              </Section>
              <Section id="privacy-contact" heading="10. Contact us">
                <p>For questions about this policy or the handling of information submitted through our website, contact:</p>
                <p><strong className="font-semibold text-graphite">BuildSetGrow</strong><br/><a className="text-clay underline underline-offset-4" href="mailto:jkkals@gmail.com">jkkals@gmail.com</a><br/><a className="text-clay underline underline-offset-4" href="https://buildsetgrow.com">buildsetgrow.com</a></p>
              </Section>
              <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-full border border-graphite/25 px-5 py-3 text-[13.5px] font-semibold text-graphite transition-colors hover:border-clay hover:text-clay">Return to home <ArrowUpRight size={16}/></a>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
