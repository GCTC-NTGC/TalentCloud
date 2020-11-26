<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SkillCategoryCrudRequest extends FormRequest
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
            'key' => 'required|alpha_dash|unique:skill_categories,key' . (isset($this->id) ? ",{$this->id}" : ''),
            'name' => 'required',
            'parent_category_id' => 'required' . (isset($this->id) ? "|not_in:{$this->id}" : ''),
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
            'key.required' => 'Please enter a skill name.',
            'key.unique' => 'A skill category with this name already exists.',
            'key.alpha_dash' => 'The skill category key may only use alphabetic characters and dashes.'
        ];
    }
}
