#!/bin/sh
set -e

echo "🌿 Feiwellhub Naturals — Starting on Render..."

# ── Parse Upstash REDIS_URL into individual vars ──────
# Upstash provides: rediss://default:PASSWORD@HOST:PORT
if [ -n "$REDIS_URL" ]; then
  # Extract host, port, password from URL
  REDIS_HOST=$(echo "$REDIS_URL" | sed -E 's|rediss?://[^@]+@([^:]+):.*|\1|')
  REDIS_PORT=$(echo "$REDIS_URL" | sed -E 's|rediss?://[^@]+@[^:]+:([0-9]+).*|\1|')
  REDIS_PASSWORD=$(echo "$REDIS_URL" | sed -E 's|rediss?://[^:]+:([^@]+)@.*|\1|')
  export REDIS_HOST REDIS_PORT REDIS_PASSWORD

  # Enable TLS for Upstash (uses rediss:// with TLS)
  export REDIS_SCHEME=tls
fi

# ── Generate APP_KEY if missing ───────────────────────
if [ -z "$APP_KEY" ]; then
  echo "⚠️  Generating APP_KEY..."
  php artisan key:generate --force
fi

# ── Cache config/routes/views ─────────────────────────
echo "⚙️  Caching for production..."
php artisan config:cache  || true
php artisan route:cache   || true
php artisan view:cache    || true

# ── Run migrations (safe — never drops tables) ────────
echo "🗄️  Running migrations..."
php artisan migrate --force

# ── Ensure Sanctum table exists ───────────────────────
php artisan tinker --execute="
if (!\Illuminate\Support\Facades\Schema::hasTable('personal_access_tokens')) {
    \Illuminate\Support\Facades\Artisan::call('vendor:publish', [
        '--provider' => 'Laravel\Sanctum\SanctumServiceProvider',
        '--force'    => true,
    ]);
    \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
    echo 'Sanctum installed';
} else {
    echo 'Sanctum OK';
}
" 2>/dev/null || true

echo "✅ Starting server on port ${PORT:-8000}..."
exec php artisan serve --host=0.0.0.0 --port="${PORT:-8000}"
