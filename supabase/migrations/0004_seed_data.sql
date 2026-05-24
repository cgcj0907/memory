insert into public.categories (slug, name, icon, sort_order)
values
  ('bakery', '面包店', 'Croissant', 1),
  ('restaurant', '餐厅', 'UtensilsCrossed', 2),
  ('place', '游玩的地方', 'MapPin', 3),
  ('moment', '其他有意义的事情', 'Sparkles', 4)
on conflict (slug) do update
set
  name = excluded.name,
  icon = excluded.icon,
  sort_order = excluded.sort_order;

insert into public.invite_codes (code, type, is_active)
values ('0907', 'signup', true)
on conflict (code) do nothing;