<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\Controller;
use App\Models\JobPoster;

class HomepageController extends Controller
{
    /**
     * Show the applicant home page
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory
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
     * Show the manager home page
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory
     */
    public function manager()
    {
        return view('manager/home', [
            "hero" => [
                "hero_logo" => "/images/logo_tc_colour.png",
                "hero_logo_alt" => Lang::get('manager/home_hero')['logo_alt_text'],
                "hero_tagline" => Lang::get('manager/home_hero')['tagline']
            ]
        ]);
    }
}
