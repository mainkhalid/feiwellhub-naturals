<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class ContactRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'min:2', 'max:150'],
            'email'     => ['required', 'email', 'max:200'],
            'phone'     => ['nullable', 'string', 'max:30'],
            'subject'   => ['nullable', 'string', 'max:200'],
            'message'   => ['required', 'string', 'min:10'],
        ];
    }

    // Return JSON errors instead of redirect
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'errors'  => $validator->errors()->toArray(),
            ], 422)
        );
    }
}
