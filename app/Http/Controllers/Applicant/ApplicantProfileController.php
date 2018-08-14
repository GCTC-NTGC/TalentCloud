<?php

namespace App\Http\Controllers\Applicant;

use Illuminate\Support\Facades\Auth;
use App\Models\Applicant;
use App\Models\Lookup\ApplicantProfileQuestion;
use App\Models\ApplicantProfileAnswer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApplicantProfileController extends Controller
{

    protected $questionFromNamePrefix = "applicantProfileQuestion_";
    protected $twitterProfilePrefix = 'https://twitter.com/';

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
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $user = $request->user();
        $applicant = $user->applicant;
        $profileQuestions = ApplicantProfileQuestion::all();

        $profileText = Lang::get('applicant/applicant_profile');

        $profileQuestionForms = [];
        foreach ($profileQuestions as $question) {
            $answerObj = $applicant->applicant_profile_answers->
                where('applicant_profile_question_id', $question->id);
            $answer = $answerObj ? $answerObj->answer : null;

            $formValues = ['value' => $question->value,
                'description' => $question->description,
                'answer' => $answer,
                'answer_label' => $profileText->'answer_label',
                'input_name' => $this->$questionFromNamePrefix . $question->id
            ];
            array_push($profileQuestionForms, $formValues);
        }

        $userProfile = [
            'name' => $user->name;
            'tagline' => $applicant->tagline;
            'photo' => '/images/user.png', //TODO: get real photos
            'twitter' => [
                'url' => $twitterProfilePrefix . $applicant->twitter_username,
                'title' => Lang::get('applicant/applicant_profile.twitter_link_title', $user->name),
            ],
            'linkedin' => [
                'url' => $applicant->linkedin_url,
                'title' => Lang::get('applicant/applicant_profile.linkedin_link_title', $user->name),
            ]
        ]


        return view('applicant/profile', [
            /* Localized strings*/
            'profile' => $profileText,
            /* Applicant Profile Questions */
            'applicant_profile_questions' => $profileQuestionForms,
            /* User Data */
            "user" => $userProfile,
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
        //
    }
}
