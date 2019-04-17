<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Criteria;
use App\Models\Lookup\AssessmentType;

use Illuminate\Http\Request;

class AssessmentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return mixed
     */
    public function store(Request $request)
    {
        try {
            $criterion_id = (int)$request->json('criterion_id');
            $assessment_type_id = (int)$request->json('assessment_type_id');
            Criteria::findOrFail($criterion_id);
            AssessmentType::findOrFail($assessment_type_id);
        } catch (\Exception $e) {
            abort(401);
        }

        $assessment = new Assessment([
            'criterion_id' => $criterion_id,
            'assessment_type_id' => $assessment_type_id
        ]);
        $assessment->save();
        $assessment->refresh();

        return [
            'message' => "Successfully created assessment $assessment->id"
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Assessment $assessment
     * @return mixed
     */
    public function show(Assessment $assessment)
    {
        return $assessment->toArray();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Assessment          $assessment
     * @return mixed
     */
    public function update(Request $request, Assessment $assessment)
    {
        try {
            $criterion_id = (int)$request->json('criterion_id');
            $assessment_type_id = (int)$request->json('assessment_type_id');
            Criteria::findOrFail($criterion_id);
            AssessmentType::findOrFail($assessment_type_id);
        } catch (\Exception $e) {
            abort(401);
        }

        $assessment->criterion_id = $criterion_id;
        $assessment->assessment_type_id = $assessment_type_id;
        $assessment->save();

        return [
            'message' => "Successfully updated assessment $assessment->id"
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Assessment $assessment
     * @return mixed
     */
    public function destroy(Assessment $assessment)
    {
        $assessment->delete();

        return [
            'message' => "Successfully deleted assessment $assessment->id"
        ];
    }
}
