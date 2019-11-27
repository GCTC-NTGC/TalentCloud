<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class JobBuilderController extends Controller
{
    /**
     * Show the Job Builder mini SPA
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $show_notification = Auth::user()->isDemoManager();

        return view(
            'manager/job-builder-root'
        )->with([
            'title' => Lang::get('manager/job_builder.title'),
            'show_notification' => $show_notification,
        ]);
    }
}
