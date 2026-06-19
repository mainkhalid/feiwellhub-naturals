<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    // GET /api/products
    public function index(Request $request): JsonResponse
    {
        $category = $request->query('category');

        $cacheKey = 'products' . ($category ? "_cat_{$category}" : '_all');

        $products = Cache::remember($cacheKey, 60, function () use ($category) {
            $query = Product::with('category')
                ->where('is_active', true)
                ->orderBy('name');

            if ($category) {
                $query->whereHas('category', fn ($q) => $q->where('slug', $category));
            }

            return $query->get()->map(fn ($p) => $this->format($p));
        });

        return response()->json(['data' => $products]);
    }

    // GET /api/products/featured
    public function featured(Request $request): JsonResponse
    {
        $limit = min((int) $request->query('limit', 4), 12);

        $products = Cache::remember("products_featured_{$limit}", 60, function () use ($limit) {
            return Product::with('category')
                ->where('is_featured', true)
                ->where('is_active', true)
                ->latest()
                ->limit($limit)
                ->get()
                ->map(fn ($p) => $this->format($p));
        });

        return response()->json(['data' => $products]);
    }

    // GET /api/products/slugs
    public function slugs(): JsonResponse
    {
        $slugs = Cache::remember('product_slugs', 3600, fn () =>
            Product::where('is_active', true)->pluck('slug')
        );

        return response()->json(['data' => $slugs]);
    }

    // GET /api/products/{slug}
    public function show(string $slug): JsonResponse
    {
        $product = Cache::remember("product_{$slug}", 60, function () use ($slug) {
            $p = Product::with('category')
                ->where('slug', $slug)
                ->where('is_active', true)
                ->first();
            return $p ? $this->format($p) : null;
        });

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json(['data' => $product]);
    }

    private function format(Product $p): array
    {
        return [
            'id'                => $p->id,
            'category_id'       => $p->category_id,
            'name'              => $p->name,
            'slug'              => $p->slug,
            'description'       => $p->description,
            'short_description' => $p->short_description,
            'price'             => (float) $p->price,
            'stock_qty'         => $p->stock_qty,
            'image_url'         => $p->image_url,
            'is_featured'       => (bool) $p->is_featured,
            'is_active'         => (bool) $p->is_active,
            'created_at'        => $p->created_at?->toIso8601String(),
            'category_name'     => $p->category?->name,
            'category_slug'     => $p->category?->slug,
        ];
    }
}
