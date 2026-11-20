import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Boxes, FileText, Mail, Receipt, Settings2, Users } from 'lucide-react'

/**
 * Six familiar systems on the edges, converging on one workspace in the middle.
 * Illustrative only: no real customer data or implementation.
 */
export function SystemsVisual() {
  const reduced = useReducedMotion()
  return (
    <figure className="relative mx-auto aspect-[1/1.02] w-full max-w-[520px]" aria-label="Illustration: CRM, accounting, inventory, documents, email and operations systems connected into one workspace">
      {/* connection paths */}
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {PATHS.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="#F4F0E9" strokeOpacity={0.09} strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <motion.path
              d={d}
              fill="none"
              stroke="#C66A3D"
              strokeWidth={1.25}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={100}
              strokeDasharray="6 14"
              initial={{ strokeDashoffset: 0, opacity: 0.85 }}
              animate={reduced ? undefined : { strokeDashoffset: -100 }}
              transition={{ duration: 7 + i * 0.6, ease: 'linear', repeat: Infinity }}
            />
          </g>
        ))}
      </svg>

      {SOURCES.map((s, i) => (
        <Floaty key={s.label} index={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
          <div className="flex items-center gap-2 rounded-xl border border-ivory/10 bg-ink-2/90 py-2 pl-2 pr-3 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-ember/12 text-ember">
              <s.Icon size={14} strokeWidth={1.75} aria-hidden />
            </span>
            <span className="whitespace-nowrap text-[12px] font-medium text-ivory">{s.label}</span>
          </div>
        </Floaty>
      ))}

      {/* the connected workspace */}
      <div className="absolute left-1/2 top-1/2 w-[48%] min-w-[184px] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-2xl border border-ember/35 bg-ink-2 p-3.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75),0_0_0_6px_rgba(198,106,61,0.06)] sm:p-4">
          <div className="flex items-center justify-between">
            <p className="font-display text-[15px] leading-tight text-ivory sm:text-[17px]">Your Business, Connected</p>
            <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
          </div>
          <div className="mt-3 space-y-1.5">
            {ROWS.map((r) => (
              <div key={r.a} className="flex items-center justify-between gap-2 rounded-md bg-ivory/[0.04] px-2 py-1.5 text-[10.5px] sm:text-[11px]">
                <span className="truncate text-ivory/90">{r.a}</span>
                <span className="shrink-0 text-ember">{r.b}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-end gap-1" aria-hidden>
            {[38, 52, 46, 64, 58, 76, 70].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-ember/25" style={{ height: h * 0.32 }}>
                <span className="block h-full rounded-sm bg-ember/70" style={{ transform: `scaleY(${0.5 + i * 0.07})`, transformOrigin: 'bottom' }} />
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="absolute -bottom-7 right-0 text-[11px] text-stone/70">Illustrative example</figcaption>
    </figure>
  )
}

function Floaty({ children, index, className, style }: { children: React.ReactNode; index: number; className?: string; style?: React.CSSProperties }) {
  const reduced = useReducedMotion()
  return (
    <div className={className} style={style}>
      <motion.div
        animate={reduced ? undefined : { y: [0, index % 2 ? -5 : 5, 0] }}
        transition={{ duration: 6 + index * 0.7, ease: 'easeInOut', repeat: Infinity }}
      >
        {children}
      </motion.div>
    </div>
  )
}

const SOURCES = [
  { label: 'CRM', Icon: Users, x: 17, y: 9 },
  { label: 'Accounting', Icon: Receipt, x: 82, y: 11 },
  { label: 'Inventory', Icon: Boxes, x: 12, y: 50 },
  { label: 'Documents', Icon: FileText, x: 88, y: 50 },
  { label: 'Email', Icon: Mail, x: 18, y: 91 },
  { label: 'Operations', Icon: Settings2, x: 81, y: 89 },
]

const PATHS = [
  'M17 13 C17 30 30 36 40 40',
  'M82 15 C82 30 70 36 60 40',
  'M20 50 L32 50',
  'M80 50 L68 50',
  'M18 87 C18 72 30 64 40 60',
  'M81 85 C81 72 70 64 60 60',
]

const ROWS = [
  { a: 'Order 2048 · Harlow & Co.', b: 'Invoiced' },
  { a: 'Stock · 3 warehouses', b: 'In sync' },
  { a: 'Contract renewal · Q3', b: 'Assigned' },
]
