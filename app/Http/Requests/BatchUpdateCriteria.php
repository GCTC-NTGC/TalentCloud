<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Validation\Rules\ValidIdRule;
use App\Models\Lookup\CriteriaType;
use App\Models\Skill;
use App\Models\Lookup\SkillLevel;

class BatchUpdateCriteria extends FormRequest
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
            '*.criteria_type_id' => ['required', new ValidIdRule(CriteriaType::class)],
            '*.skill_id' => ['required', new ValidIdRule(Skill::class)],
            '*.skill_level_id' => ['required', new ValidIdRule(SkillLevel::class)],
            '*.en.description' => 'nullable|string',
            '*.en.specificity' => 'nullable|string',
            '*.fr.description' => 'nullable|string',
            '*.fr.specificity' => 'nullable|string',
        ];
    }
}
