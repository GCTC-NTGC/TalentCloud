<?php

namespace App\Services\Validation; 

class WorkSamplesValidator
{
/* 
 *
 */


public function validate(Request $request, Applicant $applicant)
  {

        $request->validate([
            'work_samples[:template][:id][name]' => [
                'required', // Project must have a name.
             ],   
            'work_samples[:template][:id][file_type_id] ' => [
                'required', // Project type should be required.
            ],
            'work_samples[:template][:id][url]' => [
                'url:required', //  The work might not be hosted online depending on the nature of it. i.e. senstiive data/international work/NDA's etc. Maybe revise the required URL rule? Consider making it nullable.
            ],
            'work_samples[:template][:id][description]' => [
                'nullable',
                'string',
                'max:4000' // Allows the applicant to be descriptive with a rather generous paragraph but not so descriptive that the hiring manager will have to contend with a page of text. 
            ]
           
        ]);
       }

}