<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Models\Lookup\ApplicantProfileQuestion;
use App\Models\Applicant;
use App\Models\ApplicantProfileAnswer;
use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use App\Services\Validation\Requests\UpdateApplicationProfileValidator;
use App\Services\Validation\Rules\LinkedInUrlRule;
use App\Services\Validation\Rules\TwitterHandleRule;
use Facades\App\Services\WhichPortal;

class ApplicantProfileController extends Controller
{
    /**
     * @var string
     */
    protected $answerFormInputName = 'applicantProfileAnswer';

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\JobPoster    $jobPoster Incoming JobPoster object.
     * @param  \App\Models\Applicant    $applicant Incoming Applicant object.
     * @return \Illuminate\Http\Response
     */
    public function show(JobPoster $jobPoster, Applicant $applicant)
    {

        if ($jobPoster->submitted_applications->firstWhere('applicant_id', '==', $applicant->id)) {
            $custom_breadcrumbs = [
                'home' => route('home'),
                'jobs' => route(WhichPortal::prefixRoute('jobs.index')),
                $jobPoster->title => route(WhichPortal::prefixRoute('jobs.summary'), $jobPoster),
                'applications' =>  route(WhichPortal::prefixRoute('jobs.applications'), $jobPoster),
                'profile' => '',
            ];

            return view(
                'manager/applicant_profile',
                [
                    // Localized strings.
                    'profile' => Lang::get('manager/applicant_profile'), // Change text
                    // Applicant data.
                    'applicant' => $applicant,
                    'profile_photo_url' => '/images/user.png', // TODO: get real photos.
                    'custom_breadcrumbs' => $custom_breadcrumbs,
                ]
            );
        } else {
            return abort(404);
        }
    }

    /**
     * Show the form for editing the logged-in applicant's profile
     *
     * @param  \Illuminate\Http\Request $request Incoming request.
     * @return \Illuminate\Http\Response
     */
    public function editAuthenticated(Request $request)
    {
        $applicant = $request->user()->applicant;
        return redirect(route('profile.about.edit', $applicant));
    }

    /**
     * Show the form for editing an applicant profile
     *
     * @param  \Illuminate\Http\Request $request   Incoming request object.
     * @param  \App\Models\Applicant    $applicant Applicant to view and edit.
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Applicant $applicant)
    {
        $profileQuestions = ApplicantProfileQuestion::all();

        $profileText = Lang::get('applicant/applicant_profile');

        $profileQuestionForms = [];
        foreach ($profileQuestions as $question) {
            $answerObj = $applicant->applicant_profile_answers
                ->where('applicant_profile_question_id', $question->id)->first();
            $answer = $answerObj ? $answerObj->answer : null;

            $formValues = [
                'id' => $question->id,
                'question' => $question->question,
                'description' => $question->description,
                'answer' => $answer,
                'answer_label' => $profileText['about_section']['answer_label'],
                'input_name' => $this->answerFormInputName . '[' . $question->id . ']'
            ];
            array_push($profileQuestionForms, $formValues);
        }

        $linkedInUrlPattern = LinkedInUrlRule::PATTERN;
        $twitterHandlePattern = TwitterHandleRule::PATTERN;

        $custom_breadcrumbs = [
            'home' => route('home'),
            'profile' => '',
        ];

        return view(
            'applicant/profile_01_about',
            [
                // Localized strings.
                'profile' => $profileText,
                // Applicant data.
                'applicant' => $applicant,
                'profile_photo_url' => '/images/user.png', // TODO: get real photos.
                // Applicant Profile Questions.
                'applicant_profile_questions' => $profileQuestionForms,
                // Update route.
                'form_submit_action' => route('profile.about.update', $applicant),
                'linkedInUrlPattern' => $linkedInUrlPattern,
                'twitterHandlePattern' => $twitterHandlePattern,
                'custom_breadcrumbs' => $custom_breadcrumbs,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request   Incoming request.
     * @param  \App\Models\Applicant    $applicant Applicant object to update.
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Applicant $applicant)
    {
        $questions = ApplicantProfileQuestion::all();

        $validator = new UpdateApplicationProfileValidator($applicant);
        $validator->validate($request->all());

        foreach ($questions as $question) {
            $answerName = $this->answerFormInputName . '.' . $question->id;
            if ($request->has($answerName)) {
                $answer = ApplicantProfileAnswer::where(
                    [
                        'applicant_id' => $applicant->id,
                        'applicant_profile_question_id' => $question->id
                    ]
                )->first();
                if ($answer == null) {
                    $answer = new ApplicantProfileAnswer();
                    $answer->applicant_id = $applicant->id;
                    $answer->applicant_profile_question_id = $question->id;
                }
                $answer->answer = $request->input($answerName);
                $answer->save();
            }
        }

        $input = $request->input();
        $applicant->fill(
            [
                'tagline' => $input['tagline'],
                'twitter_username' => $input['twitter_username'],
                'linkedin_url' => $input['linkedin_url'],
            ]
        );
        $applicant->save();

        return redirect()->route('profile.about.edit', $applicant);
    }
}
