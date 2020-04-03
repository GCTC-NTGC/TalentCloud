<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobApplication as JobApplicationResource;
use App\Models\JobApplication;
use App\Models\JobPoster;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
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
                'application_review',
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
        $request->validate([
            'review_status_id' => [
                'nullable',
                Rule::in(ReviewStatus::all()->pluck('id')->toArray())
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
            'notes' => $request->input('notes'),
        ]);
        $review->save();

        $application->loadMissing('applicant', 'application_review', 'citizenship_declaration', 'veteran_status');
        $application->fresh();

        return new JobApplicationResource($application);
    }
}
