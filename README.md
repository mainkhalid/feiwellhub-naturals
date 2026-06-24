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

