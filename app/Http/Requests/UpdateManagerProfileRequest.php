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
     * Override Handle a failed validation attempt.
     *
     * @return void
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:191',
            'email' => [
                'required',
                'string',
                'max:191',
                'email',
                // Email may match existing email for this user,
                // but must be unique if changed.
                Rule::unique('users', 'email')->ignore($this->manager->user->id)
            ],
            'gov_email' => [
                'nullable',
                'string',
                'max:191',
                'email',
            ],
            // Password validation
            'current_password' => [
                'nullable',
                'required_with:new_password',
                new PasswordCorrectRule
            ],
            'new_password' => [
                'nullable',
                'min:8',
                new PasswordFormatRule,
                'confirmed'
            ],

            'department_id' => ['required', new ValidIdRule(Department::class)],

            'years_experience' => 'nullable|numeric|min:0',
            'gc_directory_url' => 'nullable|url',

            '*.about_me' => 'nullable|string',
            '*.career_journey' => 'nullable|string',
            '*.branch' => 'nullable|string',
            '*.division' => 'nullable|string',
            '*.education' => 'nullable|string',
            '*.employee_learning' => 'nullable|string',
            '*.expectations' => 'nullable|string',
            '*.greatest_accomplishment' => 'nullable|string',
            '*.leadership_style' => 'nullable|string',
            '*.learning_path' => 'nullable|string',
            '*.position' => 'nullable|string',

            'twitter_username' => [
                'nullable', // Some people may not have a handle.
                new TwitterHandleRule,
            ],
            'linkedin_url' => [
                'nullable', // Some people may not be on LinkedIn.
                new LinkedInUrlRule,
            ],
        ];
    }
}
