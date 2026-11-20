/**
 * Contact-form delivery via Formspree (hosting independent).
 *
 * Configure VITE_FORMSPREE_FORM_ID in Bolt's project environment.
 * Formspree must be configured separately to notify the desired inbox.
 * Never report delivery unless the endpoint accepts the POST.
 *
 * Form IDs are public identifiers, not secret API keys. Never place an
 * email-provider secret or private API token in a VITE_ variable.
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

export type SubmitResult = { ok: true } | { ok: false; message: string }

const formId = (import.meta.env.VITE_FORMSPREE_FORM_ID || '').trim()

export async function submitContact(payload: ContactPayload): Promise<SubmitResult> {
  if (!/^[a-zA-Z0-9]+$/.test(formId)) {
    return {
      ok: false,
      message: 'The contact form is not yet configured. Please email jkkals@gmail.com directly.',
    }
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        _subject: 'New BuildSetGrow website inquiry',
        _replyto: payload.email,
      }),
    })

    if (!response.ok) {
      return {
        ok: false,
        message: response.status === 429
          ? 'Too many requests were received. Please try again shortly or email us directly.'
          : 'Your message could not be sent. Please try again, or email jkkals@gmail.com directly.',
      }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      message: 'We could not connect to the form service. Please try again, or email jkkals@gmail.com directly.',
    }
  }
}
