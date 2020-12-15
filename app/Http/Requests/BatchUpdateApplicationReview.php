<?php

namespace App\Http\Requests;

use App\Models\ApplicationReview;
use Illuminate\Foundation\Http\FormRequest;

class BatchUpdateApplicationReview extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = $this->user();
        if ($user === null) {
            return false;
        }

        $inputIds = collect($this->all())->pluck('id')->all();
        $applicationReviews = ApplicationReview::whereIn('id', $inputIds)->get();

        foreach ($applicationReviews as $applicationReview) {
            if (!$user->can('update', $applicationReview)) {
                return false;
            }
        }
        return true;
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            '*.id' => 'required|exists:application_reviews,id',
            '*.job_application_id' => 'required|exists:job_applications,id',
            '*.review_status_id' => 'nullable|exists:review_statuses,id',
            '*.notes' => 'nullable|string',
            '*.department_id' => 'nullable|exists:departments,id',
            '*.director_email_sent' => 'boolean',
            '*.reference_email_sent' => 'boolean',
        ];
    }
}
