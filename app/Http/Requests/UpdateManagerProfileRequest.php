<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Validation\Rules\ValidIdRule;
use App\Models\Lookup\Frequency;
use App\Models\Lookup\Department;
use Illuminate\Validation\Rule;
use App\Services\Validation\Rules\PasswordCorrectRule;
use App\Services\Validation\Rules\PasswordFormatRule;

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
        $manager = $this->route('manager');
        return $manager->id !== null;
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
        $frequencyRule = new ValidIdRule(Frequency::class);
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
            'government_email' => [
                'nullable',
                'string',
                'max:191',
                'email',
            ],
            // Password validation
            'old_password' => [
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
            'telework_allowed_frequency_id' => ['required', $frequencyRule],
            'flexible_hours_frequency_id' => ['required', $frequencyRule],

            'team_size' => 'nullable|numeric|min:1',
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
            '*.how_we_work' => 'nullable|string',
            '*.leadership_style' => 'nullable|string',
            '*.learning_path' => 'nullable|string',
            '*.operating_context' => 'nullable|string',
            '*.position' => 'nullable|string',
            '*.things_to_know' => 'nullable|string',
            '*.what_we_value' => 'nullable|string',

            /*
             * Twitters Terms of Service only allows ". A username can only contain
             * alphanumeric characters (letters A-Z, numbers 0-9) with the exception
             * of underscores"
             * This regex will allow only alphamumeric characters and the underscore.
             * Keep this handy if we need to validate other usernames.
             */
            'twitter_username' => [
                'nullable', //Some people may not have a handle.
                'max:15', //Per Twitter's Terms/Service.
                'regex:/^[A-Za-z0-9_]+$/',
            ],
            'linkedin_url' => [
                'nullable', // Some people may not be on LinkedIn
                'regex:/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/', // Validation for linkedIn profile URLS only.
            ],
        ];
    }
}
