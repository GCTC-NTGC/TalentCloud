<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\SecurityClearance;

/**
 * Validates that value is a valid security clearance id
 */
class SecurityClearanceRule implements Rule
{
    public function passes($attribute, $value)
    {
        return SecurityClearance::where('id', $value)->exists();
    }

    public function message()
    {
        return Lang::get('validation.invalid_id');
    }
}
