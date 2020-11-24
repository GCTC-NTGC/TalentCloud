<?php

namespace App\Http\Requests;

use App\Models\ExperienceAward;
use App\Models\ExperienceCommunity;
use App\Models\ExperienceEducation;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceSkill;
use App\Models\ExperienceWork;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BatchStoreExperienceSkill extends FormRequest
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
            '*.skill_id' => 'required|exists:skills,id',
            '*.justification' => 'nullable|string',
            '*.experience_type' => ['
                required',
                Rule::in([
                    'experience_work',
                    'experience_award',
                    'experience_community',
                    'experience_personal',
                    'experience_education'
                ])
            ],
            '*.experience_id' => 'required|integer'
        ];
    }
}
