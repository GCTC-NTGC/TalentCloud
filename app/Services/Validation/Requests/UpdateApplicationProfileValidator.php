<?php

namespace App\Services\Validation\Requests;

use App\Services\Validation\BaseDataValidator;
use App\Services\Validation\Contracts\DataValidator;
use App\Models\Applicant;
use Illuminate\Support\Facades\Validator;

class UpdateApplicationProfileValidator extends BaseDataValidator implements DataValidator
{
    /**
     * The Applicant this application is indented to belong to
     *
     * @var Applicant
     */
    protected $applicant;

    /**
     * Construct a validator for Update Application Profile form.
     *
     * @param Applicant $applicant The applicant this profile is intended to belong to.
     */
    public function __construct(Applicant $applicant)
    {
        $this->applicant = $applicant;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return mixed[]
     */
    public function rules() : array
    {
        return [
            // Social Media Validation.
            /*
             * Twitters Terms of Service only allows ". A username can only contain
             * alphanumeric characters (letters A-Z, numbers 0-9) with the exception
             * of underscores"
             * This regex will allow only alphamumeric characters and the underscore.
             * Keep this handy if we need to validate other usernames.
             */
            'twitter_username' => [
                'nullable', // Some people may not have a handle.
                'max:15', // Per Twitter's Terms/Service.
                'regex:/^[A-Za-z0-9_]+$/',
            ],
            'linkedin_url' => [
                'nullable', // Some people may not be on LinkedIn.
                'regex:/^(https:\\/\\/|http:\\/\\/)?www\\.linkedin\\.com\\/in\\/[^\\/]+(\\/)?$/', // Validation for linkedIn profile URLS only.
            ],

            // Other Information Tagline.
            'tagline' => [
                'nullable',
                'string'
            ],
        ];
    }

    /**
     * Returns a validator made with this data.
     *
     * @param  mixed[] $data Data to validate.
     * @return \Illuminate\Support\Facades\Validator
     */
    public function validator(array $data) : \Illuminate\Validation\Validator
    {
        return Validator::make($data, $this->rules());
    }
}
