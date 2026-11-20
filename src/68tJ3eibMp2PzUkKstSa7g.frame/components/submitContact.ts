/**
 * Netlify Forms integration for the BuildSetGrow contact form.
 * A matching hidden static form in index.html lets Netlify detect the fields at build time.
 * Submissions are sent only on Netlify or the configured custom domain; previews remain unsent.
 * Configure Netlify Forms submission notifications to jkkals@gmail.com in the Netlify dashboard.
 */
export type ContactPayload = {
  fullName: string
  email: string
  company: string
  website: string
  role: string
  needs: string
  service: string
}

export type SubmitResult = { ok: true; delivered: boolean } | { ok: false; message: string }

function isLiveSite(): boolean {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname.toLowerCase()
  return host === 'buildsetgrow.com' || host === 'www.buildsetgrow.com' || host.endsWith('.netlify.app')
}

export async function submitContact(payload: ContactPayload): Promise<SubmitResult> {
  if (!isLiveSite()) return { ok: true, delivered: false }

  try {
    const body = new URLSearchParams({ 'form-name': 'contact', ...payload })
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
    if (!res.ok) return { ok: false, message: 'We couldn’t send your message just now. Please try again in a moment.' }
    return { ok: true, delivered: true }
  } catch {
    return { ok: false, message: 'We couldn’t reach the server. Check your connection and try again.' }
  }
}
