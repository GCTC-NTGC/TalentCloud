<?php

namespace App\Http\Controllers\Applicant;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\JobPoster;

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
        //Find jobs that are currently open for applications
        $jobs = JobPoster::where('open_date_time', '<=', $now)->where('close_date_time', '>=', $now)->get();
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
        Debugbar::info($jobPoster->manager);

        //TODO: Improve workplace photos, and reference them in template direction from WorkEnvironment model
        $workplacePhotos = [];
        foreach($jobPoster->manager->work_environment->workplace_photo_captions as $photoCaption) {
            $workplacePhotos[] = [
                'description' => $photoCaption->description,
                'url' => '/images/user.png'
            ];
        }


        /* Same with this - job ID - and then we pull what we need
        "job" => [
            "link" => "/browse/jobs/00/",
            "title" => "Front-end Developer",
            "department" => "Treasury Board of Canada Secretariat",
            "city" => "Ottawa",
            "province" => "Ontario",
            "salary" => "80,000 - 120,000",
            "duration" => "1 Year",
            "remote" => "Allowed",
            "telework" => "Allowed",
            "time_flexibility" => "Allowed",
            "days_remaining" => "12",
            "applicants" => "2",
            "reference_id" => "14234",
            "start" => "January 3rd, 2019",
            "language" => "English Essential",
            "security" => "Top Secret",
            "classification" => "CS3",
            "impact" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat. Sed quis laoreet tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla at ligula id porttitor. Nullam ac viverra velit, et rhoncus tellus. Praesent in lacus magna. Duis ut vulputate ipsum. In ut ornare elit. Donec id massa felis. Nam at ullamcorper risus. Vestibulum vitae aliquet ex, et ornare libero. Pellentesque sit amet vehicula neque. Donec auctor a erat posuere vehicula.",
            "work" => [
                "00" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
                "01" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
                "02" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat."
            ],
            "criteria" => [
                "essential" => [
                    "00" => "Criteria 01",
                    "01" => "Criteria 02",
                    "02" => "Criteria 03"
                ],
                "asset" => [
                    "00" => "Criteria 01",
                    "01" => "Criteria 02",
                    "02" => "Criteria 03"
                ]
            ],
            "extras" => [
                "00" => [
                    "title" => "What You Need for Security Clearance",
                    "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
                ],
                "01" => [
                    "title" => "The Application Process",
                    "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
                ],
                "02" => [
                    "title" => "Other Paperwork & Preparation",
                    "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
                ]
            ]
        ]
        */

        //TODO: replace route('manager.show',manager.id) with link using slug
        //TODO: replace

        $criteria = [
            'essential' => $jobPoster->criteria,
            'asset' =>  $jobPoster->criteria
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
}
