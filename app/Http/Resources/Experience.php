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
        $type = $this->experienceTypeName();
        $translations = [];
        if ($type === 'experience_education') {
            $translations = [
                'education_status' => $this->education_status->getTranslations('name'),
                'education_type' => $this->education_type->getTranslations('name'),
            ];
        } elseif ($type === 'experience_award') {
            $translations = [
                'award_recipient_type' => $this->award_recipient_type->getTranslations('name'),
                'award_recognition_type' => $this->award_recognition_type->getTranslations('name'),
            ];
        }
        return array_merge(
            parent::toArray($request),
            $translations,
            [
                'type' => $type,
                'experience_skills' => JsonResource::collection($this->whenLoaded('experience_skills')),
            ]
        );
    }
}
