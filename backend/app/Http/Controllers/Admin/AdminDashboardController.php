<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use Illuminate\Http\JsonResponse;

class AdminDashboardController extends Controller
{
    // GET /api/admin/stats
    public function stats(): JsonResponse
    {
        $lowStockThreshold = (int) \DB::table('settings')
            ->where('key', 'low_stock_threshold')->value('value') ?? 10;

        return response()->json([
            'data' => [
                'total_products'   => Product::count(),
                'active_products'  => Product::where('is_active', true)->count(),
                'total_categories' => Category::count(),
                'total_messages'   => ContactMessage::count(),
                'unread_messages'  => ContactMessage::where('is_read', false)->count(),
                'low_stock'        => Product::where('stock_qty', '<=', $lowStockThreshold)
                                        ->where('is_active', true)->count(),
                'total_orders'     => Order::count(),
                'pending_orders'   => Order::where('status', 'pending')->count(),
                'revenue_total'    => (float) Order::where('status', 'delivered')->sum('total_amount'),
                'revenue_month'    => (float) Order::where('status', 'delivered')
                                        ->whereMonth('created_at', now()->month)->sum('total_amount'),
            ],
        ]);
    }

    // GET /api/admin/notifications
    public function notifications(): JsonResponse
    {
        $lowStockThreshold = (int) \DB::table('settings')
            ->where('key', 'low_stock_threshold')->value('value') ?? 10;

        $notifications = [];

        // Unread messages
        $unread = ContactMessage::where('is_read', false)->count();
        if ($unread > 0) {
            $notifications[] = [
                'type'  => 'message',
                'text'  => "{$unread} unread message" . ($unread > 1 ? 's' : ''),
                'href'  => '/admin/dashboard/messages',
                'color' => 'blue',
            ];
        }

        // Pending orders
        $pending = Order::where('status', 'pending')->count();
        if ($pending > 0) {
            $notifications[] = [
                'type'  => 'order',
                'text'  => "{$pending} pending order" . ($pending > 1 ? 's' : ''),
                'href'  => '/admin/dashboard/orders',
                'color' => 'gold',
            ];
        }

        // Low stock
        $lowStock = Product::where('stock_qty', '<=', $lowStockThreshold)
            ->where('is_active', true)
            ->select('id','name','stock_qty')
            ->orderBy('stock_qty')
            ->limit(5)
            ->get();

        foreach ($lowStock as $p) {
            $notifications[] = [
                'type'  => 'stock',
                'text'  => "Low stock: {$p->name} ({$p->stock_qty} left)",
                'href'  => '/admin/dashboard/products',
                'color' => 'red',
            ];
        }

        return response()->json([
            'data'  => $notifications,
            'count' => count($notifications),
        ]);
    }

    // GET /api/admin/messages
    public function messages(): JsonResponse
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->paginate(20);
        return response()->json($messages);
    }

    // GET /api/admin/messages/{id}
    public function showMessage(int $id): JsonResponse
    {
        $msg = ContactMessage::findOrFail($id);
        if (!$msg->is_read) $msg->update(['is_read' => true]);
        return response()->json(['data' => $msg]);
    }

    // PUT /api/admin/messages/{id}/read
    public function markRead(int $id): JsonResponse
    {
        $msg = ContactMessage::findOrFail($id);
        $msg->update(['is_read' => !$msg->is_read]);
        return response()->json(['data' => $msg]);
    }

    // DELETE /api/admin/messages/{id}
    public function destroyMessage(int $id): JsonResponse
    {
        ContactMessage::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted.']);
    }
}
