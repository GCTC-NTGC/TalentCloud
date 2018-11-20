<?php

namespace App\Services\Validation;

use App\Http\Controllers\WorkExperienceController;


class WorkExperienceValidator
{
/* 
 * Requires error message implementation and proper namespace usage. 
 */

    public function validate(Request $request, Applicant $applicant)
    {
       $request->validate([
            'work_experiences[:template][:id][role]' => [
                'required', // If they decide to fill out Equivalent Experience, a Role should be well defined,
                
            ], 
            'work_experiences[:template][:id][company]' => [
                'nullable', // Not every role belongs to a Company or Group. Someone could be a Hobbyist and as such might be hesistant to put something else down here. So nullable.
                
            ],
            'work_experiences[:template][:id][description]' => [
                'required',
                'min:2500' // Hiring managers will probably like atleast a paragraph's worth of information here. Since you tend to have to back up Equivalent Experience more often than other forms of "Experience".
            ]
            
        ]);
    } 
}