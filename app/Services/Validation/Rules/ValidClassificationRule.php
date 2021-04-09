<?php

namespace App\Services\Validation\Rules;

use App\Models\Classification;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class ValidClassificationRule implements Rule
{
    /**
     * Validation for Classification
     *
     * @var string
     */
    const PATTERN = '^(.)+-([0-9]+)$';

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @return boolean
     */
    public function passes($attribute, $value)
    {
        $passesRegex = preg_match('/' . self::PATTERN . '/', $value, $matches);
        if (!$passesRegex) {
            return false;
        }
        $classificationCode = strToUpper($matches[1]);
        return Classification::where('key', $classificationCode)->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return Lang::get('validation.custom.classification');
    }
}
