-- Restaurant tables
create table if not exists public.restaurant_records (
  record_id uuid primary key references public.records(id) on delete cascade,
  shop_name text not null,
  shop_image_path text,
  shop_note text
);

create table if not exists public.restaurant_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_record_id uuid not null references public.restaurant_records(record_id) on delete cascade,
  name text not null,
  image_path text,
  taste_level text not null check (taste_level in ('hang', 'top', 'legend', 'npc', 'bad')),
  note text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Place tables
create table if not exists public.place_records (
  record_id uuid primary key references public.records(id) on delete cascade,
  place_name text not null,
  place_image_path text,
  place_note text
);

create table if not exists public.place_items (
  id uuid primary key default gen_random_uuid(),
  place_record_id uuid not null references public.place_records(record_id) on delete cascade,
  name text not null,
  image_path text,
  taste_level text not null check (taste_level in ('hang', 'top', 'legend', 'npc', 'bad')),
  note text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Moment tables
create table if not exists public.moment_records (
  record_id uuid primary key references public.records(id) on delete cascade,
  detail_text text
);

-- Enable RLS
alter table public.restaurant_records enable row level security;
alter table public.restaurant_items enable row level security;
alter table public.place_records enable row level security;
alter table public.place_items enable row level security;
alter table public.moment_records enable row level security;

-- Policies for restaurant_records
drop policy if exists "members manage restaurant records" on public.restaurant_records;
create policy "members manage restaurant records"
on public.restaurant_records for all
to authenticated
using (
  exists (
    select 1
    from public.records
    where records.id = restaurant_records.record_id
      and public.is_space_member(records.space_id)
  )
)
with check (
  exists (
    select 1
    from public.records
    where records.id = restaurant_records.record_id
      and public.is_space_member(records.space_id)
  )
);

-- Policies for restaurant_items
drop policy if exists "members manage restaurant items" on public.restaurant_items;
create policy "members manage restaurant items"
on public.restaurant_items for all
to authenticated
using (
  exists (
    select 1
    from public.restaurant_records
    join public.records on records.id = restaurant_records.record_id
    where restaurant_records.record_id = restaurant_items.restaurant_record_id
      and public.is_space_member(records.space_id)
  )
)
with check (
  exists (
    select 1
    from public.restaurant_records
    join public.records on records.id = restaurant_records.record_id
    where restaurant_records.record_id = restaurant_items.restaurant_record_id
      and public.is_space_member(records.space_id)
  )
);

-- Policies for place_records
drop policy if exists "members manage place records" on public.place_records;
create policy "members manage place records"
on public.place_records for all
to authenticated
using (
  exists (
    select 1
    from public.records
    where records.id = place_records.record_id
      and public.is_space_member(records.space_id)
  )
)
with check (
  exists (
    select 1
    from public.records
    where records.id = place_records.record_id
      and public.is_space_member(records.space_id)
  )
);

-- Policies for place_items
drop policy if exists "members manage place items" on public.place_items;
create policy "members manage place items"
on public.place_items for all
to authenticated
using (
  exists (
    select 1
    from public.place_records
    join public.records on records.id = place_records.record_id
    where place_records.record_id = place_items.place_record_id
      and public.is_space_member(records.space_id)
  )
)
with check (
  exists (
    select 1
    from public.place_records
    join public.records on records.id = place_records.record_id
    where place_records.record_id = place_items.place_record_id
      and public.is_space_member(records.space_id)
  )
);

-- Policies for moment_records
drop policy if exists "members manage moment records" on public.moment_records;
create policy "members manage moment records"
on public.moment_records for all
to authenticated
using (
  exists (
    select 1
    from public.records
    where records.id = moment_records.record_id
      and public.is_space_member(records.space_id)
  )
)
with check (
  exists (
    select 1
    from public.records
    where records.id = moment_records.record_id
      and public.is_space_member(records.space_id)
  )
);