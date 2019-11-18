<?php

namespace Tests\Unit\Validators;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\JobApplication;
use App\Services\Validation\ApplicationValidator;
use Illuminate\Support\Facades\Validator;

class ApplicationValidatorTest extends TestCase
{
    use RefreshDatabase;

    public function testBasicsComplete(): void
    {
        $applicant = factory(Applicant::class)->create();
        $application = new JobApplication();
        $applicant->job_applications()->save($application);

        // Test that empty application is not complete.
        $validator = new ApplicationValidator();
        $this->assertFalse($validator->basicsComplete($application));

        // Factory should create a basics-complete application.
        $completeApplication = factory(JobApplication::class)->create([
            'applicant_id' => $applicant->id
        ]);
        $applicant->job_applications()->save($completeApplication);
        $validator->assertTrue($validator->basicsComplete($completeApplication));
    }
}
