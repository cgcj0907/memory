create extension if not exists pgcrypto;

create table if not exists public.users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  nickname text,
  avatar_path text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.spaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cover_image_path text,
  pair_code text not null unique,
  owner_user_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.space_members (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default now(),
  unique (space_id, user_id)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  icon text,
  sort_order int not null default 0
);

create table if not exists public.records (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces(id) on delete cascade,
  category_id uuid references public.categories(id),
  title text not null,
  event_time timestamptz not null,
  location_text text,
  description text,
  tags text[] not null default '{}',
  cover_image_path text,
  created_by uuid not null references auth.users(id),
  updated_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.record_images (
  id uuid primary key default gen_random_uuid(),
  record_id uuid not null references public.records(id) on delete cascade,
  storage_path text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.bakery_records (
  record_id uuid primary key references public.records(id) on delete cascade,
  shop_name text not null,
  shop_image_path text,
  shop_note text
);

create table if not exists public.bakery_items (
  id uuid primary key default gen_random_uuid(),
  bakery_record_id uuid not null references public.bakery_records(record_id) on delete cascade,
  name text not null,
  image_path text,
  taste_level text not null check (taste_level in ('hang', 'top', 'legend', 'npc', 'bad')),
  note text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.invite_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  type text not null,
  is_active boolean not null default true,
  max_uses int,
  used_count int not null default 0,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists users_profile_email_idx on public.users_profile (email);
create index if not exists records_space_time_idx on public.records (space_id, event_time desc);
create index if not exists records_space_category_idx on public.records (space_id, category_id);
create index if not exists record_images_record_idx on public.record_images (record_id);
create index if not exists space_members_user_idx on public.space_members (user_id);

alter table public.users_profile enable row level security;
alter table public.spaces enable row level security;
alter table public.space_members enable row level security;
alter table public.records enable row level security;
alter table public.record_images enable row level security;
alter table public.bakery_records enable row level security;
alter table public.bakery_items enable row level security;

create or replace function public.is_space_member(target_space_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.space_members
    where space_id = target_space_id and user_id = auth.uid()
  );
$$;

create policy "members can view spaces"
on public.spaces for select
using (public.is_space_member(id));

create policy "members can update spaces"
on public.spaces for update
using (public.is_space_member(id));

create policy "members can view members"
on public.space_members for select
using (public.is_space_member(space_id));

create policy "members can view profiles"
on public.users_profile for select
using (
  id = auth.uid()
  or exists (
    select 1
    from public.space_members self_member
    join public.space_members peer_member on peer_member.space_id = self_member.space_id
    where self_member.user_id = auth.uid() and peer_member.user_id = users_profile.id
  )
);

create policy "users update own profile"
on public.users_profile for update
using (id = auth.uid());

create policy "members manage records"
on public.records for all
using (public.is_space_member(space_id))
with check (public.is_space_member(space_id));
