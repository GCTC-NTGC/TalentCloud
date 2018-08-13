<?php

namespace App\Http\Controllers\Applicant;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ApplicantProfileAnswer;
use App\Models\Lookup\ApplicantProfileQuestion;

class ApplicantProfileController extends Controller
{

    protected $answerFormInputName = 'applicantProfileAnswer';
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        debugbar()->info($request->all());
        
        $applicant = $request->user->applicant;
        
        $questions = ApplicantProfileQuestion::all();
        
        foreach($questions as $question) {
            $answerName = $this->answerFormInputName . '.' . $question->id;
            if ($request->has($answerName)) {
                $answer = ApplicantProfileAnswer::firstOrNew(
                        ['applicant_id' => $applicant->id,
                            'applicant_profile_question_id' => $question->id]);
                $answer->answer = $request->input($answerName);
                $answer->save;
            }
        }
        
        return redirect('profile');
    }

}
