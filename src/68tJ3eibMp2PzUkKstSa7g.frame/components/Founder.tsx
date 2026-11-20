import React from 'react'

import { Eyebrow, Headline } from './ui'
import { Reveal } from './motion'

export function Founder() {
  return (
    <section id="about" aria-labelledby="founder-title" className="relative bg-ivory text-graphite">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="light">Experienced product leadership. A more personal approach.</Eyebrow>
          <Headline tone="light" className="mt-6 text-[38px] sm:text-[48px] lg:text-[56px]">
            <span id="founder-title">The expertise behind BuildSetGrow.</span>
          </Headline>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* biography */}
          <Reveal className="lg:col-span-6">
            <div className="grid gap-8 sm:grid-cols-[200px_1fr] sm:items-end lg:grid-cols-[220px_1fr]">
              <img
                src="https://cdn.magicpatterns.com/uploads/6Y5FxcCoknEmPEXAYrYSE5/jas.png"
                alt="Jasleen Kals, founder of BuildSetGrow"
                width={800}
                height={800}
                loading="lazy"
                className="aspect-[4/5] w-full max-w-[260px] rounded-2xl bg-paper object-cover object-[50%_30%]"
              />
              <div>
                <p className="font-display text-[34px] leading-none text-graphite">Jasleen Kals</p>
                <p className="mt-2 text-[14px] text-clay">Founder, BuildSetGrow</p>
              </div>
            </div>

            <div className="mt-10 space-y-5 text-[15.5px] leading-relaxed text-graphite-2">
              <p className="font-display text-[21px] leading-snug text-graphite">
                BuildSetGrow was founded on a simple idea: growing businesses should be able to access sophisticated product
                and technology capabilities without building an entire internal department.
              </p>
              <p>
                Jasleen brings more than 14 years of experience leading product development, technology-enabled growth, and
                operational transformation across SaaS, AI, marketplaces, and digital businesses.
              </p>
              <p>
                Her work has involved launching new software products, redesigning operational workflows, connecting
                technology capabilities, and building product organizations responsible for measurable commercial outcomes.
              </p>
              <p>
                Today, she combines that experience with hands-on product design and AI-assisted development to help growing
                businesses solve operational problems with software built around their needs.
              </p>
            </div>
          </Reveal>

          {/* prior experience */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <h3 className="font-display text-[26px] leading-tight text-graphite">Experience in action</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-graphite-2">
                Prior leadership experience from Jasleen's previous professional roles. These are not BuildSetGrow client
                results.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {PROOF.map((p, i) => (
                <Reveal as="li" key={p.area} delay={i * 0.05} className="rounded-2xl border border-graphite/10 bg-[#FBF8F3] p-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-clay">{p.area}</p>
                  <p className="mt-4 font-display text-[30px] font-light leading-none text-graphite">{p.figure}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-graphite-2">{p.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

const PROOF = [
  {
    area: 'Operational transformation',
    company: 'Catena Media',
    figure: '2% → 80%',
    body: 'Helped redesign the product and engineering operating model, improving delivery reliability from 2% to 80%.',
  },
  {
    area: 'Product commercialization',
    company: 'Searchmetrics',
    figure: '~$2M ARR',
    body: 'Helped develop and launch a content planning and optimization product integrated with an existing SEO platform, generating approximately $2M in ARR and a $7M pipeline.',
  },
  {
    area: 'Product simplification',
    company: 'MarketMuse',
    figure: '50% → 90%',
    body: 'Developed a self-service product offering as part of a product strategy that improved retention from 50% to 90%.',
  },
]
