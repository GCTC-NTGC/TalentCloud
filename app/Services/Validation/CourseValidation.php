<?php

namespace App\Services\Validation;

use App\Http\Controllers\CourseController;


class CourseValidator
{
/* 
 * Requires error message implementation and proper namespace usage. 
 */

    public function validate(Request $request, Applicant $applicant)
    {
       $request->validate([
            'courses[:template][:id][name]' => [
                'required',
            ],
            'courses[:template][:id][institution]' => [
                'required', // If someone declares a course we should require them to say where they completed this course.
            ]
            
        ]);
    } 
}