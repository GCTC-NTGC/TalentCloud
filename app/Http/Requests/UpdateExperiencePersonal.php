<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExperiencePersonal extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'is_shareable' => 'required|boolean',
            'is_education_requirement' => 'required|boolean',
            'is_active' => 'required|boolean',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
        ];
    }
}
