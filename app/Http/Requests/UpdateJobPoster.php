<?php

namespace App\Http\Requests;

use App\Models\Classification;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use App\Services\Validation\Rules\ValidIdRule;
use App\Models\Lookup\Department;
use App\Models\Lookup\Province;
use App\Models\Lookup\SecurityClearance;
use App\Models\Lookup\LanguageRequirement;
use App\Models\Lookup\Frequency;
use App\Models\Lookup\TravelRequirement;
use App\Models\Lookup\OvertimeRequirement;
use Illuminate\Validation\Rule;

class UpdateJobPoster extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return boolean
     */
    public function authorize(): bool
    {
        $job = $this->route('job');
        // Published jobs cannot be updated.
        return $job && $job->published_at === null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return string[]
     */
    public function rules(): array
    {
        $dateFormat = Config::get('app.api_datetime_format');
        $dateFormatRule = "date_format:$dateFormat";
        $sliderRule = 'between:1,4';
        return [
            'chosen_lang' => ['nullable', Rule::in(['en', 'fr'])],
            'term_qty' => 'nullable|numeric',
            'open_date_time' =>['nullable', $dateFormatRule],
            'close_date_time' => ['nullable', $dateFormatRule],
            'start_date_time' =>['nullable', $dateFormatRule],
            'department_id' => ['nullable', new ValidIdRule(Department::class)],
            'province_id' => ['nullable', new ValidIdRule(Province::class)],
            'security_clearance_id' => ['nullable', new ValidIdRule(SecurityClearance::class)],
            'language_requirement_id' => ['nullable', new ValidIdRule(LanguageRequirement::class)],
            'salary_min' => 'nullable|numeric',
            'salary_max' => 'nullable|numeric',
            'noc' => 'nullable|numeric',
            'classification_id' => ['nullable', new ValidIdRule(Classification::class)],
            'classification_level' => 'nullable|numeric',
            'remote_work_allowed' => 'nullable|boolean',
            'team_size' => 'nullable|numeric',
            'work_env_features' => 'nullable|array',
            'work_env_features.*' => 'boolean', // Ensure work_env_features is an array of boolean flags.
            'fast_vs_steady' => ['nullable', $sliderRule],
            'horizontal_vs_vertical' => ['nullable', $sliderRule],
            'experimental_vs_ongoing' => ['nullable', $sliderRule],
            'citizen_facing_vs_back_office' => ['nullable', $sliderRule],
            'collaborative_vs_independent' => ['nullable', $sliderRule],
            'telework_allowed_frequency_id' => ['nullable', new ValidIdRule(Frequency::class)],
            'flexible_hours_frequency_id' => ['nullable', new ValidIdRule(Frequency::class)],
            'travel_requirement_id' => ['nullable', new ValidIdRule(TravelRequirement::class)],
            'overtime_requirement_id' => ['nullable', new ValidIdRule(OvertimeRequirement::class)],
            'city.en' => 'nullable|string',
            'city.fr' => 'nullable|string',
            'title.en' => 'nullable|string',
            'title.fr' => 'nullable|string',
            'dept_impact.en' => 'nullable|string',
            'dept_impact.fr' => 'nullable|string',
            'team_impact.en' => 'nullable|string',
            'team_impact.fr' => 'nullable|string',
            'hire_impact.en' => 'nullable|string',
            'hire_impact.fr' => 'nullable|string',
            'division.en' => 'nullable|string',
            'division.fr' => 'nullable|string',
            'education.en' => 'nullable|string',
            'education.fr' => 'nullable|string',
            'work_env_description.en' => 'nullable|string',
            'work_env_description.fr' => 'nullable|string',
            'culture_summary.en' => 'nullable|string',
            'culture_summary.fr' => 'nullable|string',
            'culture_special.en' => 'nullable|string',
            'culture_special.fr' => 'nullable|string',
        ];
    }
}
