<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class WordLimitRule implements Rule
{
    /**
     * The maximum amount of words the input element can reach.
     *
     * @var number
     */
    protected $max_words;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($max_words)
    {
        $this->max_words = $max_words;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $words = explode(' ', preg_replace('/\s+/', ' ', $value));
        return count($words) <= $this->max_words;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return Lang::get('validation.custom.word_limit', ['max_words' => $this->max_words]);
    }
}
