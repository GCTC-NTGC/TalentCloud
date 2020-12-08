<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BatchStoreExperienceSkill;
use App\Http\Requests\StoreExperienceSkill;
use App\Models\ExperienceSkill;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class ExperienceSkillsController extends Controller
{
    public function store(StoreExperienceSkill $request)
    {
        $data = $request->validated();
        // Restore soft deleted experienceSkill if it exists, otherwise create a new one.
        $softDeletedExperienceSkill = ExperienceSkill::onlyTrashed()
            ->where([
            ['skill_id', $data['skill_id']],
            ['experience_id', $data['experience_id']],
            ['experience_type', $data['experience_type']]
        ])->first();
        if ($softDeletedExperienceSkill) {
            $softDeletedExperienceSkill->restore();
            $softDeletedExperienceSkill->save();
            return new JsonResource($softDeletedExperienceSkill->fresh());
        } else {
            $experienceSkill = new ExperienceSkill($data);
            $experienceSkill->skill_id = $data['skill_id'];
            $experienceSkill->experience_id = $data['experience_id'];
            $experienceSkill->experience_type = $data['experience_type'];
            $experienceSkill->justification = $data['justification'];
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

    public function batchUpdate(Request $request)
    {
        $newExperienceSkills = $request->validate([
            '*.id' => 'required|exists:App\Models\ExperienceSkill,id',
            '*.justification' => 'nullable|string',
        ]);
        $response = [];

        foreach ($newExperienceSkills as $newExperienceSkill) {
            $experienceSkill = ExperienceSkill::where('id', $newExperienceSkill['id'])->first();
            $this->authorize('update', $experienceSkill);
            $experienceSkill->fill($newExperienceSkill);
            $experienceSkill->save();
            array_push($response, $experienceSkill);
        }
        return new JsonResource($response);
    }

    public function batchDestroy(Request $request)
    {
        $experienceSkillIds = $request->validate([
            '*.id' => 'required|exists:App\Models\ExperienceSkill,id',
        ]);
        $experienceSkills = ExperienceSkill::whereIn('id', $experienceSkillIds);
        foreach ($experienceSkills as $experienceSkill) {
            $this->authorize('update', $experienceSkill);
        }
        $experienceSkills->delete();
        return response()->json(['success' => 'success'], 200);
    }
}
