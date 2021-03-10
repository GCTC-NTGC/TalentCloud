<?php

namespace App\Listeners;

use App\Models\ExperienceSkill;
use App\Events\ApplicationSaved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Lookup\CriteriaType;
use App\Models\Lookup\SkillType;
use App\Http\Resources\Experience as ExperienceResource;

class ApplicationStatusChanged
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Handle the event.
     *
     * @param  ApplicationSaved  $event
     * @return void
     */
    public function handle(ApplicationSaved $event)
    {
        $application = $event->application;

        if (Auth::check()) {
            $user = Auth::user();
            $userText = '{id=' . $user->id . ', email=' . $user->email . '}';
        } else {
            $userText = '{null}';
        }

        // Log when application is first created
        if ($application->wasRecentlyCreated) {
            $applicationText = '{id=' . $application->id . ', status=' . $application->application_status->name . ', job_poster_id=' . $application->job_poster_id . '}';
            $logArray = [
                'message' => 'Application created: application ' . $applicationText . ' has been created by user ' . $userText,
            ];
            Log::notice(json_encode($logArray));
        }
        // Log if application status has been changed
        elseif ($application->application_status_id != $application->getOriginal('application_status_id')) {
            $freshApplication = $application->fresh();

            $hardSkillType = SkillType::where('name', 'hard')->first()->id;
            $jobCriteria = $application->job_poster->criteria;
            $requiredCriteriaSkillIds = $jobCriteria
                ->filter(function ($criterion) use ($hardSkillType) {
                    return $criterion->skill->skill_type_id === $hardSkillType;
                })
                ->pluck('skill_id')
                ->all();
            // Get all Experiences belonging to the application, or applicant (if draft),
            // that are assigned to required Criteria.
            $experienceSkills = ExperienceSkill::whereHasMorph(
                'experience',
                '*',
                function (Builder $query) use ($application): void {
                    $query->where([
                        ['experienceable_type', $application->isDraft() ? 'applicant' : 'application'],
                        ['experienceable_id', $application->isDraft() ? $application->applicant->id : $application->id]
                    ]);
                }
            )
            ->whereIn('skill_id', $requiredCriteriaSkillIds)
            ->get();

            $freshApplication->load([
                'experiences_work',
                'experiences_personal',
                'experiences_education',
                'experiences_award',
                'experiences_community',
            ]);
            $experiences = array_merge(
                ExperienceResource::collection($freshApplication->experiences_work)->all(),
                ExperienceResource::collection($freshApplication->experiences_personal)->all(),
                ExperienceResource::collection($freshApplication->experiences_education)->all(),
                ExperienceResource::collection($freshApplication->experiences_award)->all(),
                ExperienceResource::collection($freshApplication->experiences_community)->all()
            );

            $applicationText = '{id=' . $freshApplication->id . '}';
            $jobPosterText = '{job_poster_id=' . $freshApplication->job_poster_id . '}';
            $statusText = '{' . $freshApplication->application_status->name . '}';
            $logArray = [
                'message' => 'Application status changed: application ' . $applicationText . ' for ' . $jobPosterText . ' has been changed to ' . $statusText . ' by user ' . $userText,
                'application' => $freshApplication->toArray(),
                'experiences' => $experiences,
                'experiences_skills' => $experienceSkills
            ];
            Log::notice(json_encode($logArray));
        }
    }
}
