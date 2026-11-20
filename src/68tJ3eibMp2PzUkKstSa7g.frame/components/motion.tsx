import React, { createContext, useContext } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const LeafMotionContext = createContext(true)

/** Leaf animation is on only when the visitor allows motion and the page asks for it. */
export function MotionProvider({ leafMotion, children }: { leafMotion: boolean; children: React.ReactNode }) {
  const reduced = useReducedMotion()
  return <LeafMotionContext.Provider value={leafMotion && !reduced}>{children}</LeafMotionContext.Provider>
}

export function useLeafMotion() {
  return useContext(LeafMotionContext)
}

export const EASE_OUT = [0.23, 1, 0.32, 1] as const

/** A quiet rise-in as a block enters the viewport. Content is never hidden when motion is reduced. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const reduced = useReducedMotion()
  const Comp = motion[as]
  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.3, ease: EASE_OUT, delay }}
    >
      {children}
    </Comp>
  )
}
