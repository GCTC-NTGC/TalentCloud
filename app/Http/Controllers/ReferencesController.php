<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Skill;
use App\Models\Applicant;
use App\Models\Reference;
use App\Models\Project;
use App\Http\Controllers\Controller;

class ReferencesController extends Controller
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
    * Show the form for editing the applicant's references
    *
    * @param  Request  $request
    * @param  \App\Models\Applicant  $applicant
    * @return \Illuminate\Http\Response
    */
    public function edit(Request $request, Applicant $applicant)
    {
        return view('applicant/profile_04_references', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_references'),
            'form_submit_action' => route('profile.references.update', $applicant),
        ]);
    }

    /**
    * Update the applicant's references in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Models\Applicant  $applicant
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, Applicant $applicant)
    {
        $validator = Validator::make($request->all(), [
            'references.new.*.name' => 'required',
            'references.new.*.relationship_id' => 'required|integer|between:1,3',
            'references.new.*.email' => 'required|email',
            'references.new.*.description' => 'required',
        ])->validate();

        $input = $request->input();
        $references = $input['references'];

        //Delete old references that weren't resubmitted
        //Note: this must be done before adding new references,
        //so we don't delete them right after adding them
        foreach($applicant->references as $oldReference) {
            //Check if no references were resubmitted, or if this specific one wasn't
            if (!isset($references['old']) ||
            !isset($references['old'][$oldReference->id])) {
                $oldReference->delete();
            }
        }

        //Save new references
        if (isset($references['new'])) {
            foreach($references['new'] as $referenceInput) {
                $reference = new Reference();
                $reference->applicant_id = $applicant->id;
                $reference->fill([
                    'name' => $referenceInput['name'],
                    'email' => $referenceInput['email'],
                    'relationship_id' => $referenceInput['relationship_id'],
                    'description' => $referenceInput['description'],
                ]);

                $reference->save();

                $projectIds = [];
                $projects = $referenceInput['projects'];

                if (isset($projects['new'])) {
                    foreach($projects['new'] as $projectInput) {
                        $project = new Project();
                        $project->applicant_id = $applicant->id;
                        $project->fill([
                            'name' => $projectInput['name'],
                            'start_date' => $projectInput['start_date'],
                            'end_date' => $projectInput['end_date'],
                        ]);
                        $project->save();
                        $projectIds[] = $project->id;
                    }
                }

                //Sync attaches the specified ids, and detaches all others
                $reference->projects()->sync($projectIds);

                $skillDeclarationIds =$this->getRelativeIds($referenceInput, 'skills');
                $reference->skill_declarations()->sync($skillDeclarationIds);
            }
        }

        //Update old references
        if (isset($references['old'])) {
            foreach($references['old'] as $id=>$referenceInput) {

            //Ensure this reference belongs to this applicant
            $reference = $applicant->references->firstWhere('id', $id);

            if ($reference != null) {
                $reference->fill([
                    'name' => $referenceInput['name'],
                    'email' => $referenceInput['email'],
                    'relationship_id' => $referenceInput['relationship_id'],
                    'description' => $referenceInput['description'],
                ]);

                $reference->save();

                $projectIds = [];
                $projects = $referenceInput['projects'];

                if (isset($projects['new'])) {
                    foreach($projects['new'] as $projectInput) {
                        $project = new Project();
                        $project->applicant_id = $applicant->id;
                        $project->fill([
                            'name' => $projectInput['name'],
                            'start_date' => $projectInput['start_date'],
                            'end_date' => $projectInput['end_date'],
                        ]);
                        $project->save();
                        $projectIds[] = $project->id;
                    }
                }

                if (isset($projects['old'])) {
                    foreach($projects['old'] as $projectId=>$projectInput) {
                        //Ensure this project belongs to this applicant
                        $project = $applicant->projects->firstWhere('id', $projectId);
                        if ($project != null) {
                            $project->fill([
                                'name' => $projectInput['name'],
                                'start_date' => $projectInput['start_date'],
                                'end_date' => $projectInput['end_date'],
                            ]);
                            $project->save();
                            $projectIds[] = $project->id;
                        }
                    }
                }

                //TODO: when projects exists independpently on profile, don't delete them Here
                // Delete projects that will be detached from this reference
                foreach($reference->projects as $project) {
                    if (!in_array($project->id, $projectIds)) {
                        $project->delete();
                    }
                }

                //Sync attaches the specified ids, and detaches all others
                $reference->projects()->sync($projectIds);

                $skillDeclarationIds =$this->getRelativeIds($referenceInput, 'skills');
                $reference->skill_declarations()->sync($skillDeclarationIds);

                } else {
                    Log::warning('Applicant '.$applicant->id.' attempted to update reference with invalid id '.$id);
                }

                return redirect( route('profile.references.edit', $applicant) );
            }
        }
    }

    /**
    * Delete the particular reference from storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Models\Reference  $reference
    * @return \Illuminate\Http\Response
    */
    public function destroy(Request $request, Reference $reference)
    {
        $this->authorize('delete', $reference);

        //TODO: when projects exist independently on profile, delete seperatley
        foreach($reference->projects as $project) {
            $project->delete();
        }

        $reference->delete();

        if($request->ajax()) {
            return [
                "message" => 'Reference deleted'
            ];
        }

        return redirect()->back();
    }
}
