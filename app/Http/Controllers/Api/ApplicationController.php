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
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Validation\Rule;

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
        $request->validated();
        $application->fill([
            'citizenship_declaration_id' => $request->input('citizenship_declaration_id'),
            'veteran_status_id' => $request->input('veteran_status_id'),
            'language_requirement_confirmed' => $request->input('language_requirement_confirmed', false),
            'language_test_confirmed' => $request->input('language_test_confirmed', false),
            'education_requirement_confirmed' => $request->input('education_requirement_confirmed', false),
        ]);
        $application->save();

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
        $application->loadMissing('applicant', 'application_review', 'citizenship_declaration', 'veteran_status');
        return new JobApplicationResource($application);
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
        $applications = $jobPoster->submitted_applications()
            ->with([
                'applicant.user',
                'application_review.department',
                'citizenship_declaration',
                'veteran_status'
            ])
            ->get();

        return JobApplicationResource::collection($applications);
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

        if ($application->job_poster->department_id === $strategicResponseDepartmentId
            && in_array($review->review_status_id, $availabilityStatuses->toArray())
        ) {
            $this->setAvailability($application);
        }

        $review->fresh();
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
}
