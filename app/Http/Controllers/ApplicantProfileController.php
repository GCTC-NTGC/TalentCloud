<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Models\Lookup\ApplicantProfileQuestion;
use App\Models\Applicant;
use App\Models\ApplicantProfileAnswer;
use App\Http\Controllers\Controller;

class ApplicantProfileController extends Controller
{

    protected $answerFormInputName = 'applicantProfileAnswer';

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function show(Applicant $applicant)
    {
        //
    }

    /**
     * Show the form for editing the logged-in user's applicant profile
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
                'answer_label' => $profileText['about_section']['answer_label'],
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

            // Fake Data
            'applicant_profile_question_section_title' => 'Your Narrative',
            'applicant_profile_question_context' => 'Please don’t include any sensitive personal information.',

            'form_submit_action' => route('profile.about.update', $applicant)
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

        return redirect()->route('profile.about.edit', $applicant);
        //Debugbar::info($input);
        //return view('welcome', ['t1' => 'update applicant']);
    }

}
