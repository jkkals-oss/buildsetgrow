import React from 'react'

import { Leaf, type LeafKind, type LeafTone } from './Leaf'
import { useLeafMotion } from '../motion'

type Placed = {
  kind: LeafKind
  tone: LeafTone
  size: number
  /** CSS left/right/top/bottom, e.g. { left: '4%', bottom: -6 } */
  at: React.CSSProperties
  angle: number
  opacity: number
  /** drift softly when motion is allowed */
  drift?: boolean
  /** hide below md, to keep small screens sparse */
  desktopOnly?: boolean
}

/** A still, composed group of sketched leaves. Decorative, behind content, never interactive. */
export function LeafCluster({ preset, className = '' }: { preset: keyof typeof PRESETS; className?: string }) {
  const animate = useLeafMotion()
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {PRESETS[preset].map((l, i) => (
        <div
          key={i}
          className={`absolute ${l.desktopOnly ? 'hidden md:block' : ''}`}
          style={{ ...l.at, opacity: l.opacity }}
        >
          <div
            className={l.drift && animate ? 'leaf-drift-soft' : ''}
            style={
              {
                '--leaf-angle': `${l.angle}deg`,
                transform: `rotate(${l.angle}deg)`,
                animationDelay: `${-i * 2.3}s`,
              } as React.CSSProperties
            }
          >
            <Leaf kind={l.kind} tone={l.tone} size={l.size} sketch={!l.drift} />
          </div>
        </div>
      ))}
    </div>
  )
}

const PRESETS = {
  /** a few leaves resting on the top edge of the light Problem section */
  problemEdge: [
    { kind: 'oak', tone: 'clay', size: 30, at: { right: '7%', top: 22 }, angle: 112, opacity: 0.55 },
    { kind: 'simple', tone: 'bark', size: 20, at: { right: '11%', top: 34 }, angle: -36, opacity: 0.5 },
    { kind: 'long', tone: 'clay', size: 14, at: { left: '4%', bottom: 28 }, angle: 64, opacity: 0.45, desktopOnly: true },
  ],
  /** one leaf drifting in the gutter between service cards */
  services: [
    { kind: 'simple', tone: 'ember', size: 22, at: { left: '2%', top: 120 }, angle: 28, opacity: 0.45, drift: true, desktopOnly: true },
    { kind: 'long', tone: 'bark', size: 14, at: { right: '3%', bottom: 160 }, angle: -24, opacity: 0.5, drift: true, desktopOnly: true },
  ],
  timeline: [
    { kind: 'maple', tone: 'ember', size: 30, at: { right: '5%', top: '30%' }, angle: -18, opacity: 0.35, drift: true, desktopOnly: true },
    { kind: 'simple', tone: 'ivory', size: 18, at: { right: '12%', top: '62%' }, angle: 40, opacity: 0.25, drift: true, desktopOnly: true },
  ],
  whyEdge: [
    { kind: 'long', tone: 'clay', size: 16, at: { left: '6%', bottom: 18 }, angle: -70, opacity: 0.5 },
    { kind: 'oak', tone: 'bark', size: 24, at: { left: '9%', bottom: 4 }, angle: 104, opacity: 0.45 },
  ],
  contact: [
    { kind: 'oak', tone: 'ember', size: 34, at: { left: '2%', bottom: -8 }, angle: -58, opacity: 0.6 },
    { kind: 'simple', tone: 'bark', size: 24, at: { left: '6%', bottom: 6 }, angle: 36, opacity: 0.55 },
    { kind: 'long', tone: 'ivory', size: 16, at: { left: '9.5%', bottom: -2 }, angle: 96, opacity: 0.3, desktopOnly: true },
    { kind: 'maple', tone: 'ember', size: 42, at: { right: '3%', bottom: -14 }, angle: 132, opacity: 0.5 },
    { kind: 'simple', tone: 'ember', size: 20, at: { right: '8%', bottom: 4 }, angle: -112, opacity: 0.55, desktopOnly: true },
  ],
  /** the most developed composition: the page's closing illustration */
  footer: [
    { kind: 'maple', tone: 'ember', size: 52, at: { left: '-1%', bottom: -16 }, angle: -32, opacity: 0.7 },
    { kind: 'oak', tone: 'bark', size: 34, at: { left: '4%', bottom: -6 }, angle: 58, opacity: 0.65 },
    { kind: 'long', tone: 'ember', size: 20, at: { left: '8%', bottom: -10 }, angle: 104, opacity: 0.6 },
    { kind: 'simple', tone: 'ivory', size: 22, at: { left: '11%', bottom: 2 }, angle: -66, opacity: 0.32, desktopOnly: true },
    { kind: 'oak', tone: 'ember', size: 26, at: { left: '15.5%', bottom: -8 }, angle: 142, opacity: 0.5, desktopOnly: true },
    { kind: 'simple', tone: 'bark', size: 18, at: { left: '34%', bottom: -6 }, angle: 80, opacity: 0.45, desktopOnly: true },
    { kind: 'long', tone: 'bark', size: 16, at: { right: '30%', bottom: -4 }, angle: -98, opacity: 0.45, desktopOnly: true },
    { kind: 'simple', tone: 'ember', size: 24, at: { right: '16%', bottom: -4 }, angle: 34, opacity: 0.55, desktopOnly: true },
    { kind: 'oak', tone: 'ember', size: 38, at: { right: '9%', bottom: -14 }, angle: -128, opacity: 0.6 },
    { kind: 'maple', tone: 'bark', size: 40, at: { right: '3.5%', bottom: -8 }, angle: 22, opacity: 0.6 },
    { kind: 'long', tone: 'ivory', size: 18, at: { right: '1%', bottom: 4 }, angle: -52, opacity: 0.3 },
  ],
} satisfies Record<string, Placed[]>
