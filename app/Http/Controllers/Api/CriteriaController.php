<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Criteria;
use App\Models\JobPoster;
use App\Models\AssessmentPlanNotification;
use App\Models\Assessment;
use Illuminate\Http\Request;

class CriteriaController extends Controller
{
/**
     * Converts a Criteria to the shape sent and recieved by the api.
     *
     * @param Criteria $model
     * @return void
     */
    public function toApiArray(Criteria $model)
    {
        return array_merge($model->toArray(), $model->getTranslationsArray());
    }

    /**
     * Get the set of criteria associated with a Job.
     *
     * @param JobPoster $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function indexByJob(JobPoster $jobPoster)
    {
        $toApiArray = array($this, 'toApiArray');
        $criteriaAray = Criteria::where('job_poster_id', $jobPoster->id)->get()->map($toApiArray);
        return response()->json($criteriaAray);
    }

    /**
     * Update the set of criteria associated with a Job.
     *
     * @param Request $request
     * @param JobPoster $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function batchUpdate(Request $request, JobPoster $jobPoster)
    {
        $toApiArray = array($this, 'toApiArray');

        $newCriteria = collect($request->input()); // TODO: switch to validated
        $oldCriteria = $jobPoster->criteria;

        $updatedIds = [];

        // First, delete old criteria that weren't resubmitted, and update those that were
        foreach ($oldCriteria as $criteria) {
            $newData = $newCriteria->firstWhere('id', $criteria['id']);
            if ($newData) {
                $updatedIds[] = $criteria->id;
                $this->updateCriteria($criteria, $newData);
            } else {
                $this->deleteCriteria($criteria);
            }
        }

        $isUnsaved = function ($criteria, $savedIds): bool {
            return !array_key_exists('id', $criteria) || !in_array($criteria['id'], $savedIds);
        };

        // Now, save any new criteria that remain
        foreach ($newCriteria as $criteriaData) {
            if ($isUnsaved($criteriaData, $updatedIds)) {
                $criteria = new Criteria();
                $criteria->job_poster_id = $jobPoster->id;
                $fillableData = collect($criteriaData)->except(['id', 'job_poster_id'])->toArray();
                $criteria->fill($fillableData);
                $this->createCriteria($criteria);
            }
        }

        $criteriaAray = Criteria::where('job_poster_id', $jobPoster->id)->get()->map($toApiArray);
        return response()->json($criteriaAray);
    }

    /**
     * Save a new criteria and create a notification.
     *
     * @param Criteria $criteria
     * @return void
     */
    protected function createCriteria(Criteria $criteria)
    {
        $criteria->save();

        $notification = $this->makeAssessmentPlanNotification(
            'CREATE',
            $criteria
        );
        $notification->save();

        return $criteria;
    }

    /**
     * Update an existing Job Criteria and create a notification if necessary.
     *
     * @param  \App\Models\Criteria $oldCriteria Existing Critera.
     * @param  mixed[] $newData Updated version of the Critera.
     * @return void
     */
    protected function updateCriteria(Criteria $oldCriteria, $newData): void
    {
        // We only need to create a notification when the non-descriptive fields change
        if ($oldCriteria->skill_level_id != $newData['skill_level_id']
            || $oldCriteria->skill_id != $newData['skill_id']
        ) {
            $notification = $this->makeAssessmentPlanNotification(
                'UPDATE',
                $oldCriteria,
                $newData['skill_id'],
                $newData['skill_level_id'],
                $newData['criteria_type_id']
            );
            $notification->save();
        }
        // Get just the data that can be changed
        $fillableData = collect($newData)->except(['id', 'job_poster_id'])->toArray();
        $oldCriteria->fill($fillableData);
        $oldCriteria->save();
    }

    /**
     * Delete existing Job Criteria and create a notification.
     *
     * @param  \App\Models\Criteria $criteria Incoming Criteria.
     * @return void
     */
    protected function deleteCriteria(Criteria $criteria): void
    {
        $notification = $notification = $this->makeAssessmentPlanNotification(
            'DELETE',
            $criteria
        );
        $notification->save();

        // Delete assessments related to this criteria.
        Assessment::where('criterion_id', $criteria->id)->delete();
        $criteria->delete();
    }

    /**
     * Create a new AssessmentPlanNotification for a modification to a Criteria
     *
     * @param  string               $type            Can be CREATE, UPDATE or DELETE.
     * @param  \App\Models\Criteria $criteria        The Criteria (the OLD criteria if updating or deleting)
     * @param  integer|null         $newSkillId      Only used for UPDATE type notifications.
     * @param  integer|null         $newSkillLevelId Only used for UPDATE type notifications.
     * @param  integer|null         $newCriteriaTypeId Only used for UPDATE type notifications.
     * @return \App\Models\AssessmentPlanNotification
     */
    protected function makeAssessmentPlanNotification(
        string $type,
        Criteria $criteria,
        $newSkillId = null,
        $newSkillLevelId = null,
        $newCriteriaTypeId = null
    ) {
        $notification = new AssessmentPlanNotification();
        $notification->job_poster_id = $criteria->job_poster_id;
        $notification->type = $type;
        $notification->criteria_id = $criteria->id;
        $notification->skill_id = $criteria->skill_id;
        $notification->criteria_type_id = $criteria->criteria_type_id;
        $notification->skill_level_id = $criteria->skill_level_id;
        $notification->skill_id_new = $newSkillId;
        $notification->skill_level_id_new = $newSkillLevelId;
        $notification->criteria_type_id_new = $newCriteriaTypeId;
        $notification->acknowledged = false;
        return $notification;
    }
}
