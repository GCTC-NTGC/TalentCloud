<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use App\Models\Criteria;
use App\Services\Validation\JobPosterValidator;
use App\Http\Requests\UpdateJobPoster;

class JobApiController extends Controller
{
    public function __construct()
    {
        // This applies the appropriate policy to each resource route
        $this->authorizeResource(JobPoster::class, 'job');
    }

    /**
     * Convert a job poster to the array expected by API requests,
     * with all criteria,
     * and with translation arrays in both languages.
     *
     * @param JobPoster $job
     * @return mixed[]
     */
    private function jobToArray(JobPoster $job)
    {
        $criteria = Criteria::where('job_poster_id', $job->id)->get();
        $criteriaTranslated = [];
        foreach ($criteria as $criterion) {
            // TODO: getTranslationsArray probably makes DB calls every loop. Find a way to profile & optimize.
            $criteriaTranslated[] = array_merge($criterion->toArray(), $criterion->getTranslationsArray());
        }
        $jobArray = array_merge($job->toApiArray(), ['criteria' => $criteriaTranslated]);
        return $jobArray;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //TODO: complete
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //TODO: complete
    }

    /**
     * Display the specified resource.
     *
     * @param JobPoster $job
     * @return \Illuminate\Http\Response
     */
    public function show(JobPoster $job)
    {
        return $this->jobToArray($job);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\UpdateJobPoster  $request Validates input.
     * @param  JobPoster $jobPoser
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateJobPoster $request, JobPoster $job)
    {
        $request->validated();
        JobPosterValidator::validateUnpublished($job);
        // Only values in the JobPoster->fillable array will be set
        $job->fill($request->input());
        $job->save();
        return $this->jobToArray($job);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // TODO:
    }
}
