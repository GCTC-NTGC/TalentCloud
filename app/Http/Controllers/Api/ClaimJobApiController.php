<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HrAdvisor;
use App\Models\JobPoster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ClaimJobApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, JobPoster $job)
    {
        return $this->claimJob($request->user()->hr_advisor, $job);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HrAdvisor  $hrAdvisor
     * @return \Illuminate\Http\Response
     */
    public function show(HrAdvisor $hrAdvisor)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, JobPoster $job)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, JobPoster $job)
    {
        return $this->unclaimJob($request->user()->hr_advisor, $job);
    }

    /**
     * Claim a Job Poster.
     *
     * @param  \App\Models\HrAdvisor  $hrAdvisor
     * @param  \App\Models\JobPoster  $job
     * @return \Illuminate\Http\Response
     */
    public function claimJob(HrAdvisor $hrAdvisor, JobPoster $job)
    {
        Gate::forUser($hrAdvisor->user)->authorize('claim', $job);
        $hrAdvisor->claimed_jobs()->attach($job);
        return response()->json(['status' => 'ok']);
    }

    /**
     * Unclaim a Job Poster.
     *
     * @param  \App\Models\HrAdvisor  $hrAdvisor
     * @param  \App\Models\JobPoster  $job
     * @return \Illuminate\Http\Response
     */
    public function unclaimJob(HrAdvisor $hrAdvisor, JobPoster $job)
    {
        Gate::forUser($hrAdvisor->user)->authorize('unClaim', $job);
        $hrAdvisor->claimed_jobs()->detach($job);
        return response()->json(['status' => 'ok']);
    }
}
