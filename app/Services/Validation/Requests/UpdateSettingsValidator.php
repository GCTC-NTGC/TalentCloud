<?php

namespace App\Services\Validation\Requests;

use App\Services\Validation\BaseDataValidator;
use App\Services\Validation\Contracts\DataValidator;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use App\Services\Validation\Rules\PasswordCorrectRule;
use App\Services\Validation\Rules\PasswordFormatRule;

class UpdateSettingsValidator extends BaseDataValidator implements DataValidator
{
    /**
     * The User this application is indented to belong to
     *
     * @var User
     */
    protected $user;

    /**
     * Construct a validator for Settings form.
     *
     * @param User $user The user these settings belong to.
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return mixed[]
     */
    public function rules() : array
    {
        return [
            // Name validation.
            'profile_first_name' => 'required|string|max:191',
            'profile_last_name' => 'required|string|max:191',

            // Email validation.
            'profile_email' => [
                'required',
                'string',
                'max:191',
                'email',
                // Email may match existing email for this user, must be unique if changed.
                Rule::unique('users', 'email')->ignore($this->user->id)
            ],

            // Password validation.
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
            ]
        ];
    }

    /**
     * Returns a validator made with this data.
     *
     * @param  mixed[] $data Data to validate.
     * @return \Illuminate\Validation\Validator
     */
    public function validator(array $data) : Validator
    {
        return Validator::make($data, $this->rules());
    }
}
