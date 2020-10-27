<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class IncludesAllRule implements Rule
{
    /**
     *  @var mixed $collection
     */
    protected $collection;

    /**
     * Create a new rule instance.
     *
     * @param  mixed $collection Array to validate against.
     * @return void
     */
    public function __construct($collection)
    {
        $this->collection = $collection;
    }

    /**
     * This check passes if $value has at least one of
     * every element in $this->collection.
     * @param  mixed $attribute
     * @param  mixed $value
     * @return boolean
     */
    public function passes($attribute, $value)
    {
        // Diff should return an empty array if all elements in
        // $this->collection are present in $value.
        return empty(array_diff($this->collection, $value));
    }

    public function message()
    {
        return Lang::get(
            'validation.includes_all'
        );
    }
}
