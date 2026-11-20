import React from 'react'
import { Unplug, FolderOpen, Repeat2, Network } from 'lucide-react'

import { Eyebrow, Headline } from './ui'
import { Reveal } from './motion'
import { LeafCluster } from './leaves/LeafCluster'
import { AudienceProfiles } from './WhoWeHelp'

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="relative bg-ivory text-graphite">
      <LeafCluster preset="problemEdge" />
      <div className="relative mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <Eyebrow tone="light">When growth outpaces your systems</Eyebrow>
            <Headline tone="light" className="mt-6 text-[38px] sm:text-[48px] lg:text-[54px]">
              <span id="problem-title">
                Your business has evolved. <span className="italic text-clay">Your technology hasn't kept up.</span>
              </span>
            </Headline>
          </Reveal>
          <Reveal delay={0.05} className="space-y-5 text-[16px] leading-relaxed text-graphite-2 lg:col-span-6 lg:col-start-7 lg:pt-14">
            <p>As businesses grow, the systems that once worked independently become harder to manage together.</p>
            <p>
              Customer information lives in one place. Orders and invoices live somewhere else. Employees spend time moving
              information between tools, reconstructing reports, and coordinating processes that should already be
              connected.
            </p>
            <p className="font-display text-[22px] leading-snug text-graphite">
              The result isn't always a technology problem. It's an operational problem that technology can solve.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {PROBLEMS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.04} className="flex h-full flex-col rounded-2xl border border-graphite/10 bg-paper/60 p-6">
              <p.Icon size={20} strokeWidth={1.5} className="text-clay" aria-hidden />
              <h3 className="mt-8 text-[15px] font-semibold text-graphite">{p.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-graphite-2">{p.body}</p>
            </Reveal>
          ))}
        </ul>

        <AudienceProfiles />
      </div>
    </section>
  )
}

const PROBLEMS = [
  {
    title: 'Disconnected systems',
    body: "Your applications hold valuable information, but they don't work together the way your business needs them to.",
    Icon: Unplug,
  },
  {
    title: 'Scattered information',
    body: 'Critical business data is spread across spreadsheets, documents, emails, and multiple platforms.',
    Icon: FolderOpen,
  },
  {
    title: 'Manual workflows',
    body: 'Your team spends valuable time transferring information, reconciling records, and managing repetitive tasks.',
    Icon: Repeat2,
  },
  {
    title: 'Growing complexity',
    body: 'New customers, contracts, employees, locations, and business entities add operational demands faster than your processes can adapt.',
    Icon: Network,
  },
]
