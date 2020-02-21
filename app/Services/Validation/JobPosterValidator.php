<?php

namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\JobPoster;

class JobPosterValidator
{
    /**
     * Check to see if JobPoster instance has published set to false
     *
     * @param \App\Models\JobPoster $jobPoster Incoming Job Poster object
     *
     * @return null
     */
    public static function validateUnpublished(JobPoster $jobPoster)
    {
        Validator::make(
            $jobPoster->toArray(),
            [
                'published' => [
                    'required',
                    Rule::in([false])
                ]
            ]
        )->validate();
    }
}
