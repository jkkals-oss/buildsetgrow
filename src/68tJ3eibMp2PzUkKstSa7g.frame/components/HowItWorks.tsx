import React, { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'

import { Eyebrow, Headline } from './ui'
import { Reveal } from './motion'
import { LeafCluster } from './leaves/LeafCluster'

export function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const [reached, setReached] = useState(reduced ? STEPS.length : 0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduced) return
    setReached(Math.min(STEPS.length, Math.floor(v * STEPS.length + 0.35)))
  })

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative bg-ink">
      <LeafCluster preset="timeline" />
      <div className="relative mx-auto grid max-w-[1240px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow>Our approach</Eyebrow>
              <Headline className="mt-6 text-[38px] sm:text-[48px] lg:text-[54px]">
                <span id="how-title">From operational complexity to working software.</span>
              </Headline>
              <p className="mt-7 max-w-md text-[15.5px] leading-relaxed text-stone">
                You understand your business. We bring the product and technology expertise to turn that knowledge into
                better ways of working.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol ref={listRef} className="relative">
            {/* rail + progress */}
            <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-ivory/10" />
            <motion.span
              aria-hidden
              className="absolute bottom-6 left-[19px] top-6 w-px origin-top bg-ember"
              style={{ scaleY: reduced ? 1 : progress }}
            />
            {STEPS.map((s, i) => {
              const on = i < reached
              return (
                <li key={s.n} className="relative grid grid-cols-[40px_1fr] gap-5 pb-12 last:pb-0 sm:gap-7">
                  <span
                    className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border font-display text-[15px] transition-[background-color,border-color,color] duration-300 ease-out ${
                      on ? 'border-ember bg-ember text-ink' : 'border-ivory/20 bg-ink text-stone'
                    }`}
                  >
                    {s.n}
                  </span>
                  <div className={`pt-1.5 transition-opacity duration-300 ease-out ${on ? 'opacity-100' : 'opacity-55'}`}>
                    <h3 className="font-display text-[26px] leading-tight text-ivory sm:text-[30px]">{s.title}</h3>
                    {s.scope && <p className="mt-1.5 text-[12.5px] font-medium text-ember">{s.scope}</p>}
                    <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-stone">{s.body}</p>
                  </div>
                </li>
              )
            })}
          </ol>

          <a href="/our-process" className="group mt-12 inline-flex items-center gap-2 rounded-full border border-ember/60 px-6 py-3 text-[14px] font-medium text-ivory transition-colors hover:bg-ember hover:text-ink">Explore our full process <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>

          <Reveal className="mt-16 border-t border-ivory/10 pt-10">
            <p className="font-display text-[24px] font-light leading-snug text-stone sm:text-[28px]">
              No unnecessary complexity. No technology for technology's sake.{' '}
              <span className="text-ivory">Just software designed to help your business work better.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    scope: null,
    body: 'We learn how your business operates, review your existing systems, and identify the problems worth solving.',
  },
  {
    n: '02',
    title: 'Design',
    scope: null,
    body: 'We translate those findings into an application architecture, connected workflows, and an implementation plan.',
  },
  {
    n: '03',
    title: 'Build',
    scope: null,
    body: 'We develop your bespoke software, integrating existing technology and automating the processes that need improvement.',
  },
  {
    n: '04',
    title: 'Implement',
    scope: 'Set and Grow',
    body: 'We deploy the solution internally, support implementation, and help your organization transition to the new workflows.',
  },
  {
    n: '05',
    title: 'Evolve',
    scope: 'Grow',
    body: 'We continuously assess operational needs, recommend enhancements, agree on quarterly priorities, and deliver additional capabilities.',
  },
]
