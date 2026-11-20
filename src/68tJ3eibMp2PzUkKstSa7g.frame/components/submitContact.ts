import { createClient } from '@supabase/supabase-js'

/**
 * Contact-form delivery: saves each inquiry into the Supabase database.
 *
 * No external form service involved — the inquiry is stored as a row in the
 * `contact_submissions` table. Inquiries are read from the Supabase dashboard
 * (or via SQL), never exposed to the public site.
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

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

export async function submitContact(payload: ContactPayload): Promise<SubmitResult> {
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      ok: false,
      message: 'The contact form is not yet configured. Please email jkkals@gmail.com directly.',
    }
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { error } = await supabase.from('contact_submissions').insert({
      full_name: payload.fullName,
      email: payload.email,
      company: payload.company,
      website: payload.website || null,
      role: payload.role || null,
      needs: payload.needs,
      service: payload.service,
    })

    if (error) {
      return {
        ok: false,
        message: 'Your message could not be sent. Please try again, or email jkkals@gmail.com directly.',
      }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      message: 'We could not connect. Please try again, or email jkkals@gmail.com directly.',
    }
  }
}
