<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Experience extends JsonResource
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
            'type' => $this->experienceTypeName(),
            'experience_skills' => JsonResource::collection($this->whenLoaded('experience_skills')),
        ]);
    }
}
