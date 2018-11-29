<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Policies\ApplicantPolicy;

class ApplicantPolicyTest extends BasePolicyTest
{
    protected function getApplicantPolicy() {
        return new ApplicantPolicy();
    }

    public function testView()
    {
        //Test 1: applicant can view applicant (self)
        $bobApplicant = $this->createApplicant();
        $userCanViewSelf = $this->getApplicantPolicy()->view($bobApplicant->user, $bobApplicant);
        $this->assertTrue($userCanViewSelf);

        //Test 2: qpplicant cannot view other applicant
        $katyApplicant = $this->createApplicant();
        $user1CanViewApplicant2 = $this->getApplicantPolicy()->view($katyApplicant->user, $bobApplicant);
        $this->assertFalse($user1CanViewApplicant2);

        //Test 3: manager cannot view applicant
        $jillManager = $this->createManager();
        $jennyApplicant = $this->createApplicant();
        $canManagerViewapplicant = $this->getApplicantPolicy()->view($jillManager->user, $jennyApplicant);
        $this->assertFalse($canManagerViewapplicant);

        //Test 4: applicant starts a job application but doesn't submit.
        // Manager should not be able to view applicant

        //Test 5: applicant submits a job application. Job's manager should be
        // able to view applicant.
    }

    public function testCreate() {
        //Test 1: applicant cannot create user
        $joeApplicant = $this->createApplicant();
        $canApplicantCreateUser = $this->getApplicantPolicy()->create($joeApplicant->user);
        $this->assertFalse($canApplicantCreateUser);
    }
}
