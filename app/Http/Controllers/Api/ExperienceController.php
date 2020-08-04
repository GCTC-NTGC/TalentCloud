<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateExperienceAward;
use App\Http\Requests\UpdateExperienceCommunity;
use App\Http\Requests\UpdateExperienceEducation;
use App\Http\Requests\UpdateExperiencePersonal;
use App\Http\Requests\UpdateExperienceWork;
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

    public function storeWork(UpdateExperienceWork $request, Applicant $applicant)
    {
        $data = $request->validated();
        $work = new ExperienceWork($data);
        $applicant->experiences_work()->save($work);
        return new ExperienceResource($work->fresh());
    }

    public function storePersonal(UpdateExperiencePersonal $request, Applicant $applicant)
    {
        $data = $request->validated();
        $personal = new ExperiencePersonal($data);
        $applicant->experiences_personal()->save($personal);
        return new ExperienceResource($personal->fresh());
    }

    public function storeEducation(UpdateExperienceEducation $request, Applicant $applicant)
    {
        $data = $request->validated();
        $education = new ExperienceEducation($data);
        $applicant->experiences_education()->save($education);
        return new ExperienceResource($education->fresh());
    }

    public function storeAward(UpdateExperienceAward $request, Applicant $applicant)
    {
        $data = $request->validated();
        $award = new ExperienceAward($data);
        $applicant->experiences_award()->save($award);
        return new ExperienceResource($award->fresh());
    }

    public function storeCommunity(UpdateExperienceCommunity $request, Applicant $applicant)
    {
        $data = $request->validated();
        $community = new ExperienceCommunity($data);
        $applicant->experiences_community()->save($community);
        return new ExperienceResource($community->fresh());
    }

    public function updateWork(UpdateExperienceWork $request, ExperienceWork $work)
    {
        $data = $request->validated();
        $work->fill($data);
        $work->save();
        return new ExperienceResource($work->fresh());
    }

    public function updatePersonal(UpdateExperiencePersonal $request, ExperiencePersonal $personal)
    {
        $data = $request->validated();
        $personal->fill($data);
        $personal->save();
        return new ExperienceResource($personal->fresh());
    }

    public function updateEducation(UpdateExperienceEducation $request, ExperienceEducation $education)
    {
        $data = $request->validated();
        $education->fill($data);
        $education->save();
        return new ExperienceResource($education->fresh());
    }

    public function updateAward(UpdateExperienceAward $request, ExperienceAward $award)
    {
        $data = $request->validated();
        $award->fill($data);
        $award->save();
        return new ExperienceResource($award->fresh());
    }

    public function updateCommunity(UpdateExperienceCommunity $request, ExperienceCommunity $community)
    {
        $data = $request->validated();
        $community->fill($data);
        $community->save();
        return new ExperienceResource($community->fresh());
    }
}
