<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Models\Applicant;
use App\Http\Controllers\Controller;

class ExperienceController extends Controller
{

    /**
     * Display the Experience page associated with the applicant.
     *
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function show(Applicant $applicant)
    {
        //
    }

    /**
     * Show the form for editing the applicant's experience
     *
     * @param  Request  $request
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Applicant $applicant)
    {
        $user = $request->user();
        $profileQuestions = ApplicantProfileQuestion::all();

        $profileText = Lang::get('applicant/applicant_profile');

        $profileQuestionForms = [];
        foreach ($profileQuestions as $question) {
            $answerObj = $applicant->applicant_profile_answers->
                where('applicant_profile_question_id', $question->id)->first();
            $answer = $answerObj ? $answerObj->answer : null;

            $formValues = [
                'id' => $question->id,
                'value' => $question->value,
                'description' => $question->description,
                'answer' => $answer,
                'answer_label' => $profileText['answer_label'],
                'input_name' => $this->answerFormInputName.'['.$question->id.']'
            ];
            array_push($profileQuestionForms, $formValues);
        }

        $userProfile = [
            'name' => $user->name,
            'tagline' => $applicant->tagline,
            'photo' => '/images/user.png', //TODO: get real photos
            'twitter' => [
                //'url' => Lang::get('common/urls.twitter', ['username' => $applicant->twitter_username]),
                'url' => $applicant->twitter_username,
                'title' => Lang::get('applicant/applicant_profile.twitter_link_title', ['name'=>$user->name]),
            ],
            'linkedin' => [
                'url' => $applicant->linkedin_url,
                'title' => Lang::get('applicant/applicant_profile.linkedin_link_title', ['name'=>$user->name]),
            ]
        ];

        return view('applicant/profile_01_about', [
            /* Localized strings*/
            'profile' => $profileText,
            /* Applicant Profile Questions */
            'applicant_profile_questions' => $profileQuestionForms,
            /* User Data */
            'user' => $userProfile,
            'applicant' => $applicant,

            'form_submit_action' => route('profile.update', $applicant)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Applicant $applicant)
    {
        $questions = ApplicantProfileQuestion::all();

        foreach($questions as $question) {
            $answerName = $this->answerFormInputName . '.' . $question->id;
            if ($request->has($answerName)) {
                $answer = ApplicantProfileAnswer::where(
                        ['applicant_id' => $applicant->id,
                            'applicant_profile_question_id' => $question->id])
                            ->first();
                if ($answer == null) {
                    $answer = new ApplicantProfileAnswer();
                    $answer->applicant_id =$applicant->id;
                    $answer->applicant_profile_question_id = $question->id;
                }
                $answer->answer = $request->input($answerName);
                $answer->save();
            }
        }

        $input = $request->input();
        $applicant->fill([
            'tagline' => $input['tagline'], //TODO change to tagline_label
            'twitter_username' => $input['twitter_username'],
            'linkedin_url' => $input['linkedin_url'],
        ]);
        $applicant->save();

        return redirect()->route('profile.edit', $applicant);
        //Debugbar::info($input);
        //return view('welcome', ['t1' => 'update applicant']);
    }

}
