-- =========================================================
-- Ruta Cuscatlán · esquema, RLS y datos de ejemplo
-- Ejecutar completo en Supabase > SQL Editor
-- =========================================================

create table if not exists public.categories (
  id          bigint generated always as identity primary key,
  slug        text not null unique,
  name        text not null,
  description text not null
);

create table if not exists public.destinations (
  id           bigint generated always as identity primary key,
  slug         text not null unique,
  name         text not null,
  category_id  bigint not null references public.categories(id) on delete restrict,
  region       text not null,
  summary      text not null,
  description  text not null,
  best_season  text not null,
  difficulty   text not null check (difficulty in ('Fácil','Moderada','Exigente')),
  image_url    text not null,
  created_at   timestamptz not null default now()
);

create index if not exists destinations_category_idx on public.destinations(category_id);

-- ---------- Row Level Security: lectura pública, sin escritura ----------
alter table public.categories   enable row level security;
alter table public.destinations enable row level security;

drop policy if exists "Lectura pública de categorías" on public.categories;
create policy "Lectura pública de categorías"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "Lectura pública de destinos" on public.destinations;
create policy "Lectura pública de destinos"
  on public.destinations for select
  to anon, authenticated
  using (true);
-- Sin políticas de insert/update/delete: nadie con la anon key puede modificar datos.

-- ---------- Datos de ejemplo ----------
insert into public.categories (slug, name, description) values
  ('montanas', 'Volcanes y montaña', 'Cráteres, lagos volcánicos y bosques de niebla a menos de tres horas de San Salvador.'),
  ('playas',   'Playas y surf',      'Puntos de olas mundiales, atardeceres en la costa del Bálsamo y playas para descansar.'),
  ('pueblos',  'Pueblos y cultura',  'Calles empedradas, café de altura, arte local y gastronomía de fin de semana.')
on conflict (slug) do nothing;

insert into public.destinations (slug, name, category_id, region, summary, description, best_season, difficulty, image_url) values
 ('volcan-de-santa-ana',
  'Volcán de Santa Ana (Ilamatepec)',
  (select id from public.categories where slug='montanas'),
  'Santa Ana',
  'El volcán más alto del país, con un cráter de laguna verde turquesa.',
  'Con 2,381 metros, el Ilamatepec ofrece una caminata guiada de unas tres horas hasta el borde del cráter. Desde la cima se ven el lago de Coatepeque y el volcán de Izalco. Sube temprano: la niebla suele cubrir la cumbre después del mediodía.',
  'Noviembre a abril', 'Moderada',
  'https://picsum.photos/seed/santa-ana-volcan/1200/800'),
 ('lago-de-coatepeque',
  'Lago de Coatepeque',
  (select id from public.categories where slug='montanas'),
  'Santa Ana',
  'Una caldera volcánica llena de agua, ideal para kayak y miradores.',
  'Formado hace más de 50,000 años, el lago cambia de azul a turquesa según la luz. Hay muelles, restaurantes de pescado frito y paseos en lancha hasta la isla de Teopán. Es una parada natural después del Ilamatepec.',
  'Todo el año', 'Fácil',
  'https://picsum.photos/seed/coatepeque-lago/1200/800'),
 ('el-tunco',
  'El Tunco',
  (select id from public.categories where slug='playas'),
  'La Libertad',
  'Pueblo de surf con arena oscura, murales y vida nocturna.',
  'A 45 minutos de San Salvador, El Tunco combina olas para todos los niveles con hostales, cafés y tiendas de artesanía. La Roca del Tunco, con el sol cayendo detrás, es la foto obligada de la tarde.',
  'Mayo a octubre (oleaje)', 'Fácil',
  'https://picsum.photos/seed/el-tunco-surf/1200/800'),
 ('el-zonte',
  'El Zonte (Chancalá)',
  (select id from public.categories where slug='playas'),
  'La Libertad',
  'Rompiente de derecha muy buscada y un ambiente más tranquilo.',
  'Más pequeño y sereno que El Tunco, El Zonte es famoso por su punto de surf y por su comunidad local. Ofrece clases, yoga frente al mar y restaurantes sobre la arena.',
  'Abril a octubre', 'Fácil',
  'https://picsum.photos/seed/el-zonte-playa/1200/800'),
 ('ruta-de-las-flores',
  'Ruta de las Flores',
  (select id from public.categories where slug='pueblos'),
  'Sonsonate y Ahuachapán',
  'Pueblos cafetaleros con feria gastronómica todos los fines de semana.',
  'Juayúa, Apaneca, Ataco y Concepción de Ataco forman un recorrido de murales, cafetales y cascadas. La feria gastronómica de Juayúa y las visitas a fincas de café son lo más destacado.',
  'Noviembre a febrero (floración del café)', 'Fácil',
  'https://picsum.photos/seed/ruta-flores-cafe/1200/800'),
 ('suchitoto',
  'Suchitoto',
  (select id from public.categories where slug='pueblos'),
  'Cuscatlán',
  'Ciudad colonial de calles empedradas frente al lago Suchitlán.',
  'Suchitoto conserva su arquitectura colonial, galerías de arte y talleres de añil. Desde el mirador se ve el embalse Cerrón Grande, y a pocos minutos está la cascada Los Tercios, de columnas de basalto.',
  'Noviembre a abril', 'Fácil',
  'https://picsum.photos/seed/suchitoto-colonial/1200/800'),
 ('cerro-el-pital',
  'Cerro El Pital',
  (select id from public.categories where slug='montanas'),
  'Chalatenango',
  'El punto más alto de El Salvador, con bosque nuboso y aire fresco.',
  'A 2,730 metros y en la frontera con Honduras, El Pital ofrece senderos entre pinos, cabañas y clima frío. Ideal para quien busca una escapada lejos del calor de la costa.',
  'Diciembre a marzo', 'Moderada',
  'https://picsum.photos/seed/cerro-el-pital/1200/800')
on conflict (slug) do nothing;
