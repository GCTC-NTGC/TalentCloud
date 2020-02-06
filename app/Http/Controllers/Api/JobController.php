<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\JobPoster as JobPosterResource;
use App\Mail\JobPosterReviewRequested;
use App\Models\JobPoster;
use App\Models\Lookup\JobTerm;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Jenssegers\Date\Date;
use App\Http\Requests\UpdateJobPoster;
use App\Http\Requests\StoreJobPoster;
use Illuminate\Support\Facades\Gate;
use App\Models\Criteria;

class JobController extends Controller
{
    /**
     * Class constructor
     */
    public function __construct()
    {
        // This applies the appropriate policy to each resource route.
        $this->authorizeResource(JobPoster::class, 'job');
    }

    /**
     * Return the list of all jobs the user is authorized to view,
     * using all query parameters as search filters.
     *
     * @param Request $request
     * @return void
     */
    public function index(Request $request)
    {
        $jobs = JobPoster::where($request->query())->get();
        $viewableJobs = $jobs->filter(function ($job) {
            return Gate::allows('view', $job);
        })->values();
        return response()->json($viewableJobs->map(function ($job) {
            return new JobPosterResource($job);
        }));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreJobPoster $request Incoming request.
     * @return \Illuminate\Http\Response
     */
    public function store(StoreJobPoster $request)
    {
        $data = $request->validated();
        $job = new JobPoster();
        $job->manager_id = $request->user()->manager->id;
        // Defaulting JPB created Jobs to monthly terms for now.
        $job->job_term_id = JobTerm::where('name', 'month')->value('id');
        $job->fill($data);
        $job->save();
        return new JobPosterResource($job);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\JobPoster $job Incoming Job Poster.
     * @return \Illuminate\Http\Response
     */
    public function show(JobPoster $job)
    {
        return new JobPosterResource($job);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateJobPoster $request Validates input.
     * @param  \App\Models\JobPoster              $job     Incoming Job Poster.
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateJobPoster $request, JobPoster $job)
    {
        $data = $request->validated();
        // Only values both in the JobPoster->fillable array,
        // and returned by UpdateJobPoster->validatedData(), will be set.
        $job->fill($data);
        // Defaulting JPB updated jobs to monthly for now.
        $job->job_term_id = JobTerm::where('name', 'month')->value('id');
        $job->save();
        $job->fresh();
        return new JobPosterResource($job);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  integer $id Job Poster ID.
     * @return void
     */
    public function destroy(int $id)
    {
        // TODO: complete.
    }

    /**
     * Submit the Job Poster for review.
     *
     * @param  \App\Models\JobPoster $job Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function submitForReview(JobPoster $job)
    {
        // Check to avoid submitting for review multiple times.
        if ($job->review_requested_at === null) {
            // Update review request timestamp.
            $job->review_requested_at = new Date();
            $job->save();

            // Send email.
            $reviewer_email = config('mail.reviewer_email');
            if (isset($reviewer_email)) {
                Mail::to($reviewer_email)->send(new JobPosterReviewRequested($job, Auth::user()));
            } else {
                Log::error('The reviewer email environment variable is not set.');
            }
        }

        return new JobPosterResource($job);
    }
}
