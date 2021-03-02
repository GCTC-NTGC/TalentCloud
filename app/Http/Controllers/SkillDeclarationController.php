<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Models\Applicant;
use App\Http\Controllers\Controller;

class SkillDeclarationController extends Controller
{

    /**
     * Show the form for editing the logged-in applicant's skills
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @return \Illuminate\Http\Response
     */
    public function editAuthenticated(Request $request)
    {
        $applicant = $request->user()->applicant;
        return redirect(route('profile.skills-old.edit', $applicant));
    }

    /**
     * Show the form for editing the applicant's skills
     *
     * @param  \Illuminate\Http\Request $request   Incoming request object.
     * @param  \App\Models\Applicant    $applicant Applicant object.
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Applicant $applicant)
    {
        $custom_breadcrumbs = [
            'home' => route('home'),
            'profile' => '',
        ];

        $applicant->load([
            'skill_declarations.skill.skill_type',
            'skill_declarations.skill_status',
            'skill_declarations.skill_level',
        ]);

        return view('applicant/profile_03_skills', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_skills'),
            'skills_modals' => Lang::get('common/skills_modals'),
            'custom_breadcrumbs' => $custom_breadcrumbs,
        ]);
    }
}
