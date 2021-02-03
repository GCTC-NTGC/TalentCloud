<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicant;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Lang;

class ApplicantSkillsController extends Controller
{
    /**
     * Redirect to the logged-in user's Skills page.
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @return \Illuminate\Http\Response
     */
    public function editAuthenticated(Request $request)
    {
        $applicant = $request->user()->applicant;
        return redirect(route('profile.skills.edit', $applicant));
    }

    /**
     * Show the applicant's Skills page.
     *
     * @param  \Illuminate\Http\Request $request   Incoming request object.
     * @param  \App\Models\Applicant    $applicant Incoming applicant object.
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Applicant $applicant)
    {
        $custom_breadcrumbs = [
            'home' => route('home'),
            'profile' => '',
        ];

        return view('applicant/profile_skills', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_skills'),
            'custom_breadcrumbs' => $custom_breadcrumbs,
            'disable_clone_js' => true,
        ]);
    }
}
