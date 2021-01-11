<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JobApplicationBasic extends JsonResource
{
    /**
     * Transform the resource into an array. Returns
     * a subset of the Application properties used on the Basic
     * Info Application step.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'job_poster_id' => $this->job_poster_id,
            'application_status_id' => $this->application_status_id,
            'citizenship_declaration_id' => $this->citizenship_declaration_id,
            'veteran_status_id' => $this->veteran_status_id,
            'preferred_language_id' => $this->preferred_language_id,
            'applicant_id' => $this->applicant_id,
            'submission_signature' => $this->submission_signature,
            'submission_date' => $this->submission_date,
            'experience_saved' => $this->experience_saved,
            'applicant_snapshot_id' => $this->applicant_snapshot_id,
            'language_requirement_confirmed' => $this->language_requirement_confirmed,
            'language_test_confirmed' => $this->language_test_confirmed,
            'education_requirement_confirmed' => $this->education_requirement_confirmed,
            'version_id' => $this->version_id,
            'user_name' => $this->user_name,
            'user_email' => $this->user_email,
            'share_with_managers' => $this->share_with_managers,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
