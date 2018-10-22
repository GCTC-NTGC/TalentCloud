<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use App\Models\JobApplication;
use App\Models\Skill;

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


    /**
     * Display specified application
     *
     * @param  \App\Models\JobApplication  $application
     * @return \Illuminate\Http\Response
     */
    public function show(JobApplication $application)
    {
        $criteria = [
            'essential' => $application->job_poster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $application->job_poster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'asset';
            }),
        ];

        return view('applicant/application_post_05', [

            /* Application Template Data */
                "application_template" => Lang::get("applicant/application_template"),

            /* Job Data */
                "job" => $application->job_poster,

            /* Skills Data */
                "skills" => Skill::all(),
                "skill_template" => Lang::get("common/skills"),
                "criteria" => $criteria,

            /* Applicant Data */
                "applicant" => $application->applicant,
                "job_application" => $application,
        ]);
    }

}
