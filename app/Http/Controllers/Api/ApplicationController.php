<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateJobApplicationBasic;
use App\Http\Resources\JobApplication as JobApplicationResource;
use App\Http\Resources\JobApplicationBasic as JobApplicationBasicResource;
use App\Models\ApplicationReview;
use App\Models\JobApplication;
use App\Models\JobPoster;
use App\Models\Lookup\ApplicationStatus;
use App\Models\Lookup\Department;
use App\Models\Lookup\ReviewStatus;
use App\Models\Lookup\JobApplicationStep;
use App\Services\Validation\ApplicationTimelineValidator;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ApplicationController extends Controller
{
    /**
     * Retrieve Application properties, not including relationships.
     *
     * @param JobApplication $application Incoming Job Application object.
     *
     * @return mixed
     */
    public function getBasic(JobApplication $application)
    {
        return new JobApplicationBasicResource($application);
    }

    /**
     * Update Application properties, not including relationships.
     *
     * @param UpdateJobApplicationBasic $request     Form Validation casted request object.
     * @param JobApplication            $application Incoming Job Application object.
     *
     * @return mixed
     */
    public function updateBasic(UpdateJobApplicationBasic $request, JobApplication $application)
    {
        $data = $request->validated();
        $application->fill($data);
        $application->save();

        return new JobApplicationBasicResource($application);
    }

    /**
     * Validate and submit the Application.
     *
     * @param Request        $request     Incoming request object.
     * @param JobApplication $application Incoming Job Application object.
     *
     * @return mixed
     */
    public function submit(Request $request, JobApplication $application)
    {
        if ($application->application_status->name == 'draft') {
            $validator = new ApplicationTimelineValidator();
            $data = $request->validate($validator->affirmationRules);
            $application->fill($data);
            $application->save();

            $applicationComplete = $validator->validateComplete($application);
            if (!$applicationComplete) {
                $userId = $application->applicant->user_id;
                $msg = "Application $application->id for user $userId is invalid for submission: " .
                    implode('; ', $validator->detailedValidatorErrors($application));
                Log::info($msg);

                throw ValidationException::withMessages($validator->detailedValidatorErrors($application));
            }

            $application->application_status_id = ApplicationStatus::where('name', 'submitted')->firstOrFail()->id;
            $application->save();
            $application->saveProfileSnapshotTimeline();
        }

        return new JobApplicationBasicResource($application);
    }

    /**
     * Return a single Job Application.
     *
     * @param JobApplication $application Incoming Job Application object.
     *
     * @return mixed
     */
    public function show(JobApplication $application)
    {
        // Initialize an empty Application Review if none exists. This
        // simplifies the front end logic when performing batch updates.
        if ($application->application_review === null) {
            $application->application_review = new ApplicationReview();
            $application->application_review->job_application_id = $application->id;
            $application->application_review->save();
        }

        return new JobApplicationResource($application->fresh([
            'applicant.user',
            'application_review',
            'citizenship_declaration',
            'veteran_status',
            'job_application_answers'
        ]));
    }

    /**
     * Return all Job Applications for a given Job Poster.
     *
     * @param JobPoster $jobPoster Incoming Job Poster object.
     *
     * @return mixed
     */
    public function index(JobPoster $jobPoster)
    {
        $applications = $jobPoster->submitted_applications()->get();

        // Initialize an empty Application Review if none exists. This
        // simplifies the front end logic when performing batch updates.
        foreach ($applications as $application) {
            if ($application->application_review === null) {
                $application->application_review = new ApplicationReview();
                $application->application_review->job_application_id = $application->id;
                $application->application_review->save();
            }
        }

        return JobApplicationResource::collection($applications->fresh([
            'applicant.user',
            'application_review.department',
            'citizenship_declaration',
            'veteran_status'
        ]));
    }

    /**
     * Update a single Job Application Review.
     *
     * @param Request        $request     Incoming request object.
     * @param JobApplication $application Incoming Job Application object.
     *
     * @return mixed
     */
    public function updateReview(Request $request, JobApplication $application)
    {
        $strategicResponseDepartmentId = config('app.strategic_response_department_id');
        $availabilityStatuses = ReviewStatus::whereIn('name', ['allocated', 'not_available'])->get()->pluck('id');

        $request->validate([
            'review_status_id' => [
                'nullable',
                Rule::in(ReviewStatus::all()->pluck('id')->toArray())
            ],
            'department_id' => [
                'nullable',
                Rule::in(Department::all()->pluck('id')->toArray())
            ],
            'notes' => 'nullable|string'
        ]);

        $review = $application->application_review;
        if ($review === null) {
            $review = new ApplicationReview();
            $review->job_application()->associate($application);
        }
        $review->fill([
            'review_status_id' => $request->input('review_status_id'),
            'department_id' => $request->input('department_id'),
            'notes' => $request->input('notes'),
        ]);
        $review->save();

        if (
            $application->job_poster->department_id === $strategicResponseDepartmentId
            && in_array($review->review_status_id, $availabilityStatuses->toArray())
        ) {
            $this->setAvailability($application);
        }

        $review = $review->fresh();
        $review->loadMissing('department');

        return new JsonResource($review);
    }

    /**
     * Sets the review status for any other application reviews
     * belonging to a given Applicant to `not_available`.
     * Designed to be used for the Strategic Talent Response screening,
     * but could be repurposed.
     *
     * @param JobApplication $application Incoming Job Application object.
     *
     * @return void
     */
    protected function setAvailability(JobApplication $application)
    {
        $departmentId = $application->job_poster->department_id;
        $submittedStatusId = ApplicationStatus::where('name', 'submitted')->value('id');
        $unavailableStatusId = ReviewStatus::where('name', 'not_available')->value('id');

        // This is kinda gross, but it seems to filter out the correct subset, and allows a single database call
        // to perform the update. Seems better than returning a result set, looping, and pushing individual changes.
        ApplicationReview::whereHas('job_application.job_poster', function ($query) use ($departmentId) {
            $query->where('department_id', $departmentId);
        })->whereHas('job_application', function ($query) use ($application, $submittedStatusId) {
            $query->where([
                ['id', '<>', $application->id],
                ['application_status_id', $submittedStatusId],
                ['applicant_id', $application->applicant->id]
            ]);
        })->update(['review_status_id' => $unavailableStatusId]);
    }

    /**
     * Update the job application step
     *
     * @param Step $step Incoming Job Application Step
     * @return mixed
     */
    public function touchStep(Request $request, JobApplication $application, JobApplicationStep $jobApplicationStep)
    {
        $touchedApplicationStep = $application->touched_application_steps
            ->where('step_id', $jobApplicationStep->id)
            ->first();
        $touchedApplicationStep->update(['touched' => true]);

        return new JsonResource($application->jobApplicationSteps());
    }
}
