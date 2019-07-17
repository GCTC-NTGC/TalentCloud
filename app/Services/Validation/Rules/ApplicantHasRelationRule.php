<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class ApplicantHasRelationRule implements Rule
{

    protected $applicant;
    protected $relation;

    /**
     * Create a new rule instance.
     *
     * @param  App\Models\Applicant  $applicant
     * @param  string  $relation
     * @return void
     */
    public function __construct($applicant, $relation)
    {
        $this->applicant = $applicant;
        $this->relation = $relation;
    }

    /**
     * This check passes if the model's relation contains an object whose id=$value
     * @param  [type] $attribute [description]
     * @param  [type] $value     [description]
     * @return [type]            [description]
     */
    public function passes($attribute, $value)
    {
        return $this->applicant->getRelationValue($this->relation)
            ->pluck('id')->contains($value);
    }

    public function message()
    {
        return Lang::get('validation.applicant_has_relation');
    }
}
