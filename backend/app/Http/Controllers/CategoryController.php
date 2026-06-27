<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        // No Redis cache — query directly every time
        // Fast enough since categories rarely change
        $categories = Category::orderBy('name')
            ->get(['id', 'name', 'slug', 'description', 'icon'])
            ->map(fn ($c) => [
                'id'          => (int) $c->id,
                'name'        => (string) $c->name,
                'slug'        => (string) $c->slug,
                'description' => (string) ($c->description ?? ''),
                'icon'        => (string) ($c->icon ?? ''),
            ])
            ->values()
            ->all();

        return response()->json(['data' => $categories]);
    }
}