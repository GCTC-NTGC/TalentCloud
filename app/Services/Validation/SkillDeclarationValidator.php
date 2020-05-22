<?php

namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use App\Models\SkillDeclaration;
use App\Services\Validation\Rules\PolyExistsRule;
use App\Services\Validation\Rules\UniqueSkillDeclarationRule;
use App\Services\Validation\Rules\WordLimitRule;
use Illuminate\Validation\Validator as ValidationValidator;

class SkillDeclarationValidator
{
    /**
     * The maximum amount of words the skill description can reach.
     *
     * @var number
     */
    protected $description_max_words;

    /**
     * Skill declaration validator constructor.
     * @param number $description_max_words Max amount of words for skill description.
     * @return void
     */
    public function __construct($description_max_words = 100)
    {
        $this->description_max_words = $description_max_words;
    }

    /**
     * Skill declaration validator constructor.
     * @param SkillDeclaration $skillDeclaration The skill declaration input data.
     * @return ValidationValidator
    */
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
                new WordLimitRule($this->description_max_words),
            ],
        ]);
        return $validator;
    }

    public function validate(SkillDeclaration $skillDeclaration)
    {
        return $this->validator($skillDeclaration)->validate();
    }
}
