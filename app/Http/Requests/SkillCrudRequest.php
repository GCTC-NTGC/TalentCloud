<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SkillCrudRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return boolean
     */
    public function authorize() : bool
    {
        // Only allow updates if the user is a logged in Admin.
        return backpack_auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return string[]
     */
    public function rules() : array
    {
        return [
            'name' => 'required|unique_translation:skills,name' . (isset($this->id) ? ",{$this->id}" : ''),
            'description' => 'required',
            'skill_type_id' => 'exists:skill_types,id'
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return string[]
     */
    public function messages() : array
    {
        return [
            'name.required' => 'Please enter a Skill name.',
            'name.unique_translation' => 'A Skill with this name already exists.',
            'skill_type_id.exists' => 'Please use an existing Skill Type.'
        ];
    }
}
