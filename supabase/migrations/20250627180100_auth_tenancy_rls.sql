-- RLS policies for auth tenancy tables.

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;

create schema if not exists private;

create or replace function private.is_triodev_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'triodev_staff'
  );
$$;

create or replace function private.is_org_member(org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members
    where organization_id = org_id
      and user_id = auth.uid()
  );
$$;

create or replace function private.is_org_admin(org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members
    where organization_id = org_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
  );
$$;

-- profiles
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Staff can view all profiles"
  on public.profiles for select
  using (private.is_triodev_staff());

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- organizations
create policy "Members can view their organizations"
  on public.organizations for select
  using (private.is_org_member(id));

create policy "Staff can view all organizations"
  on public.organizations for select
  using (private.is_triodev_staff());

create policy "Org admins can update their organization"
  on public.organizations for update
  using (private.is_org_admin(id))
  with check (private.is_org_admin(id));

-- organization_members
create policy "Members can view co-members"
  on public.organization_members for select
  using (private.is_org_member(organization_id));

create policy "Staff can view all memberships"
  on public.organization_members for select
  using (private.is_triodev_staff());

create policy "Org admins can manage memberships"
  on public.organization_members for insert
  with check (private.is_org_admin(organization_id));

create policy "Org admins can update memberships"
  on public.organization_members for update
  using (private.is_org_admin(organization_id))
  with check (private.is_org_admin(organization_id));

create policy "Org admins can delete memberships"
  on public.organization_members for delete
  using (private.is_org_admin(organization_id));
