<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class TwitterHandleRule implements Rule
{
    /**
     * Validation for Twitter handlers.
     *
     * @var string
     */
    const PATTERN = '^[A-Za-z0-9_]+$';

    /**
     *
     * Twitters Terms of Service only allows ". A username can only contain
     * alphanumeric characters (letters A-Z, numbers 0-9) with the exception
     * of underscores"
     * This regex will allow only alphamumeric characters and the underscore.
     * Keep this handy if we need to validate other usernames.
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
