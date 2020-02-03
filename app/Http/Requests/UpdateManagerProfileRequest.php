<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Validation\Rules\ValidIdRule;
use App\Models\Lookup\Frequency;
use App\Models\Lookup\Department;
use App\Services\Validation\Rules\LinkedInUrlRule;
use Illuminate\Validation\Rule;
use App\Services\Validation\Rules\PasswordCorrectRule;
use App\Services\Validation\Rules\PasswordFormatRule;
use App\Services\Validation\Rules\TwitterHandleRule;

class UpdateManagerProfileRequest extends FormRequest
{
    /**
     * Validator instance updated on failedValidation.
     *
     * @var \Illuminate\Contracts\Validation\Validator
     */
    public $validator = null;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return boolean
     */
    public function authorize()
    {
        return $this->manager !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'position.*' => 'nullable|string',
            'division.*' => 'nullable|string',

            'education.*' => 'nullable|string',
            'years_experience' => 'nullable|numeric|min:0',


            'career_journey.*' => 'nullable|string',
            'learning_path.*' => 'nullable|string',
            'about_me.*' => 'nullable|string',

            'twitter_username' => [
                'nullable', // Some people may not have a handle.
                new TwitterHandleRule,
            ],
            'linkedin_url' => [
                'nullable', // Some people may not be on LinkedIn.
                new LinkedInUrlRule,
            ],

            'leadership_style.*' => 'nullable|string',
            'expectations.*' => 'nullable|string',
            'employee_learning.*' => 'nullable|string',
        ];
    }
}
