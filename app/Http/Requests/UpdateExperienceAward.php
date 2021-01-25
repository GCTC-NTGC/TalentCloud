<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExperienceAward extends FormRequest
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
            'award_recipient_type_id' => 'required|exists:award_recipient_types,id',
            'award_recognition_type_id' => 'required|exists:award_recognition_types,id',
            'issued_by' => 'required|string',
            'is_education_requirement' => 'required|boolean',
            'awarded_date' => 'required|date',
        ];
    }
}
