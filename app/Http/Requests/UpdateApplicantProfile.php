<?php

namespace App\Http\Requests;

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
            'citizenship_declaration_id' => 'required|exists:citizenship_declarations,id',
            'veteran_status_id' => 'required|exists:veteran_statuses,id',
            'applicant_classifications.*.id' => 'required|integer',
            'applicant_classifications.*.applicant_id' => 'required|exists:applicants,id',
            'applicant_classifications.*.classification_id' => 'required|exists:classifications,id',
            'applicant_classifications.*.level' => 'required|integer|min:1|max:9',
            'applicant_classifications.*.order' => 'required|integer|min:0|max:9',
        ];
    }
}
