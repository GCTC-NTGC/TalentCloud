<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Policies\ApplicantPolicy;
use App\Policies\ManagerPolicy;

class ApplicantPolicyTest extends BasePolicyTest
{
    protected function getApplicantPolicy() {
        return new ApplicantPolicy();
    }

    protected function getManagerPolicy() {
        return new ManagerPolicy();
    }

    public function testView()
    {
        //Test 1: User is the applicant
        //Expect to be allowed to view
        $applicant = $this->makeApplicant();
        $userCanViewOwnApplicant = $this->getApplicantPolicy()->view($applicant->user, $applicant);
        $this->assertTrue($userCanViewOwnApplicant);

        //Test 2: Applicants cannot view other applicant
        $applicant2 = $this->makeApplicant();
        $user1CanViewApplicant2 = $this->getApplicantPolicy()->view($applicant->user, $applicant2);
        $this->assertFalse($user1CanViewApplicant2);

        //Test 3: new manager cannot view new applicant
        $jennyApplicant = $this->makeApplicant();
        $jillManager = $this->makeManager();
        # Make a job poster first to satisfy managerCanViewApplicant?
        //$canManagerViewapplicant = $this->getApplicantPolicy()->view($jillManager->user, $jennyApplicant);
        //$this->assertFalse($canManagerViewapplicant);

        //Test 3.5: applicants can view manager
        $steveManager = $this->makeManager();
        $bobApplicant = $this->makeApplicant();
        $canApplicantViewManager = $this->getManagerPolicy()->view($bobApplicant->user, $steveManager);
        $this->assertTrue($canApplicantViewManager);

        //Test 4: applicant starts a job application but doesn't submit.
        //  Manager should not be able to view applicant

        //Test 5: applicant submits a job application. Job's manager should be
        //  able to view applicant.
    }
}
