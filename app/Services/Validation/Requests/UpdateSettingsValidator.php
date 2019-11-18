<?php

namespace App\Services\Validation\Requests;

use App\Services\Validation\BaseDataValidator;
use App\Services\Validation\Contracts\DataValidator;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
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
     * @return \Illuminate\Support\Facades\Validator
     */
    public function validator(array $data) : \Illuminate\Validation\Validator
    {
        return Validator::make($data, $this->rules());
    }
}
