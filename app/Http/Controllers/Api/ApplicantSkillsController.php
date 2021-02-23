<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateApplicantSkills;
use App\Models\Applicant;
use App\Models\ExperienceSkill;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class ApplicantSkillsController extends Controller
{
    public function index(Applicant $applicant)
    {
        return [
            'skill_ids' => $applicant->skills->pluck('id')->all()
        ];
    }

    public function update(UpdateApplicantSkills $request, Applicant $applicant)
    {
        $skillIds = $request->validated()['skill_ids'];
        $applicant->skills()->sync($skillIds);

        // $deletedExperienceSkills = $applicant->experienceSkillsQuery()->whereNotIn('skill_id', $skillIds)->get();
        // I'm leaving the above line commented out for now, but if we want to do something with the
        // deleted ExperienceSkill objects, we can retrieve them before deleting and include
        // them in the api response.
        $applicant->experienceSkillsQuery()->whereNotIn('skill_id', $skillIds)->delete();
        return [
            'skill_ids' => $skillIds,
            // 'deleted_experience_skills' => JsonResource::collection($deletedExperienceSkills),
        ];
    }
}
