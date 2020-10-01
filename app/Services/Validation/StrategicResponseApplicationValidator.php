<?php

namespace App\Services\Validation;

use App\Models\JobApplication;
use Illuminate\Support\Facades\Validator;
use App\Services\Validation\Rules\GovernmentEmailRule;

class StrategicResponseApplicationValidator extends ApplicationValidator
{
    /**
     * OVERRIDE
     *
     * @return mixed[]
     */
    protected function basicInfoSimpleRules()
    {
        return [
            'preferred_language_id' => ['required', 'exists:preferred_languages,id'],
            'director_name' => ['required', 'string'],
            'director_title' => ['required', 'string'],
            'director_email' => ['required', 'email:rfc', 'max:191'],
            'reference_name' => ['required', 'string'],
            'reference_title' => ['required', 'string'],
            'reference_email' => ['required', 'email:rfc', 'max:191'],
            'gov_email' => ['required', new GovernmentEmailRule],
            'physical_office_willing' => 'required|boolean',
            'security_clearance_id' => ['required', 'exists:security_clearances,id'],
        ];
    }

    public $experienceRules = [];

    /**
     * OVERRIDE
     *
     * @return Validator
     */
    public function experienceValidator(JobApplication $application)
    {
        return Validator::make([], []);
    }

    /**
     * OVERRIDE
     *
     * @return mixed[]
     */
    public function detailedValidatorErrors(JobApplication $application)
    {
        return array_merge(
            Validator::make($application->toArray(), $this->backendRules)->errors()->all(),
            $this->basicsValidator($application)->errors()->all(),
            $this->essentialSkillsValidator($application)->errors()->all(),
            $this->affirmationValidator($application)->errors()->all()
        );
    }
}
