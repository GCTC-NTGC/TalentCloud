<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class PasswordFormatRule implements Rule
{
    /**
     * This Password Validation rule should be referenced wherever we need the user input their password on the site.
     * The rules used on their passwords are;
     * 1) Password is required.
     * 2) Must be at least 8 characters
     * 3) The password must contain at least one character from the following categories:
     * lower-case characters (a-z), upper-case characters (A-Z),
     * digits (0-9), and non-alphanumeric symbols (%, $, !, etc.).
     * Guide used by Polivas Korop
     * https://laraveldaily.com/how-to-create-custom-validation-rules-laravel/
     */

    /**
     * Password validation pattern.
     *
     * @var string
     */
    const PATTERN = '^.*(?=.{3,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*]).*$';

    public function passes($attribute, $value)
    {
        return preg_match('/' . self::PATTERN . '/', $value);
    }

    public function message()
    {
        return Lang::get('validation.custom.password');
    }
}
