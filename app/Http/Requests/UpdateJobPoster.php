<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Services\Validation\Rules\DepartmentRule;
use App\Services\Validation\Rules\ProvinceRule;
use App\Services\Validation\Rules\SecurityClearanceRule;
use App\Services\Validation\Rules\LanguageRequirementRule;
use Illuminate\Support\Facades\Config;

class UpdateJobPoster extends FormRequest
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
     * @return array
     */
    public function rules(): array
    {
        $dateFormat = Config::get('app.api_datetime_format');
        $dateFormatRule = "date_format:$dateFormat";
        return [
            'term_qty' => 'nullable|numeric',
            'open_date_time' =>["nullable", $dateFormatRule],
            'close_date_time' => ["nullable", $dateFormatRule],
            'start_date_time' =>["nullable", $dateFormatRule],
            'department_id' => ['nullable', new DepartmentRule()],
            'province_id' => ['nullable', new ProvinceRule()],
            'security_clearance_id' => ['nullable', new SecurityClearanceRule()],
            'language_requirement_id' => ['nullable', new LanguageRequirementRule()],
            'salary_min' => 'nullable|numeric',
            'salary_max' => 'nullable|numeric',
            'noc' => 'nullable|numeric',
            'classification_code' => 'nullable|regex:/[A-Z]{2}/',
            'classification_level' => 'nullable|numeric',
            'remote_work_allowed' => 'nullable|boolean',
            'en.city' => 'nullable|string',
            'en.title' => 'nullable|string',
            'en.team_impact' => 'nullable|string',
            'en.hire_impact' => 'nullable|string',
            'en.division' => 'nullable|string',
            'en.branch' => 'nullable|string',
            'en.education' => 'nullable|string',
            'fr.city' => 'nullable|string',
            'fr.title' => 'nullable|string',
            'fr.team_impact' => 'nullable|string',
            'fr.hire_impact' => 'nullable|string',
            'fr.division' => 'nullable|string',
            'fr.branch' => 'nullable|string',
            'fr.education' => 'nullable|string',
        ];
    }
}
