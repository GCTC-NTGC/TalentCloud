<?php
namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Reference;
use App\Services\Validation\Rules\UniqueApplicantSkillRule;

class ReferencesValidator
{
    
    protected $applicant;
    protected $relationship_id;
    
    public function __construct(Applicant $applicant)
    {
        $this->applicant = $applicant;
        $this->relationship_id = Relationship::all()->pluck('id');
    }
    public function validate(ReferencesValidator $referencesValidator)
    {
        $uniqueSkillRule = new UniqueApplicantSkillRule($this->applicant, $referencesValidator->id);
        // This array is reset every time because applicants table can change frequently
        $applicant_ids = Applicant::all()->pluck('id');
        // Validate basic data is filled in
        Validator::make($referencesValidator->getAttributes(), [
            'applicant_id' => [
                'required',
                Rule::in($applicant_ids->toArray()),
            ],
            'relatonship_id' => [
            'required',
            Rule::in($this->relationship_id->toArray()),
            ]
            
        ])->validate();
    }
}
