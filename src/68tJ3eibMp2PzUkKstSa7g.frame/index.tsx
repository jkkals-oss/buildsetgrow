import React, { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, Workflow } from 'lucide-react'

import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { WhatWeDo } from './components/WhatWeDo'
import { HowItWorks } from './components/HowItWorks'
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
          <HowItWorks />
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
        <a href="/our-process" aria-label="Explore how BuildSetGrow works" className="group fixed bottom-6 right-5 z-40 inline-flex items-center gap-2.5 rounded-full border border-ink/20 bg-ember px-5 py-3.5 text-[13px] font-semibold text-ink shadow-[0_12px_45px_rgba(0,0,0,0.38)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-1 hover:bg-terracotta hover:shadow-[0_18px_50px_rgba(0,0,0,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember sm:bottom-8 sm:right-8"><Workflow size={16} aria-hidden />How We Work<ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
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
