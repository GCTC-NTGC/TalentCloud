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

        //Test 2: manager can view self
        $canManagerViewSelf = $this->getManagerPolicy()->view($maryManager->user, $maryManager);
        $this->assertTrue($canManagerViewSelf);

        //Test 3: manager can view other manager
        $daveManager = $this->createManager();
        $sallyManager = $this->createManager();
        $canManagerViewManager = $this->getManagerPolicy()->view($daveManager->user, $sallyManager);
        $this->assertTrue($canManagerViewManager);
    }
}
