<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;

/**
 * Splits a string on commas, and accepts another rule which is applied to each resulting string.
 * Returns true iff all substrings are valid.
 */
class CommaSeparatedListRule implements Rule
{

    protected $itemRule;

    public function __construct($itemRule)
    {
        $this->itemRule = $itemRule;
    }


    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @return boolean
     */
    public function passes($attribute, $value)
    {
        $items = preg_split('/,/', $value, null, PREG_SPLIT_NO_EMPTY);
        foreach ($items as $item) {
            if (!$this->itemRule->passes($attribute, $item)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        $listMsg = Lang::get('validation.custom.comma_seperated_list');
        $itemMsg = $this->itemRule->message();
        return "$listMsg $itemMsg";
    }
}
