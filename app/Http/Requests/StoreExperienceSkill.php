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
        $user = $this->user();
        $experience = null;
        switch ($experience_type) {
            case 'experience_work':
                $experience = ExperienceWork::find($experience_id);
                break;
            case 'experience_award':
                $experience = ExperienceAward::find($experience_id);
                break;
            case 'experience_community':
                $experience = ExperienceCommunity::find($experience_id);
                break;
            case 'experience_education':
                $experience = ExperienceEducation::find($experience_id);
                break;
            case 'experience_personal':
                $experience = ExperiencePersonal::find($experience_id);
                break;
        }
        return $experience !== null
            && $user !== null
            && $user->can('create', ExperienceSkill::class)
            && $user->can('update', $experience);
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
