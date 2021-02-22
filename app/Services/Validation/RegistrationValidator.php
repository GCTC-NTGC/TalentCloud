<?php

namespace App\Services\Validation;

use App\Services\Validation\Rules\PasswordFormatRule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class RegistrationValidator
{
    public static function basicRules()
    {
        return [
            'website' => 'size:0', // Honeypot, hidden field needs to be empty.
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'contact_language' => [
                'required',
                'string',
                Rule::in(['en', 'fr']),
            ],
            'job_alerts' => 'boolean|in:0,1',
            'password' => [
                'required',
                'min:9',
                new PasswordFormatRule,
                'confirmed'
            ],
        ];
    }

    public static function managerRegistrationExtraRules()
    {
        return [
            'department' => 'required|integer',
            'gov_email' => 'nullable|required_unless:department,0|string|email|max:255|unique:users',
            // gov_email is required unless department is set to 0 (Not in Government)
        ];
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public static function userValidator(array $data)
    {
        return Validator::make($data, self::basicRules());
    }

    /**
     * Get a validator for an incoming Manager registration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public static function managerValidator(array $data)
    {
        $managerRules = array_merge(self::basicRules(), self::managerRegistrationExtraRules());
        return Validator::make($data, $managerRules);
    }

    /**
     * Get a validator for an incoming finishManagerRegistration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public static function finalizeManagerValidator(array $data)
    {
        return Validator::make($data, self::managerRegistrationExtraRules());
    }

    /**
     * Get a validator for an incoming HR Advisor registration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public static function hrValidator(array $data)
    {
        $hrRules = array_merge(self::basicRules(), self::managerRegistrationExtraRules());
        return Validator::make($data, $hrRules);
    }

    /**
     * Get a validator for an incoming finishHrRegistration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public static function finalizeHrValidator(array $data)
    {
        return Validator::make($data, self::managerRegistrationExtraRules());
    }
}
