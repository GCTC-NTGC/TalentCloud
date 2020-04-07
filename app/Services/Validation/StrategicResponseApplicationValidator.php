<?php

namespace App\Services\Validation;

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
            'gov_email' => 'required|email',
            'physical_office_willing' => 'required|boolean',
            'security_clearance_id' => ['required', 'exists:security_clearances,id'],
        ];
    }
}
