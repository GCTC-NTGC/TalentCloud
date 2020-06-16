<?php

namespace App\Http\Requests;

use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\VeteranStatus;
use App\Services\Validation\Rules\ValidIdRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateJobApplicationBasic extends FormRequest
{
    /**
     * User authorization handled in routes/web.php.
     *
     * @return bool
     */
    public function authorize()
    {
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
            'citizenship_declaration_id' => [
                'bail',
                'required',
                'numeric',
                new ValidIdRule(CitizenshipDeclaration::class)
            ],
            'veteran_status_id' => [
                'bail',
                'required',
                'numeric',
                new ValidIdRule(VeteranStatus::class)
            ],
            'language_requirement_confirmed' => 'required|boolean',
            'language_test_confirmed' => 'required|boolean',
            'education_requirement_confirmed' => 'required|boolean',
        ];
    }
}
