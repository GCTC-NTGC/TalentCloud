<?php

namespace Tests\Unit\Validators;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\JobApplication;
use App\Models\Applicant;
use App\Services\Validation\ApplicationValidator;

class ApplicationValidatorTest extends TestCase
{
    use RefreshDatabase;

    public function testBasicsComplete(): void
    {
        $applicant = factory(Applicant::class)->create();
        $validator = new ApplicationValidator();

        // Factory should create a basics-complete application.
        $completeApplication = factory(JobApplication::class)->create([
            'applicant_id' => $applicant->id
        ]);
        $applicant->job_applications()->save($completeApplication);
        $this->assertEquals([], $validator->basicsValidator($completeApplication->fresh())->errors()->toArray());
        $this->assertTrue($validator->basicsComplete($completeApplication));


        // Removing Answers should invalidate basic step
        $incompleteApplication = factory(JobApplication::class)->create([
            'applicant_id' => $applicant->id
        ]);
        $incompleteApplication->job_application_answers()->delete();
        $this->assertFalse($validator->basicsComplete($incompleteApplication));
    }

    public function testExperienceComplete(): void
    {
        $validator = new ApplicationValidator();

        // For experience step to be complete, 'experienc_saved' simply needs to be true.
        $application = factory(JobApplication::class)->create([
            'experience_saved' => false
        ]);
        $this->assertFalse($validator->experienceComplete($application));

        $completeApp = factory(JobApplication::class)->create([
            'experience_saved' => true
        ]);
        $this->assertTrue($validator->experienceComplete($completeApp));
    }
}
