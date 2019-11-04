<?php

namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Skill;
use App\Models\SkillDeclaration;
use App\Models\Lookup\SkillLevel;
use App\Models\Lookup\SkillStatus;
use App\Models\Applicant;
use App\Services\Validation\Rules\PolyExistsRule;
use App\Services\Validation\Rules\UniqueSkillDeclarationRule;

class SkillDeclarationValidator
{

    public function validator(SkillDeclaration $skillDeclaration)
    {
        $uniqueSkillRule = new UniqueSkillDeclarationRule($skillDeclaration->skillable->skill_declarations, $skillDeclaration->id);

        // Validate basic data is filled in
        $validator = Validator::make($skillDeclaration->getAttributes(), [
            'skill_id' => [
                'required',
                'exists:skills,id',
                $uniqueSkillRule,
            ],
            'skillable_id' => [
                'required',
                new PolyExistsRule($skillDeclaration->skillable_type),
            ],
            'skillable_type' => 'required',
            'skill_status_id' => [
                'required',
                'exists:skill_statuses,id',
            ],
            'skill_level_id' => [
                'required',
                'exists:skill_levels,id',
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
