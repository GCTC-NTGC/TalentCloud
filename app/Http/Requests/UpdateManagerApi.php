<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Validation\Rules\ValidIdRule;
use App\Models\Lookup\Frequency;
use App\Models\Lookup\Department;
use App\Services\Validation\Rules\LinkedInUrlRule;
use App\Services\Validation\Rules\TwitterHandleRule;

class UpdateManagerApi extends FormRequest
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
        $frequencyRule = new ValidIdRule(Frequency::class);
        return [
            'department_id' => ['nullable', new ValidIdRule(Department::class)],
            'gov_email' => [
                'nullable',
                'string',
                'max:191',
                'email',
            ],
            'twitter_username' => [
                'nullable', // Some people may not have a handle.
                new TwitterHandleRule,
            ],
            'linkedin_url' => [
                'nullable', // Some people may not be on LinkedIn.
                new LinkedInUrlRule
            ],
            'work_review_frequency_id' => ['nullable', $frequencyRule],
            'stay_late_frequency_id' => ['nullable', $frequencyRule],
            'engage_team_frequency_id' => ['nullable', $frequencyRule],
            'development_opportunity_frequency_id' => ['nullable', $frequencyRule],
            'refuse_low_value_work_frequency_id' => ['nullable', $frequencyRule],
            'years_experience' => 'nullable|numeric',

            'about_me.en' => 'nullable|string',
            'greatest_accomplishment.en' => 'nullable|string',
            'division.en' => 'nullable|string',
            'position.en' => 'nullable|string',
            'leadership_style.en' => 'nullable|string',
            'employee_learning.en' => 'nullable|string',
            'expectations.en' => 'nullable|string',
            'education.en' => 'nullable|string',
            'career_journey.en' => 'nullable|string',
            'learning_path.en' => 'nullable|string',

            'about_me.fr' => 'nullable|string',
            'greatest_accomplishment.fr' => 'nullable|string',
            'division.fr' => 'nullable|string',
            'position.fr' => 'nullable|string',
            'leadership_style.fr' => 'nullable|string',
            'employee_learning.fr' => 'nullable|string',
            'expectations.fr' => 'nullable|string',
            'education.fr' => 'nullable|string',
            'career_journey.fr' => 'nullable|string',
            'learning_path.fr' => 'nullable|string',
        ];
    }
}
