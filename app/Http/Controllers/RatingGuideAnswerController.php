<?php

namespace App\Http\Controllers;

use App\Models\RatingGuideAnswer;
use App\Models\RatingGuideQuestion;
use App\Models\Skill;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RatingGuideAnswerController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @throws \InvalidArgumentException For missing $expected_answer.
     * @return mixed
     */
    public function store(Request $request)
    {
        try {
            $rating_guide_question_id = (int)$request->json('rating_guide_question_id');
            $skill_id = (int)$request->json('skill_id');
            $expected_answer = $request->json('expected_answer');

            RatingGuideQuestion::findOrFail($rating_guide_question_id);
            Skill::findOrFail($skill_id);

            if (empty($expected_answer)) {
                throw new \InvalidArgumentException('Expected answer is required.');
            }

            $ratingGuideAnswer = new RatingGuideAnswer([
                'rating_guide_question_id' => $rating_guide_question_id,
                'skill_id' => $skill_id,
                'expected_answer' => $expected_answer,
            ]);
            $ratingGuideAnswer->save();
            $ratingGuideAnswer->refresh();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }

        return [
            'success' => "Successfully created rating guide answer $ratingGuideAnswer->id",
            'rating_guide_answer' => $ratingGuideAnswer->toArray(),
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RatingGuideAnswer $ratingGuideAnswer Incoming object.
     * @return mixed
     */
    public function show(RatingGuideAnswer $ratingGuideAnswer)
    {
        $ratingGuideAnswer->load([
            'skill',
            'rating_guide_question'
        ]);
        return $ratingGuideAnswer->toArray();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request      $request           Incoming request.
     * @param  \App\Models\RatingGuideAnswer $ratingGuideAnswer Incoming object.
     * @throws \InvalidArgumentException For empty $expected_answer.
     * @return mixed
     */
    public function update(Request $request, RatingGuideAnswer $ratingGuideAnswer)
    {
        try {
            $rating_guide_question_id = (int)$request->json('rating_guide_question_id');
            $skill_id = (int)$request->json('skill_id');
            $expected_answer = $request->json('expected_answer');

            RatingGuideQuestion::findOrFail($rating_guide_question_id);
            Skill::findOrFail($skill_id);

            if (empty($expected_answer)) {
                throw new \InvalidArgumentException('Expected answer is required.');
            }
            $ratingGuideAnswer->rating_guide_question_id = $rating_guide_question_id;
            $ratingGuideAnswer->skill_id = $skill_id;
            $ratingGuideAnswer->expected_answer = $expected_answer;
            $ratingGuideAnswer->save();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }

        return [
            'success' => "Successfully updated rating guide answer $ratingGuideAnswer->id",
            'rating_guide_answer' => $ratingGuideAnswer->toArray(),
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RatingGuideAnswer $ratingGuideAnswer Incoming object.
     * @return mixed
     */
    public function destroy(RatingGuideAnswer $ratingGuideAnswer)
    {
        $ratingGuideAnswer->delete();

        return [
            'success' => "Successfully deleted rating guide answer $ratingGuideAnswer->id"
        ];
    }
}
