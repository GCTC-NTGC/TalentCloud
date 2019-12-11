<?php
namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Course;
use App\Models\Lookup\CourseStatus;
use App\Models\Applicant;
use App\Services\Validation\Rules\UniqueApplicantSkillRule;

class CourseValidator
{

    
    protected $applicant;
    protected $course_status_id;
    
    public function __construct(Applicant $applicant)
    {
        $this->applicant = $applicant;
        $this->course_status_ids = CourseStatus::all()->pluck('id');
    }
    public function validate(CourseValidator $courseValidator)
    {
        $uniqueSkillRule = new UniqueApplicantSkillRule($this->applicant, $courseValidator->id);
        // This array is reset every time because applicants table can change frequently
        $applicant_ids = Applicant::all()->pluck('id');
        // Validate basic data is filled in
        Validator::make($courseValidator->getAttributes(), [
            'applicant_id' => [
             'required',
                Rule::in($applicant_ids->toArray()),
            ],
             'course_status_id' => [
             'required',
                Rule::in($this->course_status_ids->toArray()),
            ]
         
        ])->validate();
    }
}
