<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SkillCategory;
use Illuminate\Http\Resources\Json\JsonResource;

class SkillCategoryController extends Controller
{
    /**
     * Return all skill categories as an array
     *
     * @return mixed
     */
    public function index()
    {
        $skill_categories = SkillCategory::all();
        return JsonResource::collection($skill_categories);
    }
}
