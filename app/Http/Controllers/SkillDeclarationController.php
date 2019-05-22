<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Skill;
use App\Models\Lookup\SkillLevel;
use App\Models\Lookup\SkillStatus;
use App\Models\SkillDeclaration;
use App\Models\Applicant;
use App\Http\Controllers\Controller;
use App\Services\Validation\BulkSkillDeclarationValidator;
use App\Services\Validation\SkillDeclarationValidator;

class SkillDeclarationController extends Controller
{

    /**
     * Show the form for editing the logged-in applicant's skills
     *
     * @param  Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function editAuthenticated(Request $request): \Illuminate\Http\RedirectResponse
    {
        $applicant = $request->user()->applicant;
        return redirect(route('profile.skills.edit', $applicant));
    }

    /**
     * Show the form for editing the applicant's skills
     *
     * @param Request   $request   Incoming request object.
     * @param Applicant $applicant Applicant object.
     *
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory
     */
    public function edit(Request $request, Applicant $applicant)
    {
        $applicant->load([
            'skill_declarations.skill.skill_type',
            'skill_declarations.skill_status',
            'skill_declarations.skill_level',
        ]);

        return view('applicant/profile_03_skills', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_skills'),
        ]);
    }

    /**
     * Create the particular skill declaration in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request): \Illuminate\Http\Response
    {
        $this->authorize('create', SkillDeclaration::class);

        $user = $request->user();
        $applicant = $user->applicant;

        //Get the default claim status id
        $claimedStatusId = SkillStatus::where('name', 'claimed')->firstOrFail()->id;

        // Create a new Skill Declaration
        // But don't save, as it hasn't been validated yet
        $skillDeclaration = new SkillDeclaration();
        $skillDeclaration->applicant_id = $applicant->id;
        $skillDeclaration->skill_id = $request->input('skill_id');
        $skillDeclaration->skill_status_id = $claimedStatusId;

        //Update variable fields in skill declaration
        return $this->updateSkillDeclaration($request, $skillDeclaration);
    }

    /**
     * Update the particular skill declaration in storage.
     *
     * @param  \Illuminate\Http\Request     $request
     * @param  \App\Models\SkillDeclaration $skillDeclaration
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SkillDeclaration $skillDeclaration): \Illuminate\Http\Response
    {
        $this->authorize('update', $skillDeclaration);

        return $this->updateSkillDeclaration($request, $skillDeclaration);
    }

    protected function updateSkillDeclaration(Request $request, SkillDeclaration $skillDeclaration)
    {
        //Fill variable values
        $skillDeclaration->fill([
            'description' => $request->input('description'),
            'skill_level_id' => $request->input('skill_level_id'),
        ]);

        //Validate before saving
        $validator = new SkillDeclarationValidator($request->user()->applicant);
        $validator->validate($skillDeclaration);

        //Save this skill declaration
        $skillDeclaration->save();

        //Attach relatives
        $referenceIds = $this->getRelativeIds($request->input(), 'references');
        $skillDeclaration->references()->sync($referenceIds);

        $sampleIds = $this->getRelativeIds($request->input(), 'samples');
        $skillDeclaration->work_samples()->sync($sampleIds);

        // $skillDeclaration->save();

        // If an ajax request, return the new object
        if ($request->ajax()) {
            $skillDeclaration->load('references');
            $skillDeclaration->load('work_samples');
            $skillDeclaration->load('skill');
            $skillDeclaration->load('skill_status');
            return $skillDeclaration->toJson();
        }

        return redirect()->back();
    }

    /**
     * Delete the particular skill declaration in storage.
     *
     * @param  \Illuminate\Http\Request     $request
     * @param  \App\Models\SkillDeclaration $skillDeclaration
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, SkillDeclaration $skillDeclaration): \Illuminate\Http\Response
    {
        $this->authorize('delete', $skillDeclaration);
        $skillDeclaration->delete();

        if ($request->ajax()) {
            return ['message' => 'Skill deleted'];
        }

        return redirect()->back();
    }
}
