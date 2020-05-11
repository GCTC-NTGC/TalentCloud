<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\SendEmailException;
use App\Http\Controllers\Controller;
use App\Mail\MicroReferenceMail;
use App\Models\ApplicationReview;
use App\Models\JobApplication;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Mail;

class MicroReferenceController extends Controller
{

    /**
     * Get all reference emails created for an application.
     *
     * @param JobApplication $application The application the references are for.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(JobApplication $application)
    {
        $directorMail = new MicroReferenceMail($application, true);
        $referenceMail = new MicroReferenceMail($application, false);
        $mails = [
            'director' => $directorMail->toArray(),
            'secondary' => $referenceMail->toArray(),
        ];
        return response()->json($mails);
    }

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
        return response()->json($mail->toArray());
    }

    public function sendDirectorEmail(JobApplication $application)
    {
        $mail = new MicroReferenceMail($application, true);
        if ($mail->to === []) {
            throw new SendEmailException(Lang::get('errors.email_missing_delivery_address'));
        }

        Mail::send($mail);

        $review = $application->application_review;
        if ($review === null) {
            $review = new ApplicationReview();
            $review->job_application()->associate($application);
        }
        $review->director_email_sent = true;
        $review->save();

        return response()->json($mail->toArray());
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
        return response()->json($mail->toArray());
    }

    public function sendSecondaryReferenceEmail(JobApplication $application)
    {
        $mail = new MicroReferenceMail($application, false);
        if ($mail->to === []) {
            throw new SendEmailException(Lang::get('errors.email_missing_delivery_address'));
        }

        Mail::send($mail);

        $review = $application->application_review;
        if ($review === null) {
            $review = new ApplicationReview();
            $review->job_application()->associate($application);
        }
        $review->reference_email_sent = true;
        $review->save();

        return response()->json($mail->toArray());
    }
}
