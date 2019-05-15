<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\LanguageRequirement;

/**
 * Validates that value is a valid security clearance id
 */
class LanguageRequirementRule implements Rule
{
    public function passes($attribute, $value)
    {
        return LanguageRequirement::where('id', $value)->exists();
    }

    public function message()
    {
        return Lang::get('validation.invalid_id');
    }
}
