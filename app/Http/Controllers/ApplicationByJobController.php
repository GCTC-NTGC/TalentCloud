<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Models\Lookup\ApplicationStatus;
use App\Models\Lookup\VeteranStatus;
use App\Models\Lookup\PreferredLanguage;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\JobPoster;
use App\Models\JobApplication;
use App\Models\JobApplicationAnswer;
use App\Models\SkillDeclaration;
use App\Models\Skill;
use App\Models\Lookup\SkillStatus;
use App\Models\Degree;
use App\Models\Criteria;
use App\Models\Course;
use App\Models\WorkExperience;
use App\Services\Validation\ApplicationValidator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\Lookup\ReviewStatus;
use Facades\App\Services\WhichPortal;

class ApplicationByJobController extends Controller
{
    /**
     * Display a listing of the applications for given jobPoster.
     *
     * @param  \App\Models\JobPoster $jobPoster Incoming JobPoster object.
     * @return \Illuminate\Http\Response
     */
    public function index(JobPoster $jobPoster)
    {
        $applications = $jobPoster->submitted_applications()
            ->with([
                'veteran_status',
                'citizenship_declaration',
                'application_review',
                'applicant.user',
                'job_poster.criteria',
            ])
            ->get();
        return view('manager/review_applications', [
            // Localization Strings.
            'jobs_l10n' => Lang::get('manager/job_index'),
            // Data.
            'job' => $jobPoster->toApiArray(),
            'applications' => $applications,
            'review_statuses' => ReviewStatus::all()
        ]);
    }

    /**
     * Return the current applicant's application for a given Job Poster.
     *
     * @param  \App\Models\JobPoster $jobPoster Incoming JobPoster object.
     * @return mixed|\App\Models\JobApplication
     */
    protected function getApplicationFromJob(JobPoster $jobPoster)
    {
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
     * @param  \App\Models\JobPoster $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function editBasics(JobPoster $jobPoster)
    {
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        // Ensure user has permissions to view and update application.
        $this->authorize('view', $application);
        $this->authorize('update', $application);

        return view(
            'applicant/application_post_01',
            [
                // Application Template Data.
                'application_step' => 1,
                'application_template' => Lang::get('applicant/application_template'),
                'language_options' => PreferredLanguage::all(),
                'citizenship_options' => CitizenshipDeclaration::all(),
                'veteran_options' => VeteranStatus::all(),
                'preferred_language_template' => Lang::get('common/preferred_language'),
                'citizenship_declaration_template' => Lang::get('common/citizenship_declaration'),
                'veteran_status_template' => Lang::get('common/veteran_status'),
                // Job Data.
                'job' => $jobPoster,
                // Applicant Data.
                'applicant' => $applicant,
                'job_application' => $application,
                // Submission.
                'form_submit_action' => route('job.application.update.1', $jobPoster)
            ]
        );
    }

    /**
     * Show the form for editing Application Experience for the specified job.
     *
     * @param  \App\Models\JobPoster $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function editExperience(JobPoster $jobPoster)
    {
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        // Ensure user has permissions to view and update application.
        $this->authorize('view', $application);
        $this->authorize('update', $application);

        return view(
            'applicant/application_post_02',
            [
                // Application Template Data.
                'application_step' => 2,
                'application_template' => Lang::get('applicant/application_template'),
                // Job Data.
                'job' => $jobPoster,
                // Applicant Data.
                'applicant' => $applicant,
                'job_application' => $application,
                // Submission.
                'form_submit_action' => route('job.application.update.2', $jobPoster)
            ]
        );
    }

    /**
     * Show the form for editing Application Essential Skills for the specified job.
     *
     * @param  \App\Models\JobPoster $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function editEssentialSkills(JobPoster $jobPoster)
    {
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        // Ensure user has permissions to view and update application.
        $this->authorize('view', $application);
        $this->authorize('update', $application);

        $criteria = [
            'essential' => $jobPoster->criteria->filter(function ($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $jobPoster->criteria->filter(function ($value, $key) {
                return $value->criteria_type->name == 'asset';
            }),
        ];

        return view(
            'applicant/application_post_03',
            [
                // Application Template Data.
                'application_step' => 3,
                'application_template' => Lang::get('applicant/application_template'),
                // Job Data.
                'job' => $jobPoster,
                // Skills Data.
                'skills' => Skill::all(),
                'skill_template' => Lang::get('common/skills'),
                'criteria' => $criteria,
                // Applicant Data.
                'applicant' => $applicant,
                'job_application' => $application,
                // Submission.
                'form_submit_action' => route('job.application.update.3', $jobPoster)
            ]
        );
    }

    /**
     * Show the form for editing Application Asset Skills for the specified job.
     *
     * @param  \App\Models\JobPoster $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function editAssetSkills(JobPoster $jobPoster)
    {
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        // Ensure user has permissions to view and update application.
        $this->authorize('view', $application);
        $this->authorize('update', $application);

        $criteria = [
            'essential' => $jobPoster->criteria->filter(function ($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $jobPoster->criteria->filter(function ($value, $key) {
                return $value->criteria_type->name == 'asset';
            }),
        ];

        return view(
            'applicant/application_post_04',
            [
                // Application Template Data.
                'application_step' => 4,
                'application_template' => Lang::get('applicant/application_template'),
                // Job Data.
                'job' => $jobPoster,
                // Skills Data.
                'skills' => Skill::all(),
                'skill_template' => Lang::get('common/skills'),
                'criteria' => $criteria,
                // Applicant Data.
                'applicant' => $applicant,
                'job_application' => $application,
                // Submission.
                'form_submit_action' => route('job.application.update.4', $jobPoster)
            ]
        );
    }

    /**
     * Show the Application Preview for the application for the specified job.
     *
     * @param  \App\Models\JobPoster $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function preview(JobPoster $jobPoster)
    {
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        $this->authorize('view', $application);
        $criteria = [
            'essential' => $jobPoster->criteria->filter(function ($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $jobPoster->criteria->filter(function ($value, $key) {
                return $value->criteria_type->name == 'asset';
            }),
        ];

        return view(
            'applicant/application_post_05',
            [
                // Application Template Data.
                'application_step' => 5,
                'application_template' => Lang::get('applicant/application_template'),
                'preferred_language_template' => Lang::get('common/preferred_language'),
                'citizenship_declaration_template' => Lang::get('common/citizenship_declaration'),
                'veteran_status_template' => Lang::get('common/veteran_status'),
                // Job Data.
                'job' => $jobPoster,
                // Skills Data.
                'skills' => Skill::all(),
                'skill_template' => Lang::get('common/skills'),
                'criteria' => $criteria,
                // Applicant Data.
                'applicant' => $applicant,
                'job_application' => $application,
                'is_manager_view' => WhichPortal::isManagerPortal(),
            ]
        );
    }

    /**
     * Show the Confirm Submit page for the application for the specified job.
     *
     * @param  \App\Models\JobPoster $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function confirm(JobPoster $jobPoster)
    {
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        $this->authorize('update', $application);

        return view(
            'applicant/application_post_06',
            [
                // Application Template Data.
                'application_step' => 6,
                'application_template' => Lang::get('applicant/application_template'),
                // Used by tracker partial.
                'job' => $jobPoster,
                'job_application' => $application,
                // Submission.
                'form_submit_action' => route('job.application.submit', $jobPoster)
            ]
        );
    }

    /**
     * Show the application submission information.
     *
     * @param  \App\Models\JobPoster $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function complete(JobPoster $jobPoster)
    {
        // Include Applicant Data.
        $applicant = Auth::user()->applicant;
        // Include Application Data.
        $application = $this->getApplicationFromJob($jobPoster);

        // Ensure user has permissions to view application.
        $this->authorize('view', $application);

        // Return the Completion View.
        return view(
            'applicant/application_post_complete',
            [
                // Application Template Data.
                'application_template' => Lang::get('applicant/application_template'),
                // Job Data.
                'job' => $jobPoster,
                // Applicant Data.
                'applicant' => $applicant,
                'job_application' => $application
            ]
        );
    }

    /**
     * Update the Application Basics in storage for the specified job.
     *
     * @param  \Illuminate\Http\Request $request   Incoming Request object.
     * @param  \App\Models\JobPoster    $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function updateBasics(Request $request, JobPoster $jobPoster)
    {
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        // Ensure user has permissions to update this application.
        $this->authorize('update', $application);

        $application->fill([
            'citizenship_declaration_id' => $request->input('citizenship_declaration_id'),
            'veteran_status_id' => $request->input('veteran_status_id'),
            'preferred_language_id' => $request->input('preferred_language_id'),
            'language_requirement_confirmed' => $request->input('language_requirement_confirmed')
        ]);
        $application->save();

        $questions = $jobPoster->job_poster_questions;
        $questionsInput = $request->input('questions');
        foreach ($questions as $question) {
            $answer = null;
            if (isset($questionsInput[$question->id])) {
                $answer = $questionsInput[$question->id];
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

        // Redirect to correct page.
        switch ($request->input('submit')) {
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
        }
    }

    /**
     * Update the Application Basics in storage for the specified job.
     *
     * @param  \Illuminate\Http\Request $request   Incoming Request object.
     * @param  \App\Models\JobPoster    $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function updateExperience(Request $request, JobPoster $jobPoster)
    {
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        // Ensure user has permissions to update this application.
        $this->authorize('update', $application);

        // Record that the user has saved their experience for this application.
        $application->experience_saved = true;
        $application->save();

        $degrees = $request->input('degrees');

        $request->validate([
            'degrees.new.*.degree_type_id' => 'required',
            'degrees.new.*.area_of_study'  => 'required',
            'degrees.new.*.institution'    => 'required',
            'degrees.new.*.thesis'         => 'nullable',
            'degrees.new.*.start_date'     => 'required|date',
            'degrees.new.*.end_date'       => 'required|date',
            'degrees.new.*.blockcert_url'  => 'nullable|string',
        ]);

        // Save new degrees.
        if (isset($degrees['new'])) {
            foreach ($degrees['new'] as $degreeInput) {
                $degree = new Degree();
                $degree->applicant_id = $applicant->id;
                $degree->fill([
                    'degree_type_id' => $degreeInput['degree_type_id'],
                    'area_of_study' => $degreeInput['area_of_study'],
                    'institution' => $degreeInput['institution'],
                    'thesis' => $degreeInput['thesis'],
                    'start_date' => $degreeInput['start_date'],
                    'end_date' => $degreeInput['end_date'],
                    'blockcert_url' => $degreeInput['blockcert_url'],
                ]);
                $degree->save();
            }
        }

        // Update old degrees.
        if (isset($degrees['old'])) {
            foreach ($degrees['old'] as $id => $degreeInput) {
                // Ensure this degree belongs to this applicant.
                $degree = $applicant->degrees->firstWhere('id', $id);
                if ($degree != null) {
                    $degree->fill([
                        'degree_type_id' => $degreeInput['degree_type_id'],
                        'area_of_study' => $degreeInput['area_of_study'],
                        'institution' => $degreeInput['institution'],
                        'thesis' => $degreeInput['thesis'],
                        'start_date' => $degreeInput['start_date'],
                        'end_date' => $degreeInput['end_date'],
                        'blockcert_url' => $degreeInput['blockcert_url'],
                    ]);
                    $degree->save();
                } else {
                    Log::warning("Applicant $applicant->id attempted to update degree with invalid id: $id");
                }
            }
        }

        $courses = $request->input('courses');

        $request->validate([
            'courses.new.*.name'             => 'required',
            'courses.new.*.institution'      => 'required',
            'courses.new.*.course_status_id' => 'required',
            'courses.new.*.start_date'       => 'required|date',
            'courses.new.*.end_date'         => 'required|date',
        ]);

        // Save new courses.
        if (isset($courses['new'])) {
            foreach ($courses['new'] as $courseInput) {
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

        // Update old courses.
        if (isset($courses['old'])) {
            foreach ($courses['old'] as $id => $courseInput) {
                // Ensure this course belongs to this applicant.
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
                    Log::warning("Applicant $applicant->id attempted to update course with invalid id: $id");
                }
            }
        }

        $work_experiences = $request->input('work_experiences');

        $request->validate([
            'work_experiences.new.*.role'        => 'required',
            'work_experiences.new.*.company'     => 'required',
            'work_experiences.new.*.description' => 'required',
            'work_experiences.new.*.start_date'  => 'required|date',
            'work_experiences.new.*.end_date'    => 'required|date',
        ]);

        // Save new work_experiences.
        if (isset($work_experiences['new'])) {
            foreach ($work_experiences['new'] as $workExperienceInput) {
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

        // Update old work_experiences.
        if (isset($work_experiences['old'])) {
            foreach ($work_experiences['old'] as $id => $workExperienceInput) {
                // Ensure this work_experience belongs to this applicant.
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
                    Log::warning("Applicant $applicant->id attempted to update work_experience with invalid id: $id");
                }
            }
        }

        // Redirect to correct page.
        switch ($request->input('submit')) {
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
        }
    }

    /**
     * Update the Application Essential Skills in storage for the specified job.
     *
     * @param  \Illuminate\Http\Request $request   Incoming Request object.
     * @param  \App\Models\JobPoster    $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function updateEssentialSkills(Request $request, JobPoster $jobPoster)
    {
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        // Ensure user has permissions to update this application.
        $this->authorize('update', $application);

        $skillDeclarations = $request->input('skill_declarations');
        $claimedStatusId = SkillStatus::where('name', 'claimed')->firstOrFail()->id;

        // Save new skill declarartions.
        if (isset($skillDeclarations['new'])) {
            foreach ($skillDeclarations['new'] as $skillType => $typeInput) {
                foreach ($typeInput as $criterion_id => $skillDeclarationInput) {
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

        // Update old declarations.
        if (isset($skillDeclarations['old'])) {
            foreach ($skillDeclarations['old'] as $skillType => $typeInput) {
                foreach ($typeInput as $id => $skillDeclarationInput) {
                    // Ensure this declaration belongs to this applicant.
                    $skillDeclaration = $applicant->skill_declarations->firstWhere('id', $id);
                    if ($skillDeclaration != null) {
                        // skill_id and skill_status cannot be changed.
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
                        Log::warning("Applicant $applicant->id attempted to update skill declaration with invalid id: $id");
                    }
                }
            }
        }

        // Redirect to correct page.
        switch ($request->input('submit')) {
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
        }
    }

    /**
     * Update the Application Asset Skills in storage for the specified job.
     *
     * @param  \Illuminate\Http\Request $request   Incoming Request object.
     * @param  \App\Models\JobPoster    $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function updateAssetSkills(Request $request, JobPoster $jobPoster)
    {
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        // Ensure user has permissions to update this application.
        $this->authorize('update', $application);

        $skillDeclarations = $request->input('skill_declarations');
        $claimedStatusId = SkillStatus::where('name', 'claimed')->firstOrFail()->id;

        // Save new skill declarartions.
        if (isset($skillDeclarations['new'])) {
            foreach ($skillDeclarations['new'] as $skillType => $typeInput) {
                foreach ($typeInput as $criterion_id => $skillDeclarationInput) {
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

        // Update old declarations.
        if (isset($skillDeclarations['old'])) {
            foreach ($skillDeclarations['old'] as $skillType => $typeInput) {
                foreach ($typeInput as $id => $skillDeclarationInput) {
                    // Ensure this declaration belongs to this applicant.
                    $skillDeclaration = $applicant->skill_declarations->firstWhere('id', $id);
                    if ($skillDeclaration != null) {
                        // skill_id and skill_status cannot be changed.
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
                        Log::warning("Applicant $applicant->id attempted to update skill declaration with invalid id: $id");
                    }
                }
            }
        }

        // Redirect to correct page.
        switch ($request->input('submit')) {
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
        }
    }

    /**
     * Submit the Application for the specified job.
     *
     * @param  \Illuminate\Http\Request $request   Incoming Request object.
     * @param  \App\Models\JobPoster    $jobPoster Incoming Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function submit(Request $request, JobPoster $jobPoster)
    {
        $applicant = Auth::user()->applicant;
        $application = $this->getApplicationFromJob($jobPoster);

        // Ensure user has permissions to update this application.
        $this->authorize('update', $application);

        // Only complete submission if submit button was pressed.
        if ($request->input('submit') == 'submit') {
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

            // Save any final info.
            $application->fill([
                'submission_signature' => $request->input('submission_signature'),
                'submission_date' => $request->input('submission_date'),
            ]);

            $validator = new ApplicationValidator();
            $validator->validate($application);

            // Change status to 'submitted'.
            $application->application_status_id = ApplicationStatus::where('name', 'submitted')->firstOrFail()->id;
        }

        $application->save();

        // Redirect to correct page.
        switch ($request->input('submit')) {
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
        }
    }
}
