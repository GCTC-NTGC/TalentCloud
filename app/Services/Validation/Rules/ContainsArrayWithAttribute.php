<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class ContainsArrayWithAttributeRule implements Rule
{

    protected $attributeName;
    protected $attributeValue;

    /**
     * Create a new rule instance.
     *
     * @param  string $attributeName
     * @param  mixed  $attributeValue
     * @return void
     */
    public function __construct($attributeName, $attributeValue)
    {
        $this->attributeName = $attributeName;
        $this->attributeValue = $attributeValue;
    }

    /**
     * This check passes if the $value is an array which contains an
     * attributeName relation equal to attributeValue.
     * @param  mixed $attribute
     * @param  mixed $value
     * @return boolean
     */
    public function passes($attribute, $value)
    {
        return $value[$this->attributeName] == $this->attributeValue;
    }

    public function message()
    {
        return Lang::get(
            'validation.contains_array_with_attribute',
            [
                'relation' => $this->attributeName,
                'attributeValue' => $this->attributeValue
            ]
        );
    }
}
