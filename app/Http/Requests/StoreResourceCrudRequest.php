<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreResourceCrudRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return boolean
     */
    public function authorize() : bool
    {
        // Only allow updates if the user is a logged in Admin.
        return backpack_auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return string[]
     */
    public function rules() : array
    {
        return [
            'name' => 'required|string',
            'file' => 'required|file',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return string[]
     */
    public function messages() : array
    {
        return [
            'name.required' => 'Please enter a Resource name.',
            'file.required' => 'Please upload a file.',
        ];
    }
}
