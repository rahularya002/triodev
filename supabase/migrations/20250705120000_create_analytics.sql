-- First-party web analytics: page_views table + staff-guarded aggregation RPCs.

create table public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer_domain text,
  country text,
  device text,
  browser text,
  os text,
  visitor_hash text,
  session_id text,
  created_at timestamptz not null default now()
);

create index page_views_created_at_idx on public.page_views (created_at);
create index page_views_path_idx on public.page_views (path);
create index page_views_created_visitor_idx on public.page_views (created_at, visitor_hash);

-- RLS: no anon/public access. Inserts happen only via the service-role key
-- in /api/track, which bypasses RLS, so no insert policy is granted.
alter table public.page_views enable row level security;

create policy "Staff can view page views"
  on public.page_views for select
  using (private.is_triodev_staff());

-- Overview: totals + deltas vs. the previous equal period.
create or replace function public.analytics_overview(period_days int)
returns json
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  cur_views bigint;
  cur_visitors bigint;
  prev_views bigint;
  prev_visitors bigint;
  top_country text;
begin
  if not private.is_triodev_staff() then
    raise exception 'not authorized';
  end if;

  select count(*), count(distinct visitor_hash)
    into cur_views, cur_visitors
  from public.page_views
  where created_at >= now() - make_interval(days => period_days);

  select count(*), count(distinct visitor_hash)
    into prev_views, prev_visitors
  from public.page_views
  where created_at >= now() - make_interval(days => period_days * 2)
    and created_at < now() - make_interval(days => period_days);

  select country
    into top_country
  from public.page_views
  where created_at >= now() - make_interval(days => period_days)
    and country is not null
    and country <> 'unknown'
  group by country
  order by count(*) desc
  limit 1;

  return json_build_object(
    'views', cur_views,
    'visitors', cur_visitors,
    'views_per_visitor', case when cur_visitors > 0 then round(cur_views::numeric / cur_visitors, 2) else 0 end,
    'prev_views', prev_views,
    'prev_visitors', prev_visitors,
    'top_country', top_country
  );
end;
$$;

-- Daily time series with zero-filled days.
create or replace function public.analytics_timeseries(period_days int)
returns table(day date, views bigint, visitors bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not private.is_triodev_staff() then
    raise exception 'not authorized';
  end if;

  return query
  select
    d.day::date,
    coalesce(v.views, 0)::bigint,
    coalesce(v.visitors, 0)::bigint
  from generate_series(
    (now() - make_interval(days => period_days - 1))::date,
    now()::date,
    interval '1 day'
  ) as d(day)
  left join (
    select
      created_at::date as day,
      count(*) as views,
      count(distinct visitor_hash) as visitors
    from public.page_views
    where created_at >= (now() - make_interval(days => period_days - 1))::date
    group by created_at::date
  ) v on v.day = d.day::date
  order by d.day;
end;
$$;

-- Breakdown by dimension: path, referrer_domain, country, device, browser, os.
create or replace function public.analytics_breakdown(period_days int, dimension text)
returns table(label text, views bigint, visitors bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not private.is_triodev_staff() then
    raise exception 'not authorized';
  end if;

  if dimension not in ('path', 'referrer_domain', 'country', 'device', 'browser', 'os') then
    raise exception 'invalid dimension: %', dimension;
  end if;

  return query execute format(
    'select coalesce(%I, ''unknown'')::text as label,
            count(*)::bigint as views,
            count(distinct visitor_hash)::bigint as visitors
     from public.page_views
     where created_at >= now() - make_interval(days => $1)
     group by 1
     order by views desc
     limit 20',
    dimension
  ) using period_days;
end;
$$;

revoke execute on function public.analytics_overview(int) from anon;
revoke execute on function public.analytics_timeseries(int) from anon;
revoke execute on function public.analytics_breakdown(int, text) from anon;
