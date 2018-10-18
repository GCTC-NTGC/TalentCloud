<?php


namespace Tests\Unit;

use PHPUnit\Framework\TestCase;


class ApplicantPolicyTest extends ApplicantPolicy
{

    /**
     * Purpose of this test is to ensure the user's role name/id is identical to the associated applicant.
     */
    
}
    public function testUserApp()
    {
        $this->assertEquals ($user->user_role->name === "applicant" &&
            $applicant->user_id === $user->id);
        
       
    
    }
  public function testView {
    
      $user = new User();
      
      $user->id = 1; 
      
              
    
    $applicant = new Applicant(); 
    
    
  
  }
    
 


