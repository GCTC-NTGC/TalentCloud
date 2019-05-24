<?php

namespace App\Http\Controllers;

use App\Models\RatingGuideAnswer;
use App\Models\RatingGuideQuestion;
use App\Models\Criteria;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\UpdateRatingGuideAnswer;
use App\Http\Requests\StoreRatingGuideAnswer;

class RatingGuideAnswerController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Requests\StoreRatingGuideAnswer $request Incoming request.
     * @throws \InvalidArgumentException For missing $expected_answer.
     * @return mixed
     */
    public function store(StoreRatingGuideAnswer $request)
    {
        // Authorization handled by the FormRequest

        // Data validation handled by this line
        $data = $request->validated();
        $ratingGuideAnswer = new RatingGuideAnswer($data);
        $ratingGuideAnswer->save();

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
     * @param  \App\Requests\UpdateRatingGuideAnswer $request Incoming request.
     * @param  \App\Models\RatingGuideAnswer $ratingGuideAnswer Incoming object.
     * @throws \InvalidArgumentException For empty $expected_answer.
     * @return mixed
     */
    public function update(UpdateRatingGuideAnswer $request, RatingGuideAnswer $ratingGuideAnswer)
    {
        // Authorization handled by the FormRequest

        // Data validation handled by this line
        $data = $request->validated();

        $ratingGuideAnswer->fill($data);
        $ratingGuideAnswer->save();
        $ratingGuideAnswer->refresh();
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
