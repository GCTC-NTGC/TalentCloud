<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Http\Resources\Skill as SkillResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SkillController extends Controller
{
    /**
     * Return all skills as an array
     *
     * @return mixed
     */
    public function index()
    {
        $skills = Skill::with('classifications', 'skill_categories')->get();
        return SkillResource::collection($skills);
    }
}
