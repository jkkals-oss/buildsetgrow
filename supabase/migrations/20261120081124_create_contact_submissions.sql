/*
# Create contact_submissions table

1. New Tables
- `contact_submissions` — stores inquiries sent from the website's contact form.
  - `id` (uuid, primary key, auto-generated)
  - `full_name` (text, not null) — visitor's name
  - `email` (text, not null) — reply-to address
  - `company` (text, not null) — company name
  - `website` (text, nullable) — company website, optional
  - `role` (text, nullable) — visitor's role, optional
  - `needs` (text, not null) — what the visitor needs help with
  - `service` (text, not null) — selected service interest
  - `created_at` (timestamp, defaults to now)

2. Security
- Enable RLS on `contact_submissions`.
- Grant INSERT to `anon` and `authenticated` (the site has no sign-in; visitors submit anonymously), plus SELECT for completeness of CRUD grants — no, SELECT is intentionally NOT granted: visitors may only create submissions, never read anyone's.
- Policies: insert-only access for anon + authenticated; no read/update/delete policies, so stored inquiries are private.

3. Notes
- Single-tenant, no-auth site: submissions are write-only from the browser. The business owner reads them via the Supabase dashboard (service role / SQL), not through the public site.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  website text,
  role text,
  needs text NOT NULL,
  service text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_submissions TO anon, authenticated;

DROP POLICY IF EXISTS "visitors can submit inquiries" ON contact_submissions;
CREATE POLICY "visitors can submit inquiries"
ON contact_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);
