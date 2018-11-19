<?php

namespace App\Services\Validation;

use App\Http\Controllers\ExperienceController
use Illuminate\Support\Facades\Validator;

class ExperienceValidator
{
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    public function validate(Request $request, Applicant $applicant)
    {
       $request->validate([
            'degrees[:template][:id][area_of_study]' => [
                'required',
                
            ],
            'degrees[:template][:id][institution]' => [
                'nullable', // Institution is nullable because applicant might have acquired the skills/knowledge on their own or some other way.
                'max:255',
                
           ],
            'courses[:template][:id][name]' => [
                'required',
            ],
            'courses[:template][:id][institution]' => [
                'required', // If someone declares a course we should require them to say where they completed this course.
            ],
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