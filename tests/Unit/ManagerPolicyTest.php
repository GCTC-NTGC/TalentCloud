<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Policies\ManagerPolicy;

class ManagerPolicyTest extends BasePolicyTest
{
    protected function getManagerPolicy() {
        return new ManagerPolicy();
    }

    public function testView()
    {
        // Test 1: applicants can view manager
        // Expect to be true
        //$steveManager = $this->makeManager();
        //$bobApplicant = $this->makeApplicant();
        //$canApplicantViewManager = $this->getManagerPolicy()->view($bobApplicant->user, $steveManager);
        //$this->assertTrue($canApplicantViewManager);

        // Test 2: managers can view managers
        // Expect to be true
        //$canManagerViewManager = $this->getManagerPolicy()->view($steveManager->user, $steveManager);
        //$this->assertTrue($canManagerViewManager);
    }
}
