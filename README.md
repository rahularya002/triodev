# Triodev

Creative engineering studio site built with Next.js, GSAP, Lenis, Supabase, and Resend.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` in the project root:

```env
# Supabase (required for contact form persistence)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend (optional — form still saves if email is not configured)
RESEND_API_KEY=re_xxxxxxxx
CONTACT_NOTIFY_EMAIL=you@company.com
RESEND_FROM_EMAIL=Triodev <notifications@yourdomain.com>
```

### Supabase setup

1. Create or open a Supabase project.
2. Apply the migration in [`supabase/migrations/20250615120000_create_contact_inquiries.sql`](supabase/migrations/20250615120000_create_contact_inquiries.sql):

```bash
supabase db push
```

Or run the SQL in the Supabase SQL editor.

3. Copy your project URL and **service role** key into `.env.local`.
   - Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code.

### Resend setup

1. Create a Resend account and API key.
2. Verify your sending domain (or use `onboarding@resend.dev` for testing).
3. Set `CONTACT_NOTIFY_EMAIL` to the inbox that should receive inquiries.

If Resend is not configured, submissions are still saved to Supabase and the form returns success.

## Features

- Subtle scroll reveals and parallax (GSAP ScrollTrigger + Lenis)
- Metrics, work, services, process, testimonials, and team sections
- Contact form with Supabase persistence and optional email notifications

## Scripts

```bash
npm run dev    # development server
npm run build  # production build
npm run start  # start production server
npm run lint   # ESLint
```
