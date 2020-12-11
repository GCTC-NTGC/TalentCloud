<?php

namespace App\Http\Requests;

use App\Models\Classification;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\VeteranStatus;
use App\Services\Validation\Rules\ValidIdRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateApplicantProfile extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // Authorization is handled in Applicant Policy through middleware.
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
            'citizenship_declaration_id' => ['required', new ValidIdRule(CitizenshipDeclaration::class)],
            'veteran_status_id' => ['required', new ValidIdRule(VeteranStatus::class)],
            'classifications.*.id' => ['required', new ValidIdRule(Classification::class)],
            'classifications.*.level' => 'required|integer|min:0|max:9',
            'classifications.*.order' => 'required|integer|min:0|max:9',
        ];
    }
}
