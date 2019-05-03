<?php

namespace App\Http\Controllers;

use App\Models\JobPoster;
use App\Models\Lookup\AssessmentType;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\AssessmentPlanNotification;

class AssessmentPlanNotificationController extends Controller
{
    /**
     * Display a list of the specified resource
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @return mixed
     */
    public function index(Request $request)
    {
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
     * @param  \Illuminate\Http\Request        $request             Incoming request.
     * @param  \App\Models\AssessmentPlanNotification $assessmentPlanNotification Incoming object.
     * @throws \InvalidArgumentException For missing $question.
     * @return mixed
     */
    public function update(Request $request, AssessmentPlanNotification $assessmentPlanNotification)
    {
        $this->authorize('update', $assessmentPlanNotification);
        try {
            $job_poster_id = (int)$request->json('job_poster_id');
            $assessment_type_id = (int)$request->json('assessment_type_id');
            $question = $request->json('question');

            JobPoster::findOrFail($job_poster_id);
            AssessmentType::findOrFail($assessment_type_id);

            if (empty($question)) {
                throw new \InvalidArgumentException('Question is required.');
            }

            $assessmentPlanNotification->job_poster_id = $job_poster_id;
            $assessmentPlanNotification->assessment_type_id = $assessment_type_id;
            $assessmentPlanNotification->question = $question;
            $assessmentPlanNotification->save();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }

        return [
            'success' => "Successfully updated rating guide question $assessmentPlanNotification->id",
            'rating_guide_question' => $assessmentPlanNotification->toArray(),
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
            'success' => "Successfully deleted rating guide question $assessmentPlanNotification->id"
        ];
    }
}
