<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\Province;

/**
 * Validates that value is a valid province id
 */
class ProvinceRule implements Rule
{
    public function passes($attribute, $value)
    {
        return Province::where('id', $value)->exists();
    }

    public function message()
    {
        return Lang::get('validation.invalid_id');
    }
}
