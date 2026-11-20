import React from 'react'

import { Eyebrow, Headline } from './ui'
import { Reveal } from './motion'
import { BeforeAfter } from './BeforeAfter'

export function WhatWeDo() {
  return (
    <section id="what-we-do" aria-labelledby="wwd-title" className="relative bg-ink">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Software built around your business</Eyebrow>
            <Headline className="mt-6 text-[38px] sm:text-[50px] lg:text-[58px]">
              <span id="wwd-title">
                We connect the dots.
                <br />
                <span className="italic text-stone">Then we build what's missing.</span>
              </span>
            </Headline>
            <div className="mt-8 max-w-xl space-y-4 text-[15.5px] leading-relaxed text-stone">
              <p>
                We start by understanding your business, including how information moves, how work gets done, and where your existing
                technology falls short. Then we design and build software tailored to those operational needs.
              </p>
              <p>
                Sometimes that means connecting applications you already use. Sometimes it means automating an entire
                process. And sometimes it means building a new workspace that brings everything together.
              </p>
              <p className="text-ivory">We build what's needed, not unnecessary technology.</p>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            <dl className="divide-y divide-ivory/10 border-y border-ivory/10">
              {CAPABILITIES.map((c) => (
                <div key={c.term} className="grid grid-cols-[96px_1fr] gap-4 py-6 sm:grid-cols-[120px_1fr]">
                  <dt className="font-display text-[22px] leading-tight text-ember">{c.term}</dt>
                  <dd className="text-[14.5px] leading-relaxed text-stone">{c.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-20 lg:mt-28">
          <BeforeAfter />
        </Reveal>
      </div>
    </section>
  )
}

const CAPABILITIES = [
  { term: 'Connect', body: 'Integrate existing applications, business systems, and data sources.' },
  { term: 'Organize', body: 'Turn fragmented information and unstructured documents into accessible, useful business data.' },
  { term: 'Automate', body: 'Reduce repetitive tasks, manual handoffs, and disconnected workflows.' },
  { term: 'Empower', body: 'Give employees and leadership the tools, visibility, and capabilities needed to operate more effectively.' },
]
