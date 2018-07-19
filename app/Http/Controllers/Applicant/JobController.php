<?php

namespace App\Http\Controllers\Applicant;

use Illuminate\Support\Facades\Lang;
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
        /*
         * 
        "jobs" => [
            "0" => [
                "link" => "/browse/jobs/00/",
                "title" => "Front-end Developer",
                "department" => "Treasury Board of Canada Secretariat",
                "city" => "Ottawa",
                "province" => "Ontario",
                "salary" => "80,000 - 120,000",
                "duration" => "1 Year",
                "remote" => "Allowed",
                "days_remaining" => "12",
                "applicants" => "2"
            ],
            "1" => [
                "link" => "/brwose/jobs/01/",
                "title" => "Consultant",
                "department" => "Treasury Board of Canada Secretariat",
                "city" => "Ottawa",
                "province" => "Ontario",
                "salary" => "85,000 - 115,000",
                "duration" => "6 Months",
                "remote" => "Not Allowed",
                "days_remaining" => "1",
                "applicants" => "10"
            ]
        ]
         */
        
        $now = Carbon::now();
        //Find jobs that are currently open for applications
        $jobs = JobPoster::where('open_date_time', '<=', $now)->where('close_date_time', '>=', $now)->get();
        return view('applicant/jobs_index', ['jobs_index' => Lang::get('applicant/jobs_index'), 
            'jobs' => $jobs]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }
}
