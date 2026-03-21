create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null check (char_length(title) > 0),
  category text not null check (category in ('top', 'bottom', 'dress', 'outerwear', 'shoes', 'bag')),
  season text[] not null default '{}',
  color text not null,
  style_tags text[] not null default '{}',
  source_platform text not null default 'manual' check (source_platform in ('manual', 'taobao', 'jd')),
  source_url text,
  store_name text,
  price numeric(10, 2),
  purchase_date date,
  wear_frequency text default 'normal' check (wear_frequency in ('often', 'normal', 'rare')),
  status text not null default 'active' check (status in ('active', 'idle', 'review')),
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.item_images (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.items (id) on delete cascade,
  image_path text not null,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.duplicate_hints (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.items (id) on delete cascade,
  similar_item_id uuid not null references public.items (id) on delete cascade,
  score integer not null default 0,
  reason text not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (item_id, similar_item_id)
);

create index items_user_id_idx on public.items (user_id);
create index items_category_idx on public.items (category);
create index items_color_idx on public.items (color);
create index item_images_item_id_idx on public.item_images (item_id);
create index duplicate_hints_item_id_idx on public.duplicate_hints (item_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger set_items_updated_at
before update on public.items
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.items enable row level security;
alter table public.item_images enable row level security;
alter table public.duplicate_hints enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "items_select_own"
on public.items
for select
to authenticated
using (auth.uid() = user_id);

create policy "items_insert_own"
on public.items
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "items_update_own"
on public.items
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "items_delete_own"
on public.items
for delete
to authenticated
using (auth.uid() = user_id);

create policy "item_images_select_own"
on public.item_images
for select
to authenticated
using (
  exists (
    select 1 from public.items
    where public.items.id = item_images.item_id
      and public.items.user_id = auth.uid()
  )
);

create policy "item_images_insert_own"
on public.item_images
for insert
to authenticated
with check (
  exists (
    select 1 from public.items
    where public.items.id = item_images.item_id
      and public.items.user_id = auth.uid()
  )
);

create policy "item_images_update_own"
on public.item_images
for update
to authenticated
using (
  exists (
    select 1 from public.items
    where public.items.id = item_images.item_id
      and public.items.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.items
    where public.items.id = item_images.item_id
      and public.items.user_id = auth.uid()
  )
);

create policy "item_images_delete_own"
on public.item_images
for delete
to authenticated
using (
  exists (
    select 1 from public.items
    where public.items.id = item_images.item_id
      and public.items.user_id = auth.uid()
  )
);

create policy "duplicate_hints_select_own"
on public.duplicate_hints
for select
to authenticated
using (
  exists (
    select 1 from public.items
    where public.items.id = duplicate_hints.item_id
      and public.items.user_id = auth.uid()
  )
);
