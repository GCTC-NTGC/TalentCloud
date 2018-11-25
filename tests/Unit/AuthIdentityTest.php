<?php


namespace Tests\Unit;
use PHPUnit\Framework\TestCase; 
use App\Models\UserRole; // This tells this file anytime you are referecning userRole you are referencing them here exactly.


class JobPolicyTest extends \App\Policies\JobPolicy



{
    public function testThatWeCanGetTheAuthIdentifier()
    {
        $authIdentity = new \App\Models\User;
        
        $authIdentity->setAuthIdentity('2');
        
        $this->assertEquals($authIdentity->getAuthIdentifier(),'2' );
    }
    
    
}

