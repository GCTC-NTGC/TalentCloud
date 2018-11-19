<?php

/* 
 * Requires error message implementation and proper namespace usage. 
 */

namespace App\Services\Validation;

class MySkillsValidator 
{
/* 
* Requires error message implementation and proper namespace usage. 
*/

  public function validate(Request $request, Applicant $applicant)
    {
        $request->validate([
            'skill_declarations[:template][hard][:id][skill_id]' => [
              'required' // Hard Skills find your level. When submitting a new skill this shouldn't be left null.  
            ],
            'skill_declarations[:template][soft][:id][skill_id]' => [
              'required',      // Soft Skills find your level. Same as above.
            ],
            'skill_declarations[:template][hard][:id][skill_level_id]' => [
              'required', 
            ],
             'skill_declarations[:template][soft][:id][skill_level_id]' => [
              'required', 
            ],
            'skill_declarations[:template][hard][:id][description]' => [
                'required', 
                'max: 1000' // How I Acquired This Skill, Not too much to be too wordy, but enough to provide sufficient information for future  managers. 
            ],
            'skill_declarations[:template][soft][:id][description]' => [
                'required', 
                'max: 1000' // How I Acquired This Skill, Not too much to be too wordy, but enough to provide sufficient information for future  managers. 
            ],
            
        ]);          
        
    }
}