<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use App\Http\Controllers\Controller;

class JobBuilderController extends Controller
{
    /**
     * Show the Job Builder mini SPA
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return view(
            'manager/job-builder-root'
        )->with('title', Lang::get('manager/job_builder')['title']);
    }
}
