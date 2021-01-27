<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateApplicantSkills;
use App\Models\Applicant;

class ApplicantSkillsController extends Controller
{
    public function index(Applicant $applicant)
    {
        return [
            'skill_ids' => $applicant->skills->pluck('id')
        ];
    }

    public function update(UpdateApplicantSkills $request, Applicant $applicant)
    {
        $skillIds = $request->validated()['skill_ids'];
        $applicant->skills()->sync($skillIds);
        return [
            'skill_ids' => $skillIds
        ];
    }
}
