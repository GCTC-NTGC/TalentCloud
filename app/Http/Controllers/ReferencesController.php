<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Applicant;
use App\Models\JobApplication;
use App\Models\Reference;
use App\Models\Project;
use App\Services\Validation\Requests\UpdateReferenceValidator;

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
        $applicant->load([
            'references.projects',
            'skill_declarations.skill',
        ]);

        return view('applicant/profile_04_references', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_references'),
        ]);
    }

    /**
     * Update or create a reference with the supplied data.
     *
     * @param  \Illuminate\Http\Request   $request   The incoming request object.
     * @param  \App\Models\Reference|null $reference The reference to update. If null, a new one should be created.
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ?Reference $reference = null)
    {
        $validator = new UpdateReferenceValidator();
        $validator->validate($request->input());

        if ($reference === null) {
            $reference = new Reference();
            $request->user()->applicant->references()->save($reference);
            $reference->refresh();
        }
        $reference->fill([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'relationship_id' => $request->input('relationship_id'),
            'description' => $request->input('description'),
        ]);
        $reference->save();

        // TODO: As soon as you can interact with projects outside of references,
        // this will become a dangerous operation.
        $reference->projects()->delete();

        $newProjects = [];
        if ($request->input('projects')) {
            foreach ($request->input('projects') as $projectInput) {
                $project = new Project();
                $project->fill([
                    'name' => $projectInput['name'],
                    'start_date' => $projectInput['start_date'],
                    'end_date' => $projectInput['end_date'],
                ]);
                $reference->referenceable->projects()->save($project);
                $newProjects[] = $project->fresh()->id;
            }
        }
        $reference->projects()->sync($newProjects);

        // Attach relatives.
        $skillIds = $this->getRelativeIds($request->input(), 'skills');
        $reference->skill_declarations()->sync($skillIds);

        // If an ajax request, return the new object.
        if ($request->wantsJson()) {
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
     * @param  \Illuminate\Http\Request $request   Incoming Request.
     * @param  \App\Models\Reference    $reference Incoming Reference.
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Reference $reference)
    {
        $this->authorize('delete', $reference);

        // TODO: when projects exist independently on profile, delete separately.
        $reference->projects()->delete();

        $reference->delete();

        if ($request->ajax()) {
            return [
                'message' => 'Reference deleted'
            ];
        }

        return redirect()->back();
    }
}
