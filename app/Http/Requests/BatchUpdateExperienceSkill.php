<?php

namespace App\Http\Requests;

use App\Models\ExperienceSkill;
use Illuminate\Foundation\Http\FormRequest;

class BatchUpdateExperienceSkill extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = $this->user();
        if (!$user->can('create', ExperienceSkill::class)) {
            return false;
        }

        $inputIds = collect($this->all())->pluck('id')->all();
        $experienceSkills = ExperienceSkill::with('experience')->whereIn('id', $inputIds)->get();
        foreach ($experienceSkills as $experienceSkill) {
            if ($experienceSkill->experience === null ||
                $user === null ||
                !$user->can('update', $experienceSkill->experience)
            ) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
          '*.id' => 'required|exists:App\Models\ExperienceSkill,id',
          '*.justification' => 'nullable|string',
        ];
    }
}
