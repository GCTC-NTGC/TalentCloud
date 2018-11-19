<?php

namespace App\Services\Validation;

class ReferencesValidator 
{
/* 
*
*/

  public function validate(Request $request, Applicant $applicant)
    {
        $request->validate([
            'references[:template][:id][name]' => [
                'required',      // Name of Reference shoud be required.
            ],
            'references[:template][:id][relationship_id]' => [
                'required', // Your Relationship should be required. 
            ],
            'references[:template][:id][email]' => [
                'email:required', // Maybe don't make email required incase applicant only has another form of contact info for this reference (Like phone number?) Potentially open this up for more forms of contacting the reference.
            ],
            'references[:template][:id][description]' => [
                'nullable',
                'string',
                'max:4000' // Allows the applicant to be descriptive with a rather generous paragraph but not so descriptive that the hiring manager will have to contend with a page of text. 
            ]
            
        ]);            
        
    }
}