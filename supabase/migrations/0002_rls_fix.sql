-- Fill missing RLS policies for authenticated app flows:
-- profile creation, space creation/join, record extension tables, and Storage uploads.

drop policy if exists "members can view spaces" on public.spaces;
create policy "members can view spaces"
on public.spaces for select
to authenticated
using (
  public.is_space_member(id)
  or owner_user_id = auth.uid()
);

drop policy if exists "users insert own profile" on public.users_profile;
create policy "users insert own profile"
on public.users_profile for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "users create own space" on public.spaces;
create policy "users create own space"
on public.spaces for insert
to authenticated
with check (owner_user_id = auth.uid());

drop policy if exists "users insert own membership" on public.space_members;
create policy "users insert own membership"
on public.space_members for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "users update own membership" on public.space_members;
create policy "users update own membership"
on public.space_members for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "members manage record images" on public.record_images;
create policy "members manage record images"
on public.record_images for all
to authenticated
using (
  exists (
    select 1
    from public.records
    where records.id = record_images.record_id
      and public.is_space_member(records.space_id)
  )
)
with check (
  exists (
    select 1
    from public.records
    where records.id = record_images.record_id
      and public.is_space_member(records.space_id)
  )
);

drop policy if exists "members manage bakery records" on public.bakery_records;
create policy "members manage bakery records"
on public.bakery_records for all
to authenticated
using (
  exists (
    select 1
    from public.records
    where records.id = bakery_records.record_id
      and public.is_space_member(records.space_id)
  )
)
with check (
  exists (
    select 1
    from public.records
    where records.id = bakery_records.record_id
      and public.is_space_member(records.space_id)
  )
);

drop policy if exists "members manage bakery items" on public.bakery_items;
create policy "members manage bakery items"
on public.bakery_items for all
to authenticated
using (
  exists (
    select 1
    from public.bakery_records
    join public.records on records.id = bakery_records.record_id
    where bakery_records.record_id = bakery_items.bakery_record_id
      and public.is_space_member(records.space_id)
  )
)
with check (
  exists (
    select 1
    from public.bakery_records
    join public.records on records.id = bakery_records.record_id
    where bakery_records.record_id = bakery_items.bakery_record_id
      and public.is_space_member(records.space_id)
  )
);

drop policy if exists "authenticated users upload own assets" on storage.objects;
create policy "authenticated users upload own assets"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'memory-assets'
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "authenticated users update own assets" on storage.objects;
create policy "authenticated users update own assets"
on storage.objects for update
to authenticated
using (
  bucket_id = 'memory-assets'
  and (storage.foldername(name))[2] = auth.uid()::text
)
with check (
  bucket_id = 'memory-assets'
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "authenticated users delete own assets" on storage.objects;
create policy "authenticated users delete own assets"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'memory-assets'
  and (storage.foldername(name))[2] = auth.uid()::text
);
