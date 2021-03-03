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

        $essentialCriteriaType = CriteriaType::where('name', 'essential')->first()->id;
        $hardSkillType = SkillType::where('name', 'hard')->first()->id;

        $jobCriteria = $application->job_poster->criteria;
        $requiredCriteriaSkillIds = $jobCriteria
            ->filter(function ($criterion) use ($essentialCriteriaType, $hardSkillType) {
                return $criterion->criteria_type_id === $essentialCriteriaType
                    && $criterion->skill->skill_type_id === $hardSkillType;
            })
            ->pluck('skill_id')
            ->all();
        // Get all Experiences belonging to the application, or applicant (if draft),
        // that are assigned to required Criteria.
        $experiences = ExperienceSkill::whereHasMorph(
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

        // Log when application is first created
        if ($application->wasRecentlyCreated) {
            $applicationText = '{id=' . $application->id . ', status=' . $application->application_status->name . '}';
            $logArray = [
                'message' => 'Application created: application ' . $applicationText . ' has been created by user ' . $userText,
                'application' => $application,
                'experiences' => $experiences
            ];
            Log::notice(json_encode($logArray));
        }
        // Log if application status has been changed
        elseif ($application->application_status_id != $application->getOriginal('application_status_id')) {
            $freshApplication = $application->fresh();
            $applicationText = '{id=' . $freshApplication->id . '}';
            $statusText = '{' . $freshApplication->application_status->name . '}';

            $logArray = [
                'message' => 'Application status changed: application ' . $applicationText . ' has been changed to ' . $statusText . ' by user ' . $userText,
                'application' => $application,
                'experiences' => $experiences
            ];
            Log::notice(json_encode($logArray));
        }
    }
}
