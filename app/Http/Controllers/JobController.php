<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\View\View;
use App\Http\Controllers\Controller;

use Carbon\Carbon;

use App\Mail\JobPosterReviewRequested;

use App\Models\Criteria;
use App\Models\JobPoster;
use App\Models\JobPosterKeyTask;
use App\Models\JobPosterQuestion;
use App\Models\Lookup\JobTerm;
use App\Models\Lookup\Province;
use App\Models\Lookup\SecurityClearance;
use App\Models\Lookup\LanguageRequirement;
use App\Models\Lookup\Department;
use App\Models\Lookup\SkillLevel;
use App\Models\Lookup\CriteriaType;
use App\Models\Skill;
use App\Models\Manager;

use App\Services\Validation\JobPosterValidator;
use Jenssegers\Date\Date;
use App\Models\AssessmentPlanNotification;
use App\Models\Assessment;

class JobController extends Controller
{

    /**
     * Get array representation of specified job poster
     *
     * @param \Illuminate\Http\Request $request   Incoming request object.
     * @param \App\Models\JobPoster    $jobPoster Job Poster object.
     *
     * @return mixed[]
     */
    public function get(Request $request, JobPoster $jobPoster)
    {
        $jobWithTranslations = array_merge($jobPoster->toArray(), $jobPoster->getTranslationsArray());
        $criteria = Criteria::where('job_poster_id', $jobPoster->id)->get();
        $criteriaTranslated = [];
        foreach ($criteria as $criterion) {
            // TODO: getTranslationsArray probably makes DB calls every loop. Find a way to profile & optimize.
            $criteriaTranslated[] = array_merge($criterion->toArray(), $criterion->getTranslationsArray());
        }
        return array_merge($jobWithTranslations, ['criteria' => $criteriaTranslated]);
    }

    /**
 * Display a listing of JobPosters.
     *
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory
     */
    public function index()
    {
        $now = Carbon::now();

        // Find published jobs that are currently open for applications.
        // Eager load required relationships: Department, Province, JobTerm.
        // Eager load the count of submitted applications, to prevent the relationship
        // from being actually loaded and firing off events.
        $jobs = JobPoster::where('open_date_time', '<=', $now)
            ->where('close_date_time', '>=', $now)
            ->where('published', true)
            ->with([
                'department',
                'province',
                'job_term',
            ])
            ->withCount([
                'submitted_applications',
            ])
            ->get();
        return view('applicant/job_index', [
            'job_index' => Lang::get('applicant/job_index'),
            'jobs' => $jobs
        ]);
    }

    /**
     * Display a listing of a manager's JobPosters.
     *
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory
     */
    public function managerIndex()
    {
        $manager = Auth::user()->manager;
        $jobs = JobPoster::where('manager_id', $manager->id)
            ->withCount('submitted_applications')
            ->get();

        return view('manager/job_index', [
            /*Localization Strings*/
            'jobs_l10n' => Lang::get('manager/job_index'),

            /* Data */
            'jobs' => $jobs,
        ]);
    }

    /**
     * Submit the Job Poster for review.
     *
     * @param \Illuminate\Http\Request $request   Incoming request object.
     * @param \App\Models\JobPoster    $jobPoster Job Poster object.
     *
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory
     */
    public function submitForReview(Request $request, JobPoster $jobPoster)
    {
        // Update review request timestamp
        $jobPoster->review_requested_at = new Date();
        $jobPoster->save();

        // Refresh model instance with updated DB values.
        $jobPoster = JobPoster::withCount('submitted_applications')->where('id', $jobPoster->id)->first();

        // Send email
        $reviewer_email = config('mail.reviewer_email');
        if (isset($reviewer_email)) {
            Mail::to($reviewer_email)->send(new JobPosterReviewRequested($jobPoster, Auth::user()));
        } else {
            Log::error('The reviewer email environment variable is not set.');
        }

        return view('manager/job_index/job', [
            /*Localization Strings*/
            'jobs_l10n' => Lang::get('manager/job_index'),
            'job' => $jobPoster
        ]);
    }

    /**
     * Delete a draft Job Poster.
     *
     * @param \Illuminate\Http\Request $request   Incoming request object.
     * @param \App\Models\JobPoster    $jobPoster Job Poster object.
     *
     * @return void
     */
    public function destroy(Request $request, JobPoster $jobPoster) : void
    {
        $jobPoster->delete();
    }

    /**
     * Display the specified job poster.
     *
     * @param \Illuminate\Http\Request $request   Incoming request object.
     * @param \App\Models\JobPoster    $jobPoster Job Poster object.
     *
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory
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

        $jobLang = Lang::get('applicant/job_post');

        $applyButton = [];
        if (!$jobPoster->published && $this->authorize('update', $jobPoster)) {
            $applyButton = [
                'href' => route('manager.jobs.edit', $jobPoster->id),
                'title' => $jobLang['apply']['edit_link_title'],
                'text' => $jobLang['apply']['edit_link_label'],
            ];
        } elseif (Auth::check() && $jobPoster->isOpen()) {
            $applyButton = [
                'href' => route('job.application.edit.1', $jobPoster->id),
                'title' => $jobLang['apply']['apply_link_title'],
                'text' => $jobLang['apply']['apply_link_label'],
            ];
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

        return view(
            'applicant/job_post',
            [
                'job_post' => $jobLang,
                'manager' => $jobPoster->manager,
                'manager_profile_photo_url' => '/images/user.png', //TODO get real photo
                'team_culture' => $jobPoster->manager->team_culture,
                'work_environment' => $jobPoster->manager->work_environment,
                'workplace_photos' => $workplacePhotos,
                'job' => $jobPoster,
                'criteria' => $criteria,
                'apply_button' => $applyButton,
                'skill_template' => Lang::get('common/skills'),
            ]
        );
    }

    /**
     * Create a blank job poster for the specified manager
     *
     * @param Manager $manager
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory Job Create view
     */
    public function createAsManager(Manager $manager)
    {
        $jobPoster = new JobPoster();
        $jobPoster->manager_id = $manager->id;
        $managerEn = $manager->translate('en');
        $managerFr = $manager->translate('fr');

        $jobPoster->fill([
            'department_id' => $manager->department_id,
            'en' => [
                'branch' => $managerEn->branch,
                'division' => $managerEn->division,
            ],
            'fr' => [
                'branch' => $managerFr->branch,
                'division' => $managerFr->division,
            ]
        ]);
        $jobPoster->save();

        $defaultQuestions = $this->populateDefaultQuestions();
        if (!empty($defaultQuestions)) {
            $jobPoster->job_poster_questions()->saveMany($defaultQuestions);
        }

        return redirect()->route('manager.jobs.edit', $jobPoster->id);
    }

    /**
     * Display the form for creating a new Job Poster
     *
     * @param \Illuminate\Http\Request $request Incoming request object.
     *
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory Job Create view
     */
    public function create(Request $request)
    {
        return $this->populateCreateView($request);
    }

    /**
     * Display the form for editing an existing Job Poster
     *
     * @param \Illuminate\Http\Request $request   Incoming request object.
     * @param \App\Models\JobPoster    $jobPoster Job Poster object.
     *
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory Job Create view
     */
    public function edit(Request $request, JobPoster $jobPoster)
    {
        return $this->populateCreateView($request, $jobPoster);
    }

    /**
     * Get the manager from the request object and check if creating or editing
     *
     * @param \Illuminate\Http\Request $request   Incoming request object.
     * @param \App\Models\JobPoster    $jobPoster Optional Job Poster object.
     *
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory Job Create view
     */
    public function populateCreateView(Request $request, JobPoster $jobPoster = null)
    {
        if ($jobPoster == null || $jobPoster->manager == null) {
            $manager = $request->user() ? $request->user()->manager : null;
        } else {
            $manager = $jobPoster->manager;
        }

        if (isset($jobPoster)) {
            $job = $jobPoster;
            $route = ['manager.jobs.update', $jobPoster];
            $jobHeading = 'manager/job_edit';
        } else {
            $job = [];
            $defaultQuestions = $this->populateDefaultQuestions();
            if (!empty($defaultQuestions)) {
                $job['job_poster_questions'] = $defaultQuestions;
            }
            $route = ['manager.jobs.store'];
            $jobHeading = 'manager/job_create';
        }

        $skillLangs = Lang::get('common/skills');

        $softSkills = Skill::whereHas(
            'skill_type',
            function ($query) : void {
                $query->where('name', '=', 'soft');
            }
        )->get()
            ->mapWithKeys(
                function ($skill) {
                    return [
                        $skill->id => $skill->name
                    ];
                }
            )
            ->all();

        $hardSkills = Skill::whereHas(
            'skill_type',
            function ($query) : void {
                $query->where('name', '=', 'hard');
            }
        )->get()
            ->mapWithKeys(
                function ($skill) {
                    return [
                        $skill->id => $skill->name
                    ];
                }
            )
            ->all();

        asort($softSkills, SORT_LOCALE_STRING);
        asort($hardSkills, SORT_LOCALE_STRING);

        $skills = [
            'essential' => [
                'hard' => $hardSkills,
                'soft' => $softSkills
            ],
            'asset' => [
                'hard' => $hardSkills,
                'soft' => $softSkills
            ]
        ];

        $skillLevelCollection = SkillLevel::all();

        $skillLevels = array();

        $skillLevels['hard'] = $skillLevelCollection->mapWithKeys(
            function ($skillLevel) use ($skillLangs) {
                return [$skillLevel->id => $skillLangs['skill_levels']['hard'][$skillLevel->name]];
            }
        )->all();

        $skillLevels['soft'] = $skillLevelCollection->mapWithKeys(
            function ($skillLevel) use ($skillLangs) {
                return [$skillLevel->id => $skillLangs['skill_levels']['soft'][$skillLevel->name]];
            }
        )->all();

        return view(
            'manager/job_create',
            [
                /*Localization Strings*/
                'job_l10n' => Lang::get('manager/job_create'),

                /* Data */
                'job' => Lang::get($jobHeading),
                'manager' => $manager,
                'provinces' => Province::all(),
                'departments' => Department::all(),
                'language_requirments' => LanguageRequirement::all(),
                'security_clearances' => SecurityClearance::all(),
                'job' => $job,
                'form_action_url' => route(/** @scrutinizer ignore-type */ ...$route), // phpcs:ignore
                'skills' => $skills,
                'skill_levels' => $skillLevels,
                'skill_template' => $skillLangs,
            ]
        );
    }

    /**
     * Create a new resource in storage
     *
     * @param \Illuminate\Http\Request $request   Incoming request object.
     * @param \App\Models\JobPoster    $jobPoster Optional Job Poster object.
     *
     * @return \Illuminate\Routing\Redirector|\Illuminate\Http\RedirectResponse A redirect to the Job Index
     */
    public function store(Request $request, JobPoster $jobPoster = null)
    {
        // Don't allow edits for published Job Posters
        // Also check auth while we're at it
        if (isset($jobPoster)) {
            $this->authorize('update', $jobPoster);
            JobPosterValidator::validateUnpublished($jobPoster);
        } else {
            $this->authorize('create', JobPoster::class);
        }

        $input = $request->input();

        $job = (isset($jobPoster) ? $jobPoster : new JobPoster());

        if ($job->manager_id == null) {
            $job->manager_id = $request->user()->manager->id;
            $job->save();
        }

        $this->fillAndSaveJobPoster($input, $job);

        $this->fillAndSaveJobPosterTasks($input, $job, isset($jobPoster));

        $this->fillAndSaveJobPosterQuestions($input, $job, isset($jobPoster));

        $this->fillAndSaveJobPosterCriteria($input, $job, isset($jobPoster));

        return redirect(route('manager.jobs.show', $job->id));
    }

    /**
     * Fill Job Poster model's properties and save
     *
     * @param mixed[]               $input     Field values.
     * @param \App\Models\JobPoster $jobPoster Job Poster object.
     *
     * @return void
     */
    protected function fillAndSaveJobPoster(array $input, JobPoster $jobPoster) : void
    {
        $jobPoster->fill(
            [
                'job_term_id' => JobTerm::where('name', 'month')->firstOrFail()->id,
                'term_qty' => $input['term_qty'],
                'open_date_time' => ptDayStartToUtcTime($input['open_date']),
                'close_date_time' => ptDayEndToUtcTime($input['close_date']),
                'start_date_time' => ptDayStartToUtcTime($input['start_date']),
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
     * @param mixed[]               $input     Field values.
     * @param \App\Models\JobPoster $jobPoster Job Poster object.
     * @param boolean               $replace   Remove existing relationships.
     *
     * @return void
     */
    protected function fillAndSaveJobPosterTasks(array $input, JobPoster $jobPoster, bool $replace) : void
    {
        if ($replace) {
            $jobPoster->job_poster_key_tasks()->delete();
        }

        if (!array_key_exists('task', $input) || !is_array($input['task'])) {
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
     * @param mixed[]               $input     Field values.
     * @param \App\Models\JobPoster $jobPoster Job Poster object.
     * @param boolean               $replace   Remove existing relationships.
     *
     * @return void
     */
    protected function fillAndSaveJobPosterQuestions(array $input, JobPoster $jobPoster, bool $replace) : void
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
     * @param mixed[]               $input     Field values.
     * @param \App\Models\JobPoster $jobPoster Job Poster object.
     *
     * @return void
     */
    protected function fillAndSaveJobPosterCriteria(array $input, JobPoster $jobPoster) : void
    {
        if (!array_key_exists('criteria', $input) || !is_array($input['criteria'])) {
            return;
        }

        $criteria = $input['criteria'];

        $affectedCriteriaIds = [];
        // Old criteria must be updated, using the criteriaId that comes from the form element names.
        if (!empty($criteria['old'])) {
            foreach ($criteria['old'] as $criteriaType => $criteriaTypeInput) {
                foreach ($criteriaTypeInput as $skillTypeInput) {
                    foreach ($skillTypeInput as $criteriaId => $criteriaInput) {
                        $updatedCriteria = $this->processCriteriaForm($jobPoster, $criteriaType, $criteriaInput, $criteriaId);
                        $affectedCriteriaIds[] = $updatedCriteria->id;
                    }
                }
            }
        }
        // New criteria must be created from scratch, and the id in the form element name can be disregarded.
        if (!empty($criteria['new'])) {
            foreach ($criteria['new'] as $criteriaType => $criteriaTypeInput) {
                foreach ($criteriaTypeInput as $skillTypeInput) {
                    foreach ($skillTypeInput as $criteriaInput) {
                        $newCriteria = $this->processCriteriaForm($jobPoster, $criteriaType, $criteriaInput, null);
                        $affectedCriteriaIds[] = $newCriteria->id;
                    }
                }
            }
        }
        // Existing criteria which were not resubmitted must be deleted.
        $deleteCriteria = $jobPoster->criteria()->whereNotIn('id', $affectedCriteriaIds)->get();
        foreach ($deleteCriteria as $criteria) {
            $this->deleteCriteria($criteria);
        }
    }

    /**
     * Process intput representing a single criteria from Job Poster form.
     *
     * @param JobPoster    $jobPoster
     * @param string       $criteriaType
     * @param array        $criteriaInput
     * @param integer|null $criteriaId
     * @return Criteria
     */
    protected function processCriteriaForm(JobPoster $jobPoster, string $criteriaType, array $criteriaInput, ?int $criteriaId): Criteria
    {
        $skillId = $criteriaInput['skill_id'];

        //If no description was provided, use the default skill description
        $descriptionEn = $criteriaInput['description']['en'] ?
            $criteriaInput['description']['en'] : Skill::find($skillId)->getTranslation('description', 'en');
        $descriptionFr = $criteriaInput['description']['fr'] ?
            $criteriaInput['description']['fr'] : Skill::find($criteriaInput['skill_id'])->getTranslation('description', 'fr');
        $data = [
            'skill_id' => $criteriaInput['skill_id'],
            'criteria_type_id' => CriteriaType::where('name', $criteriaType)->firstOrFail()->id,
            'skill_level_id' => $criteriaInput['skill_level_id'],
            'en' => [
                'description' => $descriptionEn,
            ],
            'fr' => [
                'description' => $descriptionFr,
            ],
        ];

        if ($criteriaId) {
            $existingCriteria = Criteria::find($criteriaId);
            $this->updateCriteria($existingCriteria, $data);
            return $existingCriteria;
        } else {
            $newCriteria = $this->createCriteria($jobPoster, $skillId, $data);
            return $newCriteria;
        }
    }

    /**
     * Create a Job Criteria
     *
     * @param JobPoster $jobPoster
     * @param integer   $skillId
     * @param array     $data
     * @return Criteria
     */
    protected function createCriteria(JobPoster $jobPoster, int $skillId, array $data): Criteria
    {
        $criteria = new Criteria();
        $criteria->job_poster_id = $jobPoster->id;
        $criteria->skill_id = $skillId;
        $criteria->fill($data);
        $criteria->save();

        $notification = $this->makeAssessmentPlanNotification(
            'CREATE',
            $criteria
        );
        $notification->save();

        return $criteria;
    }

    /**
     * Update an existing Job Criteria
     *
     * @param Criteria $criteria
     * @param array    $data
     * @return void
     */
    protected function updateCriteria(Criteria $criteria, array $data): void
    {
        if ($criteria->skill_level_id != $data['skill_level_id'] ||
        $criteria->skill_id != $data['skill_id']) {
            $notification = $this->makeAssessmentPlanNotification(
                'UPDATE',
                $criteria,
                $data['skill_id'],
                $data['skill_level_id']
            );
            $notification->save();
        }
        $criteria->fill($data);
        $criteria->save();
    }

    /**
     * Delete existing Job Criteria
     *
     * @param Criteria $criteria
     * @return void
     */
    protected function deleteCriteria(Criteria $criteria): void
    {
        $notification = $notification = $this->makeAssessmentPlanNotification(
            'DELETE',
            $criteria
        );
        $notification->save();

        // Delete assessments related to this criteria
        Assessment::where("criterion_id", $criteria->id)->delete();

        $criteria->delete();
    }

    /**
     * Create a new AssessmentPlanNotification for a modification to a Criteria
     *
     * @param string       $type            Can be CREATE, UPDATE or DELETE.
     * @param Criteria     $criteria
     * @param integer|null $newSkillId      Only used for UPDATE type notifications.
     * @param integer|null $newSkillLevelId Only used for UPDATE type notifications.
     * @return AssessmentPlanNotification
     */
    protected function makeAssessmentPlanNotification(string $type, Criteria $criteria, $newSkillId = null, $newSkillLevelId = null): AssessmentPlanNotification
    {
        $notification = new AssessmentPlanNotification();
        $notification->job_poster_id = $criteria->job_poster_id;
        $notification->type = $type;
        $notification->criteria_id = $criteria->id;
        $notification->skill_id = $criteria->skill_id;
        $notification->criteria_type_id = $criteria->criteria_type_id;
        $notification->skill_level_id = $criteria->skill_level_id;
        $notification->skill_id_new = $newSkillId;
        $notification->skill_level_id_new = $newSkillLevelId;
        $notification->acknowledged = false;
        return $notification;
    }

    /**
     * Get the localized default questions and add them to an array.
     *
     * @return mixed[]|void
     */
    protected function populateDefaultQuestions()
    {
        $defaultQuestions = [
            'en' => array_values(Lang::get('manager/job_create', [], 'en')['questions']),
            'fr' => array_values(Lang::get('manager/job_create', [], 'fr')['questions']),
        ];

        if (count($defaultQuestions['en']) !== count($defaultQuestions['fr'])) {
            Log::warning('There must be the same number of French and English default questions for a Job Poster.');
            return;
        }

        $jobQuestions = [];

        for ($i = 0; $i < count($defaultQuestions['en']); $i++) {
            $jobQuestion = new JobPosterQuestion();
            $jobQuestion->fill(
                [
                    'en' => [
                        'question' => $defaultQuestions['en'][$i],
                    ],
                    'fr' => [
                        'question' => $defaultQuestions['fr'][$i],
                    ]
                ]
            );
            $jobQuestions[] = $jobQuestion;
        }

        return $jobQuestions;
    }
}
