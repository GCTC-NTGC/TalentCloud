<?php

namespace App\Http\Resources;

use App\Http\Resources\Applicant as ApplicantResource;
use Illuminate\Http\Resources\Json\JsonResource;

class JobApplication extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return array_merge(parent::toArray($request), [
            'applicant' => new ApplicantResource($this->whenLoaded('applicant')),
            'application_review' => new JsonResource($this->whenLoaded('application_review')),
            'citizenship_declaration' => new JsonResource($this->whenLoaded('citizenship_declaration')),
            'veteran_status' => new JsonResource($this->whenLoaded('veteran_status')),
        ]);
    }
}
