<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class ContainsObjectWithRelationRule implements Rule
{

    protected $validator;

    /**
     * Create a new rule instance.
     *
     * @param  App\Models\Applicant  $applicant
     * @param  string  $relation
     * @return void
     */
    public function __construct($validator)
    {
        $this->validator = $validator;
    }

    /**
     * This check passes if the $value is a collection which contains an object
     *  with a relationName relation equal to relationValue
     * @param  [type] $attribute [description]
     * @param  [type] $value     [description]
     * @return boolean            [description]
     */
    public function passes($attribute, $value)
    {
        return $value->contains(function ($object) {
            $object->getRelationValue($this->relationName)->is($this->relationValue);
        });
    }

    public function message()
    {
        return Lang::get('validation.contains_object_with_relation', ['relation' => $this->relationName]);
    }
}
