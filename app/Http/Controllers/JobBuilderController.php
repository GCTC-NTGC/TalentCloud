<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\Controller;

class JobBuilderController extends Controller
{
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
}
