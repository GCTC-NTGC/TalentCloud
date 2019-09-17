<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class LinkedInUrlRule implements Rule
{
    /**
     * Validation for linkedIn profile URLS.
     *
     * @var string
     */
    const PATTERN = '^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$';

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @return boolean
     */
    public function passes($attribute, $value)
    {
        return preg_match('/' . self::PATTERN . '/', $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return Lang::get('validation.regex');
    }
}
