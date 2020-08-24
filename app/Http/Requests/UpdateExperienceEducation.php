<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExperienceEducation extends FormRequest
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
            'education_type_id' => 'required|exists:education_types,id',
            'area_of_study' => 'required|string',
            'institution' => 'required|string',
            'education_status_id' => 'required|exists:education_statuses,id',
            'thesis_title' => 'nullable|string',
            'has_blockcert' => 'required|boolean',
            'is_education_requirement' => 'required|boolean',
            'is_active' => 'required|boolean',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
        ];
    }
}
