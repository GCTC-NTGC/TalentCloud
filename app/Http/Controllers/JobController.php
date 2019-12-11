<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\JobPoster;
use App\Models\JobPosterQuestion;
use App\Models\Manager;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use App\Services\Validation\JobPosterValidator;

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
            $chosen_lang = $job->chosen_lang;

            // Show chosen lang title if current title is empty.
            if (empty($job->title)) {
                $job->title = $job->getTranslation('title', $chosen_lang);
                $job->trans_required = true;
            }

            // Always preview and edit in the chosen language.
            $job->preview_link = LaravelLocalization::getLocalizedURL($chosen_lang, route('manager.jobs.show', $job));
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
        $criteria = [
            'essential' => $jobPoster->criteria->filter(
                function($value, $key){
                    return $value->criteria_type->name == 'essential';
                }
            ),
            'asset' => $jobPoster->criteria->filter(
                function($value, $key){
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

        $jpb_release_date = strtotime('2019-08-21 16:18:17');
        $job_created_at = strtotime($jobPoster->created_at);

        // If the job poster is created after the release of the JPB.
        // Then, render with updated poster template.
        // Else, render with old poster template.
        if ($job_created_at > $jpb_release_date) {
            // Updated job poster (JPB).
            return view(
                'applicant/jpb_job_post',
                [
                    'job_post' => $jobLang,
                    'skill_template' => Lang::get('common/skills'),
                    'job' => $jobPoster,
                    'manager' => $jobPoster->manager,
                    'criteria' => $criteria,
                    'apply_button' => $applyButton,
                ]
            );
        } else {
            // Old job poster.
            return view(
                'applicant/job_post',
                [
                    'job_post' => $jobLang,
                    'manager' => $jobPoster->manager,
                    'manager_profile_photo_url' => '/images/user.png', // TODO get real photo.
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

        if ($jobPoster->job_poster_questions === null || $jobPoster->job_poster_questions->count() === 0) {
            $jobPoster->job_poster_questions()->saveMany($this->populateDefaultQuestions());
            $jobPoster->refresh();
        }

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
            'department_id' => $manager->department_id,
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

        $this->fillAndSaveJobPosterQuestions($input, $jobPoster, true);

        return redirect(route('manager.jobs.show', $jobPoster->id));
    }

    /**
     * Fill Job Poster's questions and save
     *
     * @param  mixed[]               $input     Field values.
     * @param  \App\Models\JobPoster $jobPoster Job Poster object.
     * @param  boolean               $replace   Remove existing relationships.
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
                    'question' => [
                        'en' => $defaultQuestions['en'][$i],
                        'fr' => $defaultQuestions['fr'][$i],
                    ]
                ]
            );
            $jobQuestions[] = $jobQuestion;
        }

        return $jobQuestions;
    }
}
