<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\User;
use App\Models\UserRole;
use App\Models\Applicant;
use App\Policies\ApplicantPolicy;

class ApplicantPolicyTest extends BasePolicyTest
{
    protected function getApplicantPolicy() {
        return new ApplicantPolicy();
    }

    public function makeUser() {
        $user = factory(\App\Models\User::class)->make();
        return $user;
    }

    public function applicant()
    {
        return $this->belongsTo('User', 'user_id');
    }

    public function makeApplicant() {
        $applicant = factory(\App\Models\Applicant::class)->make();
        return $applicant;
    }

    public function testView()
    {


        //$user = factory(\App\Models\User::class)->make();
        //$user->user_role()->associate(UserRole::where('name', 'applicant'));
        //$applicant = factory(\App\Models\User::class)->states('applicant')->make();
        $user = $this->makeUser();
        //$applicant = $this->makeApplicant();
        //$applicant->user()->user_role->associate($user);

        //$applicant->user()->associate($user);

        //Test 1: User is the applicant
        //Expect to be allowed to view
        //$billApplicant = $this->makeApplicant();
        $userCanViewSelf = $this->getApplicantPolicy()->view($user, $user);
        $this->assertTrue($userCanViewSelf);

        //Test 2: Applicants cannot view other applicant
        //$applicant2 = $this->makeApplicant();
        //$user1CanViewApplicant2 = $this->getApplicantPolicy()->view($applicant->user, $applicant2);
        //$this->assertFalse($user1CanViewApplicant2);

        //Test 3: new manager cannot view new applicant
        //$jennyApplicant = $this->makeApplicant();
        //$jillManager = $this->makeManager();
        # Make a job poster first to satisfy managerCanViewApplicant?
        //$canManagerViewapplicant = $this->getApplicantPolicy()->view($jillManager->user, $jennyApplicant);
        //$this->assertFalse($canManagerViewapplicant);

        //Test 4: applicant starts a job application but doesn't submit.
        //  Manager should not be able to view applicant

        //Test 5: applicant submits a job application. Job's manager should be
        //  able to view applicant.
    }
/*
    public function testCreate() {
        $joeApplicant = $this->makeApplicant();
        $canApplicantCreateUser = $this->getApplicantPolicy()->create($joeApplicant->user);
        $this->assertFalse($canApplicantCreateUser);
    }*/
}
