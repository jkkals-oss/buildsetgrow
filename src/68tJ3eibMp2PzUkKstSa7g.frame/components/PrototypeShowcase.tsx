import React from 'react'
import { ArrowUpRight, Boxes, Building2, Layers, ShieldAlert, Sparkles } from 'lucide-react'
import { Eyebrow, Headline } from './ui'
import { Reveal } from './motion'

/** Illustrative preview derived from the Pockets prototype, not a live product. */
function PocketsPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#293451] bg-[#0C1426] text-[#E9EDF8] shadow-[0_25px_70px_-30px_rgba(0,0,0,0.65)]">
      <div className="flex items-center justify-between gap-3 border-b border-[#293451] bg-[#141E33] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#78A7FF] to-[#42CBC0] font-bold text-[#0C1426]">P</div>
          <div><p className="text-sm font-semibold">Pockets</p><p className="text-[10px] text-[#8C9AB5]">Distributor workspace</p></div>
        </div>
        <span className="rounded-full border border-[#635437] bg-[#342D24] px-3 py-1 text-[10px] font-medium text-[#F4C064]">Demo data</span>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:gap-5 sm:p-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="lg:col-span-2">
          <p className="text-xl font-semibold sm:text-2xl">Good morning, Elena</p>
          <p className="mt-1 text-xs text-[#9AA8BF]">Cascade Cellars Distribution · Full portfolio</p>
        </div>
        <div className="rounded-xl border border-[#27334B] bg-[#141E33] p-5">
          <p className="text-xs text-[#9AA8BF]">Annual run capacity</p>
          <div className="mt-3 flex flex-wrap items-baseline gap-2"><span className="text-4xl font-semibold">744</span><span className="text-xs text-[#9AA8BF]">of 2,400 runs remaining</span></div>
          <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-[#28354F]"><div className="w-[69%] bg-[#688CFF]"/><div className="w-[9%] bg-[#369E99]"/></div>
          <div className="mt-4 flex justify-between gap-2 text-[10px] text-[#9AA8BF]"><span>Purchased: 2,400</span><span>Consumed: 1,656</span><span>Scheduled: 219</span></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Building2, value: '22', label: 'Connected businesses' },
            { icon: Layers, value: '18', label: 'Active this month' },
            { icon: Boxes, value: '8', label: 'Orders to fulfill' },
            { icon: ShieldAlert, value: '13', label: 'Need attention' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[#27334B] bg-[#141E33] p-3 sm:p-4">
              <stat.icon size={15} className="text-[#7696F7]" aria-hidden />
              <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
              <p className="mt-1 text-[10px] leading-relaxed text-[#9AA8BF]">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-[#27334B] bg-[#141E33] lg:col-span-2">
          <div className="border-b border-[#27334B] px-4 py-4 sm:px-5">
            <p className="flex items-center gap-2 text-sm font-semibold"><Sparkles size={15} className="text-[#53C9BA]"/> Operational intelligence</p>
            <p className="mt-1 text-[11px] text-[#9AA8BF]">What needs a person today. Routine accounts are handled by scheduled runs.</p>
          </div>
          <div className="grid gap-px bg-[#27334B] sm:grid-cols-3">
            {[
              { color: '#F0717B', title: 'Critical stockout warnings', body: 'Fast moving items have fallen below safety stock.' },
              { color: '#F4C064', title: 'Forecast confidence', body: 'Latest run incomplete. Review the affected account.' },
              { color: '#53C9BA', title: 'Replenishment opportunities', body: 'Draft orders await business approval.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#141E33] p-4">
                <p className="flex items-start gap-2 text-[11px] font-medium"><span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }}/>{item.title}</p>
                <p className="mt-3 text-[11px] leading-relaxed text-[#9AA8BF]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PrototypeShowcase() {
  return (
    <section aria-labelledby="prototype-title" className="border-t border-ivory/10 bg-ink">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-24">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Example of what we can build</Eyebrow>
            <Headline className="mt-5 text-[38px] sm:text-[48px]">
              <span id="prototype-title">From disconnected operations to <em className="text-ember">one connected workspace.</em></span>
            </Headline>
          </div>
          <p className="text-[15px] leading-relaxed text-stone lg:col-span-5">
            <strong className="font-medium text-ivory">Pockets</strong> is a prototype exploring how distributors can bring business accounts, inventory intelligence, replenishment workflows, and order management into one operating platform.
          </p>
        </Reveal>
        <Reveal className="mt-10">
          <PocketsPreview />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12.5px] text-stone italic">Concept prototype developed by BuildSetGrow. Illustrative functionality only.</p>
            <a href="#contact" className="inline-flex items-center gap-2 self-start text-[13px] font-semibold text-terracotta transition-colors hover:text-ember">
              Let's Talk About Your Business <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
