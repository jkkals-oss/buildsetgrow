import React, { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

import { Eyebrow, Headline } from './ui'
import { EASE_OUT, Reveal } from './motion'
import { LeafCluster } from './leaves/LeafCluster'
import { Comparison } from './Comparison'
import type { ServiceInterest } from './content'

export function Services({ onChoose }: { onChoose: (s: ServiceInterest) => void }) {
  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-ivory text-graphite">
      <LeafCluster preset="services" />
      <div className="relative mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow tone="light">Our services</Eyebrow>
            <Headline tone="light" className="mt-6 text-[38px] sm:text-[50px] lg:text-[58px]">
              <span id="services-title">The right partnership for where your business is today.</span>
            </Headline>
          </div>
          <div className="space-y-3 text-[15.5px] leading-relaxed text-graphite-2 lg:col-span-4 lg:col-start-9">
            <p>
              Some businesses need a custom solution they can manage independently. Others need help launching,
              maintaining, and evolving their systems.
            </p>
            <p className="text-graphite">Choose the level of partnership that fits your business.</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr_auto_auto] lg:gap-x-5 lg:gap-y-0">
          <BuildCard onChoose={onChoose} />
          <SetCard onChoose={onChoose} />
          <GrowCard onChoose={onChoose} />
        </div>

        <Comparison />
      </div>
    </section>
  )
}

/* ---------- cards ---------- */
/* Each card spans the five shared rows (name, description, includes, terms, action) so their parts line up. */

function BuildCard({ onChoose }: { onChoose: (s: ServiceInterest) => void }) {
  return (
    <article
      aria-labelledby="svc-build"
      className="group grid gap-6 rounded-3xl border border-graphite/12 bg-paper/50 p-7 transition-[transform,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-graphite/25 sm:p-8 lg:row-span-5 lg:grid-rows-subgrid lg:gap-y-7"
    >
      <CardHead id="svc-build" name="Build" lines={['We build it.', 'You take it from there.']} tone="light" />
      <p className="text-[15px] leading-relaxed text-graphite-2">
        We diagnose your operational challenges, design the right solution, and develop custom software that works
        around your business needs.
      </p>
      <div>
        <ListLabel tone="light">Includes</ListLabel>
        <Checklist tone="light" items={BUILD_ITEMS} />
      </div>
      <Terms
        tone="light"
        rows={[
          { k: 'Best for', v: 'Businesses with the internal resources to deploy, manage, and maintain their new software.' },
          { k: 'Contract', v: 'Project-based engagement.' },
        ]}
      />
      <CardCta tone="light" label="Explore Build" onClick={() => onChoose('Build')} />
    </article>
  )
}

function SetCard({ onChoose }: { onChoose: (s: ServiceInterest) => void }) {
  return (
    <article
      aria-labelledby="svc-set"
      className="group grid gap-6 rounded-3xl border border-clay/35 bg-[#FBF8F3] p-7 transition-[transform,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-clay/70 sm:p-8 lg:row-span-5 lg:grid-rows-subgrid lg:gap-y-7"
    >
      <CardHead id="svc-set" name="Set" lines={['We build it.', 'We launch it.', 'We maintain it.']} tone="light" accent />
      <p className="text-[15px] leading-relaxed text-graphite-2">
        Everything in Build, plus hands-on implementation and ongoing engineering maintenance so your team can confidently
        put its new software to work.
      </p>
      <div>
        <ListLabel tone="light">Everything in Build, plus</ListLabel>
        <Checklist tone="light" accent items={SET_ITEMS} />
      </div>
      <Terms
        tone="light"
        rows={[
          { k: 'Contract', v: 'Minimum 18-month engineering maintenance agreement beginning at production launch.' },
          {
            k: 'After implementation',
            v: 'The ongoing relationship focuses on engineering maintenance unless additional services are agreed.',
          },
        ]}
      />
      <CardCta tone="light" accent label="Explore Set" onClick={() => onChoose('Set')} />
    </article>
  )
}

function GrowCard({ onChoose }: { onChoose: (s: ServiceInterest) => void }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  return (
    <article
      aria-labelledby="svc-grow"
      className="group relative grid gap-6 overflow-hidden rounded-3xl border border-ember/40 bg-ink p-7 text-ivory transition-[transform,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-ember/80 sm:p-8 lg:row-span-5 lg:grid-rows-subgrid lg:gap-y-7"
    >
      {/* layered warmth: two offset arcs of light, kept behind the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 40% at 100% 0%, rgba(198,106,61,0.22), transparent 70%), radial-gradient(50% 30% at 0% 100%, rgba(169,83,50,0.14), transparent 70%)',
        }}
      />
      <div className="relative">
        <CardHead id="svc-grow" name="Grow" lines={['We build it.', 'We embed it.', 'We evolve it.']} tone="dark" accent />
      </div>
      <p className="relative text-[15px] leading-relaxed text-stone">
        An ongoing product and technology partnership that helps your software evolve alongside your business.
      </p>
      <div className="relative">
        <ListLabel tone="dark">Everything in Build and Set, plus</ListLabel>
        <dl className="mt-4 space-y-4">
          {GROW_SERVICES.map((s) => (
            <div key={s.k} className="border-l border-ember/50 pl-4">
              <dt className="text-[14px] font-semibold text-ivory">{s.k}</dt>
              <dd className="mt-1 text-[13.5px] leading-relaxed text-stone">{s.v}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="grow-quarterly"
          className="mt-5 flex w-full items-center justify-between rounded-xl border border-ivory/12 px-4 py-3 text-left text-[13.5px] font-medium text-ivory transition-colors duration-150 hover:border-ember/60"
        >
          Quarterly delivery process
          <ChevronDown size={16} aria-hidden className={`text-ember transition-transform duration-200 ease-out ${open ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ol
              id="grow-quarterly"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              {QUARTERLY.map((q, i) => (
                <li key={q} className="flex gap-3 pt-3 text-[13.5px] leading-relaxed text-stone first:pt-4">
                  <span className="w-4 shrink-0 font-display text-ember">{i + 1}</span>
                  {q}
                </li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>
      </div>
      <div className="relative">
        <Terms
          tone="dark"
          rows={[
            {
              k: 'Contract',
              v: 'Minimum 36-month system growth, adoption, and maintenance partnership beginning at production launch.',
            },
            {
              k: 'After the contract',
              v: 'Continue with adoption and maintenance, enter a new agreement for additional system development, or transition operational responsibility internally.',
            },
          ]}
        />
      </div>
      <div className="relative">
        <CardCta tone="dark" accent label="Explore Grow" onClick={() => onChoose('Grow')} />
      </div>
    </article>
  )
}

/* ---------- parts ---------- */

function CardHead({ id, name, lines, tone, accent }: { id: string; name: string; lines: string[]; tone: 'light' | 'dark'; accent?: boolean }) {
  return (
    <header>
      <h3 id={id} className={`font-display text-[44px] font-light leading-none tracking-[-0.02em] ${tone === 'dark' ? 'text-ivory' : 'text-graphite'}`}>
        {name}
      </h3>
      <p className={`mt-4 font-display text-[19px] italic leading-snug ${accent ? (tone === 'dark' ? 'text-terracotta' : 'text-clay') : 'text-graphite-2'}`}>
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </p>
    </header>
  )
}

function ListLabel({ children, tone }: { children: React.ReactNode; tone: 'light' | 'dark' }) {
  return <p className={`text-[12px] font-semibold uppercase tracking-[0.12em] ${tone === 'dark' ? 'text-stone' : 'text-graphite-2'}`}>{children}</p>
}

function Checklist({ items, tone, accent }: { items: string[]; tone: 'light' | 'dark'; accent?: boolean }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((it) => (
        <li key={it} className={`flex gap-3 text-[14px] leading-snug ${tone === 'dark' ? 'text-stone' : 'text-graphite-2'}`}>
          <span aria-hidden className={`mt-[9px] h-px w-3 shrink-0 ${accent ? 'bg-clay' : 'bg-graphite/40'}`} />
          {it}
        </li>
      ))}
    </ul>
  )
}

function Terms({ rows, tone }: { rows: { k: string; v: string }[]; tone: 'light' | 'dark' }) {
  return (
    <dl className={`space-y-3 border-t pt-5 ${tone === 'dark' ? 'border-ivory/12' : 'border-graphite/12'}`}>
      {rows.map((r) => (
        <div key={r.k}>
          <dt className={`text-[12.5px] font-semibold ${tone === 'dark' ? 'text-ivory' : 'text-graphite'}`}>{r.k}</dt>
          <dd className={`mt-0.5 text-[13.5px] leading-relaxed ${tone === 'dark' ? 'text-stone' : 'text-graphite-2'}`}>{r.v}</dd>
        </div>
      ))}
    </dl>
  )
}

function CardCta({ label, onClick, tone, accent }: { label: string; onClick: () => void; tone: 'light' | 'dark'; accent?: boolean }) {
  const style =
    tone === 'dark'
      ? 'bg-ember text-ink hover:bg-terracotta'
      : accent
        ? 'bg-clay text-ivory hover:bg-ember hover:text-ink'
        : 'border border-graphite/25 text-graphite hover:border-graphite hover:bg-graphite hover:text-ivory'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex w-full items-center justify-between rounded-full px-6 py-3.5 text-sm font-semibold transition-[background-color,color,border-color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember ${style}`}
    >
      {label}
      <ArrowRight size={16} aria-hidden className="transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
    </button>
  )
}

const BUILD_ITEMS = [
  'Business and process diagnosis',
  'Existing systems assessment',
  'Solution architecture',
  'Custom software design and development',
  'Integrations and workflow automation',
  'Testing and technical documentation',
  'Software handover and knowledge transfer',
]

const SET_ITEMS = [
  'Internal deployment and production launch',
  '60 days of hands-on post-launch implementation support',
  'One-hour monthly implementation sessions for six months after launch',
  'Engineering maintenance and technical support',
  'System reliability and required technical updates',
  'Technical issue resolution within agreed support terms',
]

const GROW_SERVICES = [
  {
    k: 'System growth',
    v: 'An agreed quarterly roadmap of feature enhancements, integrations, and new capabilities delivered within contracted development capacity.',
  },
  {
    k: 'Adoption',
    v: 'Employee onboarding, internal communications, training videos, enablement materials, usage monitoring, and continued adoption support.',
  },
  {
    k: 'Maintenance',
    v: 'Engineering maintenance, technical support, system monitoring, security updates, and software reliability.',
  },
]

const QUARTERLY = [
  'Review business needs and system performance.',
  'Recommend product improvements.',
  'Agree on quarterly features and delivery priorities.',
  'Develop and deploy the agreed capabilities.',
  'Support employee adoption.',
  'Review results and plan the next quarter.',
]
