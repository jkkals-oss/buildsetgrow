import React from 'react'

import { NAV, Wordmark } from './ui'
import { LeafCluster } from './leaves/LeafCluster'

/** Policy pages are not written yet. Point these at /privacy and /terms once they exist. */
const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

export function Footer() {
  const isProcessPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/our-process')
  const homeHref = (href: string) => isProcessPage ? `/${href}` : href
  return (
    <footer className="relative overflow-hidden border-t border-ivory/10 bg-ink">
      <LeafCluster preset="footer" />
      <div className="relative mx-auto max-w-[1240px] px-5 pb-36 pt-16 sm:px-8 lg:pb-40 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href={isProcessPage ? "/" : "#top"} aria-label="BuildSetGrow, back to top" className="inline-block">
              <Wordmark className="text-[28px]" />
            </a>
            <p className="mt-4 max-w-xs font-display text-[19px] italic leading-snug text-stone">
              Custom software for growing businesses.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4 md:col-start-7">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[14px]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={homeHref(n.href)} className="whitespace-nowrap text-stone transition-colors duration-150 hover:text-terracotta">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-[14px] md:col-span-2 md:text-right">
            <a href="https://buildsetgrow.com" className="text-ivory transition-colors duration-150 hover:text-terracotta">
              buildsetgrow.com
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-6 text-[12.5px] text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>© BuildSetGrow. All rights reserved.</p>
          <ul className="flex gap-6">
            {LEGAL.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors duration-150 hover:text-terracotta">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
