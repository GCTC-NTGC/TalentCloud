<?php

namespace App\Services\Validation;

use
use Illuminate\Support\Facades\Validator;

class WorkSamplesValidator
{
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 public function validate(Request $request, Applicant $applicant)
    {

        $request->validate([
            'work_samples[:template][:id][name]' => [
                'required',
             ],   
            'work_samples[:template][:id][file_type_id] ' => [
                'required',
            ],
            'work_samples[:template][:id][url]' => [
                'url:required', //  The work might not be hosted online depending on the nature of it. i.e. senstiive data/international work/NDA's etc. Maybe revise the required URL?
            ],
            'work_samples[:template][:id][description]' => [
                'nullable',
                'string',
                'max:4000' // Allows the applicant to be descriptive with a rather generous paragraph but not so descriptive that the hiring manager will have to contend with a page of text. 
            ]
           
        ]);
    }
}