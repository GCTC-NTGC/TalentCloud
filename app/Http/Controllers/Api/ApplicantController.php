<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateApplicantProfile;
use App\Http\Resources\ApplicantProfile as ApplicantProfileResource;
use App\Models\Applicant;
use Illuminate\Support\Facades\Log;

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
          $applicant->loadMissing('classifications');
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
        $data = $request->validated();
        // Create associated list of classifications with meta data.
        // Then sync new classifications to applicant, which removes all associations from the intermediate table
        // that are not in validatedClassifications.
        $validatedClassifications = [];
        foreach ($data['classifications'] as $classification) {
            $validatedClassifications[$classification['id']] = [
                'level' => $classification['level'],
                'order' => $classification['order'],
            ];
        }
        $applicant->classifications()->sync($validatedClassifications, true);
        $applicant->citizenship_declaration_id = $data['citizenship_declaration_id'];
        $applicant->veteran_status_id = $data['veteran_status_id'];
        $applicant->save();

        $applicant->fresh();
        $applicant->loadMissing('classifications');

        return new ApplicantProfileResource($applicant);
    }
}
