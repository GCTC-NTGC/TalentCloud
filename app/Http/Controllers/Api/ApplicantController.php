<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateApplicantProfile;
use App\Http\Resources\ApplicantProfile as ApplicantProfileResource;
use App\Http\Resources\Applicant as ApplicantResource;
use App\Models\Applicant;
use App\Models\ApplicantClassification;
use App\Services\Validation\Rules\CommaSeparatedListRule;
use Illuminate\Database\Eloquent\Builder;
use App\Services\Validation\Rules\ValidClassificationRule;
use Illuminate\Support\Facades\Log;

class ApplicantController extends Controller
{

    public function index(Request $request)
    {
        $expectsJson = $request->expectsJson();
        Log::debug("Expects json: $expectsJson");
        $maxLimit = config('app.api_max_limit');
        $request->validate([
            'limit' => "sometimes|integer|max:$maxLimit",
            'offset' => 'sometimes|integer|nullable',
            'skillIds' => 'sometimes|string|regex:/^[0-9]+(,[0-9]+)*$/',
            'classifications' => ['sometimes', 'string', new CommaSeparatedListRule(new ValidClassificationRule())],
        ]);

        $limit = $request->query('limit', $maxLimit);
        if ($limit > $maxLimit) {
            $limit = $maxLimit;
        }
        $offset = $request->query('offset', 0);

        $skillIds = preg_split('/,/', $request->query('skill_ids', ''), null, PREG_SPLIT_NO_EMPTY);
        $classifications = preg_split('/,/', $request->query('classifications', ''), null, PREG_SPLIT_NO_EMPTY);

        $query = Applicant::limit($limit)->offset($offset);
        foreach ($skillIds as $skillId) {
            $query->whereHas('skills', function (Builder $query) use ($skillId) {
                $query->where('skills.id', $skillId);
            });
        }
        if (count($classifications) > 0) {
            $query->where(function ($query) use ($classifications) {
                foreach ($classifications as $classification) {
                    $values = explode('-', $classification);
                    $classificationCode = strtoupper($values[0]);
                    $classificationLevel = $values[1];
                    $query->orWhereHas('applicant_classifications', function (Builder $query) use ($classificationCode, $classificationLevel) {
                        $query->where('applicant_classifications.level', (int)$classificationLevel)
                            ->whereHas('classification', function (Builder $query) use ($classificationCode) {
                                $query->where('key', $classificationCode);
                            });
                    });
                }
            });
        }

        return ApplicantResource::collection($query->get());
    }

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
                $applicantClassification = $oldApplicantClassifications->firstWhere(
                    'id',
                    $newApplicantClassification['id']
                );
                if (!$applicantClassification) {
                    $applicantClassification = new ApplicantClassification();
                }
                $applicantClassification->applicant_id = $newApplicantClassification['applicant_id'];
                $applicantClassification->classification_id = $newApplicantClassification['classification_id'];
                $applicantClassification->fill($newApplicantClassification);
                $applicantClassification->save();
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
