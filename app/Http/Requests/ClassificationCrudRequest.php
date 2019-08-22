<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassificationCrudRequest extends FormRequest
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
            'key' => 'required|size:2|alpha|unique:classifications,key'
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
            'key.required' => 'Please enter a classification key.',
            'key.size' => 'The classification key must be 2 characters long.',
            'key.alpha' => 'The classification key may only use alphabetic characters.',
            'key.unique' => 'That classification key already exists.'
        ];
    }
}
