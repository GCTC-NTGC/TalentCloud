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
            $newApplicantClassifications = collect($validatedRequest['applicant_classifications'])->unique(
                // Remove all duplicate classification-level combinations from the collection.
                function ($newApplicantClassification) {
                    return $newApplicantClassification['classification_id'].$newApplicantClassification['level'];
                }
            );
            $oldApplicantClassifications = $applicant->applicant_classifications;

            // Delete old applicant classifications that were not resubmitted.
            foreach ($oldApplicantClassifications as $oldApplicantClassification) {
                $newApplicantClassification = $newApplicantClassifications->firstWhere(
                    'id',
                    $oldApplicantClassification['id']
                );
                if ($newApplicantClassification === null) {
                    $oldApplicantClassification->delete();
                }
            }


            // Update old applicant classifications and/or create them if it doesn't exist.
            $newApplicantClassifications->map(function ($newApplicantClassification) use ($oldApplicantClassifications) {
                $oldApplicantClassification = $oldApplicantClassifications->firstWhere(
                    'id',
                    $newApplicantClassification['id']
                );
                if (!$oldApplicantClassification) {
                    $oldApplicantClassification = new ApplicantClassification();
                }
                $oldApplicantClassification->applicant_id = $newApplicantClassification['applicant_id'];
                $oldApplicantClassification->classification_id = $newApplicantClassification['classification_id'];
                $oldApplicantClassification->fill($newApplicantClassification);
                $oldApplicantClassification->save();
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
