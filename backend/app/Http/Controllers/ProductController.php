<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    // GET /api/products
    public function index(Request $request): JsonResponse
    {
        $category = $request->query('category');

        $query = Product::with('category')
            ->where('is_active', true)
            ->orderBy('name');

        if ($category) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $category));
        }

        $products = $query->get()->map(fn ($p) => $this->format($p))->values()->all();

        return response()->json(['data' => $products]);
    }

    // GET /api/products/featured
    public function featured(Request $request): JsonResponse
    {
        $limit = min((int) $request->query('limit', 4), 12);

        $products = Product::with('category')
            ->where('is_featured', true)
            ->where('is_active', true)
            ->latest()
            ->limit($limit)
            ->get()
            ->map(fn ($p) => $this->format($p))
            ->values()
            ->all();

        return response()->json(['data' => $products]);
    }

    // GET /api/products/slugs
    public function slugs(): JsonResponse
    {
        $slugs = Product::where('is_active', true)
            ->pluck('slug')
            ->values()
            ->all();

        return response()->json(['data' => $slugs]);
    }

    // GET /api/products/{slug}
    public function show(string $slug): JsonResponse
    {
        $product = Product::with('category')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json(['data' => $this->format($product)]);
    }

    private function format(Product $p): array
    {
        return [
            'id'                => (int) $p->id,
            'category_id'       => (int) $p->category_id,
            'name'              => (string) $p->name,
            'slug'              => (string) $p->slug,
            'description'       => (string) ($p->description ?? ''),
            'short_description' => (string) ($p->short_description ?? ''),
            'price'             => (float) $p->price,
            'stock_qty'         => (int) $p->stock_qty,
            'image_url'         => (string) ($p->image_url ?? ''),
            'is_featured'       => (bool) $p->is_featured,
            'is_active'         => (bool) $p->is_active,
            'created_at'        => $p->created_at?->toIso8601String(),
            'category_name'     => (string) ($p->category?->name ?? ''),
            'category_slug'     => (string) ($p->category?->slug ?? ''),
        ];
    }
}