<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Jenssegers\Date\Date;

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
            ],
            [
                'start_date' => $this->when($this->start_date, function () {
                    $start_date = new Date($this->start_date);
                    return $start_date->format('Y-m-d');
                }),
                'end_date' => $this->when($this->end_date, function () {
                    $end_date = new Date($this->end_date);
                    return $end_date->format('Y-m-d');
                }),
                'awarded_date' => $this->when($this->awarded_date, function () {
                    $awarded_date = new Date($this->awarded_date);
                    return $awarded_date->format('Y-m-d');
                }),
            ]
        );
    }
}
