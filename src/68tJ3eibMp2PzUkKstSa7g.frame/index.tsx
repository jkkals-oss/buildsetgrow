import React, { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, Workflow } from 'lucide-react'

import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { WhatWeDo } from './components/WhatWeDo'
import { Services } from './components/Services'
import { WhyUs } from './components/WhyUs'
import { Founder } from './components/Founder'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { PencilDefs } from './components/leaves/Leaf'
import { MotionProvider } from './components/motion'
import type { ServiceInterest } from './components/content'

type Props = Partial<typeof args>

export default function Home(props: Props) {
  const { service: initialService, formState, leafMotion } = { ...args, ...props }
  const [service, setService] = useState<ServiceInterest>(initialService as ServiceInterest)

  useEffect(() => setService(initialService as ServiceInterest), [initialService])

  useEffect(() => {
    document.title = 'BuildSetGrow | Custom Software for Growing Businesses'
    setMeta(
      'description',
      'BuildSetGrow helps growing businesses connect existing technology, organize data, automate workflows, and build bespoke software without an in-house product or engineering team.'
    )
    setMeta('og:title', 'BuildSetGrow | Custom Software for Growing Businesses', 'property')
    setMeta('og:url', 'https://buildsetgrow.com', 'property')
  }, [])

  const chooseService = useCallback((s: ServiceInterest) => {
    setService(s)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <MotionProvider leafMotion={leafMotion}>
      <div className="relative min-w-0 overflow-x-clip bg-ink font-sans text-ivory selection:bg-ember/30">
        <PencilDefs />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ivory focus:px-4 focus:py-2 focus:text-graphite"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Hero />
          <Problem />
          <WhatWeDo />
          <Services onChoose={chooseService} />
          <WhyUs />
          <Founder />
          <FAQ />
          <Contact
            service={service}
            onServiceChange={setService}
            previewState={formState as 'default' | 'errors' | 'submitted'}
          />
        </main>
        <a href="/how-we-work" aria-label="Explore how BuildSetGrow works" className="group fixed bottom-5 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ember px-3.5 py-2.5 text-[12px] font-semibold text-ink shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-terracotta focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember sm:bottom-7 sm:left-7 sm:px-4 sm:text-[13px]"><Workflow size={16} aria-hidden />How We Work<ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
        <Footer />
      </div>
    </MotionProvider>
  )
}

export const args = {
  service: 'Not sure',
  formState: 'default',
  leafMotion: true,
}

export const argTypes = {
  service: { control: 'radio', options: ['Build', 'Set', 'Grow', 'Not sure'] },
  formState: { control: 'select', options: ['default', 'errors', 'submitted'] },
  leafMotion: { control: 'boolean' },
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}
