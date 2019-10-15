<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\Controller;

class JobBuilderController extends Controller
{
    /**
     * Show the Job Builder Intro page
     * @return \Illuminate\Http\Response
     */
    public function intro()
    {
        return view(
            'manager/job-builder-root'
        );
    }

    /**
     * Show the Job Builder Details page
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        return view(
            'manager/job-builder-root'
        );
    }

    /**
     * Show the Job Builder Work Environment page
     * @return \Illuminate\Http\Response
     */
    public function environment()
    {
        return view(
            'manager/job-builder-root'
        );
    }

    /**
     * Show the Job Builder Impact page
     * @return \Illuminate\Http\Response
     */
    public function impact()
    {
        return view(
            'manager/job-builder-root'
        );
    }

    /**
     * Show the Job Builder Tasks page
     * @return \Illuminate\Http\Response
     */
    public function tasks()
    {
        return view(
            'manager/job-builder-root'
        );
    }

    /**
     * Show the Job Builder Skills page
     * @return \Illuminate\Http\Response
     */
    public function skills()
    {
        return view(
            'manager/job-builder-root'
        );
    }

    /**
     * Show the Job Builder Review page
     * @return \Illuminate\Http\Response
     */
    public function review()
    {
        return view(
            'manager/job-builder-root'
        );
    }
}
