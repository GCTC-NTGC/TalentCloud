<?php
namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\WorkExperience;
use App\Models\Lookup\VeteranStatus;
use App\Models\Lookup\ExperienceLevel;
use App\Models\Lookup\ExperienceLevelTranslation;
use App\Models\Applicant;
use App\Services\Validation\Rules\UniqueApplicantSkillRule;

class WorkExperienceValidator
{
    
    protected $applicant;
 
    public function __construct(Applicant $applicant)
    {
        $this->applicant = $applicant;
    }
    public function validate(WorkExperienceValidator $workExperienceValidator)
    {
        $uniqueSkillRule = new UniqueApplicantSkillRule($this->applicant, $workExperienceValidator->id);
        // This array is reset every time because applicants table can change frequently
        $applicant_ids = Applicant::all()->pluck('id');
        // Validate basic data is filled in
        Validator::make($workExperienceValidator->getAttributes(), [
            'applicant_id' => [
                'required',
                Rule::in($applicant_ids->toArray()),
            ]
         
        ])->validate();
    }
}
