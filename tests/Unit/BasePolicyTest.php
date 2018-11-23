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

    protected function makeApplicant($id) {
        //New applicants get a new user
        $user =  User::make();
        $user->id = $id;
        // Make user an Applicant
        $user->user_role()->associate(
            UserRole::where('name', 'applicant')->firstOrFail());

        $userApplicant = new Applicant();
        $userApplicant->id = $id;
        $userApplicant->user()->associate($user);

        return $userApplicant;
    }
}
