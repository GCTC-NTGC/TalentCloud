<?php
namespace App\Services\Validation;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Applicant;
use App\Services\Validation\Rules\UniqueApplicantSkillRule;
class WorkSamplesValidator
{
    
    protected $applicant;
    protected $file_type_id;
    
    public function __construct(Applicant $applicant)
    {
        $this->applicant = $applicant;
        $this->file_type_id = FileType::all()->pluck('id');
    
    }
    public function validate(WorkSamplesValidatorValidator $workSamplesValidator)
    {
        $uniqueSkillRule = new UniqueApplicantSkillRule($this->applicant, $workSamplesValidator->id);
        //This array is reset every time because applicants table can change frequently
        $applicant_ids = Applicant::all()->pluck('id');
        //Validate basic data is filled in
        Validator::make($workSamplesValidator->getAttributes(), [
            'applicant_id' => [
            'required',
                Rule::in($applicant_ids->toArray()),
        ],  
            'file_type_id' => [
            'required',
                Rule::in($this->file_type_id->toArray()),
        ]           
       
        ])->validate();
    }
     
}