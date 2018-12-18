<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\JobPoster;
use App\Models\Lookup\JobTerm;
use App\Models\Lookup\Province;
use App\Models\Lookup\SecurityClearance;
use App\Models\Lookup\LanguageRequirement;
use App\Models\Lookup\CitizenshipDeclaration;
use App\Models\Lookup\Department;
use App\Models\Lookup\SkillLevel;
use App\Models\Lookup\CriteriaType;
use App\Models\Lookup\VeteranStatus;
use App\Models\JobApplication;
use App\Models\Criteria;
use App\Models\Skill;
use App\Models\JobPosterQuestion;
use App\Models\JobPosterKeyTask;
use App\Services\Validation\JobPosterValidator;
use Jenssegers\Date\Date;

class JobController extends Controller
{
    /**
     * Display a listing of JobPosters.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $now = Carbon::now();
        //Find published jobs that are currently open for applications
        $jobs = JobPoster::where('open_date_time', '<=', $now)
            ->where('close_date_time', '>=', $now)
            ->where('published', true)
            ->get();
        $jobs->load('manager.work_environment');
        return view('applicant/job_index', ['job_index' => Lang::get('applicant/job_index'),
            'jobs' => $jobs]);
    }

    /**
     * Display a listing of a manager's JobPosters.
     *
     * @return \Illuminate\Http\Response
     */
    public function managerIndex()
    {
        $manager = Auth::user()->manager;

        $veteran_applications = [];
        $citizen_applications = [];
        $other_applications = [];

        foreach($manager->job_posters as $job) {
            $job->submitted_applications->load(['veteran_status', 'citizenship_declaration']);
            $veteran_applications[$job->id] = $job->submitted_applications->filter(function($application) {
                return $application->veteran_status->name !== "none" &&
                        $application->citizenship_declaration->name === "citizen";
            });
            $citizen_applications[$job->id] = $job->submitted_applications->filter(function($application) {
                return $application->veteran_status->name === "none" &&
                        $application->citizenship_declaration->name === "citizen";
            });
            $other_applications[$job->id] = $job->submitted_applications->filter(function($application) {
                return $application->citizenship_declaration->name !== "citizen";
            });
        }

        return view('manager/job_index', [
            "manager_job_index" => [
                "title" => "My Job Posts"
            ],
            'jobs' => $manager->job_posters,
            'veteran_applications' => $veteran_applications,
            'citizen_applications' => $citizen_applications,
            'other_applications' => $other_applications,
        ]);
    }

    /**
     * Display the specified job poster.
     *
     * @param \Illuminate\Http\Request $request   Incoming request object
     * @param \App\Models\JobPoster    $jobPoster Job Poster object
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, JobPoster $jobPoster)
    {
        //TODO: Improve workplace photos, and reference them in template direction from WorkEnvironment model
        $workplacePhotos = [];
        foreach ($jobPoster->manager->work_environment->workplace_photo_captions as $photoCaption) {
            $workplacePhotos[] = [
                'description' => $photoCaption->description,
                'url' => '/images/user.png'
            ];
        }

        //TODO: replace route('manager.show',manager.id) in templates with link using slug

        $criteria = [
            'essential' => $jobPoster->criteria->filter(
                function ($value, $key) {
                    return $value->criteria_type->name == 'essential';
                }
            ),
            'asset' => $jobPoster->criteria->filter(
                function ($value, $key) {
                    return $value->criteria_type->name == 'asset';
                }
            ),
        ];

        return view(
            'applicant/job_post',
            [
                'job_post' => Lang::get('applicant/job_post'),
                'manager' => $jobPoster->manager,
                'manager_profile_photo_url' => '/images/user.png', //TODO get real photo
                'team_culture' => $jobPoster->manager->team_culture,
                'work_environment' => $jobPoster->manager->work_environment,
                'workplace_photos' => $workplacePhotos,
                'job' => $jobPoster,
                'criteria' => $criteria,
                'skill_template' => Lang::get('common/skills'),
            ]
        );
    }

    /**
     * Display the form for creating a new Job Poster
     *
     * @param \Illuminate\Http\Request $request Incoming request object
     *
     * @return Illuminate\View\View Job Create view
     */
    public function create(Request $request)
    {
        return $this->populateCreateView($request);
    }

    /**
     * Display the form for editing an existing Job Poster
     *
     * @param \Illuminate\Http\Request $request   Incoming request object
     * @param \App\Models\JobPoster    $jobPoster Job Poster object
     *
     * @return Illuminate\View\View Job Create view
     */
    public function edit(Request $request, JobPoster $jobPoster)
    {
        return $this->populateCreateView($request, $jobPoster);
    }

    /**
     * Get the manager from the request object and check if creating or editing
     *
     * @param \Illuminate\Http\Request $request   Incoming request object
     * @param \App\Models\JobPoster    $jobPoster Optional Job Poster object
     *
     * @return Illuminate\View\View Job Create view
     */
    public function populateCreateView(Request $request, JobPoster $jobPoster = null)
    {
        $manager = $request->user() ? $request->user()->manager : null;
        if (isset($jobPoster)) {
            $job = $jobPoster;
            $route = ['manager.jobs.store', $jobPoster];
            $jobHeading = 'manager/job_edit';
        } else {
            $job = [];
            $route = ['manager.jobs.store'];
            $jobHeading = 'manager/job_create';
        }

        return view(
            'manager/job_create',
            [
                'job_heading' => Lang::get($jobHeading),
                'manager' => $manager,
                'provinces' => Province::all(),
                'departments' => Department::all(),
                'language_requirments' => LanguageRequirement::all(),
                'security_clearances' => SecurityClearance::all(),
                'job' => $job,
                'form_action_url' => route(
                    /** @scrutinizer ignore-type */ // phpcs:ignore
                    ...$route
                ),
                'skills' => Skill::all(),
                'skill_levels' => SkillLevel::all(),
                'skill_template' => Lang::get('common/skills'),
            ]
        );
    }

    /**
     * Create a new resource in storage
     *
     * @param \Illuminate\Http\Request $request   Incoming request object
     * @param \App\Models\JobPoster    $jobPoster Optional Job Poster object
     *
     * @return Illuminate\Http\RedirectResponsee A redirect to the Job Index
     */
    public function store(Request $request, JobPoster $jobPoster = null)
    {
        // Don't allow edits for published Job Posters
        if (isset($jobPoster)) {
            JobPosterValidator::validateUnpublished($jobPoster);
        }

        $input = $request->input();

        $job = (isset($jobPoster) ? $jobPoster : new JobPoster());

        $job->manager_id = $request->user()->manager->id;
        $job->published = ($input['submit'] == 'publish');

        $this->fillAndSaveJobPoster($input, $job);

        $this->fillAndSaveJobPosterTasks($input, $job, isset($jobPoster));

        $this->fillAndSaveJobPosterQuestions($input, $job, isset($jobPoster));

        $this->fillAndSaveJobPosterCriteria($input, $job, isset($jobPoster));

        return redirect(route('manager.jobs.index'));
    }

    /**
     * Fill Job Poster model's properties and save
     *
     * @param array                 $input     Field values
     * @param \App\Models\JobPoster $jobPoster Job Poster object
     *
     * @return null
     */
    protected function fillAndSaveJobPoster(array $input, JobPoster $jobPoster)
    {
        $jobPoster->fill(
            [
                'job_term_id' => JobTerm::where('name', 'month')->firstOrFail()->id,
                'term_qty' => $input['term_qty'],
                'open_date_time' => new Date($input['open_date'] . $input['open_time']),
                'close_date_time' => new Date($input['close_date'] . $input['close_time']),
                'start_date_time' => new Date($input['start_date_time']),
                'department_id' => $input['department'],
                'province_id' => $input['province'],
                'salary_min' => $input['salary_min'],
                'salary_max' => $input['salary_max'],
                'noc' => $input['noc'],
                'classification' => $input['classification'],
                'security_clearance_id' => $input['security_clearance'],
                'language_requirement_id' => $input['language_requirement'],
                'remote_work_allowed' => (isset($input['remote_work_allowed']) ? $input['remote_work_allowed'] : false),
                'en' => [
                    'city' => $input['city'],
                    'title' => $input['title']['en'],
                    'impact' => $input['impact']['en'],
                    'branch' => $input['branch']['en'],
                    'division' => $input['division']['en'],
                    'education' => $input['education']['en'],
                ],
                'fr' => [
                    'city' => $input['city'],
                    'title' => $input['title']['fr'],
                    'impact' => $input['impact']['fr'],
                    'branch' => $input['branch']['fr'],
                    'division' => $input['division']['fr'],
                    'education' => $input['education']['fr'],
                ],
            ]
        );
        $jobPoster->save();
    }

    /**
     * Fill Job Poster's tasks and save
     *
     * @param array                 $input     Field values
     * @param \App\Models\JobPoster $jobPoster Job Poster object
     * @param bool                  $replace   Remove existing relationships
     *
     * @return null
     */
    protected function fillAndSaveJobPosterTasks(array $input, JobPoster $jobPoster, bool $replace)
    {
        if ($replace) {
            $jobPoster->job_poster_key_tasks()->delete();
        }

        if (!is_array($input['task'])) {
            return;
        }

        foreach ($input['task'] as $task) {
            $jobPosterTask = new JobPosterKeyTask();
            $jobPosterTask->job_poster_id = $jobPoster->id;
            $jobPosterTask->fill(
                [
                    'en' => [
                        'description' => $task['en']
                    ],
                    'fr' => [
                        'description' => $task['fr']
                    ]
                ]
            );
            $jobPosterTask->save();
        }
    }

    /**
     * Fill Job Poster's questions and save
     *
     * @param array                 $input     Field values
     * @param \App\Models\JobPoster $jobPoster Job Poster object
     * @param bool                  $replace   Remove existing relationships
     *
     * @return null
     */
    protected function fillAndSaveJobPosterQuestions(array $input, JobPoster $jobPoster, bool $replace)
    {
        if ($replace) {
            $jobPoster->job_poster_questions()->delete();
        }

        if (!is_array($input['question'])) {
            return;
        }

        foreach ($input['question'] as $question) {
            $jobQuestion = new JobPosterQuestion();
            $jobQuestion->job_poster_id = $jobPoster->id;
            $jobQuestion->fill(
                [
                    'en' => [
                        'question' => $question['question']['en'],
                        'description' => $question['description']['en']
                    ],
                    'fr' => [
                        'question' => $question['question']['fr'],
                        'description' => $question['description']['fr']
                    ]
                ]
            );
            $jobQuestion->save();
        }
    }

    /**
     * Fill Job Poster's criteria and save
     *
     * @param array                 $input     Field values
     * @param \App\Models\JobPoster $jobPoster Job Poster object
     * @param bool                  $replace   Remove existing relationships
     *
     * @return null
     */
    protected function fillAndSaveJobPosterCriteria(array $input, JobPoster $jobPoster, bool $replace)
    {
        if ($replace) {
            $jobPoster->criteria()->delete();
        }

        if (!is_array($input['criteria'])) {
            return;
        }

        $criteria = $input['criteria'];

        $combinedCriteria = [];
        if (isset($criteria['old'])) {
            $combinedCriteria = array_replace_recursive($combinedCriteria, $criteria['old']);
        }
        if (isset($criteria['new'])) {
            $combinedCriteria = array_replace_recursive($combinedCriteria, $criteria['new']);
        }

        if (! empty($combinedCriteria)) {
            foreach ($combinedCriteria as $criteriaType => $criteriaTypeInput) {
                foreach ($criteriaTypeInput as $skillType => $skillTypeInput) {
                    foreach ($skillTypeInput as $criteriaInput) {
                        $criteria = new Criteria();
                        $criteria->job_poster_id = $jobPoster->id;
                        $criteria->fill(
                            [
                                'criteria_type_id' => CriteriaType::where('name', $criteriaType)->firstOrFail()->id,
                                'skill_id' => $criteriaInput['skill_id'],
                                'skill_level_id' => $criteriaInput['skill_level_id'],
                                'en' => [
                                    'description' => $criteriaInput['description']['en'],
                                ],
                                'fr' => [
                                    'description' => $criteriaInput['description']['fr'],
                                ],
                            ]
                        );
                        $criteria->save();
                    }
                }
            }
        }
    }
}
