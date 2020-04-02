<?php

namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use App\Models\SkillDeclaration;
use App\Services\Validation\Rules\PolyExistsRule;
use App\Services\Validation\Rules\UniqueSkillDeclarationRule;
use App\Services\Validation\Rules\WordLimitRule;

class SkillDeclarationValidator
{
    /**
     * Maximum amount of words for skill description.
     *
     * @var number
    */
    const MAXWORDS = 100;

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
                'nullable',
                'exists:skill_levels,id',
            ],
            'description' => [
                'required',
                'string',
                new WordLimitRule(self::MAXWORDS),
            ],
        ]);
        return $validator;
    }

    public function validate(SkillDeclaration $skillDeclaration)
    {
        return $this->validator($skillDeclaration)->validate();
    }
}
