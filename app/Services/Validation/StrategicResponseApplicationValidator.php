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
        ];
    }
}
