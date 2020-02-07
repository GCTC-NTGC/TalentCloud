<?php

namespace App\Http\Resources;

use App\Http\Resources\Applicant as ApplicantResource;
use App\Http\Resources\Manager as ManagerResource;
use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
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
            'manager' => new ManagerResource($this->whenLoaded('manager')),
            'hr_advisor' => new JsonResource($this->whenLoaded('hr_advisor')),
        ]);
    }
}
