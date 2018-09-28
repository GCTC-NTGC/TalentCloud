<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\Applicant;
use App\Models\WorkSample;

class WorkSamplesController extends Controller
{

    /**
     * Display the Work Samples associated with the applicant.
     *
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function show(Applicant $applicant)
    {
        //

    }

    /**
     * Show the form for editing the applicant's work samples
     *
     * @param  Request  $request
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Applicant $applicant)
    {
        return view('applicant/profile_05_portfolio', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_work_samples'),
            'form_submit_action' => route('profile.work_samples.update', $applicant),
        ]);
    }

    /**
     * Update the applicant's workSamples in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Applicant $applicant)
    {

        $input = $request->input();

        $workSamples = $input['work_samples'];

        //Delete old workSamples that weren't resubmitted
        //Note: this must be done before adding new workSamples, so we don't delete
        // them right after adding them
        foreach($applicant->work_samples as $oldWorkSample) {
            //Check if no workSamples were resubmitted, or if this specific one wasn't
            if (!isset($workSamples['old']) ||
                !isset($workSamples['old'][$oldWorkSample->id])) {
                $oldWorkSample->delete();
            }
        }

        //Save new workSamples
        if (isset($workSamples['new'])) {
            foreach($workSamples['new'] as $workSampleInput) {
                $workSample = new WorkSample();
                $workSample->applicant_id = $applicant->id;
                $workSample->fill([
                    'name' => $workSampleInput['name'],
                    'date_created' => isset($workSampleInput['date_created']) ? $workSampleInput['date_created'] : null,
                    'file_type_id' => $workSampleInput['file_type_id'],
                    'url' => $workSampleInput['url'],
                    'description' => $workSampleInput['description'],
                ]);

                $workSample->save();

                $skillDeclarationIds =$this->getRelativeIds($workSampleInput, 'skills');
                $workSample->skill_declarations()->sync($skillDeclarationIds);
            }
        }

        //Update old workSamples
        if (isset($workSamples['old'])) {
            foreach($workSamples['old'] as $id=>$workSampleInput) {
                //Ensure this workSample belongs to this applicant
                $workSample = $applicant->work_samples->firstWhere('id', $id);
                if ($workSample != null) {
                    $workSample->fill([
                        'name' => $workSampleInput['name'],
                        'date_created' => isset($workSampleInput['date_created']) ? $workSampleInput['date_created'] : null,
                        'file_type_id' => $workSampleInput['file_type_id'],
                        'url' => $workSampleInput['url'],
                        'description' => $workSampleInput['description'],
                    ]);
                    $workSample->save();

                    $skillDeclarationIds =$this->getRelativeIds($workSampleInput, 'skills');
                    $workSample->skill_declarations()->sync($skillDeclarationIds);
                } else {
                    Debugbar::warning('Applicant '.$applicant->id.' attempted to update workSample with invalid id '.$id);
                }
            }
        }

        return redirect( route('profile.work_samples.edit', $applicant) );
        // Debugbar::info($input);
        // return view('applicant/profile_04_workSamples', [
        //     'applicant' => $applicant,
        //     'profile' => Lang::get('applicant/profile_workSamples'),
        //     'relative_template' => Lang::get('common/relatives'),
        //     'skills' => Skill::all(),
        //     'relationships' => Relationship::all(),
        //     'form_submit_action' => route('profile.workSamples.update', $applicant),
        // ]);
    }

}
