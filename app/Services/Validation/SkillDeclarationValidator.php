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

    public function validator(SkillDeclaration $skillDeclaration)
    {
        $uniqueSkillRule = new UniqueApplicantSkillRule($this->applicant, $skillDeclaration->id);

        // Validate basic data is filled in
        $validator = Validator::make($skillDeclaration->getAttributes(), [
            'skill_id' => [
                'required',
                Rule::in($this->skill_ids->toArray()),
                $uniqueSkillRule,
            ],
            'applicant_id' => [
                'required',
                Rule::in([$this->applicant->id]),
            ],
            'skill_status_id' => [
                'required',
                Rule::in($this->skill_status_ids->toArray()),
            ],
            'skill_level_id' => [
                'required',
                Rule::in($this->skill_level_ids->toArray()),
            ],
            'description' => 'required|string',
        ]);
        return $validator;
    }

    public function validate(SkillDeclaration $skillDeclaration)
    {
        return $this->validator($skillDeclaration)->validate();
    }
}
