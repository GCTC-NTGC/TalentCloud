<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Experience as ExperienceResource;
use App\Models\Applicant;
use App\Models\ExperienceAward;
use App\Models\ExperienceCommunity;
use App\Models\ExperienceEducation;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceWork;
use App\Models\JobApplication;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{

    /**
     * Return the list of Experience objects (of all types) associated with an application.
     *
     * @param JobApplication $application
     * @return void
     */
    public function indexForApplication(JobApplication $application)
    {
        $application->load([
            'experiences_work.experience_skills',
            'experiences_personal.experience_skills',
            'experiences_education.experience_skills',
            'experiences_award.experience_skills',
            'experiences_community.experience_skills',
        ]);
        $experiences = array_merge(
            ExperienceResource::collection($application->experiences_work)->all(),
            ExperienceResource::collection($application->experiences_personal)->all(),
            ExperienceResource::collection($application->experiences_education)->all(),
            ExperienceResource::collection($application->experiences_award)->all(),
            ExperienceResource::collection($application->experiences_community)->all()
        );

        return $experiences;
    }

    /**
     * Return the list of Experience objects (of all types) associated with an applicant.
     *
     * @param Applicant $applicant
     * @return void
     */
    public function indexForApplicant(Applicant $applicant)
    {
        $applicant->load([
            'experiences_work.experience_skills',
            'experiences_personal.experience_skills',
            'experiences_education.experience_skills',
            'experiences_award.experience_skills',
            'experiences_community.experience_skills',
        ]);
        $experiences = array_merge(
            ExperienceResource::collection($applicant->experiences_work)->all(),
            ExperienceResource::collection($applicant->experiences_personal)->all(),
            ExperienceResource::collection($applicant->experiences_education)->all(),
            ExperienceResource::collection($applicant->experiences_award)->all(),
            ExperienceResource::collection($applicant->experiences_community)->all()
        );

        return $experiences;
    }

    public function storeWork(Request $request, Applicant $applicant)
    {
        $data = $request->input();
        $work = new ExperienceWork($data);
        $applicant->experiences_work()->save($work);
        return new ExperienceResource($work->fresh());
    }

    public function storePersonal(Request $request, Applicant $applicant)
    {
        $data = $request->input();
        $personal = new ExperiencePersonal($data);
        $applicant->experiences_personal()->save($personal);
        return new ExperienceResource($personal->fresh());
    }

    public function storeEducation(Request $request, Applicant $applicant)
    {
        $data = $request->input();
        $education = new ExperienceEducation($data);
        $applicant->experiences_education()->save($education);
        return new ExperienceResource($education->fresh());
    }

    public function storeAward(Request $request, Applicant $applicant)
    {
        $data = $request->input();
        $award = new ExperienceAward($data);
        $applicant->experiences_award()->save($award);
        return new ExperienceResource($award->fresh());
    }

    public function storeCommunity(Request $request, Applicant $applicant)
    {
        $data = $request->input();
        $community = new ExperienceCommunity($data);
        $applicant->experiences_community()->save($community);
        return new ExperienceResource($community->fresh());
    }

}
