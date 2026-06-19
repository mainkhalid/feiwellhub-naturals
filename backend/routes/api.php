<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminSettingsController;

// ── Public store routes ───────────────────────────────
Route::get('/categories',        [CategoryController::class, 'index']);
Route::get('/products/featured', [ProductController::class, 'featured']);
Route::get('/products/slugs',    [ProductController::class, 'slugs']);
Route::get('/products',          [ProductController::class, 'index']);
Route::get('/products/{slug}',   [ProductController::class, 'show']);
Route::post('/contact',          [ContactController::class, 'store']);

// ── Auth ──────────────────────────────────────────────
Route::post('/auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);
});

// ── Admin ─────────────────────────────────────────────
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

    // Dashboard & notifications
    Route::get('/stats',         [AdminDashboardController::class, 'stats']);
    Route::get('/notifications', [AdminDashboardController::class, 'notifications']);

    // Products
    Route::get('/products',         [AdminProductController::class, 'index']);
    Route::post('/products',        [AdminProductController::class, 'store']);
    Route::get('/products/{id}',    [AdminProductController::class, 'show']);
    Route::put('/products/{id}',    [AdminProductController::class, 'update']);
    Route::delete('/products/{id}', [AdminProductController::class, 'destroy']);

    // Categories
    Route::get('/categories',         [AdminCategoryController::class, 'index']);
    Route::post('/categories',        [AdminCategoryController::class, 'store']);
    Route::put('/categories/{id}',    [AdminCategoryController::class, 'update']);
    Route::delete('/categories/{id}', [AdminCategoryController::class, 'destroy']);

    // Orders
    Route::get('/orders/stats',    [AdminOrderController::class, 'stats']);
    Route::get('/orders',          [AdminOrderController::class, 'index']);
    Route::post('/orders',         [AdminOrderController::class, 'store']);
    Route::get('/orders/{id}',     [AdminOrderController::class, 'show']);
    Route::put('/orders/{id}',     [AdminOrderController::class, 'update']);
    Route::delete('/orders/{id}',  [AdminOrderController::class, 'destroy']);

    // Messages
    Route::get('/messages',             [AdminDashboardController::class, 'messages']);
    Route::get('/messages/{id}',        [AdminDashboardController::class, 'showMessage']);
    Route::put('/messages/{id}/read',   [AdminDashboardController::class, 'markRead']);
    Route::delete('/messages/{id}',     [AdminDashboardController::class, 'destroyMessage']);

    // Settings
    Route::get('/settings',  [AdminSettingsController::class, 'index']);
    Route::put('/settings',  [AdminSettingsController::class, 'update']);
});
