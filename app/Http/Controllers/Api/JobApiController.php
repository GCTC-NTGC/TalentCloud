<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use App\Models\Criteria;
use App\Services\Validation\JobPosterValidator;
use App\Http\Requests\UpdateJobPoster;
use App\Http\Requests\StoreJobPoster;

class JobApiController extends Controller
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
     * Convert a job poster to the array expected by API requests,
     * with all criteria,
     * and with translation arrays in both languages.
     *
     * @param  \App\Models\JobPoster $job Incoming Job Poster object.
     * @return mixed[]
     */
    private function jobToArray(JobPoster $job)
    {
        $criteria = Criteria::where('job_poster_id', $job->id)->get();
        $criteriaTranslated = [];
        foreach ($criteria as $criterion) {
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
        // TODO: complete.
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
        $job->fill($data);
        $job->save();
        return $this->jobToArray($job);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\JobPoster $job Incoming Job Poster.
     * @return \Illuminate\Http\Response
     */
    public function show(JobPoster $job)
    {
        return $this->jobToArray($job);
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
        JobPosterValidator::validateUnpublished($job);
        // Only values both in the JobPoster->fillable array,
        // and returned by UpdateJobPoster->validatedData(), will be set.
        $job->fill($data);
        $job->save();
        return $this->jobToArray($job);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  integer $id Job Poster ID.
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // TODO: complete.
    }
}
