<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\UserRole; // This tells this file anytime you are referecning userRole you are referencing them here exactly.
use App\Policy\BasePolicy; 


class BasePolicyTest extends BasePolicy {
    
    public function testBefore() {
        
        
        $user->user_role_id=UserRole::where('name', 'applicant')->first()->id; // this is how you tie a user to a user role by setting the user id.
        $user->user_role_id=UserRole::where('name','manager')->first()->id; //Manager/User Role 
        $user->user_role_id=UserRole::where('name','admin')->first()->id; //Admin/User Role

        $basePolicy = new BasePolicy(); // new basepolicy object
        
        /* AssertFalse because Users with Applicant role should not bypass 
         * policies.
         * Testing to check if that remains true or false according to the test.
         */
        
        assertFalse($basePolicy->before($user, null));
                
        
                
                      
      //Set User to have to manager applicant role, and the admin role to test again.
      //TODO: Check to see if composer/phpunit is installed where it should be. 
      //Done a database query into our lookup table. Where returns a collection/array of everything that matched. First function modifies query and only returns one.
        
        /*Want to check a failure case and a positive/pass case. 
        * Put in a user you know will not pass and return false
        * and a user you expect to pass and return true.
        * Manager/Applicant/Admin
        */
       
        
    
    
}




}