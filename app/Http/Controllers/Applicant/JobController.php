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
        $now = Carbon::now();
        //Find jobs that are currently open for applications
        $jobs = JobPoster::where('open_date_time', '<=', $now)->where('close_date_time', '>=', $now)->get();
        return view('applicant/job_index', ['job_index' => Lang::get('applicant/job_index'),
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
