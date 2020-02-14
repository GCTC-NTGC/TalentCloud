<?php

namespace App\Http\Resources;

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
        $userArray = parent::toArray($request);
        unset($userArray['applicant']);
        unset($userArray['manager']);
        unset($userArray['hr_advisor']);

        $userArray = array_merge($userArray, [
            'full_name' => $this->full_name
        ]);

        return $userArray;
    }
}
