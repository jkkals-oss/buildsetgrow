import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import { Button, NAV, Wordmark } from './ui'
import { EASE_OUT } from './motion'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()
  const isProcessPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/our-process')
  const homeHref = (href: string) => isProcessPage ? `/${href}` : href

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200 ease-out ${
        scrolled || open ? 'border-ivory/10 bg-ink/80 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
        <a href={isProcessPage ? "/" : "#top"} aria-label="BuildSetGrow, back to top" className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={homeHref(item.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-[13.5px] transition-colors duration-150 ease-out hover:text-terracotta ${
                      isActive ? 'text-ivory' : 'text-stone'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ember"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href={homeHref("#contact")} className="hidden !px-5 !py-2.5 sm:inline-flex">
            Let's Talk
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full border border-ivory/15 text-ivory transition-colors duration-150 hover:border-ember lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="border-t border-ivory/10 bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <ul className="mx-auto flex max-w-[1240px] flex-col px-5 py-4 sm:px-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-b border-ivory/[0.07] py-4 font-display text-2xl font-light transition-colors duration-150 hover:text-terracotta ${
                      active === item.href.slice(1) ? 'text-ember' : 'text-ivory'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-5">
                <Button href="#contact" onClick={() => setOpen(false)} className="w-full">
                  Let's Talk
                </Button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}
