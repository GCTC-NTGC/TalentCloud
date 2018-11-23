<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * A base class for Policy tests
 */
class BasePolicyTest extends TestCase
{

    protected $nextId = 1;

    protected function makeId() {
        $id = $nextId;
        $nextId = $nextId + 1;
        return $id;
    }

    protected function makeApplicant() {
        //New applicants get a new user
        $user =  User::make();
        $user->id = $this->makeId();
        // Make user an Applicant
        $user->user_role()->associate(
            UserRole::where('name', 'applicant')->firstOrFail());

        $userApplicant = new Applicant();
        $userApplicant->id = $this->makeId();
        $userApplicant->user()->associate($user);

        return $userApplicant;
    }

    //makeManager(), comes with a user

    //makeJob($manager) {}

    //makeApplication($applicant, $job) {}
}
