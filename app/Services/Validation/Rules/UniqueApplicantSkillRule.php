<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Lang;
use App\Models\Applicant;

class UniqueApplicantSkillRule implements Rule
{

    protected $applicant;
    protected $skill_declaration_id;

    /**
     * Create a new rule instance.
     *
     * @param  App\Models\Applicant  $user
     * @return void
     */
    public function __construct(Applicant $applicant, $skill_declaration_id = null)
    {
        $this->applicant = $applicant;
        $this->skill_declaration_id = $skill_declaration_id;
    }

    /**
     * This check passes if this applicant has no previous declaration for this skill,
     * or if they are updating a previously existing declaration
     * @param  [type] $attribute [description]
     * @param  [type] $value     [description]
     * @return [type]            [description]
     */
    public function passes($attribute, $value)
    {
        $prev_skills = $this->applicant->skill_declarations->where('skill_id', $value)->pluck('id');

        return $prev_skills->isEmpty() ||
            ($this->skill_declaration_id != null && $prev_skills->contains($this->skill_declaration_id));
    }

    public function message()
    {
        return Lang::get('validation.user_skill_unique');
    }
}
