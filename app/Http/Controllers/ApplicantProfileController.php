<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Http\Request;
use App\Models\Lookup\ApplicantProfileQuestion;
use App\Models\Applicant;
use App\Models\ApplicantProfileAnswer;
use App\Http\Controllers\Controller;
use App\Services\Validation\Rules\PasswordCorrectRule;
use App\Services\Validation\Rules\PasswordFormatRule;
use Illuminate\Support\Facades\Hash;

class ApplicantProfileController extends Controller
{

    protected $answerFormInputName = 'applicantProfileAnswer';

    /**
     * Display the specified resource.
     *
     * @param  Request  $request
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Applicant $applicant)
    {
        //TODO:
        //Josh, to loop through answers&question data, leverage this data structure:
        // applicant
        //     [applicant_profile_answers]
        //         answer
        //         applicant_profile_question
        //             id
        //             value // The question text
        //             description // Question description text

        return view('manager/applicant_profile', [
            /* Localized strings*/
            'profile' => Lang::get('manager/applicant_profile'), // Change text

            /* User Data */
            'user' => $applicant->user,
            'applicant' => $applicant,
            'profile_photo_url' => '/images/user.png', //TODO: get real photos
        ]);
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
        $profileQuestions = ApplicantProfileQuestion::all();

        $profileText = Lang::get('applicant/applicant_profile');

        $profileQuestionForms = [];
        foreach ($profileQuestions as $question) {
            $answerObj = $applicant->applicant_profile_answers->
                where('applicant_profile_question_id', $question->id)->first();
            $answer = $answerObj ? $answerObj->answer : null;

            $formValues = [
                'id' => $question->id,
                'question' => $question->question,
                'description' => $question->description,
                'answer' => $answer,
                'answer_label' => $profileText['about_section']['answer_label'],
                'input_name' => $this->answerFormInputName.'['.$question->id.']'
            ];
            array_push($profileQuestionForms, $formValues);
        }

        return view('applicant/profile_01_about', [
            /* Localized strings*/
            'profile' => $profileText,
            /* Applicant Profile Questions */
            'applicant_profile_questions' => $profileQuestionForms,
            /* User Data */
            'user' => $applicant->user,
            'applicant' => $applicant,
            'profile_photo_url' => '/images/user.png', //TODO: get real photos

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
        $messages = Lang::get('validation.custom');
        $request->validate([

            //Password validation
            'old_password' => [
                'nullable',
                'required_with:new_password',
                new PasswordCorrectRule
            ],
            'new_password' => [
                'nullable',
                'min:8',
                new PasswordFormatRule,
                'confirmed'
           ],

           //Social Media Validation
            'twitter_username' => [
                'nullable', //Some people may not have a handle.
                'max:15', //Per Twitter's Terms/Service.
                'regex:/^[A-Za-z0-9_]+$/', /*
                 * Twitters Terms of Service only allows ". A username can only contain alphanumeric characters (letters A-Z, numbers 0-9) with the exception of underscores"
                 * This regex will allow only alphamumeric characters and the underscore.
                 * Keep this handy if we need to validate other usernames.
                 */
            ],
            'linkedin_url' => [
                'nullable', // Some people may not be on LinkedIn
                'regex:/^(https:\\/\\/|http:\\/\\/)?www\\.linkedin\\.com\\/in\\/[^\\/]+(\\/)?$/', // Validation for linkedIn profile URLS only.
            ],

            //Other Information Tagline
            'tagline' => [
                'nullable',
                'string'
            ],
       ], $messages);

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
            'tagline' => $input['tagline'],
            'twitter_username' => $input['twitter_username'],
            'linkedin_url' => $input['linkedin_url'],
        ]);
        $applicant->save();

        $user = $applicant->user;
        $user->fill([
            'name' => $input['profile_name'],
            'email' => $input['profile_email'], //TODO make changing email harder!
        ]);
        if ($input['new_password']) {
            $user->password =  Hash::make($input['new_password']); //TODO: change password in seperate form!
        }
        $user->save();

        return redirect()->route('profile.about.edit', $applicant);
    }

}
