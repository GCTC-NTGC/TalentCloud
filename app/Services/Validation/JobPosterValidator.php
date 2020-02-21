<?php

namespace App\Services\Validation;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\JobPoster;
use App\Models\Lookup\JobPosterStatus;

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
                'job_poster_status_id' => [
                    'required',
                    Rule::notIn([JobPosterStatus::where('key', 'published')->first()->id])
                ]
            ]
        )->validate();
    }
}
