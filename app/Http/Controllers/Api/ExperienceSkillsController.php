<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExperienceSkill;
use Error;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceSkillsController extends Controller
{
    public function store(Request $request)
    {
        throw new Error();
    }

    public function update(Request $request, ExperienceSkill $experienceSkill)
    {
        $validatedData = $request->validate([
            'justification' => 'required|nullable|string',
        ]);
        $experienceSkill->fill($validatedData);
        $experienceSkill->save();
        return new JsonResource($experienceSkill->fresh());
    }

    public function destroy(ExperienceSkill $experienceSkill)
    {
        $experienceSkill->delete();
    }
}
