<?php

namespace App\Http\Requests;

use App\Models\Experience;
use App\Models\ExperienceSkill;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreExperienceSkill extends FormRequest
{
    /**
     * The user must have permission to update the Experience object
     *  this ExperienceSkill would be attached to.
     *
     * @return bool
     */
    public function authorize()
    {
        $experience_type = $this->input('experience_type');
        $experience_id = (int)$this->input('experience_id');
        $experience = new Experience();
        $experienceInstance = $experience->getExperienceInstance($experience_type, $experience_id);
        $user = $this->user();

        return $experienceInstance !== null
            && $user !== null
            && $user->can('create', ExperienceSkill::class)
            && $user->can('update', $experienceInstance);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'skill_id' => 'required|exists:skills,id',
            'justification' => 'nullable|string',
            'experience_type' => ['
                required',
                Rule::in([
                    'experience_work',
                    'experience_award',
                    'experience_community',
                    'experience_personal',
                    'experience_education'
                ])
            ],
            'experience_id' => 'required|integer'
        ];
    }
}
