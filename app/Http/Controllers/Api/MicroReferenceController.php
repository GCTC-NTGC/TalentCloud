<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\MicroReferenceMail;
use App\Models\ApplicationReview;
use App\Models\JobApplication;
use Illuminate\Support\Facades\Mail;

class MicroReferenceController extends Controller
{

    /**
     * Get email created to be sent to an application's Director reference.
     *
     * @param JobApplication $application The application the reference is for.
     *
     * @return \Illuminate\Http\Response
     */
    public function showDirectorEmail(JobApplication $application)
    {
        $mail = new MicroReferenceMail($application, true);
        return response()->json($mail->build()->toArray());
    }

    public function sendDirectorEmail(JobApplication $application)
    {
        $mail = new MicroReferenceMail($application, true);
        Mail::send($mail->build());

        $review = $application->application_review;
        if ($review === null) {
            $review = new ApplicationReview();
            $review->job_application()->associate($application);
        }
        $review->director_email_sent = true;
        $review->save();

        return response()->json($mail->build()->toArray());
    }

    /**
     * Get email created to be sent to an application's Secondary reference.
     *
     * @param JobApplication $application The application the reference is for.
     *
     * @return \Illuminate\Http\Response
     */
    public function showSecondaryReferenceEmail(JobApplication $application)
    {
        $mail = new MicroReferenceMail($application, false);
        return response()->json($mail->build()->toArray());
    }

    public function sendSecondaryReferenceEmail(JobApplication $application)
    {
        $mail = new MicroReferenceMail($application, false);
        Mail::send($mail->build());

        $review = $application->application_review;
        if ($review === null) {
            $review = new ApplicationReview();
            $review->job_application()->associate($application);
        }
        $review->reference_email_sent = true;
        $review->save();

        return response()->json($mail->build()->toArray());
    }
}
