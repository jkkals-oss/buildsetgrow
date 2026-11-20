# Project memory

## Product intent & audience

- Marketing site for **BuildSetGrow**.
- Primary visitor action: submit a contact/inquiry form expressing interest in a service.
- Audience: prospective clients visiting the marketing site.

## Brand personality & voice

- Communication style is clear, practical, and reassuring; emphasizes security and reliability (e.g. "kept it private").
- Explains changes in plain language with action-oriented summaries.

## Visual design & UX direction

- Contact form captures: name, email, company, website, role, message, and selected service of interest, plus submission timestamp.
- Form success path shows a thank-you message (updated to reflect new submission flow).

## Decisions, constraints & rationale

- **Database provider:** Supabase.
- **Table:** `contact_submissions` stores all contact form fields + created_at timestamp.
- **Access model:** visitors can only insert (submit); no read/update/delete exposed through the website. Submissions are viewed in the Supabase dashboard.
- **Replaced third-party form service** because it was unconfigured and could fail silently; direct DB insert is more reliable.
- **No email notifications** on new submissions currently — users must check the dashboard.
- Stack: **Vite + React**; build is verified after changes.

## Open questions & assumptions

- Email notifications for new contact submissions are a likely next feature (user may request).
- Assumed the single contact form is the only data-entry surface needing a database for now.
- Admin/CRM workflow for handling submissions is undefined.