<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JobPoster extends JsonResource
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
            'manager' => new JsonResource($this->whenLoaded('manager')),
            'criteria' => JsonResource::collection($this->whenLoaded('criteria')),
        ]);
    }
}
