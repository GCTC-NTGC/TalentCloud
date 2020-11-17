<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Applicant;

class ReferencesController extends Controller
{

    /**
     * Show the form for editing the logged-in applicant's references
     *
     * @param  \Illuminate\Http\Request $request Incoming request object.
     * @return \Illuminate\Http\Response
     */
    public function editAuthenticated(Request $request)
    {
        $applicant = $request->user()->applicant;
        return redirect(route('profile.references.edit', $applicant));
    }

    /**
     * Show the form for editing the applicant's references
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

        $applicant->load([
            'references.projects',
            'skill_declarations.skill',
        ]);

        return view('applicant/profile_04_references', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_references'),
            'custom_breadcrumbs' => $custom_breadcrumbs,
        ]);
    }
}
