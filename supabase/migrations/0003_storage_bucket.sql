insert into storage.buckets (id, name, public)
values ('memory-assets', 'memory-assets', true)
on conflict (id) do nothing;

create policy "public can read memory-assets"
on storage.objects for select
using (bucket_id = 'memory-assets');
