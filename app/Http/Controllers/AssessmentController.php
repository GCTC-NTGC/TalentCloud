<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Criteria;
use App\Models\Lookup\AssessmentType;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AssessmentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @return mixed
     */
    public function store(Request $request)
    {
        $this->authorize('create', Assessment::class);

        try {
            $criterion_id = (int)$request->json('criterion_id');
            $assessment_type_id = (int)$request->json('assessment_type_id');
            $criteria = Criteria::findOrFail($criterion_id);
            AssessmentType::findOrFail($assessment_type_id);

            $assessment = new Assessment([
                'criterion_id' => $criterion_id,
                'assessment_type_id' => $assessment_type_id
            ]);
            // Check that this user is allowed to create an Assessment for this criterion
            $this->authorize('update', $assessment);

            $assessment->save();
            $assessment->refresh();
            $assessment['criteria'] = $criteria->toArray();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }

        return [
            'success' => "Successfully created assessment $assessment->id",
            'assessment' => $assessment->toArray()
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Assessment $assessment Incoming object.
     * @return mixed
     */
    public function show(Assessment $assessment)
    {
        $this->authorize('view', $assessment);
        $criteria = Criteria::find($assessment->id);
        $assessment['criteria'] = $criteria->toArray();
        return $assessment->toArray();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request    Incoming request.
     * @param  \App\Models\Assessment   $assessment Incoming object.
     * @return mixed
     */
    public function update(Request $request, Assessment $assessment)
    {
        $this->authorize('update', $assessment);
        try {
            $criterion_id = (int)$request->json('criterion_id');
            $assessment_type_id = (int)$request->json('assessment_type_id');
            $criteria = Criteria::findOrFail($criterion_id);
            AssessmentType::findOrFail($assessment_type_id);

            $assessment->criterion_id = $criterion_id;
            $assessment->assessment_type_id = $assessment_type_id;
            $assessment->save();
            $assessment['criteria'] = $criteria->toArray();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }

        return [
            'success' => "Successfully updated assessment $assessment->id",
            'assessment' => $assessment->toArray(),
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Assessment $assessment Incoming object.
     * @return mixed
     */
    public function destroy(Assessment $assessment)
    {
        $this->authorize('delete', $assessment);
        $assessment->delete();

        return [
            'success' => "Successfully deleted assessment $assessment->id"
        ];
    }
}
