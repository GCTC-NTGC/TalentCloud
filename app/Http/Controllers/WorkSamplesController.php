<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Applicant;

class WorkSamplesController extends Controller
{
    /**
     * Show the form for editing the logged-in applicant's Work Samples
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function editAuthenticated(Request $request)
    {
        $applicant = $request->user()->applicant;
        return redirect(route('profile.work_samples.edit', $applicant));
    }

    /**
     * Show the form for editing the applicant's work samples
     *
     * @param  \Illuminate\Http\Request $request   Incoming request object.
     * @param  \App\Models\Applicant    $applicant Incoming Applicant object.
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Applicant $applicant)
    {
        $custom_breadcrumbs = [
            'home' => route('home'),
            'profile' => '',
        ];

        $applicant->load([
            'work_samples',
            'skill_declarations.skill',
        ]);

        return view('applicant/profile_05_portfolio', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_work_samples'),
            'custom_breadcrumbs' => $custom_breadcrumbs,
        ]);
    }
}
