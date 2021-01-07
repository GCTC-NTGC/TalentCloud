<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateApplicantProfile;
use App\Http\Resources\ApplicantProfile as ApplicantProfileResource;
use App\Models\Applicant;
use App\Models\ApplicantClassification;

class ApplicantController extends Controller
{

    /**
     * Retrieve Applicant profile.
     *
     * @param Applicant $applicant Incoming Applicant object.
     *
     * @return mixed
     */
    public function getProfile(Applicant $applicant)
    {
          $applicant->loadMissing('applicant_classifications');
          return new ApplicantProfileResource($applicant);
    }

    /**
     * Update Applicant profile.
     *
     * @param UpdateApplicantProfile $request Form Validation casted request object.
     * @param Applicant              $applicant Incoming Applicant object.
     */
    public function updateProfile(UpdateApplicantProfile $request, Applicant $applicant)
    {
        $validatedRequest = $request->validated();
        // If there are no applicant classifications in the request,
        // then delete all applicant classifications attached to applicant.
        if (!array_key_exists('applicant_classifications', $validatedRequest)) {
            $applicant->applicant_classifications()->delete();
        } else {
            $newApplicantClassifications = collect($validatedRequest['applicant_classifications']);
            $oldApplicantClassifications = $applicant->applicant_classifications;

            // Delete old applicant classifications that were not resubmitted.
            foreach ($oldApplicantClassifications as $applicantClassification) {
                $newApplicantClassification = $newApplicantClassifications->firstWhere(
                    'id',
                    $applicantClassification['id']
                );
                if (!$newApplicantClassification) {
                    $applicantClassification->delete();
                }
            }

            // Update old applicant classifications and/or create them if it doesn't exist.
            $newApplicantClassifications->map(function ($applicantClassification) use ($applicant) {
                $newApplicantClassification = ApplicantClassification::firstOrNew(
                    ['id' => $applicantClassification['id']]
                );
                $newApplicantClassification->applicant_id = $applicantClassification['applicant_id'];
                $newApplicantClassification->classification_id = $applicantClassification['classification_id'];
                $newApplicantClassification->fill($applicantClassification);
                $newApplicantClassification->save();
                $applicant->applicant_classifications()->save($newApplicantClassification);
            });
        }

        $applicant->citizenship_declaration_id = $validatedRequest['citizenship_declaration_id'];
        $applicant->veteran_status_id = $validatedRequest['veteran_status_id'];
        $applicant->save();

        $applicant->refresh();
        $applicant->loadMissing('applicant_classifications');

        return new ApplicantProfileResource($applicant);
    }
}
