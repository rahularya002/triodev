-- Contact inquiries submitted from the Triodev website form.
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  budget text,
  brief text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_inquiries enable row level security;

-- No public policies: inserts are handled server-side with the service role key.
