<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobPoster;
use App\Models\JobPosterQuestion;
use App\Models\Lookup\ApplicationStatus;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\JobPosterStatus;
use App\Models\Lookup\VeteranStatus;
use App\Models\Manager;
use App\Services\JobPosterDefaultQuestions;
use App\Services\Validation\JobPosterValidator;
use Carbon\Carbon;
use Facades\App\Services\WhichPortal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class JobController extends Controller
{
    /**
     * Display a listing of JobPosters.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // If true, show the Paused due to COVID-19 message.
        $emergency_response = config('seasonal.is_covid_emergency');

        // Find published jobs that are currently open for applications.
        // Eager load required relationships: Department, Province, JobTerm.
        // Eager load the count of submitted applications, to prevent the relationship
        // from being actually loaded and firing off events.
        $jobs = JobPoster::where('internal_only', false)
            ->where('department_id', '!=', config('app.strategic_response_department_id'))
            ->where('job_poster_status_id', JobPosterStatus::where('key', 'live')->first()->id)
            ->with([
                'department',
                'province',
                'job_term',
            ])
            ->withCount([
                'submitted_applications',
            ])
            ->get();

        $null_alert = $emergency_response
            ? Lang::get('applicant/job_index.index.covid_null_alert')
            : Lang::get('applicant/job_index.index.null_alert');
        return view('applicant/job_index', [
            'job_index' => Lang::get('applicant/job_index'),
            'null_alert' => $null_alert,
            'jobs' => $jobs
        ]);
    }

    /**
     * Display a listing of a manager's JobPosters.
     *
     * @return \Illuminate\Http\Response
     */
    public function managerIndex()
    {
        $manager = Auth::user()->manager;

        $jobs = JobPoster::where('manager_id', $manager->id)
            ->with('classification')
            ->withCount('submitted_applications')
            ->get();

        foreach ($jobs as &$job) {
            // If the chosen language is null then set to english.
            $chosen_lang = $job->chosen_lang ?: 'en';

            // Show chosen lang title if current title is empty.
            if (empty($job->title)) {
                $job->title = $job->getTranslation('title', $chosen_lang);
                $job->trans_required = true;
            }

            // Always preview and edit in the chosen language.
            $job->preview_link = LaravelLocalization::getLocalizedURL($chosen_lang, route('manager.jobs.preview', $job));
            $job->edit_link = LaravelLocalization::getLocalizedURL($chosen_lang, route('manager.jobs.edit', $job));
        }


        return view('manager/job_index', [
            // Localization Strings.
            'jobs_l10n' => Lang::get('manager/job_index'),
            // Data.
            'jobs' => $jobs,
        ]);
    }

    /**
     * Display a listing of a hr advisor's JobPosters.
     *
     * @return \Illuminate\Http\Response
     */
    public function hrIndex(Request $request)
    {
        $hrAdvisor = $request->user()->hr_advisor;
        return view('hr_advisor/job_index', [
            'jobs_l10n' => Lang::get('hr_advisor/job_index'),
            'hr_advisor_id' => $hrAdvisor->id
        ]);
    }




    /**
     * Delete a draft Job Poster.
     *
     * @param  \Illuminate\Http\Request $request   Incoming request object.
     * @param  \App\Models\JobPoster    $jobPoster Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, JobPoster $jobPoster)
    {
        $jobPoster->delete();
    }

    /**
     * Display the specified job poster.
     *
     * @param  \Illuminate\Http\Request $request   Incoming request object.
     * @param  \App\Models\JobPoster    $jobPoster Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, JobPoster $jobPoster)
    {
        $jobPoster->load([
            'department',
            'criteria.skill.skill_type',
            'manager.team_culture',
            'manager.work_environment'
        ]);

        $user = Auth::user();

        // TODO: Improve workplace photos, and reference them in template direction from WorkEnvironment model.
        $workplacePhotos = [];
        foreach ($jobPoster->manager->work_environment->workplace_photo_captions as $photoCaption) {
            $workplacePhotos[] = [
                'description' => $photoCaption->description,
                'url' => '/images/user.png'
            ];
        }

        // TODO: replace route('manager.show',manager.id) in templates with link using slug.
        $essential = $jobPoster->criteria->filter(
            function ($value, $key) {
                return $value->criteria_type->name == 'essential';
            }
        )->sortBy('id');
        $asset = $jobPoster->criteria->filter(
            function ($value, $key) {
                return $value->criteria_type->name == 'asset';
            }
        )->sortBy('id');
        $criteria = [
            'essential' => $essential,
            'asset' => $asset,
        ];

        $jobLang = Lang::get('applicant/job_post');

        $applyButton = [];
        if (WhichPortal::isManagerPortal()) {
            $applyButton = [
                'href' => route('manager.jobs.edit', $jobPoster->id),
                'title' => $jobLang['apply']['edit_link_title'],
                'text' => $jobLang['apply']['edit_link_label'],
            ];
        } elseif (WhichPortal::isHrPortal()) {
            if ($jobPoster->hr_advisors->contains('user_id', $user->id)) {
                $applyButton = [
                    'href' => route('hr_advisor.jobs.summary', $jobPoster->id),
                    'title' => null,
                    'text' => Lang::get('hr_advisor/job_summary.summary_title'),
                ];
            } else {
                $applyButton = [
                    'href' => route('hr_advisor.jobs.index'),
                    'title' => null,
                    'text' => Lang::get('hr_advisor/job_index.title'),
                ];
            }
        } elseif (Auth::check() && $jobPoster->isOpen()) {
            $application = JobApplication::where('applicant_id', Auth::user()->applicant->id)
                ->where('job_poster_id', $jobPoster->id)->first();
            // If applicants job application is not draft anymore then link to application preview page.
            if ($application != null && $application->application_status->name != 'draft') {
                $applyButton = [
                    'href' => route('applications.show', $application->id),
                    'title' => $jobLang['apply']['view_link_title'],
                    'text' => $jobLang['apply']['view_link_label'],
                ];
            } else {
                $applyButton = [
                    'href' => route('job.application.edit.1', $jobPoster->id),
                    'title' => $jobLang['apply']['apply_link_title'],
                    'text' => $jobLang['apply']['apply_link_label'],
                ];
            }
        } elseif (Auth::guest() && $jobPoster->isOpen()) {
            $applyButton = [
                'href' => route('job.application.edit.1', $jobPoster->id),
                'title' => $jobLang['apply']['login_link_title'],
                'text' => $jobLang['apply']['login_link_label'],
            ];
        } else {
            $applyButton = [
                'href' => null,
                'title' => null,
                'text' => $jobLang['apply']['job_closed_label'],
            ];
        }

        $jpb_release_date = strtotime('2019-08-21 16:18:17');
        $job_created_at = strtotime($jobPoster->created_at);

        $custom_breadcrumbs = [
            'home' => route('home'),
            'jobs' => route(WhichPortal::prefixRoute('jobs.index')),
            $jobPoster->title ?: 'job-title-missing' => route(WhichPortal::prefixRoute('jobs.summary'), $jobPoster),
            'preview' => '',
        ];

        // If the poster is part of the Strategic Talent Response dept, use the talent stream template.
        // Else, If the job poster is created after the release of the JPB.
        // Then, render with updated poster template.
        // Else, render with old poster template.
        if ($jobPoster->isInStrategicResponseDepartment()) {
            return view(
                'applicant/strategic_response_job_post',
                [
                    'job_post' => $jobLang,
                    'frequencies' => Lang::get('common/lookup/frequency'),
                    'skill_template' => Lang::get('common/skills'),
                    'job' => $jobPoster,
                    'manager' => $jobPoster->manager,
                    'criteria' => $criteria,
                    'apply_button' => $applyButton,
                    'custom_breadcrumbs' => $custom_breadcrumbs,
                ]
            );
        } elseif ($job_created_at > $jpb_release_date) {
            // Updated job poster (JPB).
            return view(
                'applicant/jpb_job_post',
                [
                    'job_post' => $jobLang,
                    'frequencies' => Lang::get('common/lookup/frequency'),
                    'skill_template' => Lang::get('common/skills'),
                    'job' => $jobPoster,
                    'manager' => $jobPoster->manager,
                    'criteria' => $criteria,
                    'apply_button' => $applyButton,
                    'custom_breadcrumbs' => $custom_breadcrumbs,
                ]
            );
        } else {
            // Old job poster.
            return view(
                'applicant/job_post',
                [
                    'job_post' => $jobLang,
                    'frequencies' => Lang::get('common/lookup/frequency'),
                    'manager' => $jobPoster->manager,
                    'manager_profile_photo_url' => '/images/user.png', // TODO get real photo.
                    'team_culture' => $jobPoster->manager->team_culture,
                    'work_environment' => $jobPoster->manager->work_environment,
                    'workplace_photos' => $workplacePhotos,
                    'job' => $jobPoster,
                    'criteria' => $criteria,
                    'apply_button' => $applyButton,
                    'skill_template' => Lang::get('common/skills'),
                    'custom_breadcrumbs' => $custom_breadcrumbs,
                ]
            );
        }
    }

    /**
     * Display the form for editing an existing Job Poster
     * Only allows editing fields that don't appear on the react-built Job Poster Builder.
     *
     * @param  \Illuminate\Http\Request $request   Incoming request object.
     * @param  \App\Models\JobPoster    $jobPoster Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, JobPoster $jobPoster)
    {
        $manager = $jobPoster->manager;

        $defaultQuestionManager = new JobPosterDefaultQuestions();
        $defaultQuestionManager->initializeQuestionsIfEmpty($jobPoster);

        return view(
            'manager/job_create',
            [
                // Localization Strings.
                'job_l10n' => Lang::get('manager/job_edit'),
                // Data.
                'manager' => $manager,
                'job' => $jobPoster,
                'form_action_url' => route('admin.jobs.update', $jobPoster),
            ]
        );
    }

    /**
     * Create a blank job poster for the specified manager
     *
     * @param  \App\Models\Manager $manager Incoming Manager object.
     * @return \Illuminate\Http\Response Job Create view
     */
    public function createAsManager(Manager $manager)
    {
        $jobPoster = new JobPoster();
        $jobPoster->manager_id = $manager->id;

        // Save manager-specific info to the job poster - equivalent to the intro step of the JPB
        $divisionEn = $manager->getTranslation('division', 'en');
        $divisionFr = $manager->getTranslation('division', 'fr');
        $jobPoster->fill([
            'department_id' => $manager->user->department_id,
            'division' => ['en' => $divisionEn],
            'division' => ['fr' => $divisionFr],
        ]);

        $jobPoster->save();

        return redirect()->route('manager.jobs.edit', $jobPoster->id);
    }

    /**
     * Update a resource in storage
     * NOTE: Only saves fields that are not on the react-built Job Poster Builder
     *
     * @param  \Illuminate\Http\Request $request   Incoming request object.
     * @param  \App\Models\JobPoster    $jobPoster Optional Job Poster object.
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, JobPoster $jobPoster)
    {
        // Don't allow edits for published Job Posters
        // Also check auth while we're at it.
        $this->authorize('update', $jobPoster);
        JobPosterValidator::validateUnpublished($jobPoster);

        $input = $request->input();

        if ($jobPoster->manager_id == null) {
            $jobPoster->manager_id = $request->user()->manager->id;
            $jobPoster->save();
        }

        if ($request->input('question')) {
            $validator = Validator::make($request->input('question'), [
                '*.question.*' => 'required|string',
            ], [
                'required' => Lang::get('validation.custom.job_poster_question.required'),
                'string' => Lang::get('validation.custom.job_poster_question.string')
            ]);

            if ($validator->fails()) {
                $request->session()->flash('errors', $validator->errors());
                return redirect(route('admin.jobs.edit', $jobPoster->id));
            }
        }

        $this->fillAndSaveJobPosterQuestions($input, $jobPoster, true);

        return redirect(route('manager.jobs.preview', $jobPoster->id));
    }

    /**
     * Fill Job Poster's questions and save
     *
     * @param  mixed[]               $input     Field values.
     * @param  \App\Models\JobPoster $jobPoster Job Poster object.
     * @param  boolean               $replace   Remove existing relationships.
     * @return void
     */
    protected function fillAndSaveJobPosterQuestions(array $input, JobPoster $jobPoster, bool $replace): void
    {
        if ($replace) {
            $jobPoster->job_poster_questions()->delete();
        }

        if (!array_key_exists('question', $input) || !is_array($input['question'])) {
            return;
        }

        foreach ($input['question'] as $question) {
            $jobQuestion = new JobPosterQuestion();
            $jobQuestion->job_poster_id = $jobPoster->id;
            $jobQuestion->fill(
                [
                    'question' => [
                        'en' => $question['question']['en'],
                        'fr' => $question['question']['fr']

                    ],
                    'description' => [
                        'en' => $question['description']['en'],
                        'fr' => $question['description']['fr']
                    ]
                ]
            );
            $jobPoster->save();
            $jobQuestion->save();
        }
    }

    /**
     * Downloads a CSV file with the applicants who have applied to the job poster.
     *
     * @param  \App\Models\JobPoster $jobPoster Job Poster object.
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    protected function downloadApplicants(JobPoster $jobPoster)
    {
        $tables = [];
        // The first row in the array represents the names of the columns in the spreadsheet.
        $tables[0] = ['Status', 'Applicant Name', 'Email', 'Language'];

        $application_status_id = ApplicationStatus::where('name', 'submitted')->first()->id;
        $applications = JobApplication::where('job_poster_id', $jobPoster->id)
            ->where('application_status_id', $application_status_id)
            ->get();

        $index = 1;
        foreach ($applications as $application) {
            $status = '';
            $username = $application->user_name;
            $user_email = $application->user_email;
            $language = strtoupper($application->preferred_language->name);
            // If the applicants veteran status name is NOT 'none' then set status to veteran.
            $non_veteran = VeteranStatus::where('name', 'none')->first()->id;
            if ($application->veteran_status_id != $non_veteran) {
                $status = 'Veteran';
            } else {
                // Check if the applicant is a canadian citizen.
                $canadian_citizen = CitizenshipDeclaration::where('name', 'citizen')->first()->id;
                if ($application->citizenship_declaration->id == $canadian_citizen) {
                    $status = 'Citizen';
                } else {
                    $status = 'Non-citizen';
                }
            }
            $tables[$index] = [$status, $username, $user_email, $language];
            $index++;
        }

        $filename = $jobPoster->id . '-' . 'applicants-data.csv';

        // Open file.
        $file = fopen($filename, 'w');
        // Iterate through tables and add each line to csv file.
        foreach ($tables as $line) {
            fputcsv($file, $line);
        }
        // Close open file.
        fclose($file);

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename=' . $filename,
        ];

        return Response::download($filename, $filename, $headers);
    }
}
