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
            'director_email' => ['required', 'string'],
            'reference_name' => ['required', 'string'],
            'reference_title' => ['required', 'string'],
            'reference_email' => ['required', 'string']
        ];
    }
}
