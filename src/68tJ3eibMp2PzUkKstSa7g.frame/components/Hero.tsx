import React from 'react'
import { ArrowRight } from 'lucide-react'

import { Button, Eyebrow, Headline } from './ui'
import { FallingLeaves } from './leaves/FallingLeaves'
import { SystemsVisual } from './SystemsVisual'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative -mt-[72px] overflow-hidden pt-[72px]">
      {/* warm ambient light, low and to the right, behind the systems visual */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 78% 42%, rgba(198,106,61,0.16), transparent 70%), radial-gradient(40% 40% at 8% 100%, rgba(169,83,50,0.10), transparent 70%)',
        }}
      />
      <FallingLeaves />

      <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-14 px-5 pb-36 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-44 lg:pt-24">
        <div className="min-w-0 lg:col-span-7">
          <Eyebrow>Custom software for growing businesses</Eyebrow>
          <Headline as="h1" className="mt-7 text-[44px] sm:text-[60px] lg:text-[68px]">
            <span id="hero-title">
              Your business is growing.
              <br />
              <span className="italic text-stone">Your systems should keep up.</span>
            </span>
          </Headline>
          <p className="mt-8 max-w-xl font-display text-[22px] leading-snug text-ivory sm:text-2xl">
            Your business already has the tools. <span className="text-ember">We make them work together.</span>
          </p>
          <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-stone">
            BuildSetGrow connects your existing technology, organizes fragmented data, and builds custom software around
            the way your business operates. You don't need an internal product or engineering team.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="#contact">
              Let's Talk About Your Business <ArrowRight size={16} aria-hidden />
            </Button>
            <Button href="#services" variant="ghost">
              Explore Our Services
            </Button>
          </div>
          <ul className="mt-12 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-[13.5px] text-stone md:flex-row md:gap-0 md:divide-x md:divide-ivory/10">
            {['Built around your business.', 'Designed for your existing systems.', 'Yours to own.'].map((t, i) => (
              <li key={t} className={`flex items-center gap-2.5 whitespace-nowrap ${i === 0 ? 'md:pr-5' : 'md:px-5'}`}>
                <span aria-hidden className="h-1 w-1 rounded-full bg-ember md:hidden" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <SystemsVisual />
        </div>
      </div>
    </section>
  )
}
