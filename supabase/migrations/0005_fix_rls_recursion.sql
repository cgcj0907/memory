create or replace function public.is_space_member(target_space_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.space_members
    where space_id = target_space_id and user_id = auth.uid()
  );
$$;