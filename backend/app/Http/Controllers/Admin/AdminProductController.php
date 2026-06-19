<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class AdminProductController extends Controller
{
    // GET /api/admin/products
    public function index(): JsonResponse
    {
        $products = Product::with('category')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($p) => $this->format($p));

        return response()->json(['data' => $products]);
    }

    // POST /api/admin/products
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'              => ['required', 'string', 'max:200'],
            'category_id'       => ['required', 'exists:categories,id'],
            'description'       => ['required', 'string'],
            'short_description' => ['required', 'string', 'max:300'],
            'price'             => ['required', 'numeric', 'min:0'],
            'stock_qty'         => ['required', 'integer', 'min:0'],
            'image_url'         => ['required', 'url'],
            'is_featured'       => ['boolean'],
            'is_active'         => ['boolean'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['name']);

        $product = Product::create($data);
        $this->clearCache();

        return response()->json(['data' => $this->format($product->load('category'))], 201);
    }

    // GET /api/admin/products/{id}
    public function show(int $id): JsonResponse
    {
        $product = Product::with('category')->findOrFail($id);
        return response()->json(['data' => $this->format($product)]);
    }

    // PUT /api/admin/products/{id}
    public function update(Request $request, int $id): JsonResponse
    {
        $product = Product::findOrFail($id);

        $data = $request->validate([
            'name'              => ['sometimes', 'string', 'max:200'],
            'category_id'       => ['sometimes', 'exists:categories,id'],
            'description'       => ['sometimes', 'string'],
            'short_description' => ['sometimes', 'string', 'max:300'],
            'price'             => ['sometimes', 'numeric', 'min:0'],
            'stock_qty'         => ['sometimes', 'integer', 'min:0'],
            'image_url'         => ['sometimes', 'url'],
            'is_featured'       => ['sometimes', 'boolean'],
            'is_active'         => ['sometimes', 'boolean'],
        ]);

        if (isset($data['name']) && $data['name'] !== $product->name) {
            $data['slug'] = $this->uniqueSlug($data['name']);
        }

        $product->update($data);
        $this->clearCache();

        return response()->json(['data' => $this->format($product->load('category'))]);
    }

    // DELETE /api/admin/products/{id}
    public function destroy(int $id): JsonResponse
    {
        Product::findOrFail($id)->delete();
        $this->clearCache();
        return response()->json(['message' => 'Product deleted.']);
    }

    private function uniqueSlug(string $name): string
    {
        $slug = Str::slug($name);
        $count = Product::where('slug', 'like', "{$slug}%")->count();
        return $count ? "{$slug}-{$count}" : $slug;
    }

    private function clearCache(): void
    {
        Cache::flush();
    }

    private function format(Product $p): array
    {
        return [
            'id'                => $p->id,
            'category_id'       => $p->category_id,
            'category_name'     => $p->category?->name,
            'category_slug'     => $p->category?->slug,
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
        ];
    }
}
