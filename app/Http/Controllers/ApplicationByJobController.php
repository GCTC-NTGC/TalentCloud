<?php

namespace App\Http\Controllers;

use Barryvdh\Debugbar\Facade as Debugbar;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Models\Lookup\ApplicationStatus;
use App\Models\Lookup\VeteranStatus;
use App\Models\Lookup\PreferredLanguage;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Applicant;
use App\Models\JobPoster;
use App\Models\JobApplication;
use App\Models\JobApplicationAnswer;
use App\Models\SkillDeclaration;
use App\Models\Skill;
use App\Models\Lookup\SkillStatus;
use App\Models\Degree;
use App\Models\Lookup\CriteriaType;
use App\Models\Criteria;
use App\Models\Course;
use App\Models\WorkExperience;
use App\Services\Validation\ApplicationValidator;
use Illuminate\Support\Facades\Auth;


class ApplicationByJobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Display the Application for the specified job
     *
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function show(JobPoster $jobPoster)
    {
        //
    }

    protected function getApplicationFromJob(JobPoster $jobPoster) {
        $application = JobApplication::where('applicant_id', Auth::user()->applicant->id)
            ->where('job_poster_id', $jobPoster->id)->first();
        if ($application == null) {
            $application = new JobApplication();
            $application->job_poster_id = $jobPoster->id;
            $application->applicant_id = Auth::user()->applicant->id;
            $application->application_status_id = ApplicationStatus::where('name', 'draft')->firstOrFail()->id;
            $application->save();
        }
        return $application;
    }

    /**
     * Show the form for editing Application basics for the specified job.
     *
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function edit_basics(JobPoster $jobPoster)
    {

        $applicant = Auth::user()->applicant;

        $application = $this->getApplicationFromJob($jobPoster);

        //Ensure user has permissions to view and update application
        $this->authorize('view', $application);
        $this->authorize('update', $application);

        return view('applicant/application_post_01', [

            /* Application Template Data */
                "application_step" => 1,
                "application_template" => Lang::get("applicant/application_template"),
                "language_options" => PreferredLanguage::all(),
                "citizenship_options" => CitizenshipDeclaration::all(),
                "veteran_options" => VeteranStatus::all(),
                "preferred_language_template" => Lang::get('common/preferred_language'),
                "citizenship_declaration_template" => Lang::get('common/citizenship_declaration'),
                "veteran_status_template" => Lang::get('common/veteran_status'),

            /* Job Data */
                "job" => $jobPoster,

            /* Applicant Data */
                "applicant" => $applicant,
                "job_application" => $application,

            /* Submission */
                "form_submit_action" => route('job.application.update.1', $jobPoster)

        ]);

    }

    /**
     * Show the form for editing Application Experience for the specified job.
     *
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function edit_experience(JobPoster $jobPoster)
    {

        $applicant = Auth::user()->applicant;

        $application = $this->getApplicationFromJob($jobPoster);

        //Ensure user has permissions to view and update application
        $this->authorize('view', $application);
        $this->authorize('update', $application);

        return view('applicant/application_post_02', [

            /* Application Template Data */
                "application_step" => 2,
                "application_template" => Lang::get("applicant/application_template"),

            /* Job Data */
                "job" => $jobPoster,

            /* Applicant Data */
                "applicant" => $applicant,
                "job_application" => $application,

            /* Submission */
                "form_submit_action" => route('job.application.update.2', $jobPoster)

        ]);

    }

    /**
     * Show the form for editing Application Essential Skills for the specified job.
     *
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function edit_essential_skills(JobPoster $jobPoster)
    {

        $applicant = Auth::user()->applicant;

        $application = $this->getApplicationFromJob($jobPoster);

        //Ensure user has permissions to view and update application
        $this->authorize('view', $application);
        $this->authorize('update', $application);

        $criteria = [
            'essential' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'asset';
            }),
        ];

        return view('applicant/application_post_03', [

            /* Application Template Data */
                "application_step" => 3,
                "application_template" => Lang::get("applicant/application_template"),

            /* Job Data */
                "job" => $jobPoster,

            /* Skills Data */
                "skills" => Skill::all(),
                "skill_template" => Lang::get("common/skills"),
                "criteria" => $criteria,

            /* Applicant Data */
                "applicant" => $applicant,
                "job_application" => $application,

            /* Submission */
                "form_submit_action" => route('job.application.update.3', $jobPoster)

        ]);

    }

    /**
     * Show the form for editing Application Asset Skills for the specified job.
     *
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function edit_asset_skills(JobPoster $jobPoster)
    {

        $applicant = Auth::user()->applicant;

        $application = $this->getApplicationFromJob($jobPoster);

        //Ensure user has permissions to view and update application
        $this->authorize('view', $application);
        $this->authorize('update', $application);

        $criteria = [
            'essential' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'asset';
            }),
        ];

        return view('applicant/application_post_04', [

            /* Application Template Data */
                "application_step" => 4,
                "application_template" => Lang::get("applicant/application_template"),

            /* Job Data */
                "job" => $jobPoster,

            /* Skills Data */
                "skills" => Skill::all(),
                "skill_template" => Lang::get("common/skills"),
                "criteria" => $criteria,

            /* Applicant Data */
                "applicant" => $applicant,
                "job_application" => $application,

            /* Submission */
                "form_submit_action" => route('job.application.update.4', $jobPoster)

        ]);
    }

    /**
     * Show the Application Preview for the application for the specified job.
     *
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function preview(JobPoster $jobPoster) {

        $applicant = Auth::user()->applicant;

        $application = $this->getApplicationFromJob($jobPoster);

        //TODO: Right now preview can't have the update gate, because we use the
            //  same view for viewing even after its been submitted. These should
            //  be seperate views, and then Preview can require the update permission.
        //Ensure user has permissions to view and update application
        $this->authorize('view', $application);
        //$this->authorize('update', $application);

        $criteria = [
            'essential' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'asset';
            }),
        ];

        return view('applicant/application_post_05', [

            /* Application Template Data */
                "application_step" => 5,
                "application_template" => Lang::get("applicant/application_template"),
                "preferred_language_template" => Lang::get('common/preferred_language'),
                "citizenship_declaration_template" => Lang::get('common/citizenship_declaration'),
                "veteran_status_template" => Lang::get('common/veteran_status'),

            /* Job Data */
                "job" => $jobPoster,

            /* Skills Data */
                "skills" => Skill::all(),
                "skill_template" => Lang::get("common/skills"),
                "criteria" => $criteria,

            /* Applicant Data */
                "applicant" => $applicant,
                "job_application" => $application,

            /* Submission */
                "form_submit_action" => route('job.application.submit', $jobPoster)

        ]);
    }

    /**
     * Show the application submission information.
     *
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function complete(JobPoster $jobPoster) {

        /* Include Applicant Data */

            $applicant = Auth::user()->applicant;

        /* Include Application Data */

            $application = $this->getApplicationFromJob($jobPoster);

            //Ensure user has permissions to view application
            $this->authorize('view', $application);

        /* Return the Completion View */

            return view('applicant/application_post_complete', [

                /* Application Template Data */
                    "application_template" => Lang::get("applicant/application_template"),

                /* Job Data */
                    "job" => $jobPoster,

                /* Applicant Data */
                    "applicant" => $applicant,
                    "job_application" => $application

            ]);

    }

    /**
     * Update the Application Basics in storage for the specified job.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function update_basics(Request $request, JobPoster $jobPoster)
    {
        $input = $request->input();
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        //Ensure user has permissions to update this application
        $this->authorize('update', $application);

        $application->fill([
            'citizenship_declaration_id' => $input['citizenship_declaration_id'],
            'veteran_status_id' => $input['veteran_status_id'],
            'preferred_language_id' => $input['preferred_language_id'],
        ]);
        $application->save();

        $questions = $jobPoster->job_poster_questions;
        foreach($questions as $question) {
            $answer = null;
            if (isset($input['questions']) &&
                isset($input['questions'][$question->id])) {
                $answer = $input['questions'][$question->id];
            }
            $answerObj = $application->job_application_answers
                ->firstWhere('job_poster_question_id', $question->id);
            if ($answerObj == null) {
                $answerObj = new JobApplicationAnswer();
                $answerObj->job_poster_question_id = $question->id;
                $answerObj->job_application_id = $application->id;
            }
            $answerObj->answer = $answer;
            $answerObj->save();
        }

        //Redirect to correct page
        switch($input['submit']) {
            case 'save_and_quit':
            case 'previous':
                return redirect()->route('applications.index');
                break;
            case 'save_and_continue':
            case 'next':
                return redirect()->route('job.application.edit.2', $jobPoster);
                break;
            default:
                return redirect()->back()->withInput();
                break;
        }
    }

    /**
     * Update the Application Basics in storage for the specified job.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function update_experience(Request $request, JobPoster $jobPoster)
    {
        $input = $request->input();
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        //Ensure user has permissions to update this application
        $this->authorize('update', $application);

        $degrees = $input['degrees'];

        //Save new degrees
        if (isset($degrees['new'])) {
            foreach($degrees['new'] as $degreeInput) {
                $degree = new Degree();
                $degree->applicant_id = $applicant->id;
                $degree->fill([
                    'degree_type_id' => $degreeInput['degree_type_id'],
                    'area_of_study' => $degreeInput['area_of_study'],
                    'institution' => $degreeInput['institution'],
                    'thesis' => $degreeInput['thesis'],
                    'start_date' => $degreeInput['start_date'],
                    'end_date' => $degreeInput['end_date']
                ]);
                $degree->save();
            }
        }

        //Update old degrees
        if (isset($degrees['old'])) {
            foreach($degrees['old'] as $id=>$degreeInput) {
                //Ensure this degree belongs to this applicant
                $degree = $applicant->degrees->firstWhere('id', $id);
                if ($degree != null) {
                    $degree->fill([
                        'degree_type_id' => $degreeInput['degree_type_id'],
                        'area_of_study' => $degreeInput['area_of_study'],
                        'institution' => $degreeInput['institution'],
                        'thesis' => $degreeInput['thesis'],
                        'start_date' => $degreeInput['start_date'],
                        'end_date' => $degreeInput['end_date']
                    ]);
                    $degree->save();
                } else {
                    Debugbar::warning('Applicant '.$applicant->id.' attempted to update degree with invalid id '.$id);
                }
            }
        }

        $courses = $input['courses'];

        //Save new courses
        if (isset($courses['new'])) {
            foreach($courses['new'] as $courseInput) {
                $course = new Course();
                $course->applicant_id = $applicant->id;
                $course->fill([
                    'name' => $courseInput['name'],
                    'institution' => $courseInput['institution'],
                    'course_status_id' => $courseInput['course_status_id'],
                    'start_date' => $courseInput['start_date'],
                    'end_date' => $courseInput['end_date']
                ]);
                $course->save();
            }
        }

        //Update old courses
        if (isset($courses['old'])) {
            foreach($courses['old'] as $id=>$courseInput) {
                //Ensure this course belongs to this applicant
                $course = $applicant->courses->firstWhere('id', $id);
                if ($course != null) {
                    $course->fill([
                        'name' => $courseInput['name'],
                        'institution' => $courseInput['institution'],
                        'course_status_id' => $courseInput['course_status_id'],
                        'start_date' => $courseInput['start_date'],
                        'end_date' => $courseInput['end_date']
                    ]);
                    $course->save();
                } else {
                    Debugbar::warning('Applicant '.$applicant->id.' attempted to update course with invalid id '.$id);
                }
            }
        }

        $work_experiences = $input['work_experiences'] ;

        //Save new work_experiences
        if (isset($work_experiences['new'])) {
            foreach($work_experiences['new'] as $workExperienceInput) {
                $workExperience = new WorkExperience();
                $workExperience->applicant_id = $applicant->id;
                $workExperience->fill([
                    'role' => $workExperienceInput['role'],
                    'company' => $workExperienceInput['company'],
                    'description' => $workExperienceInput['description'],
                    'start_date' => $workExperienceInput['start_date'],
                    'end_date' => $workExperienceInput['end_date']
                ]);
                $workExperience->save();
            }
        }

        //Update old work_experiences
        if (isset($work_experiences['old'])) {
            foreach($work_experiences['old'] as $id=>$workExperienceInput) {
                //Ensure this work_experience belongs to this applicant
                $workExperience = $applicant->work_experiences->firstWhere('id', $id);
                if ($workExperience != null) {
                    $workExperience->fill([
                        'role' => $workExperienceInput['role'],
                        'company' => $workExperienceInput['company'],
                        'description' => $workExperienceInput['description'],
                        'start_date' => $workExperienceInput['start_date'],
                        'end_date' => $workExperienceInput['end_date']
                    ]);
                    $workExperience->save();
                } else {
                    Debugbar::warning('Applicant '.$applicant->id.' attempted to update work_experience with invalid id '.$id);
                }
            }
        }

        //Redirect to correct page
        switch($input['submit']) {
            case 'save_and_quit':
                return redirect()->route('applications.index');
                break;
            case 'save_and_continue':
            case 'next':
                return redirect()->route('job.application.edit.3', $jobPoster);
                break;
            case 'previous':
                return redirect()->route('job.application.edit.1', $jobPoster);
                break;
            default:
                return redirect()->back()->withInput();
                break;
        }
    }

    /**
     * Update the Application Essential Skills in storage for the specified job.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function update_essential_skills(Request $request, JobPoster $jobPoster)
    {
        $input = $request->input();
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        //Ensure user has permissions to update this application
        $this->authorize('update', $application);

        $skillDeclarations = $input['skill_declarations'];
        $claimedStatusId = SkillStatus::where('name', 'claimed')->firstOrFail()->id;

        //Save new skill declarartions
        if (isset($skillDeclarations['new'])) {
            foreach($skillDeclarations['new'] as $skillType => $typeInput) {
                foreach($typeInput as $criterion_id=>$skillDeclarationInput) {
                    $skillDeclaration = new SkillDeclaration();
                    $skillDeclaration->applicant_id = $applicant->id;
                    $skillDeclaration->skill_id = Criteria::find($criterion_id)->skill->id;
                    $skillDeclaration->skill_status_id = $claimedStatusId;
                    $skillDeclaration->fill([
                        'description' => $skillDeclarationInput['description'],
                        'skill_level_id' => isset($skillDeclarationInput['skill_level_id']) ? $skillDeclarationInput['skill_level_id'] : null,
                    ]);
                    $skillDeclaration->save();

                    $referenceIds = $this->getRelativeIds($skillDeclarationInput, 'references');
                    $skillDeclaration->references()->sync($referenceIds);

                    $sampleIds = $this->getRelativeIds($skillDeclarationInput, 'samples');
                    $skillDeclaration->work_samples()->sync($sampleIds);
                }
            }
        }

        //Update old declarations
        if (isset($skillDeclarations['old'])) {
            foreach($skillDeclarations['old'] as $skillType => $typeInput) {
                foreach($typeInput as $id=>$skillDeclarationInput) {
                    //Ensure this declaration belongs to this applicant
                    $skillDeclaration = $applicant->skill_declarations->firstWhere('id', $id);
                    if ($skillDeclaration != null) {
                        //skill_id and skill_status cannot be changed
                        $skillDeclaration->fill([
                            'description' => $skillDeclarationInput['description'],
                            'skill_level_id' => isset($skillDeclarationInput['skill_level_id']) ? $skillDeclarationInput['skill_level_id'] : null,
                        ]);
                        $skillDeclaration->save();

                        $referenceIds = $this->getRelativeIds($skillDeclarationInput, 'references');
                        $skillDeclaration->references()->sync($referenceIds);

                        $sampleIds = $this->getRelativeIds($skillDeclarationInput, 'samples');
                        $skillDeclaration->work_samples()->sync($sampleIds);
                    } else {
                        Debugbar::warning('Applicant '.$applicant->id.' attempted to update skill declaration with invalid id '.$id);
                    }
                }
            }
        }

        //Redirect to correct page
        switch($input['submit']) {
            case 'save_and_quit':
                return redirect()->route('applications.index');
                break;
            case 'save_and_continue':
            case 'next':
                return redirect()->route('job.application.edit.4', $jobPoster);
                break;
            case 'previous':
                return redirect()->route('job.application.edit.2', $jobPoster);
                break;
            default:
                return redirect()->back()->withInput();
                break;
        }
    }

    /**
     * Update the Application Asset Skills in storage for the specified job.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function update_asset_skills(Request $request, JobPoster $jobPoster)
    {
        $input = $request->input();
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        //Ensure user has permissions to update this application
        $this->authorize('update', $application);

        $skillDeclarations = $input['skill_declarations'];
        $claimedStatusId = SkillStatus::where('name', 'claimed')->firstOrFail()->id;

        //Save new skill declarartions
        if (isset($skillDeclarations['new'])) {
            foreach($skillDeclarations['new'] as $skillType => $typeInput) {
                foreach($typeInput as $criterion_id=>$skillDeclarationInput) {
                    $skillDeclaration = new SkillDeclaration();
                    $skillDeclaration->applicant_id = $applicant->id;
                    $skillDeclaration->skill_id = Criteria::find($criterion_id)->skill->id;
                    $skillDeclaration->skill_status_id = $claimedStatusId;
                    $skillDeclaration->fill([
                        'description' => $skillDeclarationInput['description'],
                        'skill_level_id' => isset($skillDeclarationInput['skill_level_id']) ? $skillDeclarationInput['skill_level_id'] : null,
                    ]);
                    $skillDeclaration->save();

                    $referenceIds = $this->getRelativeIds($skillDeclarationInput, 'references');
                    $skillDeclaration->references()->sync($referenceIds);

                    $sampleIds = $this->getRelativeIds($skillDeclarationInput, 'samples');
                    $skillDeclaration->work_samples()->sync($sampleIds);
                }
            }
        }

        //Update old declarations
        if (isset($skillDeclarations['old'])) {
            foreach($skillDeclarations['old'] as $skillType => $typeInput) {
                foreach($typeInput as $id=>$skillDeclarationInput) {
                    //Ensure this declaration belongs to this applicant
                    $skillDeclaration = $applicant->skill_declarations->firstWhere('id', $id);
                    if ($skillDeclaration != null) {
                        //skill_id and skill_status cannot be changed
                        $skillDeclaration->fill([
                            'description' => $skillDeclarationInput['description'],
                            'skill_level_id' => isset($skillDeclarationInput['skill_level_id']) ? $skillDeclarationInput['skill_level_id'] : null,
                        ]);
                        $skillDeclaration->save();

                        $referenceIds = $this->getRelativeIds($skillDeclarationInput, 'references');
                        $skillDeclaration->references()->sync($referenceIds);

                        $sampleIds = $this->getRelativeIds($skillDeclarationInput, 'samples');
                        $skillDeclaration->work_samples()->sync($sampleIds);
                    } else {
                        Debugbar::warning('Applicant '.$applicant->id.' attempted to update skill declaration with invalid id '.$id);
                    }
                }
            }
        }

        //Redirect to correct page
        switch($input['submit']) {
            case 'save_and_quit':
                return redirect()->route('applications.index');
                break;
            case 'save_and_continue':
            case 'next':
                return redirect()->route('job.application.edit.5', $jobPoster);
                break;
            case 'previous':
                return redirect()->route('job.application.edit.3', $jobPoster);
                break;
            default:
                return redirect()->back()->withInput();
                break;
        }
    }

    /**
     * Submit the Application for the specified job.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function submit(Request $request, JobPoster $jobPoster)
    {
        $input = $request->input();
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        //Ensure user has permissions to update this application
        $this->authorize('update', $application);

        //Only save anything if submit button was pressed
        if ($input['submit'] == "submit") {

            $request->validate([
                'submission_signature' => [
                    'required',
                    'string',
                    'max:191',
                ],
                'submission_date' => [
                    'required',
                    'string',
                    'max:191',
               ]
           ]);

            //Save any final info
            $application->fill([
                'submission_signature' => $input['submission_signature'],
                'submission_date' => $input['submission_date'],
            ]);

            $validator = new ApplicationValidator();
            $validator->validate($application);

            //Change status to 'submitted'
            $application->application_status_id = ApplicationStatus::where('name', 'submitted')->firstOrFail()->id;
        }

        $application->save();

        //Redirect to correct page
        switch($input['submit']) {
            case 'save_and_quit':
                return redirect()->route('applications.index');
                break;
            case 'submit':
                return redirect()->route('job.application.complete', $jobPoster);
                break;
            case 'previous':
                return redirect()->route('job.application.edit.4', $jobPoster);
                break;
            default:
                return redirect()->back()->withInput();
                break;
        }
    }
}
