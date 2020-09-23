<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobApplicationAnswer;
use App\Models\JobApplicationAnswer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobApplicationAnswerController extends Controller
{

    public function store(StoreJobApplicationAnswer $request)
    {
        // Validate job application answer.
        $data = $request->validated();
        // Create new object with data and save to db.
        $jobApplicationAnswer = new JobApplicationAnswer($data);
        $jobApplicationAnswer->job_poster_question_id = $data['job_poster_question_id'];
        $jobApplicationAnswer->job_application_id = $data['job_application_id'];
        $jobApplicationAnswer->answer = $data['answer'];
        $jobApplicationAnswer->save();

        return new JsonResource($jobApplicationAnswer->fresh());
    }

    public function update(Request $request, JobApplicationAnswer $jobApplicationAnswer)
    {
        // Validate job application answer.
        $validatedData = $request->validate([
          'answer' => 'required|nullable|string',
        ]);

        // Update existing object with data and save to db.
        $jobApplicationAnswer->fill($validatedData);
        $jobApplicationAnswer->save();

        return new JsonResource($jobApplicationAnswer->fresh());
    }
}
