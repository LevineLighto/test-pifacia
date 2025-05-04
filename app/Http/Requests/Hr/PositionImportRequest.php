<?php

namespace App\Http\Requests\Hr;

use Illuminate\Foundation\Http\FormRequest;

class PositionImportRequest extends FormRequest
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
            'file'              => ['required', 'string'],
            'headings'          => ['required', 'array'],
            'headings.name'     => ['required', 'string'],
            'headings.code'     => ['required', 'string'],
            'headings.scope'    => ['required', 'string'],
            'headings.is_active'=> ['required', 'string'],
            'headings.division' => ['required', 'string'],
        ];
    }
}
