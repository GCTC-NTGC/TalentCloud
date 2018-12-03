<?php

namespace Tests\Unit;

use Tests\TestCase;

class FrenchFileExistsTest extends TestCase
{
    public function testFR()
    {
        // Purpose of this test is to check if a French File exists. (Applicant Profile as an example)
        // assertContains() asserts that an expected value exists within the provided array,.
        // Created an array that contains the name and path of the first 3 files under the FR lang applicant files. Can expand scope if go ahead is given.     
        
        $frLangFiles = array(
    array('name'  => 'applicant_profile', 'path'  =>  'C:\Users\Mustafa\TalentCloud\resources\lang\fr\applicant\applicant_profile.php'),
    array('name'  => 'applicant_profile_menu', 'path'  =>  'C:\Users\Mustafa\TalentCloud\resources\lang\fr\applicant\applicant_profile_menu.php'),
    array('name'  => 'application_index', 'path'  =>  'C:\Users\Mustafa\TalentCloud\resources\lang\fr\applicant\application_index.php')
    );
        
        $filename = 'C:\Users\Mustafa\TalentCloud\resources\lang\fr\applicant\applicant_profile.php';
       
                if (file_exists($filename)) {
                    echo "The file $filename exists";
                }
                 else {
                     echo "The file $filename does not exist";
                }
        
        
       $frLangFiles->assertContains('applicant_profile');
               
               
    }
    
}