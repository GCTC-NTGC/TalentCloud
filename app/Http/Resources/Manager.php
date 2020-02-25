<?php

namespace App\Http\Resources;

use App\Http\Resources\JobPoster as JobPosterResource;
use App\Http\Resources\User as UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Manager extends JsonResource
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
            'department' => new JsonResource($this->whenLoaded('department')),
            'development_opportunity_frequency' => new JsonResource($this->whenLoaded('development_opportunity_frequency')),
            'engage_team_frequency' => new JsonResource($this->whenLoaded('engage_team_frequency')),
            'job_posters' => JobPosterResource::collection($this->whenLoaded('job_posters')),
            'refuse_low_value_work_frequency' => new JsonResource($this->whenLoaded('refuse_low_value_work_frequency')),
            'stay_late_frequency' => new JsonResource($this->whenLoaded('stay_late_frequency')),
            'team_culture' => new JsonResource($this->whenLoaded('team_culture')),
            'user' => new UserResource($this->whenLoaded('user')),
            'work_environment' => new JsonResource($this->whenLoaded('work_environment')),
            'work_review_frequency' => new JsonResource($this->whenLoaded('work_review_frequency')),
        ]);
    }
}
