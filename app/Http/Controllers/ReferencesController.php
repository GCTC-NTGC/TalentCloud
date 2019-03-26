<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\Applicant;
use App\Models\Reference;
use App\Models\Project;
use App\Models\Lookup\Relationship;
use App\Services\Validation\Requests\UpdateReferenceValidator;

class ReferencesController extends Controller
{

    /**
     * Show the form for editing the logged-in applicant's references
     *
     * @param  Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function editAuthenticated(Request $request): \Illuminate\Http\RedirectResponse
    {
        $applicant = $request->user()->applicant;
        return redirect(route('profile.references.edit', $applicant));
    }

    /**
     * Show the form for editing the applicant's references
     *
     * @param  Request               $request
     * @param  \App\Models\Applicant $applicant
     * @return \Illuminate\View\View
     */
    public function edit(Request $request, Applicant $applicant): \Illuminate\View\View
    {
        return view('applicant/profile_04_references', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_references'),
            'reference_template' => Lang::get('common/references'),
            'relationships' => Relationship::all(),
        ]);
    }

    /**
     * Update or create a reference with the supplied data.
     *
     * @param \Illuminate\Http\Request   $request   The incoming request object.
     * @param \App\Models\Reference|null $reference The reference to update. If null, a new one should be created.
     *
     * @return
     */
    public function update(Request $request, ?Reference $reference = null)
    {
        $validator = new UpdateReferenceValidator();
        $validator->validate($request->input());

        if ($reference === null) {
            $reference = new Reference();
            $reference->applicant_id = $request->user()->applicant->id;
        }
        $reference->fill([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'relationship_id' => $request->input('relationship_id'),
            'description' => $request->input('description'),
        ]);
        $reference->save();

        $reference->load('projects');

        //TODO: As soon as you can interact with projects outside of references,
        //  this will become a dangerous operation
        foreach ($reference->projects as $project) {
            $project->delete();
        }

        $newProjects = [];
        if ($request->input('projects')) {
            foreach ($request->input('projects') as $projectInput) {
                $project = new Project();
                $project->applicant_id = $reference->applicant_id;
                $project->fill([
                    'name' => $projectInput['name'],
                    'start_date' => $projectInput['start_date'],
                    'end_date' => $projectInput['end_date'],
                ]);
                $project->save();
                $newProjects[] = $project->id;
                // $reference->projects()->attach($project);
            }
        }
        $reference->projects()->sync($newProjects);

        //Attach relatives
        $skillIds = $this->getRelativeIds($request->input(), 'skills');
        $reference->skill_declarations()->sync($skillIds);

        // if an ajax request, return the new object
        if ($request->ajax()) {
            $reference->load('relationship');
            $reference->load('projects');
            return $reference->toJson();
        } else {
            return redirect()->back();
        }
    }

    /**
     * Delete the particular reference from storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Reference    $reference
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Reference $reference)
    {
        $this->authorize('delete', $reference);

        //TODO: when projects exist independently on profile, delete seperatley
        foreach ($reference->projects as $project) {
            $project->delete();
        }

        $reference->delete();

        if ($request->ajax()) {
            return [
                "message" => 'Reference deleted'
            ];
        }

        return redirect()->back();
    }
}
