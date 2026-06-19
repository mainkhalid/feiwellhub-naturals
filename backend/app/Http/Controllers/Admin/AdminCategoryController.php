<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class AdminCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $cats = Category::withCount('products')->orderBy('name')->get();
        return response()->json(['data' => $cats]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'icon'        => ['nullable', 'string', 'max:50'],
        ]);
        $data['slug'] = Str::slug($data['name']);

        $cat = Category::create($data);
        Cache::flush();

        return response()->json(['data' => $cat], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $cat  = Category::findOrFail($id);
        $data = $request->validate([
            'name'        => ['sometimes', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'icon'        => ['nullable', 'string', 'max:50'],
        ]);
        if (isset($data['name'])) $data['slug'] = Str::slug($data['name']);

        $cat->update($data);
        Cache::flush();

        return response()->json(['data' => $cat]);
    }

    public function destroy(int $id): JsonResponse
    {
        Category::findOrFail($id)->delete();
        Cache::flush();
        return response()->json(['message' => 'Category deleted.']);
    }
}
