<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\JobApplication;
use App\Services\Validation\ApplicationValidator;
use Illuminate\Support\Facades\Validator;

class ApplicationValidatorTest extends TestCase
{
    public function testApplicationValidator()
    {
        // TODO: finish test
        // $application = JobApplication::find(5);
        // $validator = new ApplicationValidator();
        // print_r($validator->essentialSkillsValidator($application)->getRules());
        // // print_r($application->toArray());
        // $this->assertFalse($validator->essentialSkillsComplete($application));
        $this->assertTrue(true);
    }
}
