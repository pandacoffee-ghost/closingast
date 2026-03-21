insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated',
  'authenticated',
  'closingast@example.com',
  crypt('password123', gen_salt('bf')),
  timezone('utc', now()),
  '{"provider":"email","providers":["email"]}',
  '{"nickname":"Kai"}',
  timezone('utc', now()),
  timezone('utc', now())
)
on conflict (id) do nothing;

insert into public.profiles (id, nickname)
values ('11111111-1111-1111-1111-111111111111', 'Kai')
on conflict (id) do nothing;

insert into public.items (
  id,
  user_id,
  title,
  category,
  season,
  color,
  style_tags,
  source_platform,
  source_url,
  store_name,
  price,
  wear_frequency,
  status,
  notes
)
values
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    '米白针织开衫',
    'top',
    array['spring', 'autumn'],
    'cream',
    array['commute'],
    'taobao',
    'https://item.taobao.com/item.htm?id=1',
    '简约衣橱店',
    199.00,
    'often',
    'active',
    '版型偏宽松'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    '卡其短风衣',
    'outerwear',
    array['spring', 'autumn'],
    'khaki',
    array['commute'],
    'jd',
    'https://item.jd.com/1.html',
    '日常通勤馆',
    299.00,
    'normal',
    'active',
    '适合早春'
  )
on conflict (id) do nothing;

insert into public.item_images (item_id, image_path, sort_order, is_primary)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'wardrobe/sample-cardigan-main.jpg', 0, true),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'wardrobe/sample-trench-main.jpg', 0, true)
on conflict do nothing;

insert into public.duplicate_hints (item_id, similar_item_id, score, reason)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 3, '同为通勤外搭')
on conflict (item_id, similar_item_id) do nothing;
