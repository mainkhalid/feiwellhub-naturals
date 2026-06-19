<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AdminOrderController extends Controller
{
    // GET /api/admin/orders
    public function index(Request $request): JsonResponse
    {
        $query = Order::with('items')
            ->orderByDesc('created_at');

        if ($request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('order_number',   'ilike', "%{$s}%")
                  ->orWhere('customer_name',  'ilike', "%{$s}%")
                  ->orWhere('customer_phone', 'ilike', "%{$s}%");
            });
        }

        $orders = $query->paginate(20);

        return response()->json([
            'data'       => collect($orders->items())->map(fn ($o) => $this->format($o)),
            'pagination' => [
                'total'        => $orders->total(),
                'per_page'     => $orders->perPage(),
                'current_page' => $orders->currentPage(),
                'last_page'    => $orders->lastPage(),
            ],
        ]);
    }

    // POST /api/admin/orders
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'customer_name'     => ['required', 'string', 'max:150'],
            'customer_phone'    => ['required', 'string', 'max:30'],
            'customer_email'    => ['nullable', 'email'],
            'delivery_address'  => ['nullable', 'string'],
            'delivery_fee'      => ['nullable', 'numeric', 'min:0'],
            'notes'             => ['nullable', 'string'],
            'source'            => ['nullable', 'string'],
            'items'             => ['required', 'array', 'min:1'],
            'items.*.product_id'   => ['nullable', 'exists:products,id'],
            'items.*.product_name' => ['required', 'string'],
            'items.*.quantity'     => ['required', 'integer', 'min:1'],
            'items.*.unit_price'   => ['required', 'numeric', 'min:0'],
        ]);

        $total = collect($data['items'])->sum(fn ($i) => $i['quantity'] * $i['unit_price']);

        $order = Order::create([
            'order_number'     => Order::generateOrderNumber(),
            'customer_name'    => $data['customer_name'],
            'customer_phone'   => $data['customer_phone'],
            'customer_email'   => $data['customer_email'] ?? null,
            'delivery_address' => $data['delivery_address'] ?? null,
            'delivery_fee'     => $data['delivery_fee'] ?? 0,
            'total_amount'     => $total + ($data['delivery_fee'] ?? 0),
            'notes'            => $data['notes'] ?? null,
            'source'           => $data['source'] ?? 'whatsapp',
            'status'           => 'pending',
        ]);

        foreach ($data['items'] as $item) {
            $order->items()->create([
                'product_id'   => $item['product_id'] ?? null,
                'product_name' => $item['product_name'],
                'quantity'     => $item['quantity'],
                'unit_price'   => $item['unit_price'],
            ]);
        }

        return response()->json(['data' => $this->format($order->load('items'))], 201);
    }

    // GET /api/admin/orders/{id}
    public function show(int $id): JsonResponse
    {
        $order = Order::with('items.product')->findOrFail($id);
        return response()->json(['data' => $this->format($order)]);
    }

    // PUT /api/admin/orders/{id}
    public function update(Request $request, int $id): JsonResponse
    {
        $order = Order::findOrFail($id);

        $data = $request->validate([
            'status'           => ['sometimes', 'in:pending,confirmed,processing,shipped,delivered,cancelled'],
            'customer_name'    => ['sometimes', 'string', 'max:150'],
            'customer_phone'   => ['sometimes', 'string', 'max:30'],
            'customer_email'   => ['nullable', 'email'],
            'delivery_address' => ['nullable', 'string'],
            'delivery_fee'     => ['nullable', 'numeric', 'min:0'],
            'notes'            => ['nullable', 'string'],
        ]);

        $order->update($data);

        return response()->json(['data' => $this->format($order->load('items'))]);
    }

    // DELETE /api/admin/orders/{id}
    public function destroy(int $id): JsonResponse
    {
        Order::findOrFail($id)->delete();
        return response()->json(['message' => 'Order deleted.']);
    }

    // GET /api/admin/orders/stats
    public function stats(): JsonResponse
    {
        return response()->json(['data' => [
            'total'      => Order::count(),
            'pending'    => Order::where('status', 'pending')->count(),
            'confirmed'  => Order::where('status', 'confirmed')->count(),
            'processing' => Order::where('status', 'processing')->count(),
            'shipped'    => Order::where('status', 'shipped')->count(),
            'delivered'  => Order::where('status', 'delivered')->count(),
            'cancelled'  => Order::where('status', 'cancelled')->count(),
            'revenue'    => (float) Order::where('status', 'delivered')->sum('total_amount'),
            'this_month' => (float) Order::where('status', 'delivered')
                ->whereMonth('created_at', now()->month)
                ->sum('total_amount'),
        ]]);
    }

    private function format(Order $o): array
    {
        return [
            'id'               => $o->id,
            'order_number'     => $o->order_number,
            'customer_name'    => $o->customer_name,
            'customer_phone'   => $o->customer_phone,
            'customer_email'   => $o->customer_email,
            'delivery_address' => $o->delivery_address,
            'status'           => $o->status,
            'total_amount'     => (float) $o->total_amount,
            'delivery_fee'     => (float) $o->delivery_fee,
            'notes'            => $o->notes,
            'source'           => $o->source,
            'created_at'       => $o->created_at?->toIso8601String(),
            'items'            => $o->items->map(fn ($i) => [
                'id'           => $i->id,
                'product_id'   => $i->product_id,
                'product_name' => $i->product_name,
                'quantity'     => $i->quantity,
                'unit_price'   => (float) $i->unit_price,
                'subtotal'     => (float) ($i->quantity * $i->unit_price),
            ])->toArray(),
        ];
    }
}
