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
        
        $engTest = array(
        'applicant_profile', 'name', // problem is that assertContains does not look into multidimensional arrays.
    array('name'  => 'applicant_profile', 'path'  =>  'resources\lang\en\applicant\applicant_profile.php'),
    array('name'  => 'applicant_profile_menu', 'path'  => 'resources\lang\en\applicant\applicant_profile_menu.php'),
    array('name'  => 'application_index', 'path'  =>  'resources\lang\en\applicant\application_index.php')
    );
        
        $filename = 'resources\lang\en\applicant\applicant_profile.php';
       
                if (file_exists($filename)) {
                    echo "The file $filename exists";
                }
                 else {
                     echo "The file $filename does not exist";
                }
        
        
       $this->assertContains('applicant_profile', $engTest);
               
               
    }
    
}

// instead of checking if specific files exists, check if every file in the lang folder returns an array. Do it for french and english at same time no seperate test needed.
// 
//  Prefix: Write a function, make it a function that returns an array of everything that you could use to pass into Lang::get. (return auth, manager/applicant, everything under resources/lang/en. For now.) 
 // Loop through that array and make sure everything is passable into Lang::get and use that for other tests. 

/*---
 * 
 * 1) Use Scandir to get everything in the folder and loop through them. (same function as step 7) (its a recursive function, if its a file, turn that into a string that we can pass into Lang::get, if its a folder, we need to call this function again using that folder as a location.
 * 2) If its a file, you need to use the name of the file, and pass it to lang::get. 
 * 3) and then use Assert InternalType array. The Assert is to check what comes back from Lang::get. Its possible Lang::get causes an exception, but will show up in tests (probably) 
 * 4) Resources/Lang/EN or FR is where you start looking.
 * 5) Function needs to take a second argument, what am I going to prefix the filename with(arugment 1 is the directory you are looking in), for the Lang::get funcction, start with empty string. (argument 2 is an empty string. ''), 
 * 6) Check Applicant Profile Controller line 43 for a working example of Lang::get. 
 * 
 * ---
 * 
 * Put the test in one function, but have the function contain two starting points. One for EN/ one for FR. 
 * 
 */