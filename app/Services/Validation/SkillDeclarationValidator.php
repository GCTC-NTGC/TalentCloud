<?php

namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Skill;
use App\Models\SkillDeclaration;
use App\Models\Lookup\SkillLevel;
use App\Models\Lookup\SkillStatus;
use App\Models\Applicant;
use App\Services\Validation\Rules\UniqueApplicantSkillRule;

class SkillDeclarationValidator
{

    protected $applicant;
    protected $skill_ids;
    protected $skill_status_ids;
    protected $skill_level_ids;


    public function __construct(Applicant $applicant)
    {
        $this->applicant = $applicant;
        $this->skill_ids = Skill::all()->pluck('id');
        $this->skill_status_ids = SkillStatus::all()->pluck('id');
        $this->skill_level_ids = SkillLevel::all()->pluck('id');

    }

    public function validate(SkillDeclaration $skillDeclaration)
    {
        $uniqueSkillRule = new UniqueApplicantSkillRule($this->applicant, $skillDeclaration->id);

        //This array is reset every time because applicants table can change frequently
        $applicant_ids = Applicant::all()->pluck('id');

        //Validate basic data is filled in
        Validator::make($skillDeclaration->getAttributes(), [
            'skill_id' => [
                'required',
                Rule::in($this->skill_ids->toArray()),
                $uniqueSkillRule,
            ],
            'applicant_id' => [
                'required',
                Rule::in($applicant_ids->toArray()),
            ],
            'skill_status_id' => [
                'required',
                Rule::in($this->skill_status_ids->toArray()),
            ],
            'skill_level_id' => [
                'required',
                Rule::in($this->skill_level_ids->toArray()),
            ],
            'description' => 'string|required',
        ])->validate();
    }
}
