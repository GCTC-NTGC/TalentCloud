<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class ApplicantProfile extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'citizenship_declaration_id' => $this->citizenship_declaration_id,
            'veteran_status_id' => $this->veteran_status_id,
            'applicant_classifications' => new JsonResource($this->whenLoaded('applicant_classifications')),
        ];
    }
}
