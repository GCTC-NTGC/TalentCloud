<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class GovernmentEmailRule implements Rule
{
    /**
     * Validation for government email.
     *
     * @var string
     */
    const PATTERN = '^.+@.+\.ca$';

    /**
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
        return Lang::get('validation.email');
    }
}
