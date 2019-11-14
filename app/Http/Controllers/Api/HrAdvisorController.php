<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateHrAdvisorApi;
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
     * // @param  \App\Http\Requests\UpdateHrAdvisorApi $request
     * @param  \App\Models\HrAdvisor  $hrAdvisor
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function store(HrAdvisor $hrAdvisor, JobPoster $jobPoster)
    {
        // if ($request->validated()) {};
        return response()->json($this->claimJob($hrAdvisor, $jobPoster));
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
     * @param  \App\Models\HrAdvisor  $hrAdvisor
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function update(HrAdvisor $hrAdvisor, JobPoster $jobPoster)
    {
        $hrAdvisor->claimed_jobs()->attach($jobPoster->id);
        return response()->json();
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
        $hrAdvisor->claimed_jobs()->detach($jobPoster->id);
        return response()->json();
    }

    /**
     * Return the array of values used to represent this object in an api response.
     * This array should contain no nested objects (besides translations).
     *
     * @return mixed[]
     */
    public function toApiArray($model)
    {
        return array_merge($model->toArray());
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
        // $hrAdvisor = HrAdvisor::find(1);
        $jobPoster = JobPoster::find($hrAdvisor->id);
        $hrAdvisor->claimed_jobs()->attach($jobPoster);
        return response()->json();
    }
}
