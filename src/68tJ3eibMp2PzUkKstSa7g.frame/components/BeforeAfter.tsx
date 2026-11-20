import React, { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Boxes, FileSpreadsheet, FileText, Mail, Receipt, Users } from 'lucide-react'

import { EASE_OUT } from './motion'

type View = 'before' | 'after'

/** An illustrative before/after of how systems relate. Not a real implementation. */
export function BeforeAfter() {
  const [view, setView] = useState<View>('before')
  const reduced = useReducedMotion()
  const after = view === 'after'
  const t = { duration: reduced ? 0 : 0.3, ease: EASE_OUT }

  return (
    <div className="overflow-hidden rounded-3xl border border-ivory/10 bg-ink-2">
      <div className="flex flex-col gap-5 border-b border-ivory/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <h3 className="font-display text-[24px] leading-tight text-ivory sm:text-[28px]">
            {after ? 'After: connected and coordinated' : 'Before: disconnected and manual'}
          </h3>
          <p className="mt-1 text-[12.5px] text-stone">An illustrative example, not a customer implementation.</p>
        </div>
        <div role="radiogroup" aria-label="Diagram view" className="relative flex shrink-0 rounded-full border border-ivory/15 p-1">
          {(['before', 'after'] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={view === v}
              onClick={() => setView(v)}
              className={`relative z-10 rounded-full px-5 py-2 text-[13px] font-semibold capitalize transition-colors duration-150 ${
                view === v ? 'text-ink' : 'text-stone hover:text-ivory'
              }`}
            >
              {view === v && (
                <motion.span layoutId="ba-pill" transition={t} className="absolute inset-0 -z-10 rounded-full bg-ember" />
              )}
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12">
        <div className="relative aspect-[4/5] min-w-0 sm:aspect-[16/10] lg:col-span-8 lg:aspect-auto lg:min-h-[440px]">
          <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <AnimatePresence mode="wait">
              {after ? (
                <motion.g key="after" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t}>
                  {NODES.map((n) => (
                    <motion.path
                      key={n.id}
                      d={`M${n.after.x} ${n.after.y} L50 50`}
                      stroke="#C66A3D"
                      strokeWidth={1.25}
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: reduced ? 1 : 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ ...t, delay: reduced ? 0 : 0.1 }}
                    />
                  ))}
                </motion.g>
              ) : (
                <motion.g key="before" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t}>
                  {BROKEN.map(([a, b], i) => {
                    const A = NODES[a].before
                    const B = NODES[b].before
                    return (
                      <path
                        key={i}
                        d={`M${A.x} ${A.y} L${B.x} ${B.y}`}
                        stroke="#B7B1A9"
                        strokeOpacity={0.35}
                        strokeWidth={1}
                        strokeDasharray="3 5"
                        vectorEffect="non-scaling-stroke"
                      />
                    )
                  })}
                </motion.g>
              )}
            </AnimatePresence>
          </svg>

          <AnimatePresence>
            {after && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={t}
                className="absolute left-1/2 top-1/2 z-10 w-[40%] max-w-[220px] -translate-x-1/2 -translate-y-1/2"
              >
                <div className="rounded-2xl border border-ember/50 bg-ink px-3 py-3 text-center sm:px-4">
                  <p className="font-display text-[15px] leading-tight text-ivory sm:text-[18px]">Shared operational data</p>
                  <p className="mt-1 text-[10.5px] text-stone sm:text-[11.5px]">One view, kept current</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {NODES.map((n) => {
            const pos = after ? n.after : n.before
            return (
              <motion.div
                key={n.id}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                initial={false}
                animate={{ left: `${pos.x}%`, top: `${pos.y}%`, rotate: after ? 0 : n.tilt }}
                transition={t}
              >
                <div
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-colors duration-200 sm:gap-2 sm:px-3 sm:py-2 sm:text-[12.5px] ${
                    after ? 'border-ember/40 bg-ink-3 text-ivory' : 'border-ivory/10 bg-ink-3/70 text-stone'
                  }`}
                >
                  <n.Icon size={14} strokeWidth={1.6} className={after ? 'text-ember' : 'text-stone/70'} aria-hidden />
                  {n.label}
                </div>
                {!after && n.note && (
                  <p className="mt-1.5 hidden text-center font-display text-[13px] italic text-stone/80 sm:block">{n.note}</p>
                )}
              </motion.div>
            )
          })}
        </div>

        <div className="border-t border-ivory/10 p-6 sm:p-8 lg:col-span-4 lg:border-l lg:border-t-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={view}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0 : 0.2, ease: EASE_OUT }}
              className="space-y-6"
            >
              {(after ? AFTER_POINTS : BEFORE_POINTS).map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span aria-hidden className={`mt-2 h-px w-5 shrink-0 ${after ? 'bg-ember' : 'bg-stone/50'}`} />
                  <div>
                    <p className="text-[15px] font-semibold text-ivory">{p.title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-stone">{p.body}</p>
                  </div>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

const NODES = [
  { id: 'crm', label: 'CRM', Icon: Users, before: { x: 16, y: 16 }, after: { x: 20, y: 18 }, tilt: -3, note: 'Updated by hand' },
  { id: 'acc', label: 'Accounting', Icon: Receipt, before: { x: 56, y: 12 }, after: { x: 50, y: 10 }, tilt: 2, note: null },
  { id: 'inv', label: 'Inventory', Icon: Boxes, before: { x: 84, y: 30 }, after: { x: 80, y: 18 }, tilt: -2, note: 'Counts differ' },
  { id: 'sheet', label: 'Spreadsheets', Icon: FileSpreadsheet, before: { x: 22, y: 64 }, after: { x: 20, y: 82 }, tilt: 3, note: 'Which is latest?' },
  { id: 'docs', label: 'Documents', Icon: FileText, before: { x: 54, y: 86 }, after: { x: 50, y: 90 }, tilt: -2, note: null },
  { id: 'mail', label: 'Email', Icon: Mail, before: { x: 82, y: 72 }, after: { x: 80, y: 82 }, tilt: 2, note: 'Re-keyed orders' },
]

const BROKEN: [number, number][] = [
  [0, 1],
  [1, 2],
  [3, 4],
  [0, 3],
]

const BEFORE_POINTS = [
  { title: 'Disconnected applications', body: 'Each tool holds part of the picture, and none of them talk to each other.' },
  { title: 'Repeated manual work', body: 'People copy the same order, customer, or invoice between systems by hand.' },
  { title: 'Fragmented information', body: 'Reports are rebuilt from exports, and nobody is sure which version is current.' },
]

const AFTER_POINTS = [
  { title: 'Connected data', body: 'Systems share the records they depend on, so information is entered once.' },
  { title: 'Coordinated workflows', body: 'Handoffs between teams and tools happen as part of the process, not after it.' },
  { title: 'Clear operational visibility', body: 'Leadership and teams see the same current view of the business.' },
]
