# Supabase Auth Setup

This project uses Supabase Auth for email/password and Google OAuth, with multi-tenant tables (`profiles`, `organizations`, `organization_members`).

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL` — project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon or publishable key (required for auth)
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, for contact form and admin tasks

Optional:

- `NEXT_PUBLIC_SITE_URL` — e.g. `http://localhost:3000` (used for OAuth redirects in production)

## Apply migrations

Migrations live in [`supabase/migrations/`](supabase/migrations/):

1. `20250615120000_create_contact_inquiries.sql`
2. `20250627180000_create_auth_tenancy.sql`
3. `20250627180100_auth_tenancy_rls.sql`

Apply to remote:

```bash
supabase link --project-ref tsmbwibrmwmocxacyvwu
supabase db push
```

Or apply via Supabase Dashboard SQL editor.

## Supabase Dashboard configuration

### Email auth

1. **Authentication → Providers → Email** — enable Email provider
2. For local dev, disable **Confirm email** so sign-up works immediately

### Google OAuth

1. Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/)
2. **Authentication → Providers → Google** — enable and paste Client ID + Secret
3. **Authentication → URL Configuration**
   - Site URL: `http://localhost:3000`
   - Redirect URLs:
     - `http://localhost:3000/auth/callback`
     - `https://your-production-domain.com/auth/callback`

## Routes

| Route | Purpose |
|-------|---------|
| `/auth/login` | Unified login (email + Google) |
| `/auth/signup` | Client registration + org creation |
| `/auth/callback` | OAuth callback |
| `/auth/onboarding` | Google users without an organization |
| `/auth/signout` | Clears session |

After login:

- `triodev_staff` → `/admin`
- `client` with org → `/client`
- `client` without org → `/auth/onboarding`

## Bootstrap Triodev staff access

Staff accounts are not created via public signup. After a user signs up:

1. Open Supabase Dashboard → **SQL Editor**
2. Promote a user to staff:

```sql
update public.profiles
set role = 'triodev_staff'
where email = 'your-email@triodev.in';
```

That user can then sign in at `/auth/login` and access `/admin`.

## Bootstrap client demo (Acme Corp)

Clients self-register at `/auth/signup` with company name — this creates an organization and owner membership automatically.

Google sign-in users without an org are sent to `/auth/onboarding` to create one.

## Security notes

- RLS is enabled on all tenancy tables
- Organization creation uses `create_organization_for_user()` (security definer RPC)
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser
- Staff role is stored in `profiles.role` — only promote via service role / SQL, not user metadata
