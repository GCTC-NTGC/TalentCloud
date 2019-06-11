<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AssessmentPlanNotification;

class AssessmentPlanNotificationController extends Controller
{
    /**
     * Display a list of the specified resource. Must specify a job_poster_id,
     * either as form data or as url query string.
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @return mixed
     */
    public function index(Request $request)
    {
        $notificationsArray = [];
        if ($request->has('job_poster_id') && $request->user() != null) {
            $jobPosterId = $request->input('job_poster_id');
            $notifications = AssessmentPlanNotification::where('job_poster_id', $jobPosterId)->get();
            foreach ($notifications as $notification) {
                if ($request->user()->can('view', $notification)) {
                    $notificationsArray[] = $notification->toArray();
                }
            }
        }
        return $notificationsArray;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AssessmentPlanNotification $assessmentPlanNotification Incoming object.
     * @return mixed
     */
    public function show(AssessmentPlanNotification $assessmentPlanNotification)
    {
        $this->authorize('view', $assessmentPlanNotification);
        return $assessmentPlanNotification->toArray();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request               $request                    Incoming request.
     * @param  \App\Models\AssessmentPlanNotification $assessmentPlanNotification Incoming object.
     * @throws \InvalidArgumentException For missing $question.
     * @return mixed
     */
    public function update(Request $request, AssessmentPlanNotification $assessmentPlanNotification)
    {
        $this->authorize('update', $assessmentPlanNotification);
        $assessmentPlanNotification->fill([
            'acknowledged' => $request->input('acknowledged')
        ]);
        $assessmentPlanNotification->save();

        return [
            'success' => "Successfully updated assessment plan notification $assessmentPlanNotification->id",
            'assessment_plan_notification' => $assessmentPlanNotification->toArray(),
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AssessmentPlanNotification $assessmentPlanNotification Incoming object.
     * @return mixed
     */
    public function destroy(AssessmentPlanNotification $assessmentPlanNotification)
    {
        $this->authorize('delete', $assessmentPlanNotification);
        $assessmentPlanNotification->delete();

        return [
            'success' => "Successfully deleted assessment plan notification $assessmentPlanNotification->id"
        ];
    }
}
