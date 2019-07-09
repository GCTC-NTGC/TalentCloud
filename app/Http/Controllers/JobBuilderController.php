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
    public function intro($jobId = null)
    {
        return view(
            'manager/job-builder-intro',
            ['title' => 'Job Builder: Welcome', 'jobId' => $jobId]
        );
    }

    /**
     * Show the Job Builder Details page
     * @return \Illuminate\Http\Response
     */
    public function details($jobId = null)
    {
        return view(
            'manager/job-builder-details',
            ['title' => 'Job Builder: Details', 'jobId' => $jobId]
        );
    }

    /**
     * Show the Job Builder Work Environment page
     * @return \Illuminate\Http\Response
     */
    public function environment($jobId = null)
    {
        return view(
            'manager/job-builder-environment',
            ['title' => 'Job Builder: Environment', 'jobId' => $jobId]
        );
    }
}
