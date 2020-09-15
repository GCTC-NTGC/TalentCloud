<?php

namespace Tests\Feature\Api;

use App\Models\JobApplication;
use App\Models\JobApplicationAnswer;
use App\Models\JobPosterQuestion;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class JobApplicationAnswerControllerTest extends TestCase
{
    use RefreshDatabase;

    // public function testCreateJobApplicationAnswer()
    // {
    //     $application = factory(JobApplication::class)->state('draft')->create();
    //     $jobPosterQuestion = factory(JobPosterQuestion::class)->create();
    //     $jobApplicationAnswerData = [
    //         'job_poster_question_id' => $jobPosterQuestion->id,
    //         'job_application_id' => $application->id,
    //         'answer' => 'test',
    //     ];
    //     $response = $this->actingAs($application->applicant->user)
    //         ->json('post', route('api.v1.job-application-answers.store'), $jobApplicationAnswerData);
    //     $response->assertOk();
    //     $response->assertJsonFragment($jobApplicationAnswerData);
    //     $id = $response->decodeResponseJson('id');
    //     $this->assertDatabaseHas(
    //         'job_application_answers',
    //         array_merge(
    //             ['id' => $id],
    //             $jobApplicationAnswerData
    //         )
    //     );
    // }

    public function testUpdateJobApplicationAnswer()
    {
        $application = factory(JobApplication::class)->state('draft')->create();
        $jobPosterQuestion = factory(JobPosterQuestion::class)->create();
        $jobApplicationAnswer = factory(JobApplicationAnswer::class)->create([
            'id' => 0,
            'job_poster_question_id' => $jobPosterQuestion->id,
            'job_application_id' => $application->id,
            'answer' => 'old answer',
        ]);
        $updateData = [
            'id' => $jobApplicationAnswer->id,
            'job_poster_question_id' => $jobApplicationAnswer->job_poster_question_id,
            'job_application_id' => $jobApplicationAnswer->job_application_id,
            'answer' => 'new answer',
        ];
        $response = $this->actingAs($application->applicant->user)
        ->json('put', route('api.v1.job-application-answers.update', $jobApplicationAnswer->id), $updateData);
        $response->assertOk();
        $response->assertJsonFragment($updateData);
        $this->assertDatabaseHas('job_application_answers', $updateData);
    }
}
