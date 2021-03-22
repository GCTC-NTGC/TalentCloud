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
        $skillArray = parent::toArray($request);
        // Want to include skill category ids, not the whole objects (to save data).
        unset($skillArray['skill_categories']);
        return array_merge($skillArray, [
            'skill_category_ids' => $this->when(
                $this->relationLoaded('skill_categories'),
                $this->skill_categories->pluck('id')->all()
            )
        ]);
    }
}
