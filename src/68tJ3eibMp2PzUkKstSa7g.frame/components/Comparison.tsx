import React, { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, Minus } from 'lucide-react'

import { EASE_OUT } from './motion'

/** The side-by-side detail, one click away so the cards stay the primary read. */
export function Comparison() {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  return (
    <div className="mt-10 rounded-3xl border border-graphite/12">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="service-compare"
        className="flex w-full items-center justify-between gap-4 rounded-3xl px-6 py-5 text-left transition-colors duration-150 hover:bg-paper/50 sm:px-8"
      >
        <span className="font-display text-[22px] text-graphite">Compare Build, Set, and Grow</span>
        <ChevronDown size={18} aria-hidden className={`shrink-0 text-clay transition-transform duration-200 ease-out ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="service-compare"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto px-3 pb-6 sm:px-5">
              <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
                <caption className="sr-only">What each service includes</caption>
                <thead>
                  <tr className="border-b border-graphite/15">
                    <th scope="col" className="w-[40%] px-3 py-3 font-medium text-graphite-2">
                      &nbsp;
                    </th>
                    {['Build', 'Set', 'Grow'].map((h) => (
                      <th key={h} scope="col" className="px-3 py-3 font-display text-[20px] font-normal text-graphite">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r.label} className="border-b border-graphite/8 last:border-0">
                      <th scope="row" className="px-3 py-3.5 font-normal text-graphite">
                        {r.label}
                      </th>
                      {r.cells.map((c, i) => (
                        <td key={i} className="px-3 py-3.5 align-top text-graphite-2">
                          {c === true ? (
                            <Check size={16} className="text-clay" aria-label="Included" />
                          ) : c === false ? (
                            <Minus size={16} className="text-graphite/30" aria-label="Not included" />
                          ) : (
                            <span className="text-[13.5px] leading-snug">{c}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ROWS: { label: string; cells: (boolean | string)[] }[] = [
  { label: 'Business, process, and systems diagnosis', cells: [true, true, true] },
  { label: 'Solution architecture and custom software', cells: [true, true, true] },
  { label: 'Integrations and workflow automation', cells: [true, true, true] },
  { label: 'Testing, documentation, and handover', cells: [true, true, true] },
  { label: 'Internal deployment and production launch', cells: [false, true, true] },
  { label: 'Post-launch implementation support', cells: [false, '60 days hands-on, then monthly sessions for six months', true] },
  { label: 'Engineering maintenance and technical support', cells: [false, true, true] },
  { label: 'Quarterly roadmap of new capabilities', cells: [false, false, true] },
  { label: 'Employee adoption and enablement', cells: [false, false, true] },
  { label: 'Minimum term', cells: ['Project-based', '18 months from launch', '36 months from launch'] },
]
