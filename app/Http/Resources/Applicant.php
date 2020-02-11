<?php

namespace App\Http\Resources;

use App\Http\Resources\User as UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Applicant extends JsonResource
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
            'applicant_profile_answers' => JsonResource::collection($this->whenLoaded('applicant_profile_answers')),
            'courses' => JsonResource::collection($this->whenLoaded('courses')),
            'degrees' => JsonResource::collection($this->whenLoaded('degrees')),
            'job_applications' => JsonResource::collection($this->whenLoaded('job_applications')),
            'projects' => JsonResource::collection($this->whenLoaded('projects')),
            'references' => JsonResource::collection($this->whenLoaded('references')),
            'skill_declarations' => JsonResource::collection($this->whenLoaded('skill_declarations')),
            'submitted_applications' => JsonResource::collection($this->whenLoaded('submitted_applications')),
            'user' => new UserResource($this->whenLoaded('user')),
            'work_experiences' => JsonResource::collection($this->whenLoaded('work_experiences')),
            'work_samples' => JsonResource::collection($this->whenLoaded('work_samples')),
        ]);
    }
}
