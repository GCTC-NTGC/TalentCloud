<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExperienceSkill;
use App\Models\ExperienceSkill;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceSkillsController extends Controller
{
    public function store(StoreExperienceSkill $request)
    {
        $data = $request->validated();
        $experienceSkill = new ExperienceSkill($data);
        $experienceSkill->skill_id = $data['skill_id'];
        $experienceSkill->experience_id = $data['experience_id'];
        $experienceSkill->experience_type = $data['experience_type'];
        $experienceSkill->justification = $data['justification'];
        $experienceSkill->save();
        return new JsonResource($experienceSkill->fresh());
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
