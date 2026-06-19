<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class AdminSettingsController extends Controller
{
    // GET /api/admin/settings
    public function index(): JsonResponse
    {
        $settings = DB::table('settings')->get()->pluck('value', 'key');
        return response()->json(['data' => $settings]);
    }

    // PUT /api/admin/settings
    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'store_name'         => ['sometimes', 'string', 'max:100'],
            'store_email'        => ['sometimes', 'email'],
            'store_phone'        => ['sometimes', 'string', 'max:30'],
            'whatsapp_number'    => ['sometimes', 'string', 'max:20'],
            'store_location'     => ['sometimes', 'string'],
            'delivery_fee'       => ['sometimes', 'numeric', 'min:0'],
            'free_delivery_above'=> ['sometimes', 'numeric', 'min:0'],
            'delivery_zones'     => ['sometimes', 'string'],
            'business_hours'     => ['sometimes', 'string'],
            'low_stock_threshold'=> ['sometimes', 'integer', 'min:1'],
            'instagram_url'      => ['sometimes', 'nullable', 'string'],
            'facebook_url'       => ['sometimes', 'nullable', 'string'],
        ]);

        foreach ($data as $key => $value) {
            DB::table('settings')->updateOrInsert(
                ['key' => $key],
                ['value' => $value, 'updated_at' => now()]
            );
        }

        Cache::forget('site_settings');

        return response()->json([
            'message' => 'Settings saved.',
            'data'    => DB::table('settings')->get()->pluck('value', 'key'),
        ]);
    }
}
