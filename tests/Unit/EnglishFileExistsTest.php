<?php

namespace Tests\Unit;

use Tests\TestCase;

class EnglishFileExistsTest extends TestCase
{
    public function testENG()
    {
        // Purpose of this test is to check if an English File exists. (Applicant Profile as an example)
        // assertContains() asserts that an expected value exists within the provided array,.
        // Created an array that contains the name and path of the first 3 files under the ENG lang applicant files. Can expand scope if go ahead is given.     
        
        $engLangFiles = array(
    array('name'  => 'applicant_profile', 'path'  =>  'C:\Users\Mustafa\TalentCloud\resources\lang\en\applicant\applicant_profile.php'),
    array('name'  => 'applicant_profile_menu', 'path'  =>  'C:\Users\Mustafa\TalentCloud\resources\lang\en\applicant\applicant_profile_menu.php'),
    array('name'  => 'application_index', 'path'  =>  'C:\Users\Mustafa\TalentCloud\resources\lang\en\applicant\application_index.php')
    );
        
        $filename = 'C:\Users\Mustafa\TalentCloud\resources\lang\en\applicant\applicant_profile.php';
       
                if (file_exists($filename)) {
                    echo "The file $filename exists";
                }
                 else {
                     echo "The file $filename does not exist";
                }
        
        
       $engLangFiles->assertContains('applicant_profile');
               
               
    }
    
}