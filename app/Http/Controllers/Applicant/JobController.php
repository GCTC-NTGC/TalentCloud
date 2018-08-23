<?php

namespace App\Http\Controllers\Applicant;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\JobPoster;

class JobController extends Controller
{
    /**
     * Display a listing of JobPosters.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $now = Carbon::now();
        //Find jobs that are currently open for applications
        $jobs = JobPoster::where('open_date_time', '<=', $now)->where('close_date_time', '>=', $now)->get();
        return view('applicant/job_index', ['job_index' => Lang::get('applicant/job_index'),
            'jobs' => $jobs]);
    }

    /**
     * Display the specified job poster.
     *
     * @param  Request  $request
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, JobPoster $jobPoster)
    {
        //TODO: Improve workplace photos, and reference them in template direction from WorkEnvironment model
        $workplacePhotos = [];
        foreach ($jobPoster->manager->work_environment->workplace_photo_captions as $photoCaption) {
            $workplacePhotos[] = [
                'description' => $photoCaption->description,
                'url' => '/images/user.png'
            ];
        }

        //TODO: replace route('manager.show',manager.id) in templates with link using slug

        $criteria = [
            'essential' => $jobPoster->criteria->filter(function ($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $jobPoster->criteria->filter(function ($value, $key) {
                return $value->criteria_type->name == 'asset';
            })
        ];

        return view('applicant/job_post', [
            'job_post' =>Lang::get('applicant/job_post'),
            'manager' => $jobPoster->manager,
            'manager_profile_photo_url' => '/images/user.png', //TODO get real photo
            'team_culture' => $jobPoster->manager->team_culture,
            'work_environment' => $jobPoster->manager->work_environment,
            'workplace_photos' => $workplacePhotos,
            'job' => $jobPoster,
            'criteria' => $criteria,
        ]);
    }
}
