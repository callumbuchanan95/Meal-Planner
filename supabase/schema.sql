-- ============================================================
-- Meal Planner — Database Schema
-- Run this in the Supabase SQL editor to initialise all tables.
-- ============================================================

-- ── Tables ───────────────────────────────────────────────────

create table public.recipes (
  id              uuid        primary key default gen_random_uuid(),
  user_id         uuid        not null references auth.users(id) on delete cascade,
  title           text        not null,
  source_type     text        not null check (source_type in ('url','manual','book','social')),
  source_url      text,
  source_name     text,
  serves          integer     not null default 2,
  prep_time_mins  integer,
  cook_time_mins  integer,
  method          text,
  image_url       text,
  created_at      timestamptz not null default now()
);

create table public.ingredients (
  id              uuid  primary key default gen_random_uuid(),
  name            text  not null unique,
  default_unit    text,
  aisle_category  text  not null check (aisle_category in (
    'produce','meat','fish','dairy','bakery','frozen',
    'tinned','dry_goods','condiments','drinks','other'
  ))
);

create table public.recipe_ingredients (
  id             uuid    primary key default gen_random_uuid(),
  recipe_id      uuid    not null references public.recipes(id)     on delete cascade,
  ingredient_id  uuid    not null references public.ingredients(id) on delete restrict,
  quantity       numeric not null,
  unit           text    not null,
  prep_note      text,
  optional       boolean not null default false
);

create table public.tags (
  id      uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name    text not null,
  colour  text,
  unique (user_id, name)
);

create table public.recipe_tags (
  recipe_id  uuid not null references public.recipes(id) on delete cascade,
  tag_id     uuid not null references public.tags(id)    on delete cascade,
  primary key (recipe_id, tag_id)
);

create table public.meal_plans (
  id               uuid  primary key default gen_random_uuid(),
  user_id          uuid  not null references auth.users(id) on delete cascade,
  week_start_date  date  not null,
  name             text,
  created_at       timestamptz not null default now()
);

create table public.meal_plan_slots (
  id            uuid     primary key default gen_random_uuid(),
  meal_plan_id  uuid     not null references public.meal_plans(id) on delete cascade,
  recipe_id     uuid     not null references public.recipes(id)    on delete cascade,
  day_of_week   smallint not null check (day_of_week between 0 and 6),
  meal_type     text     not null check (meal_type in ('breakfast','lunch','dinner')),
  servings      integer  not null default 2
);

create table public.shopping_lists (
  id            uuid        primary key default gen_random_uuid(),
  meal_plan_id  uuid        not null references public.meal_plans(id) on delete cascade,
  generated_at  timestamptz not null default now()
);

create table public.shopping_list_items (
  id               uuid    primary key default gen_random_uuid(),
  list_id          uuid    not null references public.shopping_lists(id) on delete cascade,
  ingredient_id    uuid    references public.ingredients(id) on delete set null,
  ingredient_name  text    not null,
  quantity         numeric not null,
  unit             text    not null,
  checked          boolean not null default false,
  manual           boolean not null default false,
  aisle_category   text    not null check (aisle_category in (
    'produce','meat','fish','dairy','bakery','frozen',
    'tinned','dry_goods','condiments','drinks','other'
  ))
);

-- ── Row Level Security ────────────────────────────────────────

alter table public.recipes              enable row level security;
alter table public.ingredients          enable row level security;
alter table public.recipe_ingredients   enable row level security;
alter table public.tags                 enable row level security;
alter table public.recipe_tags          enable row level security;
alter table public.meal_plans           enable row level security;
alter table public.meal_plan_slots      enable row level security;
alter table public.shopping_lists       enable row level security;
alter table public.shopping_list_items  enable row level security;

-- recipes
create policy "recipes_select" on public.recipes for select using (auth.uid() = user_id);
create policy "recipes_insert" on public.recipes for insert with check (auth.uid() = user_id);
create policy "recipes_update" on public.recipes for update using (auth.uid() = user_id);
create policy "recipes_delete" on public.recipes for delete using (auth.uid() = user_id);

-- ingredients — shared read, any authenticated user may insert
create policy "ingredients_select" on public.ingredients for select using (true);
create policy "ingredients_insert" on public.ingredients for insert with check (auth.uid() is not null);

-- recipe_ingredients — scoped via recipe ownership
create policy "recipe_ingredients_select" on public.recipe_ingredients for select
  using (exists (select 1 from public.recipes where id = recipe_id and user_id = auth.uid()));
create policy "recipe_ingredients_insert" on public.recipe_ingredients for insert
  with check (exists (select 1 from public.recipes where id = recipe_id and user_id = auth.uid()));
create policy "recipe_ingredients_update" on public.recipe_ingredients for update
  using (exists (select 1 from public.recipes where id = recipe_id and user_id = auth.uid()));
create policy "recipe_ingredients_delete" on public.recipe_ingredients for delete
  using (exists (select 1 from public.recipes where id = recipe_id and user_id = auth.uid()));

-- tags
create policy "tags_select" on public.tags for select using (auth.uid() = user_id);
create policy "tags_insert" on public.tags for insert with check (auth.uid() = user_id);
create policy "tags_update" on public.tags for update using (auth.uid() = user_id);
create policy "tags_delete" on public.tags for delete using (auth.uid() = user_id);

-- recipe_tags — scoped via recipe ownership
create policy "recipe_tags_select" on public.recipe_tags for select
  using (exists (select 1 from public.recipes where id = recipe_id and user_id = auth.uid()));
create policy "recipe_tags_insert" on public.recipe_tags for insert
  with check (exists (select 1 from public.recipes where id = recipe_id and user_id = auth.uid()));
create policy "recipe_tags_delete" on public.recipe_tags for delete
  using (exists (select 1 from public.recipes where id = recipe_id and user_id = auth.uid()));

-- meal_plans
create policy "meal_plans_select" on public.meal_plans for select using (auth.uid() = user_id);
create policy "meal_plans_insert" on public.meal_plans for insert with check (auth.uid() = user_id);
create policy "meal_plans_update" on public.meal_plans for update using (auth.uid() = user_id);
create policy "meal_plans_delete" on public.meal_plans for delete using (auth.uid() = user_id);

-- meal_plan_slots — scoped via meal plan ownership
create policy "meal_plan_slots_select" on public.meal_plan_slots for select
  using (exists (select 1 from public.meal_plans where id = meal_plan_id and user_id = auth.uid()));
create policy "meal_plan_slots_insert" on public.meal_plan_slots for insert
  with check (exists (select 1 from public.meal_plans where id = meal_plan_id and user_id = auth.uid()));
create policy "meal_plan_slots_update" on public.meal_plan_slots for update
  using (exists (select 1 from public.meal_plans where id = meal_plan_id and user_id = auth.uid()));
create policy "meal_plan_slots_delete" on public.meal_plan_slots for delete
  using (exists (select 1 from public.meal_plans where id = meal_plan_id and user_id = auth.uid()));

-- shopping_lists — scoped via meal plan ownership
create policy "shopping_lists_select" on public.shopping_lists for select
  using (exists (select 1 from public.meal_plans where id = meal_plan_id and user_id = auth.uid()));
create policy "shopping_lists_insert" on public.shopping_lists for insert
  with check (exists (select 1 from public.meal_plans where id = meal_plan_id and user_id = auth.uid()));
create policy "shopping_lists_delete" on public.shopping_lists for delete
  using (exists (select 1 from public.meal_plans where id = meal_plan_id and user_id = auth.uid()));

-- shopping_list_items — scoped via shopping_list → meal_plan ownership
create policy "shopping_list_items_select" on public.shopping_list_items for select
  using (exists (
    select 1 from public.shopping_lists sl
    join public.meal_plans mp on mp.id = sl.meal_plan_id
    where sl.id = list_id and mp.user_id = auth.uid()
  ));
create policy "shopping_list_items_insert" on public.shopping_list_items for insert
  with check (exists (
    select 1 from public.shopping_lists sl
    join public.meal_plans mp on mp.id = sl.meal_plan_id
    where sl.id = list_id and mp.user_id = auth.uid()
  ));
create policy "shopping_list_items_update" on public.shopping_list_items for update
  using (exists (
    select 1 from public.shopping_lists sl
    join public.meal_plans mp on mp.id = sl.meal_plan_id
    where sl.id = list_id and mp.user_id = auth.uid()
  ));
create policy "shopping_list_items_delete" on public.shopping_list_items for delete
  using (exists (
    select 1 from public.shopping_lists sl
    join public.meal_plans mp on mp.id = sl.meal_plan_id
    where sl.id = list_id and mp.user_id = auth.uid()
  ));

-- ── Storage ───────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
  values ('recipe-images', 'recipe-images', false);

-- Users may upload/read/delete only their own images.
-- Images should be stored under a folder named after the user's UUID.
create policy "recipe_images_insert" on storage.objects for insert
  with check (bucket_id = 'recipe-images' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "recipe_images_select" on storage.objects for select
  using (bucket_id = 'recipe-images' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "recipe_images_delete" on storage.objects for delete
  using (bucket_id = 'recipe-images' and auth.uid()::text = (storage.foldername(name))[1]);
