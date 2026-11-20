import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Leaf, type LeafKind, type LeafTone } from './Leaf'
import { useLeafMotion } from '../motion'

/**
 * The hero's signature layer. Leaves drift down on their own paths; the ones that land near the
 * corners stay, settling into a loose, capped arrangement along the bottom edge. Older resting
 * leaves fade out once the cap is reached, so the edge never crowds.
 */
export function FallingLeaves() {
  const animate = useLeafMotion()
  const [falling, setFalling] = useState<Faller[]>(() =>
    Array.from({ length: SLOTS }, (_, i) => makeFaller(i, true))
  )
  const [resting, setResting] = useState<Rester[]>(SEED_RESTING)
  const timers = useRef<number[]>([])
  const fallingRef = useRef(falling)
  fallingRef.current = falling

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const land = useCallback((slot: number) => {
    const done = fallingRef.current[slot]
    if (done?.settle) {
      const rester = toRester(done)
      setResting((rs) => {
        const next = [...rs, rester]
        const live = next.filter((r) => !r.fading)
        if (live.length <= REST_CAP) return next
        const oldest = live[0].id
        return next.map((r) => (r.id === oldest ? { ...r, fading: true } : r))
      })
      timers.current.push(
        window.setTimeout(() => setResting((cur) => cur.filter((r) => !r.fading)), 1400)
      )
    }
    setFalling((prev) => {
      const copy = [...prev]
      copy[slot] = makeFaller(slot, false)
      return copy
    })
  }, [])

  if (!animate) return <StaticHeroLeaves />

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {falling.map((f, i) => (
        <div
          key={f.id}
          className={`leaf-fall absolute inset-0 ${i >= MOBILE_SLOTS ? 'hidden md:block' : ''}`}
          style={
            {
              '--leaf-dur': `${f.dur}s`,
              '--leaf-delay': `${f.delay}s`,
              '--leaf-drift': `${f.drift}px`,
              '--leaf-land': `${f.landOffset}px`,
              '--leaf-opacity': f.opacity,
              '--leaf-end-opacity': f.settle ? f.opacity : 0,
            } as React.CSSProperties
          }
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget) land(i)
          }}
        >
          <div className="absolute top-0" style={{ left: `${f.x}%` }}>
            <div
              className="leaf-sway will-change-transform"
              style={
                {
                  '--leaf-sway': `${f.sway}px`,
                  '--leaf-sway-dur': `${f.swayDur}s`,
                  '--leaf-rot': `${f.rot}deg`,
                } as React.CSSProperties
              }
            >
              <Leaf kind={f.kind} tone={f.tone} size={f.size} />
            </div>
          </div>
        </div>
      ))}

      {resting.map((r) => (
        <div
          key={r.id}
          className="absolute transition-opacity duration-[1200ms] ease-out"
          style={{
            left: `calc(${r.x}% + ${r.dx}px)`,
            bottom: r.bottom,
            opacity: r.fading ? 0 : 1,
          }}
        >
          <div
            className={r.seeded ? '' : 'leaf-settle'}
            style={
              {
                '--leaf-angle': `${r.angle}deg`,
                '--leaf-opacity': r.opacity,
                transform: `rotate(${r.angle}deg)`,
                opacity: r.opacity,
              } as React.CSSProperties
            }
          >
            <Leaf kind={r.kind} tone={r.tone} size={r.size} sketch />
          </div>
        </div>
      ))}
    </div>
  )
}

/** With motion off: a composed, still version of the same scene. */
function StaticHeroLeaves() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {STATIC_AIR.map((l, i) => (
        <div
          key={`a${i}`}
          className={`absolute ${i > 2 ? 'hidden md:block' : ''}`}
          style={{ left: `${l.x}%`, top: `${l.y}%`, transform: `rotate(${l.angle}deg)`, opacity: l.opacity }}
        >
          <Leaf kind={l.kind} tone={l.tone} size={l.size} />
        </div>
      ))}
      {[...SEED_RESTING, ...STATIC_REST].map((r) => (
        <div
          key={r.id}
          className="absolute"
          style={{ left: `calc(${r.x}% + ${r.dx}px)`, bottom: r.bottom, transform: `rotate(${r.angle}deg)`, opacity: r.opacity }}
        >
          <Leaf kind={r.kind} tone={r.tone} size={r.size} sketch />
        </div>
      ))}
    </div>
  )
}

// ---------- model ----------

const SLOTS = 11
const MOBILE_SLOTS = 4
const REST_CAP = 13

type Faller = {
  id: string
  kind: LeafKind
  tone: LeafTone
  size: number
  x: number
  dur: number
  delay: number
  drift: number
  sway: number
  swayDur: number
  rot: number
  opacity: number
  settle: boolean
  landOffset: number
}

type Rester = {
  id: string
  kind: LeafKind
  tone: LeafTone
  size: number
  x: number
  dx: number
  bottom: number
  angle: number
  opacity: number
  fading?: boolean
  seeded?: boolean
}

const KINDS: LeafKind[] = ['oak', 'maple', 'simple', 'long', 'simple', 'oak']
const HEIGHT_RATIO: Record<LeafKind, number> = { oak: 1.67, maple: 1, simple: 2, long: 3.33 }
let uid = 0

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}
function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeFaller(slot: number, first: boolean): Faller {
  // Bias entry points toward the edges; the headline column stays calmer.
  const edge = Math.random() < 0.65
  const x = edge ? (Math.random() < 0.5 ? rand(1, 24) : rand(70, 95)) : rand(26, 68)
  const inCorner = x < 26 || x > 72
  const kind = pick(KINDS)
  const size = kind === 'long' ? rand(16, 24) : kind === 'maple' ? rand(30, 46) : rand(20, 34)
  const dur = rand(8, 18)
  const tone: LeafTone = Math.random() < 0.18 ? 'ivory' : Math.random() < 0.6 ? 'ember' : 'bark'
  const drift = x < 50 ? rand(-50, 30) : rand(-30, 50)
  return {
    id: `f${slot}-${uid++}`,
    kind,
    tone,
    size,
    x,
    dur,
    // the first wave is already in the air, staggered; later leaves enter after a short pause
    delay: first ? -rand(0, dur * 0.85) + (slot % 3) * 0.6 : rand(0.5, 4),
    drift,
    sway: rand(14, 34),
    swayDur: rand(2.6, 4.6),
    rot: rand(14, 38),
    opacity: tone === 'ivory' ? rand(0.32, 0.5) : rand(0.55, 0.85),
    settle: inCorner ? Math.random() < 0.5 : Math.random() < 0.06,
    landOffset: size * HEIGHT_RATIO[kind] + rand(2, 10),
  }
}

function toRester(f: Faller): Rester {
  return {
    id: `r${uid++}`,
    kind: f.kind,
    tone: f.tone,
    size: f.size,
    x: f.x,
    dx: f.drift,
    bottom: rand(-6, 10),
    angle: pick([rand(-80, -30), rand(30, 80), rand(100, 150), rand(-150, -110)]),
    opacity: f.opacity,
  }
}

const SEED_RESTING: Rester[] = [
  { id: 's1', kind: 'oak', tone: 'ember', size: 30, x: 3, dx: 0, bottom: -4, angle: -62, opacity: 0.7, seeded: true },
  { id: 's2', kind: 'simple', tone: 'bark', size: 22, x: 8, dx: 10, bottom: 2, angle: 48, opacity: 0.65, seeded: true },
  { id: 's3', kind: 'maple', tone: 'ember', size: 40, x: 90, dx: 0, bottom: -10, angle: 118, opacity: 0.6, seeded: true },
]

const STATIC_REST: Rester[] = [
  { id: 'st1', kind: 'long', tone: 'ember', size: 18, x: 13, dx: 0, bottom: -8, angle: 72, opacity: 0.6 },
  { id: 'st2', kind: 'oak', tone: 'bark', size: 26, x: 84, dx: 0, bottom: -2, angle: -40, opacity: 0.6 },
  { id: 'st3', kind: 'simple', tone: 'ivory', size: 22, x: 95, dx: 0, bottom: 4, angle: 140, opacity: 0.4 },
  { id: 'st4', kind: 'maple', tone: 'bark', size: 30, x: 18, dx: 0, bottom: -6, angle: -120, opacity: 0.55 },
]

const STATIC_AIR: { kind: LeafKind; tone: LeafTone; size: number; x: number; y: number; angle: number; opacity: number }[] = [
  { kind: 'oak', tone: 'ember', size: 26, x: 6, y: 18, angle: 24, opacity: 0.55 },
  { kind: 'simple', tone: 'ivory', size: 20, x: 88, y: 12, angle: -30, opacity: 0.4 },
  { kind: 'long', tone: 'bark', size: 16, x: 80, y: 58, angle: 40, opacity: 0.55 },
  { kind: 'maple', tone: 'ember', size: 32, x: 46, y: 6, angle: -12, opacity: 0.45 },
  { kind: 'simple', tone: 'ember', size: 22, x: 22, y: 64, angle: 70, opacity: 0.5 },
]
