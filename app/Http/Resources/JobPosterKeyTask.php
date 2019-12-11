<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JobPosterKeyTask extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
