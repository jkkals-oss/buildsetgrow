import React, { useEffect } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ClipboardCheck, DatabaseZap, GitBranch, Layers3, Route, ShieldCheck, Sparkles, Workflow } from 'lucide-react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Eyebrow, Headline, Button } from './ui'
import { Reveal } from './motion'

const PHASES = [
  {
    n: '01', slug: 'understand', title: 'Understand', line: 'Learn how the business actually runs.',
    intro: 'We look at how your business works across operations, sales, marketing, customer experience, and the channels that bring people to you. That includes the tools, decisions, and handoffs behind everyday work, so we can identify the underlying problem rather than just its symptoms.',
    work: [
      'Follow real customer journeys, internal processes, campaigns, and events with the people responsible for them.',
      'Inventory existing applications, spreadsheets, databases, integrations, and manual workarounds.',
      'Map the data captured at each step, where it is duplicated, and where it becomes unreliable or difficult to access.',
      'Identify recurring handoffs, approval bottlenecks, undocumented decisions, and work that depends on one person.',
      'Establish useful measures such as time spent, service capacity, customer response, campaign performance, and commercial impact.',
    ],
    example: 'For example: we might trace an event campaign from planning and promotion through registration, attendance, sales follow up, and reporting, then discover that customer information is scattered across several teams and tools.',
    output: 'A map of the relevant business workflows, channels, and systems, with key friction points, data dependencies, and a prioritized problem statement.',
  },
  {
    n: '02', slug: 'define', title: 'Define', line: 'Choose what should change and what should stay.',
    intro: 'Not every business challenge calls for new software. We determine whether the greatest opportunity is in the process, customer experience, channel coordination, data, or supporting technology, then define what should change.',
    work: [
      'Translate operational findings into specific business requirements and measurable outcomes.',
      'Decide whether the right response is a workflow change, improved campaign coordination, a system integration, automation, custom software, or a combination.',
      'Evaluate existing software capabilities, integration constraints, permissions, and data availability.',
      'Define scope boundaries, ownership, dependencies, implementation risks, and delivery sequence.',
      'Prioritize improvements by their impact on customers, revenue opportunities, team capacity, and operating complexity.',
    ],
    example: 'For example: a business promoting events across social channels and email may need a coordinated campaign workflow, shared brand assets, and a clear path from registration to customer follow up rather than another marketing tool.',
    output: 'An agreed solution scope, decision rationale, prioritized requirements, success measures, and delivery plan.',
  },
  {
    n: '03', slug: 'design', title: 'Design', line: 'Make the future workflow visible before building it.',
    intro: 'We design how the improved experience should work for customers and employees, from brand touchpoints and campaigns to the workflows and systems behind them. We make responsibilities, information, and decision points clear before implementation.',
    work: [
      'Map the intended experience for customers, employees, marketing teams, managers, and administrators.',
      'Design the relevant interfaces, campaign and content workflows, registration forms, approval steps, dashboards, and reporting views.',
      'Specify the underlying data model, system connections, business rules, permissions, and audit requirements.',
      'Design exception handling: missing data, failed integrations, conflicting records, or approvals requiring a person.',
      'Identify where automation based on defined rules is sufficient and where analysis assisted by AI or recommendations offer material value.',
      'Walk through representative use cases with stakeholders before finalizing implementation.',
    ],
    example: 'For example: we might design an event planning workspace that connects the campaign calendar, approved brand materials, registrations, vendor tasks, and attendee follow up in one place.',
    output: 'A solution blueprint including screen flows, data and integration specifications, automation logic, and an implementation roadmap.',
  },
  {
    n: '04', slug: 'build', title: 'Build', line: 'Develop and connect the parts that make it work.',
    intro: 'We put the agreed solution into practice using the systems and channels your business already relies on. That might mean connected software, automated workflows, or the tools and processes that help teams deliver consistent customer experiences.',
    work: [
      'Build or configure the agreed applications, interfaces, integrations, and authorized data access.',
      'Normalize and reconcile information from connected sources so different systems can work together.',
      'Connect relevant marketing, customer, and operating workflows with appropriate rules, notifications, approvals, and access controls.',
      'Develop recommendations assisted by AI or predictive features only where appropriate to the defined outcome.',
      'Test complete journeys, including errors, exceptions, permissions, and data changes, rather than testing isolated screens alone.',
      'Demonstrate working software at defined checkpoints and resolve issues before release.',
    ],
    example: 'For example: when someone registers for an event, the appropriate team receives the details, attendance records stay connected to the customer profile, and follow up tasks are created without manual copying.',
    output: 'Working software, connected workflows, tested capabilities, and technical documentation for the agreed solution.',
  },
  {
    n: '05', slug: 'implement', title: 'Implement', line: 'Put the new way of working into operation.',
    intro: 'A solution only creates value when people can use it consistently. We help teams adopt the new workflows, whether they involve internal operations, brand coordination, marketing campaigns, or customer engagement.',
    work: [
      'Prepare the production environment, account permissions, and approved data migration or configuration.',
      'Test real complete workflows with the employees who will operate the system.',
      'Define responsibilities for routine use, exception handling, technical support, and escalation.',
      'Create practical guidance and train teams on their new workflows, responsibilities, and customer touchpoints.',
      'Coordinate launch and closely review early data quality, workflow completion, errors, and adoption.',
      'Complete the agreed handover or transition into support after launch, depending on the service selected.',
    ],
    example: 'For example: an events team walks through publishing a campaign, updating an event schedule, sharing approved brand assets, and handling last minute attendee changes before launch.',
    output: 'A deployed and configured solution, operational guidance, training materials, launch checks, and a clear support or handover plan.',
  },
  {
    n: '06', slug: 'improve', title: 'Improve', line: 'Measure performance and evolve deliberately.',
    intro: 'After launch, we assess whether the changes are helping the business operate, engage customers, and grow more effectively. We focus improvements on results rather than adding technology or activity for its own sake.',
    work: [
      'Review relevant measures such as workflow completion, reliability, adoption, campaign engagement, customer follow up, and team capacity.',
      'Compare results against the original baseline where credible data is available.',
      'Identify remaining friction, new requirements, and opportunities to improve data visibility or automation.',
      'Distinguish maintenance and defect resolution from new feature development.',
      'For Grow engagements, agree quarterly priorities and deliver enhancements within contracted capacity.',
      'Document the results, tradeoffs, and next recommended actions.',
    ],
    example: 'For example: if an event attracts registrations but few attendees become customers, we can examine the handoff between marketing and sales and improve the follow up workflow.',
    output: 'A performance review against agreed objectives and, where included in your service, an ongoing enhancement roadmap.',
  },
] as const

const SERVICES = [
  {
    name: 'Build', intro: 'Design, develop, and hand over.',
    detail: 'For businesses ready to deploy, operate, and maintain their solution with their own team or provider.',
    terms: 'Engagement scoped to a defined project. Includes diagnosis, architecture, development, testing, documentation, and handover.',
  },
  {
    name: 'Set', intro: 'Build, launch, and maintain.',
    detail: 'For businesses that want us to lead implementation and provide technical continuity after launch.',
    terms: 'Includes Build plus production launch, 60 days of practical support after launch, monthly implementation sessions for six months, and an initial 6-month maintenance agreement beginning at production launch. Service then continues month to month, with 60 days advance notice to end.',
  },
  {
    name: 'Grow', intro: 'Build, embed, and keep improving.',
    detail: 'For businesses whose systems need to evolve alongside their operations.',
    terms: 'Includes Build and Set, plus agreed quarterly feature enhancements, employee adoption support, and maintenance in an initial 12-month partnership beginning at production launch. Service then continues month to month, with 60 days advance notice to end.',
  },
] as const

export function ProcessPage() {
  useEffect(() => {
    document.title = 'How We Work | BuildSetGrow'
    const desc = 'See how BuildSetGrow connects business operations, marketing, brand experiences, and events with practical workflows, software, and implementation.'
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = desc
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink font-sans text-ivory selection:bg-ember/30">
      <a href="#process-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ivory focus:px-4 focus:py-2 focus:text-graphite">Skip to content</a>
      <Header />
      <main id="process-main">
        <section id="top" className="relative overflow-hidden border-b border-ivory/10">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{background:'radial-gradient(65% 70% at 85% 25%, rgba(198,106,61,0.17), transparent 75%), radial-gradient(55% 55% at 0% 95%, rgba(198,106,61,0.08), transparent 80%)'}} />
          <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-20 sm:px-8 lg:pb-28 lg:pt-28">
            <Reveal>
              <a href="/" className="mb-10 inline-flex items-center gap-2 text-[13px] text-stone transition-colors hover:text-ember"><ArrowRight size={15} className="rotate-180"/> Back to home</a>
              <Eyebrow>How we work</Eyebrow>
              <Headline as="h1" className="mt-7 max-w-[990px] text-[46px] sm:text-[68px] lg:text-[84px]">
                Better technology begins with <em className="font-light text-ember">understanding your business.</em>
              </Headline>
              <div className="mt-9 grid gap-8 lg:grid-cols-12">
                <p className="max-w-2xl text-[17px] leading-[1.8] text-stone lg:col-span-7">Businesses grow across many fronts: operations, customer relationships, marketing, brand, and events. We look at how those activities work together, identify what is getting in the way, and design practical solutions using the processes and technology that best fit the business.</p>
                <div className="flex items-start gap-3 border-l border-ember/45 pl-5 lg:col-span-4 lg:col-start-9">
                  <span className="font-display text-[48px] leading-none text-ember">06</span>
                  <p className="pt-1 text-sm leading-relaxed text-stone">Clear phases. Concrete deliverables. One connected path from business diagnosis to implementation and measurable improvement.</p>
                </div>
              </div>
              <a href="#phases" className="mt-12 inline-flex items-center gap-3 rounded-full border border-ember/60 px-6 py-3.5 text-[14px] font-medium text-ivory transition-colors hover:bg-ember hover:text-ink">Explore the process <ChevronDown size={16}/></a>
            </Reveal>
          </div>
        </section>

        <section aria-label="Process stages" className="border-b border-ivory/10 bg-ink-2">
          <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px px-5 py-5 sm:grid-cols-3 sm:px-8 lg:grid-cols-6">
            {PHASES.map(p => (
              <a key={p.n} href={'#'+p.slug} className="group flex items-center gap-3 rounded-lg px-3 py-4 transition-colors hover:bg-ivory/5">
                <span className="font-display text-2xl text-ember">{p.n}</span>
                <span className="text-[13px] font-medium text-ivory group-hover:text-terracotta">{p.title}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="phases" className="relative bg-ink">
          <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:py-32">
            <Reveal className="mb-16 grid gap-5 lg:grid-cols-2">
              <div>
                <Eyebrow>The work, in detail</Eyebrow>
                <Headline className="mt-5 text-[39px] sm:text-[51px]">What you can expect at every step.</Headline>
              </div>
              <p className="max-w-lg self-end text-[15.5px] leading-relaxed text-stone">Each phase answers a practical question, explains what we do, and ends with a defined output. The depth of work varies with your business and the scope we agree together.</p>
            </Reveal>
            <div className="space-y-8">
              {PHASES.map((phase, index) => (
                <article key={phase.n} id={phase.slug} className="scroll-mt-28 overflow-hidden rounded-[28px] border border-ivory/10 bg-ink-2 shadow-[0_22px_70px_-50px_rgba(0,0,0,0.9)]">
                  <div className="grid lg:grid-cols-12">
                    <div className="border-b border-ivory/10 p-7 sm:p-10 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-12">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-[58px] leading-none text-ember">{phase.n}</span>
                        <span className="text-[11px] uppercase tracking-[0.16em] text-stone">Phase {index+1} of 6</span>
                      </div>
                      <h3 className="mt-8 font-display text-[39px] font-light leading-tight sm:text-[45px]">{phase.title}</h3>
                      <p className="mt-4 font-display text-[23px] italic leading-snug text-terracotta">{phase.line}</p>
                      <p className="mt-6 text-[14.5px] leading-[1.85] text-stone">{phase.intro}</p>
                    </div>
                    <div className="p-7 sm:p-10 lg:col-span-8 lg:p-12">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-ember">What we do</p>
                      <ul className="mt-6 grid gap-4">
                        {phase.work.map(item => (
                          <li key={item} className="flex gap-3 text-[14.5px] leading-[1.7] text-ivory/85">
                            <Check size={17} className="mt-1 shrink-0 text-ember" aria-hidden/>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-9 rounded-2xl border border-ivory/10 bg-ink px-6 py-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ember">An example of the work</p>
                        <p className="mt-3 text-[14.5px] leading-[1.75] text-stone">{phase.example}</p>
                      </div>
                      <div className="mt-6 border-l-2 border-ember pl-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ember">What you receive</p>
                        <p className="mt-2 text-[15px] font-medium leading-relaxed text-ivory">{phase.output}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ivory py-24 text-graphite sm:py-28" aria-labelledby="service-title">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <Eyebrow tone="light">Build · Set · Grow</Eyebrow>
            <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
              <Headline tone="light" className="text-[42px] sm:text-[58px] lg:col-span-7"><span id="service-title">One approach. Three ways to work together.</span></Headline>
              <p className="max-w-md text-[15.5px] leading-relaxed text-graphite-2 lg:col-span-4 lg:col-start-9">The process is consistent. The service you choose determines how far we take implementation, maintenance, and ongoing improvement.</p>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {SERVICES.map((service, index) => (
                <div key={service.name} className={'rounded-3xl border p-7 sm:p-8 ' + (index === 2 ? 'border-ember/50 bg-ink text-ivory' : 'border-graphite/15 bg-paper/60 text-graphite')}>
                  <p className={'text-[11px] font-semibold uppercase tracking-widest ' + (index === 2 ? 'text-terracotta' : 'text-clay')}>Service {index+1}</p>
                  <h3 className="mt-4 font-display text-[45px] font-light">{service.name}</h3>
                  <p className="mt-2 font-display text-[22px] italic">{service.intro}</p>
                  <p className={'mt-5 text-[14px] leading-relaxed ' + (index === 2 ? 'text-stone' : 'text-graphite-2')}>{service.detail}</p>
                  <div className={'mt-6 border-t pt-5 text-[13.5px] leading-[1.7] ' + (index === 2 ? 'border-ivory/15 text-stone' : 'border-graphite/15 text-graphite-2')}>{service.terms}</div>
                  <a href="/#services" className={'mt-7 inline-flex items-center gap-2 text-[13.5px] font-semibold ' + (index === 2 ? 'text-terracotta' : 'text-clay')}>Compare services <ArrowUpRight size={15}/></a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-ink py-24 sm:py-32" aria-labelledby="process-close">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{background:'radial-gradient(60% 80% at 85% 50%, rgba(198,106,61,0.2), transparent 75%)'}}/>
          <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow>Let's talk about your business</Eyebrow>
                <Headline className="mt-6 text-[42px] sm:text-[63px]"><span id="process-close">Tell us what's becoming harder to manage.</span></Headline>
                <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-stone">We'll look at the systems you already use, where the work gets stuck, and what an effective solution could look like. No unnecessary software. No technology for its own sake.</p>
              </div>
              <div className="lg:col-span-4 lg:text-right"><Button href="/#contact" className="!px-8">Discuss Your Business <ArrowRight size={17}/></Button></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
