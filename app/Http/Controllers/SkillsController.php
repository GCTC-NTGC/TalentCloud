<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Models\Degree;
use App\Models\Applicant;
use App\Models\Course;
use App\Models\WorkExperience;
use App\Models\Lookup\DegreeType;
use App\Models\Lookup\CourseStatus;
use App\Models\Lookup\SkillLevel;
use App\Models\Lookup\SkillStatus;
use App\Models\SkillDeclaration;
use App\Models\Skill;
use App\Http\Controllers\Controller;

class SkillsController extends Controller
{

    /**
     * Display the Skills page associated with the applicant.
     *
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function show(Applicant $applicant)
    {
        //

    }

    /**
     * Show the form for editing the applicant's skills
     *
     * @param  Request  $request
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Applicant $applicant)
    {
        Debugbar::info($applicant->references);
        return view('applicant/profile_03_skills', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_skills'),
            'skill_template' => Lang::get('common/skills'),
            'relative_template' => Lang::get('common/relatives'),
            'skills' => Skill::all(),
            'skill_levels' => SkillLevel::all(),
            'form_submit_action' => route('profile.skills.update', $applicant),
        ]);
    }

    /**
     * Update the applicant's profile in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Applicant $applicant)
    {

        $input = $request->input();
        $shiftedInput = $this->shiftFirstLevelArrayKeysToBottom($input);

        $claimedStatusId = SkillStatus::where('name', 'claimed')->firstOrFail()->id;

        //Save new skill declarations
        if (isset($shiftedInput['new']) && is_array($shiftedInput['new'])) {
            $skillInputs = $shiftedInput['new'];
            Debugbar::info($skillInputs);
            foreach($skillInputs as $skillInput) {
                Debugbar::info($skillInput);
                $skillDeclaration = new SkillDeclaration();
                $skillDeclaration->applicant_id = $applicant->id;
                //All new skills start with 'claimed' status
                $skillDeclaration->skill_status_id = $claimedStatusId;
                $skillDeclaration->skill_id = $skillInput['skill_selection'];
                $skillDeclaration->description = $skillInput['skill_description'];
                $skillDeclaration->skill_level_id = $skillInput['skill_level'];

                $skillDeclaration->save();
            }
        }

        //Update old skill declarations
        if (isset($shiftedInput['old']) && is_array($shiftedInput['old'])) {
            //Save new skill declarations
            $skillInputs = $shiftedInput['old'];
            foreach($skillInputs as $id=>$skillInput) {
                $skillDeclaration = $applicant->skill_declarations->where('id', $id)->first();
                //Ensure input can be connected to an existing declaration
                if ($skillDeclaration != null) {
                    $skillDeclaration->description = $skillInput['skill_description'];
                    $skillDeclaration->skill_level_id = $skillInput['skill_level'];

                    $skillDeclaration->save();
                } else {
                    Debugbar::warning('Applicant '.$applicant->id.' attempted to update Skill Declaration with invalid id '.$criteria_id);
                }
            }
        }

        //return redirect( route('profile.skills.edit', $applicant) );
        return view('applicant/profile_03_skills', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_skills'),
            'skill_template' => Lang::get('common/skills'),
            'relative_template' => Lang::get('common/relatives'),
            'skills' => Skill::all(),
            'skill_levels' => SkillLevel::all(),
            'form_submit_action' => route('profile.skills.update', $applicant),
        ]);
    }

}
