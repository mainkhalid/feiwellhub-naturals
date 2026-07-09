<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        // Cache a plain array (not Eloquent models) to avoid the
        // deserialization issue hit previously with Redis + Eloquent.
        $categories = Cache::remember('categories:index', 3600, function () {
            return Category::orderBy('name')
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
        });

        return response()->json(['data' => $categories])
            ->header('Cache-Control', 'public, max-age=3600');
    }
}