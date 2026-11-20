import React, { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'

import { Headline } from './ui'
import { EASE_OUT, Reveal } from './motion'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()
  const base = useId()

  return (
    <section aria-labelledby="faq-title" className="relative bg-ink-2">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <Reveal className="lg:col-span-4">
          <Headline className="text-[40px] sm:text-[52px]">
            <span id="faq-title">
              Questions <span className="italic text-ember">worth asking.</span>
            </span>
          </Headline>
          <p className="mt-6 max-w-xs text-[14.5px] leading-relaxed text-stone">
            Something else on your mind?{' '}
            <a href="#contact" className="text-ivory underline decoration-ember/60 underline-offset-4 transition-colors duration-150 hover:text-terracotta">
              Ask us directly.
            </a>
          </p>
        </Reveal>

        <div className="border-t border-ivory/12 lg:col-span-8">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            const btnId = `${base}-q${i}`
            const panelId = `${base}-a${i}`
            return (
              <div key={f.q} className="border-b border-ivory/12">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`font-display text-[20px] leading-snug transition-colors duration-150 sm:text-[23px] ${
                        isOpen ? 'text-ivory' : 'text-ivory/85 group-hover:text-terracotta'
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-[transform,border-color,color] duration-200 ease-out ${
                        isOpen ? 'rotate-45 border-ember text-ember' : 'border-ivory/20 text-stone group-hover:border-ember/60'
                      }`}
                    >
                      <Plus size={14} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.25, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-12 text-[15px] leading-relaxed text-stone">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  {
    q: 'Do we need to replace our existing software?',
    a: 'Usually, no. Our approach starts with the systems you already use. We identify where integrations, improved workflows, or custom applications can make those investments work better together.',
  },
  {
    q: "What if we don't know exactly what we need?",
    a: "That's where we start. We work with you to understand your operations, identify bottlenecks, and determine which software capabilities would make the biggest difference.",
  },
  {
    q: 'Who owns the software?',
    a: 'Your business retains ownership of its data and receives the ownership or licensing rights to its custom software defined in the project agreement. Our services are designed to support your independence, not create unnecessary dependency.',
  },
  {
    q: 'Do we need an internal technical team?',
    a: 'No. BuildSetGrow can provide product design and development, while Set and Grow add implementation, maintenance, and ongoing support. Build is intended for customers prepared to take over technical operations after handover.',
  },
  {
    q: 'Do you use AI to develop software?',
    a: 'We use modern development tools, including AI-assisted technologies, where they improve efficiency and delivery. The focus remains on building reliable solutions that meet your business requirements.',
  },
  {
    q: 'What happens after our service contract ends?',
    a: 'Set begins with a 6-month commitment and Grow with a 12-month commitment from production launch. Both continue month to month after their initial term, with 60 days' notice to end. We can also discuss a change in service level or an operational handover.',
  },
  {
    q: 'How much does a project cost?',
    a: 'Pricing depends on the systems involved, the complexity of the workflows, and the level of implementation or ongoing support required. We define project scope, deliverables, and commercial terms before development begins.',
  },
]
