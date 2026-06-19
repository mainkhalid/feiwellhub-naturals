
## Tech Stack

| Layer      | Technology                          | Why                                      |
|------------|-------------------------------------|------------------------------------------|
| Frontend   | **Next.js 14** (App Router)         | SSR, SSG, ISR — best-in-class SEO        |
| Styling    | **Tailwind CSS v3**                 | Utility-first, consistent design tokens  |
| Backend    | **Laravel 11** (API-only)           | Clean REST API, validation, Eloquent ORM |
| Database   | **PostgreSQL 16**                   | Reliable, relational, production-grade   |
| Cache      | **Redis 7**                         | Fast API response caching                |
| Web server | **Nginx**                           | Reverse proxy, SSL, static asset caching |
| Container  | **Docker Compose**                  | Consistent local & production env        |

---

## Project Structure

```
verdura-next/
├── frontend/                    ← Next.js App
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       ← Root layout + SEO metadata
│   │   │   ├── page.tsx         ← Homepage (SSR)
│   │   │   ├── products/
│   │   │   │   ├── page.tsx     ← Products listing (SSR + filters)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx ← Product detail (SSG + ISR)
│   │   │   └── contact/
│   │   │       └── page.tsx     ← Contact form (Client Component)
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── ui/
│   │   │       └── ProductCard.tsx
│   │   ├── lib/api.ts           ← All data fetching + formatPrice
│   │   └── types/index.ts       ← TypeScript interfaces
│   ├── tailwind.config.js       ← Brand colour tokens
│   └── next.config.js
│
├── backend/                     ← Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/     ← Product / Category / Contact
│   │   │   └── Requests/        ← ContactRequest validation
│   │   └── Models/              ← Product / Category / ContactMessage
│   ├── routes/api.php           ← All API routes
│   └── database/
│       ├── migrations/          ← PostgreSQL schema
│       └── seeders/             ← Full product seed data
│
├── nginx/verdura.conf           ← SSL, proxy, caching
└── docker/docker-compose.yml    ← Full stack orchestration
```

---

## API Endpoints (Laravel)

| Method | Route                          | Description                      |
|--------|--------------------------------|----------------------------------|
| GET    | `/api/v1/categories`           | All categories                   |
| GET    | `/api/v1/products`             | All products (optional `?category=slug`) |
| GET    | `/api/v1/products/featured`    | Featured products (`?limit=4`)   |
| GET    | `/api/v1/products/slugs`       | All product slugs (for SSG)      |
| GET    | `/api/v1/products/{slug}`      | Single product by slug           |
| POST   | `/api/v1/contact`              | Submit contact form              |

---

## Local Development Setup

### 1. Clone & configure

```bash
# Copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Edit `backend/.env`:
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_DATABASE=verdura_db
DB_USERNAME=verdura
DB_PASSWORD=secret
CACHE_DRIVER=redis
REDIS_HOST=127.0.0.1
```

Edit `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=https://verdura.co.ke
```

### 2. Docker (recommended)

```bash
cd docker
docker compose up -d

# Run migrations + seed
docker compose exec api php artisan migrate --seed
```

### 3. Manual setup

**Backend:**
```bash
cd backend
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev       # dev server on :3000
npm run build     # production build
npm start         # production server
```

---

## SEO Features (Next.js)

- **Server-side rendering** on all pages — full HTML sent to Google
- **`generateMetadata()`** per page — unique title + description + OG tags
- **`generateStaticParams()`** on product detail — pre-built at deploy time
- **ISR (Incremental Static Regeneration)** — pages revalidate every 60s
- **`next/image`** with responsive `sizes` — Core Web Vitals optimised
- **Structured `<Link>`** components — crawler-friendly internal links
- **Canonical URLs** via `metadataBase` in root layout

---

## Redis Caching (Laravel)

| Key                        | TTL    | Busted by              |
|----------------------------|--------|------------------------|
| `categories`               | 1 hour | Manual / deploy        |
| `products_all`             | 60s    | Auto-revalidate        |
| `products_cat_{slug}`      | 60s    | Auto-revalidate        |
| `products_featured_{n}`    | 60s    | Auto-revalidate        |
| `product_{slug}`           | 60s    | Auto-revalidate        |
| `product_slugs`            | 1 hour | Manual / deploy        |

---

## Customisation Checklist

- [ ] Update phone/email in `Footer.tsx` and contact page
- [ ] Update location (currently "Nairobi, Kenya")
- [ ] Add real product images (replace Unsplash URLs in seeder)
- [ ] Set real `NEXT_PUBLIC_SITE_URL` for OG metadata
- [ ] Configure SSL certificate paths in `nginx/verdura.conf`
- [ ] Generate `APP_KEY` for Laravel (`php artisan key:generate`)
