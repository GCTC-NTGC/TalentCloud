<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use App\Models\JobApplication;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        debugbar()->info(JobApplication::all());
        debugbar()->info(Auth::user()->applicant);
        debugbar()->info(Auth::user()->applicant->job_applications);
        $applications = Auth::user()->applicant->job_applications;
        return view('applicant/application_index', [
            "application_index" => Lang::get('applicant/application_index'),
            "applications" => $applications,
            "departments_template" => Lang::get('common/lookup/departments'),
            "manager_profile_photo" => '/images/user.png', //TODO: get real photo
        ]);
    }

}
