<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExperienceWork extends FormRequest
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
            'organization' => 'required|string',
            'group' => 'required|string',
            'is_active' => 'required|boolean',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
        ];
    }
}
