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
        $dateFormatRule = "date_format:\"$dateFormat\"";
        return [
            'term_qty' => 'required|numeric',
            'open_date_time' =>["required", $dateFormatRule],
            'close_date_time' => ["required", $dateFormatRule],
            'start_date_time' =>["required", $dateFormatRule],
            'department_id' => ['required', new DepartmentRule()],
            'province_id' => ['required', new ProvinceRule()],
            'security_clearance_id' => ['required', new SecurityClearanceRule()],
            'language_requirement_id' => ['required', new LanguageRequirementRule()],
            'salary_min' => 'required|numeric',
            'salary_max' => 'required|numeric',
            'noc' => 'required|numeric',
            'classification_code' => 'required|regex:/[A-Z]{2}/',
            'classification_level' => 'required|numeric',
            'remote_work_allowed' => 'required|boolean',
        ];
    }
}
