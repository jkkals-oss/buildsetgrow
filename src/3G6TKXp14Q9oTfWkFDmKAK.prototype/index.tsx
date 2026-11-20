import React from 'react'

import Home from '../68tJ3eibMp2PzUkKstSa7g.frame'
import { ProcessPage } from '../68tJ3eibMp2PzUkKstSa7g.frame/components/ProcessPage'

/** The size every frame draws at, unless one exports its own. */
export const viewport = 'web'

export default function Prototype() {
  const path = typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/$/, '') || '/'
  return path === '/our-process' ? <ProcessPage /> : <Home />
}
