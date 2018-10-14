<?php

namespace App\Services\Validation;

use App\Models\JobApplication;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as BaseValidator;

class ApplicationValidator {

    public function validate(JobApplication $application) {

        $rules = [

        ];
        
        //Validate basic data is filled in
        Validator::make($application->getAttributes(), [
            'job_poster_id' => 'required',
            'application_status_id' => 'required',
            'citizenship_declaration_id' => 'required',
            'veteran_status_id' => 'required',
            'preferred_language_id' => 'required',
            'applicant_id' => 'required',
            'submission_signature' => 'required|string|max:191',
            'submission_date' => 'required|string|max:191',
        ])->validate();

        //TODO
        //Validate that all questions have been answered

        //TODO
        //Validate that essential skill declarations have been supplied
    }
}
