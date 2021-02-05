<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\SkillCategory;
use Illuminate\Support\Facades\Log;

class Skill extends JsonResource
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
            'skill_category_ids' => $this->when(
                $this->relationLoaded('skill_categories'),
                $this->skill_categories->pluck('id')->all()
            )
        ]);
    }
}
