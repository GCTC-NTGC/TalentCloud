<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * A base class for Policy tests
 */

abstract class BasePolicyTest extends TestCase {

    //create basic user
    public function createUser() {
        $user = factory(\App\Models\User::class)->create();
        return $user;
    }

    //create applicant, factory includes a user
    public function createApplicant() {
        $applicant = factory(\App\Models\Applicant::class)->create();
        return $applicant;
    }
    //create manager, factory includes a user
    public function createManager() {
        $manager = factory(\App\Models\Manager::class)->create();
        return $manager;
    }

    /*
    protected function makeJobPoster() {
        $jobPoster = JobPoster::make();
    }

    //makeJob($manager) {}

    //makeApplication($applicant, $job) {}
    */
}
