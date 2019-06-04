<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Config;
use App\Services\Validation\Rules\ValidIdRule;
use App\Models\Lookup\Department;
use App\Models\Lookup\Province;
use App\Models\Lookup\SecurityClearance;
use App\Models\Lookup\LanguageRequirement;

class UpdateJobPoster extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $dateFormat = Config::get('app.api_datetime_format');
        $dateFormatRule = "date_format:$dateFormat";
        return [
            'term_qty' => 'required|numeric',
            'open_date_time' =>['required', $dateFormatRule],
            'close_date_time' => ['required', $dateFormatRule],
            'start_date_time' =>['required', $dateFormatRule],
            'department_id' => ['required', new ValidIdRule(Department::class)],
            'province_id' => ['required', new ValidIdRule(Province::class)],
            'security_clearance_id' => ['required', new ValidIdRule(SecurityClearance::class)],
            'language_requirement_id' => ['required', new ValidIdRule(LanguageRequirement::class)],
            'salary_min' => 'required|numeric',
            'salary_max' => 'required|numeric',
            'noc' => 'required|numeric',
            'classification_code' => 'required|regex:/[A-Z]{2}/',
            'classification_level' => 'required|numeric',
            'remote_work_allowed' => 'required|boolean',
            'en.city' => 'required|string',
            'en.title' => 'required|string',
            'en.team_impact' => 'required|string',
            'en.hire_impact' => 'required|string',
            'en.division' => 'required|string',
            'en.education' => 'required|string',
            'fr.city' => 'required|string',
            'fr.title' => 'required|string',
            'fr.team_impact' => 'required|string',
            'fr.hire_impact' => 'required|string',
            'fr.division' => 'required|string',
            'fr.education' => 'required|string',
        ];
    }
}
