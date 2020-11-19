<?php

namespace Tests\Feature;

use App\Models\Applicant;
use App\Models\JobApplication;
use App\Models\Lookup\JobApplicationStep;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;

class ApplicationTimelineControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Ensure authorized applicant receives the correct application step view.
     *
     * @return void
     */
    public function testShowApplicationStepLogic(): void
    {
        $applicant = factory(Applicant::class)->create();
        $application = factory(JobApplication::class)->states(['draft', 'version2'])->create([
            'applicant_id' => $applicant->id
        ]);

        $applicationRoute = route('applications.timeline', ['jobApplication' => $application]);
        $applicationStepRoute = function ($step) use ($application) {
            return route('applications.timeline.step', ['jobApplication' => $application, 'step' => $step]);
        };

        // New applications should be redirected to welcome page.
        $newApplicationResponse = $this->actingAs($applicant->user)->get($applicationRoute);

        $newApplicationResponse->assertRedirect($applicationStepRoute('welcome'));

        // Ensure response to path /welcome is ok.
        $welcomeResponse = $this->actingAs($applicant->user)
          ->get($applicationStepRoute('welcome'));
        $welcomeResponse->assertStatus(200);

        // Attempting to skip to further steps should redirect to welcome step.
        $basicResponse = $this->actingAs($applicant->user)
          ->get($applicationStepRoute('basic'));
        $basicResponse->assertRedirect($applicationStepRoute('welcome'));
        $skillsResponse = $this->actingAs($applicant->user)
          ->get($applicationStepRoute('skills'));
        $skillsResponse->assertRedirect($applicationStepRoute('welcome'));

        // Set the basic and experience step to touched.
        $basicApplicationStep = $application->touched_application_steps
            ->where('step_id', JobApplicationStep::where('name', 'basic')->first()->id)
            ->first();
        $basicApplicationStep->update(['touched' => true]);
        $experienceApplicationStep = $application->touched_application_steps
            ->where('step_id', JobApplicationStep::where('name', 'experience')->first()->id)
            ->first();
        $experienceApplicationStep->update(['touched' => true]);

        // Applicant should be redirected to experience step, which is the last touched step.
        $lastTouchedStepResponse = $this->actingAs($applicant->user)
        ->get($applicationRoute);
        $lastTouchedStepResponse->assertRedirect($applicationStepRoute('experience'));

        // Attempting to skip to further steps should redirect to experience step.
        $skillsResponse = $this->actingAs($applicant->user)
          ->get($applicationStepRoute('skills'));
        $skillsResponse->assertRedirect($applicationStepRoute('experience'));
        $reviewResponse = $this->actingAs($applicant->user)
          ->get($applicationStepRoute('review'));
        $reviewResponse->assertRedirect($applicationStepRoute('experience'));
    }
}
