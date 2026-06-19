<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // ── Orders ────────────────────────────────────────────
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number', 20)->unique();
            $table->string('customer_name', 150);
            $table->string('customer_phone', 30);
            $table->string('customer_email', 200)->nullable();
            $table->string('delivery_address')->nullable();
            $table->enum('status', [
                'pending','confirmed','processing','shipped','delivered','cancelled'
            ])->default('pending');
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->decimal('delivery_fee', 10, 2)->default(0);
            $table->text('notes')->nullable();
            $table->string('source', 30)->default('whatsapp'); // whatsapp, phone, walk-in
            $table->timestamps();
        });

        // ── Order Items ───────────────────────────────────────
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->nullOnDelete();
            $table->string('product_name', 200); // snapshot at time of order
            $table->integer('quantity')->default(1);
            $table->decimal('unit_price', 10, 2);
            $table->timestamps();
        });

        // ── Settings ──────────────────────────────────────────
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 100)->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // Seed default settings
        $defaults = [
            ['key' => 'store_name',        'value' => 'Feiwellhub Naturals'],
            ['key' => 'store_email',        'value' => 'hello@feiwellhub.co.ke'],
            ['key' => 'store_phone',        'value' => '+254 700 000 000'],
            ['key' => 'whatsapp_number',    'value' => '254700000000'],
            ['key' => 'store_location',     'value' => 'Nairobi, Kenya'],
            ['key' => 'delivery_fee',       'value' => '200'],
            ['key' => 'free_delivery_above','value' => '2000'],
            ['key' => 'delivery_zones',     'value' => 'Nairobi CBD, Westlands, Kilimani, Karen, Kasarani, Embakasi'],
            ['key' => 'business_hours',     'value' => 'Mon-Fri: 8am-6pm, Sat: 9am-4pm'],
            ['key' => 'low_stock_threshold','value' => '10'],
            ['key' => 'instagram_url',      'value' => ''],
            ['key' => 'facebook_url',       'value' => ''],
        ];

        foreach ($defaults as $setting) {
            DB::table('settings')->insertOrIgnore(array_merge($setting, [
                'created_at' => now(), 'updated_at' => now(),
            ]));
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('settings');
    }
};
