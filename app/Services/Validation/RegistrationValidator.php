<?php

namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use App\Services\Validation\Rules\PasswordFormatRule;

class RegistrationValidator
{
    public static function basicRules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'min:8',
                new PasswordFormatRule,
                'confirmed'
            ],
        ];
    }

    public static function managerRegistrationExtraRules()
    {
        return [
            'department' => 'required|integer',
            'gov_email' => 'nullable|required_unless:department,0|string|email|unique:users', // gov_email is required unless department is set to 0 (Not in Goverment)
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
        return Validator::make($data, $this->basicRules());
    }

    /**
     * Get a validator for an incoming Manager registration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public static function managerValidator(array $data)
    {
        $managerRules = array_merge($this->basicRules(), $this->managerRegistrationExtraRules());
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
        return Validator::make($data, $this->managerRegistrationExtraRules());
    }
}
