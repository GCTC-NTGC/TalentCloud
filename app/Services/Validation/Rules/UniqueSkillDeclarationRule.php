<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Models\Applicant;
use App\Models\SkillDeclaration;

class UniqueSkillDeclarationRule implements Rule
{

    protected $existing_declarations;
    protected $skill_declaration_id;

    /**
     * Create a new rule instance.
     *
     * @param  App\Models\Applicant  $user
     * @return void
     */
    public function __construct($existing_declarations, $skill_declaration_id = null)
    {
        $this->existing_declarations = $existing_declarations;
        $this->skill_declaration_id = $skill_declaration_id;
    }

    /**
     * This check passes if no there are no previous declarations for this skill,
     * or if they are updating a previously existing declaration
     * @param  [type] $attribute [description]
     * @param  [type] $value     [description]
     * @return [type]            [description]
     */
    public function passes($attribute, $value)
    {
        $prev_declarations_of_skill = $this->existing_declarations->where('skill_id', $value);

        return $prev_declarations_of_skill->isEmpty() ||
            ($this->skill_declaration_id != null
                && $prev_declarations_of_skill->pluck('id')->contains($this->skill_declaration_id));
    }

    public function message()
    {
        return Lang::get('validation.user_skill_unique');
    }
}
