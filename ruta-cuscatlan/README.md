# Ruta Cuscatlán

Landing page y guía de destinos turísticos de El Salvador (volcanes, playas y pueblos), construida con **Next.js 16 (App Router)** y **Supabase** como backend serverless. Proyecto de la actividad *Dominio del App Router y Gestión de Datos*.

## Qué incluye

- **Rutas dinámicas:** `/destinos/[slug]` y `/categorias/[slug]`.
- **Server Components** que leen datos de Supabase (tablas `categories` y `destinations`, relacionadas por `category_id`).
- **RLS activado:** política de solo lectura para `anon`; no hay políticas de escritura.
- **Loading states** (`app/loading.tsx`), **manejo de errores** (`app/error.tsx`) y **404** (`app/not-found.tsx`, con `notFound()`).
- **Revalidación** cada 60 segundos (ISR) y metadata dinámica por página.
- Diseño responsive sin dependencias de CSS externas.

## Instalación local

Requisitos: Node.js 20.9 o superior y una cuenta gratuita de [Supabase](https://supabase.com).

```bash
git clone https://github.com/TU-USUARIO/ruta-cuscatlan.git
cd ruta-cuscatlan
npm install
cp .env.example .env.local   # y completa los valores
npm run dev
```

Abre http://localhost:3000.

### Configurar Supabase

1. Crea un proyecto nuevo en Supabase.
2. Ve a **SQL Editor**, pega el contenido de [`supabase/schema.sql`](supabase/schema.sql) y ejecútalo. Crea las tablas, activa RLS y carga 3 categorías y 7 destinos.
3. En **Project Settings > API** copia la *Project URL* y la *anon public key* a `.env.local`.

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública `anon` (protegida por RLS) |

Nunca subas `.env.local` al repositorio (ya está en `.gitignore`) ni uses la `service_role` key en este proyecto.

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En [vercel.com/new](https://vercel.com/new) importa el repo.
3. En *Environment Variables* agrega las dos variables anteriores.
4. Pulsa **Deploy**.

## Estructura

```
app/
  page.tsx                    Inicio (lista de destinos)
  destinos/[slug]/page.tsx    Detalle de destino
  categorias/[slug]/page.tsx  Destinos por categoría
  loading.tsx  error.tsx  not-found.tsx
components/DestinationCard.tsx
lib/supabase.ts  lib/data.ts  lib/types.ts
supabase/schema.sql
```
