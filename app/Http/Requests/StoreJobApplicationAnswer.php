<?php

namespace App\Http\Requests;

use App\Models\JobApplication;
use App\Models\JobApplicationAnswer;
use App\Models\JobPosterQuestion;
use App\Services\Validation\Rules\ValidIdRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreJobApplicationAnswer extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $job_application_id = $this->input('job_application_id');
        $application = JobApplication::find($job_application_id);
        $user = $this->user();

        return $application !== null
            && $user !== null
            && $user->can('create', JobApplicationAnswer::class)
            && $user->can('update', $application);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'job_poster_question_id' => ['required', 'numeric', new ValidIdRule(JobPosterQuestion::class)],
            'job_application_id' => ['required', 'numeric', new ValidIdRule(JobApplication::class)],
            'answer' => 'nullable|string',
        ];
    }
}
