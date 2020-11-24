<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\SkillCategory;

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
        $this->load('skill_categories');
        return array_merge(parent::toArray($request), [
            'skill_categories' => $this->skill_categories->pluck('id')->all()
        ]);
    }
}
