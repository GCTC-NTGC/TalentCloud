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
        //Test 1: applicant can view manager
        $ianApplicant = $this->createApplicant();
        $maryManager = $this->createManager();
        $canApplicantViewManager = $this->getManagerPolicy()->view($ianApplicant->user, $maryManager);
        $this->assertTrue($canApplicantViewManager);

        //Test 2: manager can view manager
        $canManagerViewManager = $this->getManagerPolicy()->view($maryManager->user, $maryManager);
        $this->assertTrue($canManagerViewManager);
    }
}
