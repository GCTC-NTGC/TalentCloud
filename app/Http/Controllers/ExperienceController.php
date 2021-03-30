<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicant;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Lang;

class ExperienceController extends Controller
{
    /**
     * Show the form for editing the logged-in applicant's experience
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @return \Illuminate\Http\Response
     */
    public function editAuthenticated(Request $request)
    {
        $applicant = $request->user()->applicant;
        return redirect(route('profile.experience.edit', $applicant));
    }

    /**
     * Show the form for editing the applicant's experience
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

        return view('applicant/profile_02_experience', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_experience'),
            'custom_breadcrumbs' => $custom_breadcrumbs,
            'disable_clone_js' => true,
        ]);
    }
}
