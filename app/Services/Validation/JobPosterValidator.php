<?php

namespace App\Services\Validation;

use App\Models\JobPoster;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\ValidationException;

class JobPosterValidator
{
    /**
     * Check to see if JobPoster instance has gone live yet.
     *
     * @param \App\Models\JobPoster $jobPoster Incoming Job Poster object
     *
     * @return null
     */
    public static function validateUnpublished(JobPoster $jobPoster)
    {
        if ($jobPoster->isPublic()) {
            throw ValidationException::withMessages(
                ['job_poster_status_id' => Lang::get('validation.job_unpublished')]
            );
        }
    }
}
