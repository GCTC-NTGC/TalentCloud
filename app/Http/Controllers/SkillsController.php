<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Models\Skill;
use App\Models\Lookup\SkillStatus;
use App\Models\SkillDeclaration;
use App\Models\Applicant;
use App\Http\Controllers\Controller;
use App\Services\Validation\BulkSkillDeclarationValidator;

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
        $skills = Skill::all();

        return view('applicant/profile_03_skills', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_skills'),
            'form_submit_action' => route('profile.skills.update', $applicant),
            'skills' => $skills
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

        $validator = new BulkSkillDeclarationValidator($applicant, $input);
        $validator->validate($input);

        $skillDeclarations = $request->input('skill_declarations');
        $claimedStatusId = SkillStatus::where('name', 'claimed')->firstOrFail()->id;

        //Delete old skill declarations that weren't resubmitted
        //Note: this must be done before adding new ones, so we don't delete
        // them right after adding them
        foreach($applicant->skill_declarations as $oldDeclaration) {
            //Check if none were resubmitted, or if this specific one wasn't
            $type = $oldDeclaration->skill->skill_type->name;
            if (!isset($skillDeclarations['old']) ||
                !isset($skillDeclarations['old'][$type]) ||
                !isset($skillDeclarations['old'][$type][$oldDeclaration->id])) {
                $oldDeclaration->delete();
            }
        }

        //Save new skill declarartions
        if (isset($skillDeclarations['new'])) {
            foreach($skillDeclarations['new'] as $skillType => $typeInput) {
                foreach($typeInput as $skillDeclarationInput) {
                    $skillDeclaration = new SkillDeclaration();
                    $skillDeclaration->applicant_id = $applicant->id;
                    $skillDeclaration->skill_id = $skillDeclarationInput['skill_id'];
                    $skillDeclaration->skill_status_id = $claimedStatusId;
                    $skillDeclaration->fill([
                        'description' => $skillDeclarationInput['description'],
                        'skill_level_id' => isset($skillDeclarationInput['skill_level_id']) ? $skillDeclarationInput['skill_level_id'] : null,
                    ]);
                    $skillDeclaration->save();

                    $referenceIds = $this->getRelativeIds($skillDeclarationInput, 'references');
                    $skillDeclaration->references()->sync($referenceIds);

                    $sampleIds = $this->getRelativeIds($skillDeclarationInput, 'samples');
                    $skillDeclaration->work_samples()->sync($sampleIds);
                }
            }
        }

        //Update old declarations
        if (isset($skillDeclarations['old'])) {
            foreach($skillDeclarations['old'] as $skillType => $typeInput) {
                foreach($typeInput as $id=>$skillDeclarationInput) {
                    //Ensure this declaration belongs to this applicant
                    $skillDeclaration = $applicant->skill_declarations->firstWhere('id', $id);
                    if ($skillDeclaration != null) {
                        //skill_id and skill_status cannot be changed
                        $skillDeclaration->fill([
                            'description' => $skillDeclarationInput['description'],
                            'skill_level_id' => isset($skillDeclarationInput['skill_level_id']) ? $skillDeclarationInput['skill_level_id'] : null,
                        ]);
                        $skillDeclaration->save();

                        $referenceIds = $this->getRelativeIds($skillDeclarationInput, 'references');
                        $skillDeclaration->references()->sync($referenceIds);

                        $sampleIds = $this->getRelativeIds($skillDeclarationInput, 'samples');
                        $skillDeclaration->work_samples()->sync($sampleIds);
                    } else {
                        Log::warning('Applicant '.$applicant->id.' attempted to update skill declaration with invalid id '.$id);
                    }
                }
            }
        }


        return redirect( route('profile.skills.edit', $applicant) );
    }

    /**
     * Delete the particular skill declaration in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SkillDeclaration  $skillDeclaration
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, SkillDeclaration $skillDeclaration)
    {
        $this->authorize('delete', $skillDeclaration);
        $skillDeclaration->delete();

        if($request->ajax()) {
            return ['message' => 'Skill deleted'];
        }

        return redirect()->back();
    }

}
