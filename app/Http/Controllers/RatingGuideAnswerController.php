<?php

namespace App\Http\Controllers;

use App\Models\RatingGuideAnswer;
use App\Models\RatingGuideQuestion;
use App\Models\Criteria;

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
        $this->authorize('create', RatingGuideAnswer::class);
        try {
            $rating_guide_question_id = (int)$request->json('rating_guide_question_id');
            $criterion_id = (int)$request->json('criterion_id');
            $expected_answer = $request->json('expected_answer');

            RatingGuideQuestion::findOrFail($rating_guide_question_id);
            Criteria::findOrFail($criterion_id);

            $ratingGuideAnswer = new RatingGuideAnswer([
                'rating_guide_question_id' => $rating_guide_question_id,
                'criterion_id' => $criterion_id,
                'expected_answer' => $expected_answer,
            ]);
             // Check that this user is allowed to create an Assessment for this question
            $this->authorize('update', $ratingGuideAnswer);
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
        $this->authorize('view', $ratingGuideAnswer);
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
        $this->authorize('update', $ratingGuideAnswer);
        try {
            $rating_guide_question_id = (int)$request->json('rating_guide_question_id');
            $criterion_id = (int)$request->json('criterion_id');
            $expected_answer = $request->json('expected_answer');

            RatingGuideQuestion::findOrFail($rating_guide_question_id);
            Criteria::findOrFail($criterion_id);

            if (empty($expected_answer)) {
                throw new \InvalidArgumentException('Expected answer is required.');
            }
            $ratingGuideAnswer->rating_guide_question_id = $rating_guide_question_id;
            $ratingGuideAnswer->criterion_id = $criterion_id;
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
        $this->authorize('delete', $ratingGuideAnswer);
        $ratingGuideAnswer->delete();

        return [
            'success' => "Successfully deleted rating guide answer $ratingGuideAnswer->id"
        ];
    }
}
