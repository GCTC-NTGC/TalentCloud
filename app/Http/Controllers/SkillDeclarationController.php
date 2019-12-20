<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Models\Lookup\SkillStatus;
use App\Models\SkillDeclaration;
use App\Models\Applicant;
use App\Http\Controllers\Controller;
use App\Services\Validation\SkillDeclarationValidator;

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
        return redirect(route('profile.skills.edit', $applicant));
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
        $applicant->load([
            'skill_declarations.skill.skill_type',
            'skill_declarations.skill_status',
            'skill_declarations.skill_level',
        ]);

        return view('applicant/profile_03_skills', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_skills'),
            'skills_modals' => Lang::get('common/skills_modals'),
        ]);
    }

    /**
     * Create the particular skill declaration in storage.
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @return \Illuminate\Http\Response|string
     */
    public function create(Request $request)
    {
        $this->authorize('create', SkillDeclaration::class);

        $user = $request->user();
        $applicant = $user->applicant;

        // Get the default claim status id.
        $claimedStatusId = SkillStatus::where('name', 'claimed')->firstOrFail()->id;

        // Create a new Skill Declaration
        // But don't save, as it hasn't been validated yet.
        $skillDeclaration = new SkillDeclaration();
        $skillDeclaration->skill_id = $request->input('skill_id');
        $skillDeclaration->skill_status_id = $claimedStatusId;

        $applicant->skill_declarations()->save($skillDeclaration);

        // Update variable fields in skill declaration.
        return $this->updateSkillDeclaration($request, $skillDeclaration);
    }

    /**
     * Check authorization and update the skill declaration.
     *
     * @param  \Illuminate\Http\Request     $request          Incoming request.
     * @param  \App\Models\SkillDeclaration $skillDeclaration Incoming Skill Declaration.
     * @return \Illuminate\Http\Response|string
     */
    public function update(Request $request, SkillDeclaration $skillDeclaration)
    {
        $this->authorize('update', $skillDeclaration);

        return $this->updateSkillDeclaration($request, $skillDeclaration);
    }

    /**
     * Update the particular skill declaration in storage.
     *
     * @param  \Illuminate\Http\Request     $request          Incoming request.
     * @param  \App\Models\SkillDeclaration $skillDeclaration Incoming Skill Declaration.
     * @return \Illuminate\Http\Response|string
     */
    protected function updateSkillDeclaration(Request $request, SkillDeclaration $skillDeclaration)
    {
        // Fill variable values.
        $skillDeclaration->fill([
            'description' => $request->input('description'),
            'skill_level_id' => $request->input('skill_level_id'),
        ]);

        // Validate before saving.
        $validator = new SkillDeclarationValidator();
        $validator->validate($skillDeclaration);

        // Save this skill declaration.
        $skillDeclaration->save();

        // Attach relatives.
        $referenceIds = $this->getRelativeIds($request->input(), 'references');
        $skillDeclaration->references()->sync($referenceIds);

        $sampleIds = $this->getRelativeIds($request->input(), 'samples');
        $skillDeclaration->work_samples()->sync($sampleIds);

        // If an ajax request, return the new object.
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
     * @param  \Illuminate\Http\Request     $request          Incoming request.
     * @param  \App\Models\SkillDeclaration $skillDeclaration Incoming Skill Declaration.
     * @return \Illuminate\Http\Response|string[]
     */
    public function destroy(Request $request, SkillDeclaration $skillDeclaration)
    {
        $this->authorize('delete', $skillDeclaration);
        $skillDeclaration->delete();

        if ($request->ajax()) {
            return ['message' => 'Skill deleted'];
        }

        return redirect()->back();
    }
}
