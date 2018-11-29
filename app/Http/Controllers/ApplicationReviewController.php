<?php

namespace App\Http\Controllers;

use App\Models\ApplicationReview;
use App\Models\JobApplication;
use Illuminate\Http\Request;

class ApplicationReviewController extends Controller
{
    /**
     * Update the review for the specified application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\JobApplication  $application
     * @return \Illuminate\Http\Response
     */
    public function updateForApplication(Request $request, JobApplication $application)
    {
        $review = $application->application_review;
        if ($review === null) {
            $review = new ApplicationReview();
            $review->job_application()->associate($application);
        }
        $review->fill([
            'review_status_id' => $request->input('review_status'),
            'review_decision_id' => $request->input('review_decision'),
            'reviewer' => $request->input('reviewer'),
            'notes' => $request->input('notes'),
        ]);
        $review->save();

        if($request->ajax()) {
            return $review->toJson();
        }

        return redirect()->back();
    }
}
