<?php

namespace App\Http\Requests;

use App\Http\Requests\UpdateJobPoster;

class StoreJobPoster extends UpdateJobPoster
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return boolean
     */
    public function authorize(): bool
    {
        // The STORE job poster method requires the user's manager id.
        return $this->user()->isManager()
           && $this->user()->manager !== null;
    }
}
