/**
 * BuildSetGrow inquiry delivery via Formspree.
 * The form endpoint is a public form identifier, not a private credential.
 * This integration is independent of Bolt Database and Netlify.
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

const FORM_ENDPOINT = 'https://formspree.io/f/xjywonay'

export async function submitContact(payload: ContactPayload): Promise<SubmitResult> {
  try {
    const response = await fetch(FORM_ENDPOINT, {
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
          ? 'Too many requests. Please try again shortly, or email jkkals@gmail.com directly.'
          : 'We could not send your inquiry. Please try again, or email jkkals@gmail.com directly.',
      }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      message: 'We could not reach the inquiry service. Please try again, or email jkkals@gmail.com directly.',
    }
  }
}
