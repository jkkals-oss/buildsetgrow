import React from 'react'

/** Small section kicker. Requested by the brief for every section; kept quiet so headlines lead. */
export function Eyebrow({ children, tone = 'dark', className = '' }: { children: React.ReactNode; tone?: 'dark' | 'light'; className?: string }) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${
        tone === 'dark' ? 'text-ember' : 'text-clay'
      } ${className}`}
    >
      <span aria-hidden className={`h-px w-6 ${tone === 'dark' ? 'bg-ember/60' : 'bg-clay/60'}`} />
      {children}
    </p>
  )
}

export function Headline({
  children,
  tone = 'dark',
  className = '',
  as: Tag = 'h2',
}: {
  children: React.ReactNode
  tone?: 'dark' | 'light'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <Tag
      className={`font-display font-light leading-[1.04] tracking-[-0.02em] text-balance ${
        tone === 'dark' ? 'text-ivory' : 'text-graphite'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'ghost' | 'ghost-light'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  disabled?: boolean
}

export function Button({ children, variant = 'primary', href, onClick, type = 'button', className = '', disabled }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:opacity-60'
  const styles = {
    primary: 'bg-ember text-ink hover:bg-terracotta',
    ghost: 'border border-ivory/20 text-ivory hover:border-ember hover:text-terracotta',
    'ghost-light': 'border border-graphite/25 text-graphite hover:border-clay hover:text-clay',
  }[variant]
  if (href) {
    return (
      <a href={href} onClick={onClick} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display text-[22px] leading-none tracking-[-0.01em] ${className}`}>
      <span className="font-medium">Build</span>
      <span className="font-light italic text-ember">Set</span>
      <span className="font-medium">Grow</span>
    </span>
  )
}

export const NAV = [
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Our Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
