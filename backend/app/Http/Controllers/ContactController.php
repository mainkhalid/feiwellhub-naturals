<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    // POST /api/contact
    public function store(ContactRequest $request): JsonResponse
    {
        ContactMessage::create([
            'full_name' => $request->full_name,
            'email'     => strtolower($request->email),
            'phone'     => $request->phone ?? '',
            'subject'   => $request->subject ?? 'General Enquiry',
            'message'   => $request->message,
        ]);

        return response()->json([
            'success' => true,
            'message' => "Thank you! We'll be in touch shortly.",
        ], 201);
    }
}
