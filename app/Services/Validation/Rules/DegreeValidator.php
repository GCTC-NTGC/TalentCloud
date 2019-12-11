<?php
namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Degree;
use App\Models\Lookup\DegreeType;
use App\Models\Applicant;
use App\Services\Validation\Rules\UniqueApplicantSkillRule;

class DegreeValidator
{

    protected $applicant;
    protected $degree_type_id;

    public function __construct(Applicant $applicant)
    {
        $this->applicant = $applicant;
        $this->degree_type_id = DegreeType::all()->pluck('id');
    }
    public function validate(DegreeValidator $degreeValidator)
    {
        $uniqueSkillRule = new UniqueApplicantSkillRule($this->applicant, $degreeValidator->id);
        // This array is reset every time because applicants table can change frequently
        $applicant_ids = Applicant::all()->pluck('id');
        // Validate basic data is filled in
        Validator::make($degreeValidator->getAttributes(), [
            'applicant_id' => [
            'required',
                Rule::in($applicant_ids->toArray()),
            ],
            'degree_type_id' => [
            'required',
                Rule::in($this->degree_type_id->toArray()),
            ]

        ])->validate();
    }
}
