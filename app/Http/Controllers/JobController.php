<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\JobPoster;
use App\Models\Lookup\JobTerm;
use App\Models\Lookup\Province;
use App\Models\Lookup\SecurityClearance;
use App\Models\Lookup\LanguageRequirement;
use App\Models\Lookup\Department;
use App\Models\JobPosterQuestion;
use App\Models\JobPosterKeyTask;
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
        return view('applicant/job_index', ['job_index' => Lang::get('applicant/job_index'),
            'jobs' => $jobs]);
    }

    /**
     * Display the specified job poster.
     *
     * @param  Request  $request
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, JobPoster $jobPoster)
    {
        //TODO: Improve workplace photos, and reference them in template direction from WorkEnvironment model
        $workplacePhotos = [];
        foreach($jobPoster->manager->work_environment->workplace_photo_captions as $photoCaption) {
            $workplacePhotos[] = [
                'description' => $photoCaption->description,
                'url' => '/images/user.png'
            ];
        }

        //TODO: replace route('manager.show',manager.id) in templates with link using slug

        $criteria = [
            'essential' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'asset';
            })
        ];

        return view('applicant/job_post', [
            'job_post' =>Lang::get('applicant/job_post'),
            'manager' => $jobPoster->manager,
            'manager_profile_photo_url' => '/images/user.png', //TODO get real photo
            'team_culture' => $jobPoster->manager->team_culture,
            'work_environment' => $jobPoster->manager->work_environment,
            'workplace_photos' => $workplacePhotos,
            'job' => $jobPoster,
            'criteria' => $criteria,
        ]);
    }

    /**
     * Display the form for creating a new Job Poster
     * @param  Request $request [description]
     * @return \Illuminate\Http\Response           A view
     */
    public function create(Request $request) {
        $manager = $request->user() ? $request->user()->manager : null;

        //No job details exist yet because we're creating a new one
        $job = [];

        return view('manager/job_create', [
            'manager_job_create' => Lang::get('manager/job_create'),
            'manager' => $manager,
            'provinces' => Province::all(),
            'departments' => Department::all(),
            'language_requirments' => LanguageRequirement::all(),
            'security_clearances' => SecurityClearance::all(),
            'job' => $job,
            'form_action_url' => route('manager.jobs.store'),
            // Fake Data
            "skills" => [
                "00" => [
                    "name" => "UX Research",
                    "type" => "soft",
                    "description" => "UX: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat."
                ],
                "01" => [
                    "name" => "HTML",
                    "type" => "hard",
                    "description" => "HTML: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat."
                ],
                "02" => [
                    "name" => "CSS",
                    "type" => "hard",
                    "description" => "CSS: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat."
                ],
                "03" => [
                    "name" => "Laravel",
                    "type" => "hard",
                    "description" => "Laravel: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat."
                ],
                "04" => [
                    "name" => "JavaScript",
                    "type" => "soft",
                    "description" => "JS: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat."
                ],
                "05" => [
                    "name" => "Docker",
                    "type" => "soft",
                    "description" => "Docker: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat."
                ],
                "06" => [
                    "name" => "Responsive Web Design",
                    "type" => "soft",
                    "description" => "RWD: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat."
                ],
                "07" => [
                    "name" => "Adobe XD",
                    "type" => "hard",
                    "description" => "XD: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat."
                ]
            ],
            "skill_levels" => [
                "hard" => [
                    "00" => "Beginner",
                    "01" => "Intermediate",
                    "02" => "Advanced",
                    "03" => "Expert"
                ],
                "soft" => [
                    "00" => "In Early Development",
                    "01" => "Moderately in Evidence",
                    "02" => "Strongly in Evidence",
                    "03" => "Deep Level Demonstration"
                ]
            ]
        ]);
    }

    /**
     * Create a new resource in storage
     * @param  Request $request
     * @return \Illuminate\Http\Response           A redirect
     */
    public function store(Request $request) {

        $input = $request->input();

        $job = new JobPoster();
        $job->manager_id = $request->user()->manager->id;
        $job->published = ($input['submit'] == 'publish');
        $job->fill([
            'job_term_id' => JobTerm::where('name', 'month')->firstOrFail()->id,
            'term_qty' => $input['term_qty'],
            'open_date_time' => new Date($input['open_date_time']),
            'close_date_time' => new Date($input['close_date_time']),
            'start_date_time' => new Date($input['start_date_time']),
            'department_id' => $input['department'],
            'province_id' => $input['province'],
            'salary_min' => $input['salary_min'],
            'salary_max' => $input['salary_max'],
            'noc' => $input['noc'],
            'classification' => $input['classification'],
            'security_clearance_id' => $input['security_clearance'],
            'language_requirement_id' => $input['language_requirement'],
            'en' => [
                'city' => $input['city'],
                'title' => $input['title']['en'],
                'impact' => $input['impact']['en'],
                'branch' => $input['branch']['en'],
                'division' => $input['division']['en']
            ],
            'fr' => [
                'city' => $input['city'],
                'title' => $input['title']['fr'],
                'impact' => $input['impact']['fr'],
                'branch' => $input['branch']['fr'],
                'division' => $input['division']['fr']
            ],
        ]);
        $job->save();

        if (isset($input['task'])) {
            foreach($input['task'] as $task) {
                $jobPosterTask = new JobPosterKeyTask();
                $jobPosterTask->job_poster_id =  $job->id;
                $jobPosterTask->fill([
                    'en' => [
                        'description' => $task['en']
                    ],
                    'fr' => [
                        'description' => $task['fr']
                    ]
                ]);
                $jobPosterTask->save();
            }
        }

        if (isset($input['question'])) {
            foreach($input['question'] as $question) {
                $jobQuestion = new JobPosterQuestion();
                $jobQuestion->job_poster_id = $job->id;
                $jobQuestion->fill([
                    'en'=> [
                        'question' => $question['question']['en'],
                        'description' => $question['description']['en']
                    ],
                    'fr'=> [
                        'question' => $question['question']['fr'],
                        'description' => $question['description']['fr']
                    ]
                ]);
                $jobQuestion->save();
            }
        }
        return redirect( route('manager.jobs.index') );
    }
}
