<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Models\Criteria;

/**
 * Validates that value is a valid Criteria id
 */
class CriterionRule implements Rule
{
    public function passes($attribute, $value)
    {
        return Criteria::where('id', $value)->exists();
    }
    public function message()
    {
        return Lang::get('validation.invalid_id');
    }
}
