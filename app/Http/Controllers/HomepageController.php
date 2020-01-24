<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use Carbon\Carbon;

class HomepageController extends Controller
{
    /**
     * Show the applicant home page.
     * @return \Illuminate\Http\Response
     */
    public function applicant()
    {
        $now = Carbon::now();

        // Find three most recent published jobs that are currently open for applications.
        // Eager load required relationships: Department, Province, JobTerm.
        $jobs = JobPoster::where('open_date_time', '<=', $now)
            ->where('close_date_time', '>=', $now)
            ->where('published', true)
            ->with([
                'department',
                'province',
            ])
            ->orderBy('open_date_time', 'desc')
            ->take(3)
            ->get();
        return view('applicant/home', [
            'home' => Lang::get('applicant/home'),
            'hero' => Lang::get('common/hero'),
            'job_index' => Lang::get('applicant/job_index'),
            'job_post' => Lang::get('applicant/job_post'),
            'jobs' => $jobs,
            'job_count' => count($jobs)
        ]);
    }

    /**
     * Show the manager home page.
     * @return \Illuminate\Http\Response
     */
    public function manager()
    {
        return view('manager/home', [
            'home_l10n' => Lang::get('manager/home'),
        ]);
    }

    /**
     * Show the hr_advisor home page.
     * @return \Illuminate\Http\Response
     */
    public function hr_advisor() //phpcs:ignore
    {
        return view('hr_advisor/home', [
            'hr_home' => Lang::get('hr_advisor/home'),
        ]);
    }
}
