<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\Frequency;

/**
 * Validates that value is a valid department id
 */
class FrequencyRule implements Rule
{
    /**
     * Colaction of valid Frequency ids.
     *
     * @var Collection
     */
    protected $validIds;

    public function __construct()
    {
        $this->validIds = Frequency::all()->pluck('id');

    }

    public function passes($attribute, $value)
    {
        return $this->validIds->contains($value);

    }

    public function message()
    {
        return Lang::get('validation.invalid_id');
    }
}
