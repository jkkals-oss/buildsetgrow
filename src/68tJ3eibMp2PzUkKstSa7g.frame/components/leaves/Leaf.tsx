import React from 'react'

export type LeafKind = 'oak' | 'maple' | 'simple' | 'long'
export type LeafTone = 'ember' | 'bark' | 'ivory' | 'clay'

const TONES: Record<LeafTone, string> = {
  ember: '#C66A3D',
  bark: '#8A6A52',
  ivory: '#F4F0E9',
  clay: '#A95332',
}

/**
 * A hand-sketched leaf: the outline is drawn twice, the second pass slightly offset and lighter,
 * the way a pencil goes back over a line. Veins are broken strokes of uneven weight.
 */
export function Leaf({
  kind,
  tone = 'ember',
  size = 40,
  className = '',
  style,
  sketch = false,
}: {
  kind: LeafKind
  tone?: LeafTone
  size?: number
  className?: string
  style?: React.CSSProperties
  /** Adds a graphite-grain filter. Reserved for leaves that do not move. */
  sketch?: boolean
}) {
  const shape = SHAPES[kind]
  const color = TONES[tone]
  const ratio = shape.h / shape.w
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={`0 0 ${shape.w} ${shape.h}`}
      width={size}
      height={size * ratio}
      className={className}
      style={style}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g filter={sketch ? 'url(#bsg-pencil)' : undefined}>
        <path d={shape.outline} fill={color} fillOpacity={0.05} strokeWidth={1.15} vectorEffect="non-scaling-stroke" />
        <path
          d={shape.outline}
          strokeWidth={0.6}
          strokeOpacity={0.5}
          transform={`translate(0.7 0.4) rotate(0.8 ${shape.w / 2} ${shape.h / 2})`}
          vectorEffect="non-scaling-stroke"
        />
        <path d={shape.rib} strokeWidth={0.9} strokeOpacity={0.85} vectorEffect="non-scaling-stroke" />
        {shape.veins.map((d, i) => (
          <path
            key={i}
            d={d}
            strokeWidth={i % 3 === 0 ? 0.75 : 0.5}
            strokeOpacity={i % 2 === 0 ? 0.7 : 0.5}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  )
}

/** One shared grain filter for the static leaf compositions. Rendered once at the page root. */
export function PencilDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <filter id="bsg-pencil" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.6" />
        </filter>
      </defs>
    </svg>
  )
}

const SHAPES: Record<LeafKind, { w: number; h: number; outline: string; rib: string; veins: string[] }> = {
  oak: {
    w: 60,
    h: 100,
    outline:
      'M30 95 C29.4 89 27.6 84.5 24.5 80.6 C17.8 82 12.2 78.4 15.2 72.4 C9.2 70.6 6.8 64.2 12.1 60.3 C6.2 56.4 6.4 49.2 13.2 47.4 C8.4 42.3 10.3 35.1 17.1 35.4 C14.3 29.1 17.6 22.4 23.4 23.6 C22.3 16.2 26.2 9.4 30.2 4.2 C34.1 9.6 38.2 16.6 36.9 23.4 C43.1 22.1 46.4 29.4 43.2 35.2 C50.1 35 52.3 42.2 47.4 47.1 C54.1 49.3 54.2 56.4 48.3 60.1 C53.4 64.2 51.2 70.6 45.1 72.2 C48.2 78.3 42.8 81.6 36 80.4 C32.8 84.4 31 88.6 30 95',
    rib: 'M30.2 99 C30.4 82 30.9 60 30.4 38 C30.2 26 30.3 16 30.1 8',
    veins: [
      'M30.5 74 C26 71 21 68.6 17 67',
      'M30.6 72.5 C35 69.6 39.5 67.8 43.4 66.6',
      'M30.6 58 C25 55 19.5 51.6 15 49.5',
      'M30.5 56.5 C36 53.5 40.5 51 45 49.4',
      'M30.4 41 C26.5 38.5 22.6 36.6 19.2 35.6',
      'M30.4 40 C34 37.6 37.8 36 41.2 35.2',
      'M30.3 27 C28.4 25.2 26.4 24 24.6 23.4',
      'M30.3 26.4 C32 25 33.8 24 35.6 23.6',
    ],
  },
  maple: {
    w: 100,
    h: 100,
    outline:
      'M50 79 C42.2 80.6 33.6 82 26.4 80.2 L30.2 72.4 C20.4 68.6 12.6 62.2 8.2 54.4 L17.8 52.2 C12.2 44.4 10.4 36.2 12.2 28.2 C20.2 31.8 27.8 36.4 32.2 42.2 L33.8 30.4 C39.8 34.2 44.2 40.2 46.2 47.6 C46.4 35.6 46.6 21.8 50.2 8.2 C54 22 54.2 35.8 53.8 47.8 C55.8 40.2 60.2 34.2 66.2 30.2 L67.8 42.2 C72.2 36.4 79.8 31.8 87.8 28.2 C89.8 36.2 87.8 44.4 82.2 52.2 L91.8 54.4 C87.4 62.2 79.6 68.6 69.8 72.4 L73.6 80.2 C66.4 82 57.8 80.6 50 79',
    rib: 'M50.2 96 C50 88 50.3 80 50.1 72 C50 52 50.2 30 50.2 12',
    veins: [
      'M50.1 72 C40 60 26 44 15 31',
      'M50.2 72 C60 60 74 44 85 31',
      'M50 73 C38 68 24 61 12 55',
      'M50.3 73 C62 68 76 61 88 55',
      'M37 57 C36 51 35.4 45 35.6 39',
      'M63 57 C64 51 64.6 45 64.4 39',
      'M50.2 40 C47.6 36 46.6 33 46.2 30',
    ],
  },
  simple: {
    w: 40,
    h: 80,
    outline:
      'M20 74 C11.6 63 5.8 48.6 7.6 34.2 C9 23.6 14 13.8 20.2 4.6 C26 13.2 31.6 23 32.8 34.4 C34.4 48.6 28.6 63 20 74',
    rib: 'M20.1 79 C20.4 64 20.6 44 20.3 26 C20.2 18 20.2 12 20.2 8',
    veins: [
      'M20.4 60 C16.6 57 13.4 54 11.4 51',
      'M20.4 58.6 C24.2 55.8 27.2 53 29 50.2',
      'M20.4 45 C16.6 42 13.6 38.8 11.8 35.6',
      'M20.4 43.4 C24 40.6 27 37.4 28.8 34.4',
      'M20.3 30 C18 27.8 16.2 25.6 15 23.2',
      'M20.3 29 C22.6 27 24.4 24.8 25.6 22.4',
    ],
  },
  long: {
    w: 30,
    h: 100,
    outline:
      'M15 95 C8.2 79 5.2 58.4 7.4 38.2 C8.6 26.6 11.6 14.4 15.2 3.4 C18.6 14.8 21.8 27 22.8 39 C24.4 58.8 21.6 79 15 95',
    rib: 'M15.1 99 C15.4 80 15.6 56 15.3 34 C15.2 22 15.2 14 15.2 8',
    veins: [
      'M15.3 78 C12.8 75 10.8 72 9.6 69',
      'M15.4 70 C18 67 20 64 21.2 61',
      'M15.3 58 C12.6 55 10.4 51.6 9 48',
      'M15.4 49 C18.2 46 20.4 42.6 21.8 39',
      'M15.3 37 C13.2 34.4 11.6 31.6 10.6 28.6',
      'M15.3 26 C16.8 23.6 18 21.2 18.8 18.6',
    ],
  },
}
