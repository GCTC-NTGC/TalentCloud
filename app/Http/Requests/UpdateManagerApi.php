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
            'government_email' => [
                'nullable',
                'string',
                'max:191',
                'email',
            ],
            'twitter_username' => [
                'nullable', // Some people may not have a handle.
                'max:15', // Per Twitter's Terms/Service.
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

            'en.about_me' => 'nullable|string',
            'en.greatest_accomplishment' => 'nullable|string',
            'en.branch' => 'nullable|string',
            'en.division' => 'nullable|string',
            'en.position' => 'nullable|string',
            'en.leadership_style' => 'nullable|string',
            'en.employee_learning' => 'nullable|string',
            'en.expectations' => 'nullable|string',
            'en.education' => 'nullable|string',
            'en.career_journey' => 'nullable|string',
            'en.learning_path' => 'nullable|string',

            'fr.about_me' => 'nullable|string',
            'fr.greatest_accomplishment' => 'nullable|string',
            'fr.branch' => 'nullable|string',
            'fr.division' => 'nullable|string',
            'fr.position' => 'nullable|string',
            'fr.leadership_style' => 'nullable|string',
            'fr.employee_learning' => 'nullable|string',
            'fr.expectations' => 'nullable|string',
            'fr.education' => 'nullable|string',
            'fr.career_journey' => 'nullable|string',
            'fr.learning_path' => 'nullable|string',
        ];
    }
}
