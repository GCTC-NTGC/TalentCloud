<?php

namespace App\Services\Validation\Requests;

use App\Services\Validation\BaseDataValidator;
use App\Services\Validation\Contracts\DataValidator;
use App\Models\Manager;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use App\Services\Validation\Rules\PasswordCorrectRule;
use App\Services\Validation\Rules\PasswordFormatRule;

class UpdateManagerProfileValidator extends BaseDataValidator implements DataValidator
{
    /**
     * The Manager this profile
     *
     * @var Manager
     */
    protected $manager;

    /**
     * Construct a validator for Manager Profile form.
     *
     * @param Manager $manager The manager this profile is intended to belong to.
     */
    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return mixed[]
     */
    public function rules() : array
    {
        return [
          // Name validation
          'profile_name' => 'required|string|max:191',

          // Email validation
          'profile_email' => [
              'required',
              'string',
              'max:191',
              'email',
              // Email may match existing email for this user,
              // but must be unique if changed.
              Rule::unique('users', 'email')->ignore($this->manager->user->id)
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
        ];
    }

    /**
     * Returns a validator made with this data
     *
     * @param mixed[] $data Data to validate.
     * @return Validator
     */
    public function validator(array $data) : \Illuminate\Validation\Validator
    {
        return Validator::make($data, $this->rules());
    }
}
