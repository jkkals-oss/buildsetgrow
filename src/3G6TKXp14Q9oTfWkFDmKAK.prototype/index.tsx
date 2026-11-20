import React from 'react'

import Home from '../68tJ3eibMp2PzUkKstSa7g.frame'
import { ProcessPage } from '../68tJ3eibMp2PzUkKstSa7g.frame/components/ProcessPage'
import { PrivacyPage } from '../68tJ3eibMp2PzUkKstSa7g.frame/components/PrivacyPage'

/** The size every frame draws at, unless one exports its own. */
export const viewport = 'web'

export default function Prototype() {
  const path = typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/$/, '') || '/'
  if (path === '/how-we-work') return <ProcessPage />
  if (path === '/privacy') return <PrivacyPage />
  return <Home />
}
