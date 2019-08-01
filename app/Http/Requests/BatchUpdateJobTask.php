<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use App\Services\Validation\Rules\ValidIdRule;
use App\Models\Lookup\Department;
use App\Models\Lookup\Province;
use App\Models\Lookup\SecurityClearance;
use App\Models\Lookup\LanguageRequirement;
use App\Models\JobPoster;
use App\Models\Lookup\Frequency;

class BatchUpdateJobTask extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return boolean
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return string[]
     */
    public function rules(): array
    {
        return [
            '*.id' => 'present',
            '*.en.description' => 'nullable|string',
            '*.fr.description' => 'nullable|string',
        ];
    }
}
