<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Models\RatingGuideQuestion;

/**
 * Validates that value is a valid RatingGuideQuestion id
 */
class RatingGuideQuestionRule implements Rule
{
    public function passes($attribute, $value)
    {
        return RatingGuideQuestion::where('id', $value)->exists();
    }
    public function message()
    {
        return Lang::get('validation.invalid_id');
    }
}
