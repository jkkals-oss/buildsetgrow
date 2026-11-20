import React from 'react'

import { Eyebrow } from './ui'
import { Reveal } from './motion'

/**
 * Audience examples live inside the combined growth-challenges section.
 * Keep the diagrams and descriptions in one reusable place.
 */
export function AudienceProfiles() {
  return (
    <div className="mt-16 border-t border-graphite/15 pt-12 lg:mt-20 lg:pt-16">
      <Reveal className="grid gap-5 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <Eyebrow tone="light">Who we help</Eyebrow>
          <h3 className="mt-5 font-display text-[30px] font-light leading-tight text-graphite sm:text-[38px]">
            Built for businesses in motion.
          </h3>
        </div>
        <p className="max-w-lg text-[15px] leading-relaxed text-graphite-2 lg:col-span-5 lg:col-start-8">
          Growth looks different across industries. The common challenge is making existing systems,
          data, and everyday work operate together as the business becomes more complex.
        </p>
      </Reveal>

      <ul className="mt-9 grid gap-4 sm:grid-cols-2">
        {AUDIENCES.map((a, i) => (
          <Reveal
            as="li"
            key={a.title}
            delay={(i % 2) * 0.05}
            className="flex h-full items-center justify-between gap-4 rounded-2xl border border-graphite/10 bg-paper/60 p-5 sm:p-6"
          >
            <div className="min-w-0">
              <h4 className="font-display text-[23px] leading-tight text-graphite">{a.title}</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-graphite-2">{a.body}</p>
            </div>
            <div className="hidden h-[78px] w-[96px] shrink-0 md:block">
              <a.Diagram />
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10 border-t border-graphite/15 pt-8">
        <p className="font-display text-[24px] font-light leading-tight text-graphite sm:text-[30px]">
          Different businesses. Different systems.
          <span className="block italic text-clay sm:inline"> One approach: build around what you already have.</span>
        </p>
      </Reveal>
    </div>
  )
}

/* ---------- abstract diagrams (illustrative) ---------- */

const S = { stroke: '#242B2D', strokeOpacity: 0.45, strokeWidth: 1.2, fill: 'none' } as const
const A = { stroke: '#A95332', strokeWidth: 1.4, fill: 'none' } as const

function MultiBusiness() {
  return (
    <svg viewBox="0 0 150 110" className="h-full w-auto" aria-hidden>
      {[12, 47, 82].map((y) => (
        <rect key={y} x="6" y={y} width="44" height="22" rx="5" {...S} />
      ))}
      {[23, 58, 93].map((y) => (
        <path key={y} d={`M50 ${y} C78 ${y} 80 55 100 55`} {...A} strokeOpacity={0.8} />
      ))}
      <rect x="100" y="34" width="44" height="42" rx="7" fill="#A95332" fillOpacity={0.08} stroke="#A95332" strokeWidth={1.4} />
      {[44, 52, 60].map((y, i) => (
        <line key={y} x1="108" x2={136 - i * 6} y1={y + 4} y2={y + 4} stroke="#A95332" strokeWidth={1.4} strokeLinecap="round" />
      ))}
    </svg>
  )
}

function Distribution() {
  const xs = [14, 52, 90, 128]
  return (
    <svg viewBox="0 0 150 110" className="h-full w-auto" aria-hidden>
      {xs.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="55" r="11" {...(i === 1 || i === 2 ? A : S)} fill={i === 1 || i === 2 ? '#A95332' : 'none'} fillOpacity={0.08} />
          {i < xs.length - 1 && <path d={`M${x + 11} 55 L${x + 27} 55`} {...A} />}
        </g>
      ))}
      <path d="M14 66 C14 92 128 92 128 66" {...S} strokeDasharray="3 4" />
      <path d="M52 44 L52 22 L90 22 L90 44" {...S} />
    </svg>
  )
}

function Services() {
  return (
    <svg viewBox="0 0 150 110" className="h-full w-auto" aria-hidden>
      <rect x="10" y="14" width="90" height="82" rx="8" {...S} />
      <line x1="10" x2="100" y1="32" y2="32" {...S} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}${c}`}
            x={18 + c * 20}
            y={40 + r * 18}
            width="14"
            height="10"
            rx="2"
            fill={(r + c) % 3 === 0 ? '#A95332' : 'none'}
            fillOpacity={(r + c) % 3 === 0 ? 0.55 : 0}
            stroke="#242B2D"
            strokeOpacity={0.3}
          />
        ))
      )}
      <path d="M100 55 C116 55 118 40 134 40" {...A} />
      <path d="M100 70 C116 70 118 82 134 82" {...A} />
      <circle cx="138" cy="40" r="5" {...A} />
      <circle cx="138" cy="82" r="5" {...A} />
    </svg>
  )
}

function MultiLocation() {
  const pins = [
    { x: 22, y: 22 },
    { x: 128, y: 26 },
    { x: 24, y: 88 },
    { x: 126, y: 86 },
  ]
  return (
    <svg viewBox="0 0 150 110" className="h-full w-auto" aria-hidden>
      {pins.map((p) => (
        <g key={`${p.x}`}>
          <path d={`M${p.x} ${p.y} L75 55`} {...A} strokeOpacity={0.75} />
          <path d={`M${p.x} ${p.y + 6} c-6 -6 -8 -10 -8 -13 a8 8 0 0 1 16 0 c0 3 -2 7 -8 13z`} {...S} fill="#F4F0E9" />
        </g>
      ))}
      <circle cx="75" cy="55" r="16" fill="#A95332" fillOpacity={0.1} stroke="#A95332" strokeWidth={1.4} />
      <circle cx="75" cy="55" r="5" fill="#A95332" />
    </svg>
  )
}

const AUDIENCES = [
  {
    title: 'Multi-business operators',
    body: 'Manage multiple companies, brands, or business units through more connected data, reporting, and operational processes.',
    Diagram: MultiBusiness,
  },
  {
    title: 'Distributors & wholesalers',
    body: 'Connect purchasing, inventory, supplier information, orders, customer records, and fulfillment processes.',
    Diagram: Distribution,
  },
  {
    title: 'Service-based businesses',
    body: 'Simplify scheduling, customer management, project coordination, invoicing, and employee workflows.',
    Diagram: Services,
  },
  {
    title: 'Growing multi-location businesses',
    body: 'Create shared visibility and repeatable processes across locations without replacing every existing system.',
    Diagram: MultiLocation,
  },
]
