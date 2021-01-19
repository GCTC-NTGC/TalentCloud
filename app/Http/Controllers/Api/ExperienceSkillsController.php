<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BatchStoreExperienceSkill;
use App\Http\Requests\BatchUpdateExperienceSkill;
use App\Http\Requests\StoreExperienceSkill;
use App\Models\ExperienceSkill;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class ExperienceSkillsController extends Controller
{
    public function store(StoreExperienceSkill $request)
    {
        $validatedData = $request->validated();
        // Restore soft deleted experienceSkill if it exists, otherwise create a new one.
        $softDeletedExperienceSkill = ExperienceSkill::onlyTrashed()
            ->where([
            ['skill_id', $validatedData['skill_id']],
            ['experience_id', $validatedData['experience_id']],
            ['experience_type', $validatedData['experience_type']]
        ])->first();

        // Attach skill to applicant if not already attached.
        $experience = new Experience();
        $experienceInstance = $experience->getExperienceInstance($validatedData['experience_type'], $validatedData['experience_id']);
        $applicantInstance = $experience->getApplicantInstance($experienceInstance);
        if ($applicantInstance !== null) {
            $skillApplicantRelationshipExists = $applicantInstance->skills()
            ->where('skills.id', $validatedData['skill_id'])
            ->exists();
            if ($skillApplicantRelationshipExists !== true) {
                $applicantInstance->skills()->attach($validatedData['skill_id']);
            }
        }

        if ($softDeletedExperienceSkill) {
            if ($validatedData['justification'] !== null && $validatedData['justification'] !== '') {
                $softDeletedExperienceSkill->justification = $validatedData['justification'];
            }
            $softDeletedExperienceSkill->restore();
            $softDeletedExperienceSkill->save();
            return new JsonResource($softDeletedExperienceSkill->fresh());
        } else {
            $experienceSkill = new ExperienceSkill($validatedData);
            $experienceSkill->skill_id = $validatedData['skill_id'];
            $experienceSkill->experience_id = $validatedData['experience_id'];
            $experienceSkill->experience_type = $validatedData['experience_type'];
            $experienceSkill->justification = $validatedData['justification'];
            $experienceSkill->save();
            return new JsonResource($experienceSkill->fresh());
        }
    }

    public function update(Request $request, ExperienceSkill $experienceSkill)
    {
        $validatedData = $request->validate([
            'justification' => 'nullable|string',
        ]);
        $experienceSkill->fill($validatedData);
        $experienceSkill->save();
        return new JsonResource($experienceSkill->fresh());
    }

    public function destroy(ExperienceSkill $experienceSkill)
    {
        $experienceSkill->delete();
    }

    public function batchStore(BatchStoreExperienceSkill $request)
    {
        $validatedResult = $request->validated();
        $newExperienceSkills = collect($validatedResult);
        $response = [];

        DB::transaction(function () use ($newExperienceSkills, &$response) {
            foreach ($newExperienceSkills as $newExperienceSkill) {
                // Restore soft deleted experienceSkill if it exists, otherwise create a new one.
                $softDeletedExperienceSkill = ExperienceSkill::withTrashed()
                    ->where([
                    ['skill_id', $newExperienceSkill['skill_id']],
                    ['experience_id', $newExperienceSkill['experience_id']],
                    ['experience_type', $newExperienceSkill['experience_type']]
                ])->first();
                if ($softDeletedExperienceSkill) {
                    $softDeletedExperienceSkill->restore();
                    if ($newExperienceSkill['justification'] !== null && $newExperienceSkill['justification'] !== '') {
                        $softDeletedExperienceSkill->justification = $newExperienceSkill['justification'];
                    }
                    $softDeletedExperienceSkill->save();
                    array_push($response, $softDeletedExperienceSkill);
                } else {
                    $experienceSkill = new ExperienceSkill($newExperienceSkill);
                    $experienceSkill->skill_id = $newExperienceSkill['skill_id'];
                    $experienceSkill->experience_id = $newExperienceSkill['experience_id'];
                    $experienceSkill->experience_type = $newExperienceSkill['experience_type'];
                    $experienceSkill->justification = $newExperienceSkill['justification'];
                    $experienceSkill->save();
                    $experienceSkill->fresh();
                    array_push($response, $experienceSkill);
                }
            }
        }, 3); // Retry transaction up to three times if deadlock occurs.

        return JsonResource::collection($response);
    }

    public function batchUpdate(BatchUpdateExperienceSkill $request)
    {
        $validatedResult = $request->validated();
        $inputData = collect($validatedResult);
        $experienceSkills = ExperienceSkill::whereIn('id', $inputData->pluck('id')->all())->get();

        DB::transaction(function () use ($experienceSkills, $inputData) {
            foreach ($experienceSkills as $experienceSkill) {
                $updatedExperienceSkill = $inputData->firstWhere('id', $experienceSkill->id);
                $experienceSkill->fill($updatedExperienceSkill);
                $experienceSkill->save();
            }
        }, 3); // Retry transaction up to three times if deadlock occurs.

        return JsonResource::collection($experienceSkills->fresh());
    }

    public function batchDestroy(Request $request)
    {
        $experienceSkillIds = $request->validate([
            '*.id' => 'required|exists:App\Models\ExperienceSkill,id',
        ]);
        $experienceSkills = ExperienceSkill::whereIn('id', $experienceSkillIds);
        foreach ($experienceSkills as $experienceSkill) {
            $this->authorize('delete', $experienceSkill);
        }
        $experienceSkills->delete();
        return response()->json(['success' => 'success'], 200);
    }
}
