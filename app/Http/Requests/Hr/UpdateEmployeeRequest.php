<?php

namespace App\Http\Requests\Hr;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'          => ['required', 'string'],
            'code'          => ['required', 'email'],
            'is_active'     => ['required', 'boolean'],
            'bpjs'          => ['nullable', 'array'],
            'bpjs_file'     => ['nullable', 'file', 'mimes:pdf', 'between:100,500'],
            'joined_at'     => ['required', 'string'],
            'position_id'   => ['required', 'uuid'],
        ];
    }
}
