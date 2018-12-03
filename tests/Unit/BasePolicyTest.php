<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\User;
use App\Models\Applicant;
use App\Models\Manager;
use App\Models\UserRole;
use App\Policies\ApplicantPolicy;
use App\Policies\ManagerPolicy;

/**
 * A base class for Policy tests
 */
abstract class BasePolicyTest extends TestCase
{

    protected $nextId = 1;

    protected function makeId() {
        $id = $this->nextId;
        $this->nextId = $this->nextId + 1;
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

    protected function makeManager() {
        //New managers get a new user
        $user = User::make();
        $user->id = $this->makeId();
        // Make user a manager
        $user->user_role()->associate(
            UserRole::where('name', 'manager')->firstOrFail());

        $userManager = new Manager();
        $userManager->id = $this->makeId();
        $userManager->user()->associate($user);

        return $userManager;
    }


    protected function makeJobPoster() {
        $jobPoster = JobPoster::make();
    }

    //makeManager(), comes with a user

    //makeJob($manager) {} Also look to Create a job on the base policy and test to see if the user can access it. 11/27/2018
    protected function makeJob() {
        $job = Job::make();
        $job->id = $this->makeId();
        
        //Test to see if userApplicant can access the job
      
        $userApplicant = new Applicnet();
        $userApplicant->id = $this->makeId();
        $userApplicant->user()->associate($job);
        
        return $userApplicant; 
    }
    
    
    
    //makeManager(), comes with a user

    //makeApplication($applicant, $job) {}
}
