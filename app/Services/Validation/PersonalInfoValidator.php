<?php

namespace App\Services\Validation;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PersonalInfoValidator
{
    public function rules()
    {
        return [
            // Name validation.
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',

            // Email validation.
            'email_address' => [
                'required',
                'string',
                'max:191',
                'email',
                // Email may match existing email for this user, must be unique if changed.
                Rule::unique('users', 'email')->ignore($this->user->id)
            ],
        ];
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array $data Incoming registration data.
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public static function validate(array $data)
    {
        return Validator::make($data, self::basicRules());
    }

    /*
    public function messages()
    {
        return Lang::get('validation.custom.password');
    }
    */
}
