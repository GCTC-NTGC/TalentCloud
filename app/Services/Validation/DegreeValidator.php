<?php

namespace App\Services\Validation;

use App\Http\Controllers\DegreeController;


class DegreeValidator
{
/* 
 * Requires error message implementation and proper namespace usage. 
 */

    public function validate(Request $request, Applicant $applicant)
    {
       $request->validate([
            'degrees[:template][:id][area_of_study]' => [
                'required',
                
            ],
            'degrees[:template][:id][institution]' => [
                'nullable', // Institution is nullable because applicant might have acquired the skills/knowledge on their own or some other way.
                'max:255'
           ]          
            
        ]);
    } 
}