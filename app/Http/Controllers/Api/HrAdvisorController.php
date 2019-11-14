<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HrAdvisor;
use App\Models\JobPoster;
use Illuminate\Http\Request;

class HrAdvisorController extends Controller
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
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
     * @param  \App\Http\Requests\UpdateHrAdvisorApi $request Validates input.
     * @param  \App\Models\HrAdvisor  $hrAdvisor
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateHrAdvisorApi $request, HrAdvisor $hrAdvisor, JobPoster $jobPoster)
    {
        if ($request->validated()) {
            $hrAdvisor->jobs_claimed()->attach([
                'job_poster_id' => $jobPoster->id,
                'hr_advisor_id' => $hrAdvisor->id
            ]);
        };
        return response();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HrAdvisor  $hrAdvisor
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function destroy(HrAdvisor $hrAdvisor, JobPoster $jobPoster)
    {
        $hrAdvisor->jobs_claimed()->detach($jobPoster->id);
        return response();
    }

    /**
     * Claim a Job Poster.
     *
     * @param  \App\Models\HrAdvisor  $hrAdvisor
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function claimJob(HrAdvisor $hrAdvisor, JobPoster $jobPoster)
    {
        return true;
    }
}
