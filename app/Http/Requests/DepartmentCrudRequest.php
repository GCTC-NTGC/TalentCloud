<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DepartmentCrudRequest extends FormRequest
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
            'name' => 'required',
            'impact' => 'required'
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
            'name.required' => 'Please enter a department name.',
            'impact.required' => 'Please enter an impact statement.'
        ];
    }
}
