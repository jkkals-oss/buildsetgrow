import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertCircle, ArrowRight, Check, Loader2 } from 'lucide-react'

import { Eyebrow, Headline } from './ui'
import { EASE_OUT, Reveal } from './motion'
import { LeafCluster } from './leaves/LeafCluster'
import { SERVICE_OPTIONS, type ServiceInterest } from './content'
import { submitContact, type ContactPayload } from './submitContact'

type Fields = Omit<ContactPayload, 'service'>
type Errors = Partial<Record<keyof Fields, string>>
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'done'; name: string } | { kind: 'preview' } | { kind: 'failed'; message: string }

export function Contact({
  service,
  onServiceChange,
  previewState = 'default',
}: {
  service: ServiceInterest
  onServiceChange: (s: ServiceInterest) => void
  previewState?: 'default' | 'errors' | 'submitted'
}) {
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const formRef = useRef<HTMLFormElement>(null)
  const reduced = useReducedMotion()

  // Preview states driven from the canvas controls.
  useEffect(() => {
    if (previewState === 'errors') {
      setValues(EMPTY)
      setAttempted(true)
      setErrors(validate(EMPTY))
      setStatus({ kind: 'idle' })
    } else if (previewState === 'submitted') {
      setStatus({ kind: 'preview' })
    } else {
      setValues(EMPTY)
      setAttempted(false)
      setErrors({})
      setStatus({ kind: 'idle' })
    }
  }, [previewState])

  const update = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value }
    setValues(next)
    if (attempted) setErrors(validate(next))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    const errs = validate(values)
    setErrors(errs)
    const first = (Object.keys(errs) as (keyof Fields)[])[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus({ kind: 'sending' })
    const res = await submitContact({ ...trimAll(values), service })
    if ('message' in res) setStatus({ kind: 'failed', message: res.message })
    else setStatus({ kind: 'done', name: values.fullName.trim().split(' ')[0] })
  }

  const errorCount = Object.keys(errors).length

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 45% at 12% 30%, rgba(198,106,61,0.14), transparent 70%), radial-gradient(40% 40% at 95% 100%, rgba(169,83,50,0.12), transparent 70%)',
        }}
      />
      <LeafCluster preset="contact" />

      <div className="relative mx-auto grid max-w-[1240px] gap-14 px-5 pb-32 pt-24 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-40 lg:pt-32">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Contact</Eyebrow>
          <Headline className="mt-6 text-[40px] sm:text-[52px] lg:text-[58px]">
            <span id="contact-title">
              Your business is growing.{' '}
              <span className="italic text-ember">Let's make your systems ready for it.</span>
            </span>
          </Headline>
          <div className="mt-8 max-w-md space-y-4 text-[15.5px] leading-relaxed text-stone">
            <p>Tell us a little about your business, the technology you use, and what's becoming harder to manage.</p>
            <p>
              We'll explore where connecting systems, simplifying workflows, or building custom software could make a
              difference.
            </p>
          </div>
        </Reveal>

        <div className="relative z-10 lg:col-span-7">
          <div className="rounded-3xl border border-ivory/10 bg-ink-2 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] sm:p-9">
            <AnimatePresence mode="wait" initial={false}>
              {status.kind === 'done' || status.kind === 'preview' ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.25, ease: EASE_OUT }}
                  role="status"
                  className="py-6"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ember text-ink">
                    <Check size={20} aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-[32px] leading-tight text-ivory">{status.kind === 'preview' ? 'Form preview' : `Thank you, ${status.name}.`}</h3>
                  {status.kind === 'done' ? (
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-stone">
                      Your inquiry has been received by our form service. We'll reply to the work email you provided.
                    </p>
                  ) : (
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-stone">
                      Design preview only. No inquiry has been sent.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setValues(EMPTY)
                      setAttempted(false)
                      setErrors({})
                      setStatus({ kind: 'idle' })
                    }}
                    className="mt-8 text-[14px] font-medium text-ember underline-offset-4 transition-colors duration-150 hover:text-terracotta hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  name="contact"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.2, ease: EASE_OUT }}
                  aria-describedby="form-required-note"
                >
                  <h3 className="font-display text-[28px] leading-tight text-ivory">Let's Talk About Your Business</h3>
                  <p id="form-required-note" className="mt-1.5 text-[13px] text-stone">
                    Fields marked <span className="text-ember">*</span> are required.
                  </p>

                  {attempted && errorCount > 0 && (
                    <p role="alert" className="mt-5 flex items-center gap-2 rounded-xl border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-[13.5px] text-ivory">
                      <AlertCircle size={16} className="shrink-0 text-terracotta" aria-hidden />
                      Please check {errorCount === 1 ? 'the highlighted field' : `the ${errorCount} highlighted fields`}.
                    </p>
                  )}

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <Field name="fullName" label="Full name" required value={values.fullName} error={errors.fullName} onChange={update('fullName')} autoComplete="name" />
                    <Field name="email" label="Work email" type="email" required value={values.email} error={errors.email} onChange={update('email')} autoComplete="email" />
                    <Field name="company" label="Company name" required value={values.company} error={errors.company} onChange={update('company')} autoComplete="organization" />
                    <Field name="website" label="Company website" value={values.website} error={errors.website} onChange={update('website')} placeholder="example.com" autoComplete="url" />
                    <Field name="role" label="Your role" value={values.role} onChange={update('role')} autoComplete="organization-title" className="sm:col-span-2" />
                    <Field
                      name="needs"
                      label="What does your business need help with?"
                      required
                      multiline
                      value={values.needs}
                      error={errors.needs}
                      onChange={update('needs')}
                      placeholder="The systems you use today, and what's getting harder to manage."
                      className="sm:col-span-2"
                    />
                  </div>

                  <fieldset className="mt-6">
                    <legend className="text-[13px] font-medium text-ivory">Service interest</legend>
                    <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {SERVICE_OPTIONS.map((s) => {
                        const checked = service === s
                        return (
                          <label
                            key={s}
                            className={`relative flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-[14px] font-medium transition-[background-color,border-color,color] duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ember ${
                              checked ? 'border-ember bg-ember/12 text-ivory' : 'border-ivory/12 text-stone hover:border-ivory/30 hover:text-ivory'
                            }`}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={s}
                              checked={checked}
                              onChange={() => onServiceChange(s)}
                              className="sr-only"
                            />
                            {s}
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>

                  {status.kind === 'failed' && (
                    <p role="alert" className="mt-5 text-[13.5px] text-terracotta">
                      {status.message}
                    </p>
                  )}

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status.kind === 'sending'}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-ink transition-[background-color,transform] duration-150 ease-out hover:bg-terracotta active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:opacity-70"
                    >
                      {status.kind === 'sending' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" aria-hidden /> Sending…
                        </>
                      ) : (
                        <>
                          Start a Conversation <ArrowRight size={16} aria-hidden />
                        </>
                      )}
                    </button>
                    <p className="text-[12.5px] text-stone">We'll only use your details to respond to your inquiry. <a href="/privacy" className="underline underline-offset-4 hover:text-terracotta">Privacy Policy</a></p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  name,
  label,
  value,
  onChange,
  error,
  required,
  type = 'text',
  multiline,
  placeholder,
  autoComplete,
  className = '',
}: {
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  required?: boolean
  type?: string
  multiline?: boolean
  placeholder?: string
  autoComplete?: string
  className?: string
}) {
  const id = `contact-${name}`
  const errId = `${id}-error`
  const control = `w-full rounded-xl border bg-ink/60 px-4 py-3 text-[15px] text-ivory placeholder:text-stone/50 outline-none transition-[border-color,box-shadow] duration-150 focus:border-ember focus:shadow-[0_0_0_3px_rgba(198,106,61,0.18)] ${
    error ? 'border-terracotta' : 'border-ivory/12 hover:border-ivory/25'
  }`
  const shared = {
    id,
    name,
    value,
    onChange,
    placeholder,
    autoComplete,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errId : undefined,
  }
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[13px] font-medium text-ivory">
        {label}
        {required ? (
          <span className="text-ember" aria-hidden>
            {' '}*
          </span>
        ) : (
          <span className="font-normal text-stone"> (optional)</span>
        )}
      </label>
      {multiline ? <textarea rows={5} className={`${control} resize-y`} {...shared} /> : <input type={type} className={control} {...shared} />}
      {error && (
        <p id={errId} className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-terracotta">
          <AlertCircle size={13} aria-hidden /> {error}
        </p>
      )}
    </div>
  )
}

const EMPTY: Fields = { fullName: '', email: '', company: '', website: '', role: '', needs: '' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v: Fields): Errors {
  const e: Errors = {}
  if (!v.fullName.trim()) e.fullName = 'Please tell us your name.'
  if (!v.email.trim()) e.email = 'We need a work email to reply to you.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'That email address doesn’t look complete, e.g. name@company.com.'
  if (!v.company.trim()) e.company = 'Which company are you with?'
  if (v.website.trim() && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(v.website.trim()))
    e.website = 'Enter a web address like example.com.'
  if (!v.needs.trim()) e.needs = 'A sentence or two is plenty: what’s becoming harder to manage?'
  else if (v.needs.trim().length < 15) e.needs = 'Could you add a little more detail?'
  return e
}

function trimAll(v: Fields): Fields {
  return Object.fromEntries(Object.entries(v).map(([k, val]) => [k, val.trim()])) as Fields
}
