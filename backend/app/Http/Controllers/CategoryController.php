<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    // GET /api/categories
    public function index(): JsonResponse
    {
        $categories = Cache::remember('categories', 3600, fn () =>
            Category::orderBy('name')->get(['id','name','slug','description','icon'])
        );

        return response()->json(['data' => $categories]);
    }
}
