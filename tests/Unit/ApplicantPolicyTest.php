<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\User;
use App\Models\Applicant;
use App\Models\UserRole;
use App\Policies\ApplicantPolicy;

class ApplicantPolicyTest extends BasePolicyTest
{
    protected function getPolicy() {
        return new ApplicantPolicy();
    }

    public function testView()
    {
        //Test 1: User is the applicant
        //Expect to be allowed to view
        $applicant = $this->makeApplicant(1);
        $userCanViewOwnApplicant = $this->getPolicy()->view($applicant->user, $applicant);
        $this->assertTrue($userCanViewOwnApplicant);

        //Test 2: Applicants cannot view other applicant
        $applicant2 = $this->makeApplicant(2);
        $user1CanViewApplicant2 = $this->getPolicy()->view($applicant->user, $applicant2);
        $this->assertFalse($user1CanViewApplicant2);

        //Test 3: new manager cannot view new applicant

        //Test 4: applicant starts a job application but doesn't submit.
        //  Manager should not be able to view applicant

        //Test 5: applicant submits a job application. Job's manager should be
        //  able to view applicant.
    }
}
