<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

class ContainsObjectWithAttributeRule implements Rule
{

    protected $attributeName;
    protected $attributeValue;

    /**
     * Create a new rule instance.
     *
     * @param  App\Models\Applicant  $applicant
     * @param  string  $relation
     * @return void
     */
    public function __construct($attributeName, $attributeValue)
    {
        $this->attributeName = $attributeName;
        $this->attributeValue = $attributeValue;
    }

    protected function array_any(array $array, callable $fn)
    {
        foreach ($array as $value) {
            if ($fn($value)) {
                return true;
            }
        }
        return false;
    }

    /**
     * This check passes if the $value is an array which contains an object
     *  with a attributeName relation equal to attributeValue
     * @param  [type] $attribute [description]
     * @param  [type] $value     [description]
     * @return boolean            [description]
     */
    public function passes($attribute, $value)
    {
        // debugbar()->debug($value);
        // debugbar()->debug($this->attributeName);
        // debugbar()->debug($this->attributeValue);
        return $this->array_any($value, function ($object) {
            return $object[$this->attributeName] == $this->attributeValue;
        });
    }

    public function message()
    {
        return Lang::get('validation.contains_object_with_attribute', ['relation' => $this->attributeName, 'attributeValue' => $this->attributeValue]);
    }
}
