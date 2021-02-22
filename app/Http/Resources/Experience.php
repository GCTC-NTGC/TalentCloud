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
        $dates = [];
        switch ($type) {
            case 'experience_work':
                $dates = [
                    'start_date' => $this->start_date ? $this->start_date->format('Y-m-d') : null,
                    'end_date' => $this->end_date ? $this->end_date->format('Y-m-d') : null,
                ];
                break;
            case 'experience_award':
                $dates = [
                    'awarded_date' => $this->when($this->awarded_date, $this->awarded_date->format('Y-m-d')),
                ];
                $translations = [
                    'award_recipient_type' => $this->award_recipient_type->getTranslations('name'),
                    'award_recognition_type' => $this->award_recognition_type->getTranslations('name'),
                ];
                break;
            case 'experience_community':
                $dates = [
                    'start_date' => $this->start_date ? $this->start_date->format('Y-m-d') : null,
                    'end_date' => $this->end_date ? $this->end_date->format('Y-m-d') : null,
                ];
                break;
            case 'experience_education':
                $dates = [
                    'start_date' => $this->start_date ? $this->start_date->format('Y-m-d') : null,
                    'end_date' => $this->end_date ? $this->end_date->format('Y-m-d') : null,
                ];
                $translations = [
                    'education_status' => $this->education_status->getTranslations('name'),
                    'education_type' => $this->education_type->getTranslations('name'),
                ];
                break;
            case 'experience_personal':
                $dates = [
                    'start_date' => $this->start_date ? $this->start_date->format('Y-m-d') : null,
                    'end_date' => $this->end_date ? $this->end_date->format('Y-m-d') : null,
                ];
                break;
        }
        return array_merge(
            parent::toArray($request),
            $translations,
            [
                'type' => $type,
                'experience_skills' => JsonResource::collection($this->whenLoaded('experience_skills')),
            ],
            $dates
        );
    }
}
