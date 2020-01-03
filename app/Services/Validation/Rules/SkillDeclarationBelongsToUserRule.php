<?php

namespace App\Services\Validation\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use App\Models\SkillDeclaration;

class SkillDeclarationBelongsToUserRule implements Rule
{

    /**
     * This check passes if the $user has ownership of this skill declaration with id=$value
     * @param  [type] $attribute [description]
     * @param  [type] $value     [description]
     * @return [type]            [description]
     */
    public function passes($attribute, $value)
    {
        return SkillDeclaration::find($value) &&
            SkillDeclaration::find($value)->skillable->user->id == Auth::user()->id;
    }

    public function message()
    {
        return Lang::get('validation.user_owns_skill_declaration');
    }
}
