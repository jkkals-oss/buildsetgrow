import React from 'react'

import { Eyebrow, Headline } from './ui'
import { Reveal } from './motion'

export function WhoWeHelp() {
  return (
    <section aria-labelledby="who-title" className="relative bg-ivory text-graphite">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="light">Built for businesses in motion</Eyebrow>
          <Headline tone="light" className="mt-6 text-[38px] sm:text-[48px] lg:text-[54px]">
            <span id="who-title">For businesses growing faster than their operations can keep up.</span>
          </Headline>
          <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-graphite-2">
            We work with ambitious, established businesses that have invested in technology but lack the internal product
            and engineering capacity to make their systems work together.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20">
          {AUDIENCES.map((a, i) => (
            <Reveal
              as="li"
              key={a.title}
              delay={(i % 2) * 0.05}
              className="grid h-full grid-cols-1 gap-6 rounded-3xl border border-graphite/10 bg-paper/50 p-6 sm:p-7 md:grid-cols-[1fr_150px] md:items-center"
            >
              <div className="order-2 md:order-1">
                <h3 className="font-display text-[26px] leading-tight text-graphite">{a.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-graphite-2">{a.body}</p>
              </div>
              <div className="order-1 flex h-[110px] items-center md:order-2 md:h-[130px] md:justify-center">
                <a.Diagram />
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 flex flex-col gap-2 border-t border-graphite/15 pt-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <p className="font-display text-[26px] font-light leading-tight text-graphite-2 sm:text-[30px]">
            Different businesses. Different systems.
          </p>
          <p className="font-display text-[26px] leading-tight text-graphite sm:text-[30px]">
            One approach: <span className="italic text-clay">build around what you already have.</span>
          </p>
        </Reveal>
      </div>
    </section>
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
