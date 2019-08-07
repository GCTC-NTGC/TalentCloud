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
            'classification_code' => 'nullable|exists:classifications,key',
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
            'en.city' => 'nullable|string',
            'en.title' => 'nullable|string',
            'en.dept_impact' => 'nullable|string',
            'en.team_impact' => 'nullable|string',
            'en.hire_impact' => 'nullable|string',
            'en.division' => 'nullable|string',
            'en.branch' => 'nullable|string',
            'en.education' => 'nullable|string',
            'en.work_env_description' => 'nullable|string',
            'en.culture_summary' => 'nullable|string',
            'en.culture_special' => 'nullable|string',
            'fr.city' => 'nullable|string',
            'fr.title' => 'nullable|string',
            'fr.dept_impact' => 'nullable|string',
            'fr.team_impact' => 'nullable|string',
            'fr.hire_impact' => 'nullable|string',
            'fr.division' => 'nullable|string',
            'fr.branch' => 'nullable|string',
            'fr.education' => 'nullable|string',
            'fr.work_env_description' => 'nullable|string',
            'fr.culture_summary' => 'nullable|string',
            'fr.culture_special' => 'nullable|string',
        ];
    }
}
