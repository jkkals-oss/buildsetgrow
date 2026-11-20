import React from 'react'

import { Eyebrow, Headline } from './ui'
import { Reveal } from './motion'
import { LeafCluster } from './leaves/LeafCluster'

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="relative bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(45% 35% at 85% 10%, rgba(198,106,61,0.10), transparent 70%)' }}
      />
      <LeafCluster preset="whyEdge" />
      <div className="relative mx-auto max-w-[1240px] px-5 py-28 sm:px-8 lg:py-40">
        <Reveal className="max-w-5xl">
          <Eyebrow>A different approach to business technology</Eyebrow>
          <Headline className="mt-8 text-[40px] sm:text-[58px] lg:text-[72px]">
            <span id="why-title">
              You don't need another software subscription.{' '}
              <span className="italic text-ember">You need your technology to work for you.</span>
            </span>
          </Headline>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <Reveal className="space-y-6 lg:col-span-5">
            <p className="text-[15.5px] leading-relaxed text-stone">
              Traditional software often asks businesses to adapt their operations around a predefined product.
            </p>
            <p className="text-[15.5px] leading-relaxed text-stone">
              Traditional custom development can require large budgets, lengthy projects, and ongoing technical resources.
            </p>
            <p className="font-display text-[24px] leading-snug text-ivory">BuildSetGrow offers another approach.</p>
            <p className="text-[15.5px] leading-relaxed text-stone">
              We combine experienced product leadership, operational problem-solving, and modern AI-assisted development to
              deliver software tailored to your business.
            </p>
          </Reveal>

          <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
            {POINTS.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.04} className="border-t border-ivory/12 py-7">
                <dt className="font-display text-[22px] leading-tight text-ivory">{p.k}</dt>
                <dd className="mt-3 text-[14.5px] leading-relaxed text-stone">{p.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal className="mt-20 lg:mt-28">
          <p className="font-display text-[32px] font-light leading-tight text-ivory sm:text-[44px]">
            Built for your business. <span className="italic text-stone">Not the other way around.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const POINTS = [
  { k: 'Business first', v: 'We diagnose the operational problem before designing the technical solution.' },
  {
    k: 'Built around what you own',
    v: 'We work with existing applications and data wherever practical rather than requiring unnecessary system replacements.',
  },
  {
    k: 'Modern development, lean delivery',
    v: 'We use modern development tools and AI-assisted workflows to reduce unnecessary development overhead.',
  },
  {
    k: 'Your software. Your choice.',
    v: 'Your business retains ownership of its data and the agreed rights to its custom software. Choose whether to manage it internally or continue working with us.',
  },
]
