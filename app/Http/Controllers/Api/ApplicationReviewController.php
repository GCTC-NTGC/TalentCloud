<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BatchUpdateApplicationReview as BatchUpdateRequest;
use App\Models\ApplicationReview;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class ApplicationReviewController extends Controller
{
    /**
     * Update multiple Application Review objects.
     *
     * @param BatchUpdateRequest $request Incoming request object.
     *
     * @return mixed
     */
    public function batchUpdate(BatchUpdateRequest $request)
    {
        // Validation rules and auth capabilities handled in BatchUpdateApplicationReview.
        $validatedRequest = $request->validated();
        $inputData = collect($validatedRequest);
        $applicationReviews = ApplicationReview::whereIn('id', $inputData->pluck('id')->all())->get();

        DB::transaction(function () use ($applicationReviews, $inputData) {
            foreach ($applicationReviews as $applicationReview) {
                $updatedApplicationReview = $inputData->firstWhere('id', $applicationReview->id);
                $applicationReview->fill($updatedApplicationReview);
                $applicationReview->save();
            }
        }, 3); // Retry transaction up to three times if deadlock occurs.

        return JsonResource::collection($applicationReviews->fresh());
    }
}
