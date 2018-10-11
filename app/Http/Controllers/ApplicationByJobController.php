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
use App\Models\Skill;
use App\Models\Degree;
use App\Models\Lookup\CriteriaType;
use App\Models\Criteria;
use App\Models\Course;
use App\Models\WorkExperience;
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

        //This is an alternative way of using policies instead of via middleware
        if (!Auth::user()->can('view', $application) ||
            !Auth::user()->can('update', $application)) {
            abort(401);
        }

        return view('applicant/application_post_01', [
            "language_options" => PreferredLanguage::all(),
            "citizenship_options" => CitizenshipDeclaration::all(),
            "veteran_options" => VeteranStatus::all(),
            "applicant" => $applicant,
            "form_submit_action" => route('job.application.update.1', $jobPoster),
            "application" => [
                "id" => "00",
                "title" => "Apply Now",
                "step" => "1",
                "job_context_copy" => "You are applying for:",
                "modals" => [
                    "00" => [
                        "type" => "login",
                        "title" => "Register or Login with GC Account",
                        "content" => [
                            "00" => "Talent Cloud leverages a platform called GC Account that allows you to sign in to a variety of tools using the same account information.",
                            "01" => "If you already have a GC Account, please use the Login link below to sign in. If you don't have an account, please use the Register link to create one."
                        ],
                        "id" => "login",
                        "action_01" => "Register",
                        "action_02" => "Login"
                    ],
                    "01" => [
                        "type" => "logout",
                        "title" => "Logout of Talent Cloud",
                        "content" => [
                            "00" => "Are you sure you want to logout of Talent Cloud?"
                        ],
                        "id" => "logout",
                        "action_01" => "Cancel",
                        "action_02" => "Logout"
                    ],
                    "02" => [
                        "type" => "confirmation",
                        "title" => "Delete this Diploma/Degree?",
                        "content" => [
                            "00" => "Are you sure you want to permanently delete this diploma or degree from your profile?",
                            "01" => "All previously submitted applications will retain this experience."
                        ],
                        "id" => "deleteDegree",
                        "action_01" => "Cancel",
                        "action_02" => "Delete"
                    ],
                    "03" => [
                        "type" => "confirmation",
                        "title" => "Delete this Course/Certification?",
                        "content" => [
                            "00" => "Are you sure you want to permanently delete this course or certification from your profile?",
                            "01" => "All previously submitted applications will retain this experience."
                        ],
                        "id" => "deleteCourse",
                        "action_01" => "Cancel",
                        "action_02" => "Delete"
                    ],
                    "04" => [
                        "type" => "confirmation",
                        "title" => "Delete this Lived Experience?",
                        "content" => [
                            "00" => "Are you sure you want to permanently delete this lived experience from your profile?",
                            "01" => "All previously submitted applications will retain this experience."
                        ],
                        "id" => "deleteWork",
                        "action_01" => "Cancel",
                        "action_02" => "Delete"
                    ]
                ],
                "question_label" => "Your Answer",
                "question_title" => "My Fit",
                "save_quit_button_label" => "Save & Quit",
                "save_continue_button_label" => "Save & Continue",
                "claim_title" => "Basic Information",
                "language_title" => "Language Selection",
                "language_copy" => "Which language would you prefer for this application process?",
                "language_label" => "Select One",
                "language_options" => [
                    "00" => "English",
                    "01" => "French"
                ],
                "citizenship_title" => "Citizenship Claim",
                "citizenship_content" => "Which of the following applies to you?",
                "citizenship_label" => "Select One",
                "citizenship_options" => [
                    "00" => "Canadian Citizen",
                    "01" => "Permanent Resident of Canada",
                    "02" => "Open - Work Permit",
                    "03" => "Closed - Work Permit",
                    "04" => "I am currently not entitled to work in Canada"
                ],
                "veterans_title" => "Veterans Claim",
                "veterans_content" => "Are you a veteran or a member of the Canadian Armed Forces?",
                "veterans_label" => "Select One",
                "veterans_options" => [
                    "00" => "No - I am not a veteran or a member of the Canadian Armed Forces.",
                    "01" => "Yes - I am currently a member of the Canadian Armed Forces.",
                    "02" => "Yes - I am a veteran."
                ],
                "experience_section" => [
                    "section_degree_title" => "My Diplomas/Degrees",
                    "add_degree_label" => "Add Diploma/Degree",
                    "null_degree_copy" => "You don't currently have any diplomas or degrees on your profile! Use the button above to add one.",
                    "section_course_title" => "My Courses/Certifications",
                    "add_course_label" => "Add Course/Certification",
                    "null_course_copy" => "You don't currently have any courses or certifications on your profile! Use the button above to add one.",
                    "section_work_title" => "My Lived Experience",
                    "add_work_label" => "Add Lived Experience",
                    "null_work_copy" => "You don't currently have any lived experience on your profile! Use the button above to add some.",
                ]
            ],
            "job_application" => $application,
            "user" => [
                "name" => "Jason Greene",
                "photo" => false,
                "degrees" => [
                    "00" => [
                        "type" => "Bachelor's Degree",
                        "area_of_study" => "Psychology",
                        "institution" => "Stanford",
                        "thesis" => null,
                        "start_date" => "2018-03-01",
                        "end_date" => "2018-03-02"
                    ]
                ],
                "courses" => [
                    "00" => [
                        "name" => "Sample Certification",
                        "institution" => "Stanford",
                        "status" => "Audited",
                        "start_date" => "2018-03-01",
                        "end_date" => "2018-03-02"
                    ]
                ],
                "work" => [
                    "00" => [
                        "role" => "Front-end Developer",
                        "company" => "Talent Cloud",
                        "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero.",
                        "start_date" => "2018-03-01",
                        "end_date" => "2018-03-02"
                    ]
                ],
                "skills" => [
                    "00" => [
                        "name" => "HTML",
                        "status" => "Claimed",
                        "level" => "beginner",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [
                            "00" => "Mark Hamill"
                        ],
                        "samples" => [
                            "00" => "My Website"
                        ]
                    ],
                    "01" => [
                        "name" => "CSS",
                        "status" => "Claimed",
                        "level" => "advanced",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [
                            "00" => "Mark Hamill"
                        ],
                        "samples" => [
                            "00" => "My Website"
                        ]
                    ],
                    "02" => [
                        "name" => "UX Research",
                        "status" => "Claimed",
                        "level" => "Moderately in Evidence",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [],
                        "samples" => []
                    ]
                ],
                "references" => [
                    "00" => [
                        "name" => "Mark Hamill",
                        "relationship" => "coworker",
                        "email" => "sample@sample.com",
                        "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "projects" => [
                            "00" => [
                                "name" => "NAFTA Renegotiation",
                                "start_date" => "2018-01-01",
                                "end_date" => "2018-02-01"
                            ],
                            "01" => [
                                "name" => "Star Wars XV",
                                "start_date" => "2020-09-09",
                                "end_date" => "2021-10-10"
                            ]
                        ],
                        "skills" => [
                            "00" => "HTML",
                            "01" => "CSS"
                        ]
                    ],
                    "01" => [
                        "name" => "Jesse Markham"
                    ],
                    "02" => [
                        "name" => "Lucy Ladderfield"
                    ],
                    "03" => [
                        "name" => "Cameron Trovsky"
                    ]
                ],
                "samples" => [
                    "00" => [
                        "name" => "My Website",
                        "type" => "Website",
                        "date_created" => "2018-01-01",
                        "link" => "https://google.com",
                        "description" => "Lorem Ipsum",
                        "skills" => [
                            "00" => "HTML",
                            "01" => "CSS"
                        ]
                    ]
                ]
            ],
            "job" => $jobPoster,
            // "job" => [
            //     "link" => "/browse/jobs/00/",
            //     "title" => "Front-end Developer",
            //     "department" => "Treasury Board of Canada Secretariat",
            //     "city" => "Ottawa",
            //     "province" => "Ontario",
            //     "salary" => "80,000 - 120,000",
            //     "duration" => "1 Year",
            //     "remote" => "Allowed",
            //     "telework" => "Allowed",
            //     "time_flexibility" => "Allowed",
            //     "days_remaining" => "12",
            //     "applicants" => "2",
            //     "reference_id" => "14234",
            //     "start" => "January 3rd, 2019",
            //     "language" => "English Essential",
            //     "security" => "Top Secret",
            //     "classification" => "CS3",
            //     "impact" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat. Sed quis laoreet tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla at ligula id porttitor. Nullam ac viverra velit, et rhoncus tellus. Praesent in lacus magna. Duis ut vulputate ipsum. In ut ornare elit. Donec id massa felis. Nam at ullamcorper risus. Vestibulum vitae aliquet ex, et ornare libero. Pellentesque sit amet vehicula neque. Donec auctor a erat posuere vehicula.",
            //     "work" => [
            //         "00" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            //         "01" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            //         "02" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat."
            //     ],
            //     "criteria" => [
            //         "essential" => [
            //             "00" => "Criteria 01",
            //             "01" => "Criteria 02",
            //             "02" => "Criteria 03"
            //         ],
            //         "asset" => [
            //             "00" => "Criteria 01",
            //             "01" => "Criteria 02",
            //             "02" => "Criteria 03"
            //         ]
            //     ],
            //     "extras" => [
            //         "00" => [
            //             "title" => "What You Need for Security Clearance",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ],
            //         "01" => [
            //             "title" => "The Application Process",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ],
            //         "02" => [
            //             "title" => "Other Paperwork & Preparation",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ]
            //     ],
            //     "questions" => [
            //         "00" => [
            //             "value" => "Why are you interested in this job?",
            //             "id" => "00",
            //             "description" => "We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process."
            //         ],
            //         "01" => [
            //             "value" => "Why are you the right person for this job?",
            //             "id" => "01",
            //             "description" => "Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process."
            //         ]
            //     ]
            // ]
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

        return view('applicant/application_post_02', [
            "form_submit_action" => route('job.application.update.2', $jobPoster),
            "applicant" => $applicant,
            "application" => [
                "id" => "00",
                "title" => "Apply Now",
                "step" => "2",
                "job_context_copy" => "You are applying for:",

                "modals" => [
                    "00" => [
                        "type" => "login",
                        "title" => "Register or Login with GC Account",
                        "content" => [
                            "00" => "Talent Cloud leverages a platform called GC Account that allows you to sign in to a variety of tools using the same account information.",
                            "01" => "If you already have a GC Account, please use the Login link below to sign in. If you don't have an account, please use the Register link to create one."
                        ],
                        "id" => "login",
                        "action_01" => "Register",
                        "action_02" => "Login"
                    ],
                    "01" => [
                        "type" => "logout",
                        "title" => "Logout of Talent Cloud",
                        "content" => [
                            "00" => "Are you sure you want to logout of Talent Cloud?"
                        ],
                        "id" => "logout",
                        "action_01" => "Cancel",
                        "action_02" => "Logout"
                    ],
                    "02" => [
                        "type" => "deleteConfirmation",
                        "title" => "Delete this Diploma/Degree?",
                        "content" => [
                            "00" => "Are you sure you want to permanently delete this diploma or degree from your profile?",
                            "01" => "All previously submitted applications will retain this experience."
                        ],
                        "id" => "deleteDegree",
                        "action_01" => "Cancel",
                        "action_02" => "Delete"
                    ],
                    "03" => [
                        "type" => "deleteConfirmation",
                        "title" => "Delete this Course/Certification?",
                        "content" => [
                            "00" => "Are you sure you want to permanently delete this course or certification from your profile?",
                            "01" => "All previously submitted applications will retain this experience."
                        ],
                        "id" => "deleteCourse",
                        "action_01" => "Cancel",
                        "action_02" => "Delete"
                    ],
                    "04" => [
                        "type" => "deleteConfirmation",
                        "title" => "Delete this Lived Experience?",
                        "content" => [
                            "00" => "Are you sure you want to permanently delete this lived experience from your profile?",
                            "01" => "All previously submitted applications will retain this experience."
                        ],
                        "id" => "deleteWork",
                        "action_01" => "Cancel",
                        "action_02" => "Delete"
                    ]
                ],
                "experience" => [
                    "title" => "My Experience",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci.",
                    "requirement_label" => "Required Experience:"
                ],
                "question_title" => "My Fit",
                "save_quit_button_label" => "Save & Quit",
                "save_continue_button_label" => "Save & Continue",
                "language_title" => "Language Requirement",
                "language_copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci.",
                "language_agree" => "I Agree",
                "language_disagree" => "I Disagree",
                "citizenship_title" => "Citizenship Claim",
                "citizenship_content" => "Which of the following applies to you?",
                "citizenship_label" => "Select One",
                "citizenship_options" => [
                    "00" => "Canadian Citizen",
                    "01" => "Permanent Resident of Canada",
                    "02" => "Open - Work Permit",
                    "03" => "Closed - Work Permit",
                    "04" => "I am currently not entitled to work in Canada"
                ],
                "veterans_title" => "Veterans Claim Claim",
                "veterans_content" => "Are you a veteran or a member of the Canadian Armed Forces?",
                "veterans_label" => "Select One",
                "veterans_options" => [
                    "00" => "No - I am not a veteran or a member of the Canadian Armed Forces.",
                    "01" => "Yes - I am currently a member of the Canadian Armed Forces.",
                    "02" => "Yes - I am a veteran."
                ],
                "experience_section" => [
                    "section_degree_title" => "My Diplomas/Degrees",
                    "add_degree_label" => "Add Diploma/Degree",
                    "null_degree_copy" => "You don't currently have any diplomas or degrees on your profile! Use the button above to add one.",
                    "section_course_title" => "My Courses/Certifications",
                    "add_course_label" => "Add Course/Certification",
                    "null_course_copy" => "You don't currently have any courses or certifications on your profile! Use the button above to add one.",
                    "section_work_title" => "My Lived Experience",
                    "add_work_label" => "Add Lived Experience",
                    "null_work_copy" => "You don't currently have any lived experience on your profile! Use the button above to add some.",
                ]
            ],
            "user" => [
                "name" => "Jason Greene",
                "photo" => false,
                "degrees" => [
                    "00" => [
                        "type" => "Bachelor's Degree",
                        "area_of_study" => "Psychology",
                        "institution" => "Stanford",
                        "thesis" => null,
                        "start_date" => "2018-03-01",
                        "end_date" => "2018-03-02"
                    ]
                ],
                "courses" => [
                    "00" => [
                        "name" => "Sample Certification",
                        "institution" => "Stanford",
                        "status" => "Audited",
                        "start_date" => "2018-03-01",
                        "end_date" => "2018-03-02"
                    ]
                ],
                "work" => [
                    "00" => [
                        "role" => "Front-end Developer",
                        "company" => "Talent Cloud",
                        "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero.",
                        "start_date" => "2018-03-01",
                        "end_date" => "2018-03-02"
                    ]
                ],
                "skills" => [
                    "00" => [
                        "name" => "HTML",
                        "status" => "Claimed",
                        "level" => "beginner",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [
                            "00" => "Mark Hamill"
                        ],
                        "samples" => [
                            "00" => "My Website"
                        ]
                    ],
                    "01" => [
                        "name" => "CSS",
                        "status" => "Claimed",
                        "level" => "advanced",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [
                            "00" => "Mark Hamill"
                        ],
                        "samples" => [
                            "00" => "My Website"
                        ]
                    ],
                    "02" => [
                        "name" => "UX Research",
                        "status" => "Claimed",
                        "level" => "Moderately in Evidence",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [],
                        "samples" => []
                    ]
                ],
                "references" => [
                    "00" => [
                        "name" => "Mark Hamill",
                        "relationship" => "coworker",
                        "email" => "sample@sample.com",
                        "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "projects" => [
                            "00" => [
                                "name" => "NAFTA Renegotiation",
                                "start_date" => "2018-01-01",
                                "end_date" => "2018-02-01"
                            ],
                            "01" => [
                                "name" => "Star Wars XV",
                                "start_date" => "2020-09-09",
                                "end_date" => "2021-10-10"
                            ]
                        ],
                        "skills" => [
                            "00" => "HTML",
                            "01" => "CSS"
                        ]
                    ],
                    "01" => [
                        "name" => "Jesse Markham"
                    ],
                    "02" => [
                        "name" => "Lucy Ladderfield"
                    ],
                    "03" => [
                        "name" => "Cameron Trovsky"
                    ]
                ],
                "samples" => [
                    "00" => [
                        "name" => "My Website",
                        "type" => "Website",
                        "date_created" => "2018-01-01",
                        "link" => "https://google.com",
                        "description" => "Lorem Ipsum",
                        "skills" => [
                            "00" => "HTML",
                            "01" => "CSS"
                        ]
                    ]
                ]
            ],
            "job_application" => $application,
            "job" => $jobPoster,
            // [
            //     "id" => $jobPoster->id,
            //     "link" => "/browse/jobs/00/",
            //     "title" => "Front-end Developer",
            //     "department" => "Treasury Board of Canada Secretariat",
            //     "city" => "Ottawa",
            //     "province" => "Ontario",
            //     "salary" => "80,000 - 120,000",
            //     "duration" => "1 Year",
            //     "remote" => "Allowed",
            //     "telework" => "Allowed",
            //     "time_flexibility" => "Allowed",
            //     "days_remaining" => "12",
            //     "applicants" => "2",
            //     "reference_id" => "14234",
            //     "start" => "January 3rd, 2019",
            //     "language" => "English Essential",
            //     "security" => "Top Secret",
            //     "classification" => "CS3",
            //     "impact" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat. Sed quis laoreet tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla at ligula id porttitor. Nullam ac viverra velit, et rhoncus tellus. Praesent in lacus magna. Duis ut vulputate ipsum. In ut ornare elit. Donec id massa felis. Nam at ullamcorper risus. Vestibulum vitae aliquet ex, et ornare libero. Pellentesque sit amet vehicula neque. Donec auctor a erat posuere vehicula.",
            //     "work" => [
            //         "00" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            //         "01" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            //         "02" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat."
            //     ],
            //     "criteria" => [
            //         "essential" => [
            //             "00" => "Criteria 01",
            //             "01" => "Criteria 02",
            //             "02" => "Criteria 03"
            //         ],
            //         "asset" => [
            //             "00" => "Criteria 01",
            //             "01" => "Criteria 02",
            //             "02" => "Criteria 03"
            //         ]
            //     ],
            //     "extras" => [
            //         "00" => [
            //             "title" => "What You Need for Security Clearance",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ],
            //         "01" => [
            //             "title" => "The Application Process",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ],
            //         "02" => [
            //             "title" => "Other Paperwork & Preparation",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ]
            //     ],
            //     "questions" => [
            //         "00" => [
            //             "value" => "Why are you interested in this job?",
            //             "description" => "We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
            //             "input_name" => "jobPostQuestion0",
            //             "answer_label" => "Your Answer",
            //             "answer" => null
            //         ],
            //         "01" => [
            //             "value" => "Why are you the right person for this job?",
            //             "description" => "Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
            //             "input_name" => "jobPostQuestion1",
            //             "answer_label" => "Your Answer",
            //             "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ]
            //     ]
            // ]
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
        $criteria = [
            'essential' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'asset';
            }),
        ];

        return view('applicant/application_post_03', [
            "applicant" => $applicant,
            'skill_template' => Lang::get('common/skills'),
            "form_submit_action" => route('job.application.update.3', $jobPoster),
            'criteria' => $criteria,
            "application" => [
                "id" => "00",
                "title" => "Apply Now",
                "step" => "3",
                "job_context_copy" => "You are applying for:",

                "skills_section" => [
                    "essential_title" => "Need to Have",
                    "asset_title" => "Nice to Have",
                    "add_button_label" => "Add Skill",
                    "null_copy" => "You don't currently have any skills on your profile! Use the button above to add a skill."
                ],

                "modals" => [
                    "00" => [
                        "type" => "createReference",
                        "title" => "Create a New Reference",
                        "content" => [
                            "00" => "By submitting a reference you agree to having first asked their permission to provide their information. Please note that all information provided within a reference might be sent to said reference during a hiring process."
                        ],
                        "id" => "createReference",
                        "action_01" => "Cancel",
                        "action_02" => "Save"
                    ],
                    "01" => [
                        "type" => "createSample",
                        "title" => "Create a New Work Sample",
                        "content" => [
                        ],
                        "id" => "createSample",
                        "action_01" => "Cancel",
                        "action_02" => "Save"
                    ]
                ],
                "question_title" => "My Fit",
                "save_quit_button_label" => "Save & Quit",
                "save_continue_button_label" => "Save & Continue",
                "essential_title" => "Skills You Need to Have",
                "asset_title" => "Skills That Are Nice to Have",
                "essential_context" => "This text is intended to explain the difference between essential and asset criteria while providing context for micro-references and work samples.",
                "asset_context" => "This text is intended to explain the difference between essential and asset criteria while providing context for micro-references and work samples.",
                "essential_start_button_title" => "Scroll to begin filling out the skills you need to have.",
                "asset_start_button_title" => "Scroll to begin filling out the skills that are nice to have.",
                "skills_start_button_label" => "Get Started",
                "essential_sidebar_label" => "Skills Checklist",
                "asset_sidebar_label" => "Skills Checklist",
                "sidebar_item_title" => "Scroll to this skill.",
                "skill_ui" => [
                    "declaration_title" => "Required Information",
                    "declaration_level_help_label" => "Unsure of your level?",
                    "declaration_expertise_title" => "My Level of Expertise",
                    "declaration_expertise" => [
                        "Beginner",
                        "Intermediate",
                        "Expert",
                        "Master"
                    ],
                    "declaration_experience_title" => "My Years of Experience",
                    "declaration_experience" => [
                        "1 of Less",
                        "2 - 3",
                        "4 - 5",
                        "6 - 7",
                        "8 or More"
                    ],
                    "declaration_knowledge_label" => "My Knowledge & Experience",
                    "reference" => [
                        "add_title" => "Add an optional reference.",
                        "add_context" => "Appoint someone who can vouch for your ability in this skill."
                    ],
                    "sample" => [
                        "add_title" => "Add an optional work sample.",
                        "add_context" => "Provide a link to a sample of your work that showcases this skill."
                    ],
                    "save_button_label" => "Save",
                    "delete_button_label" => "Remove"
                ]
            ],
            "user" => [
                "name" => "Jason Greene",
                "photo" => false,
                "skills" => [
                    "00" => [
                        "name" => "HTML",
                        "status" => "Claimed",
                        "level" => "beginner",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [
                            "00" => "Mark Hamill"
                        ],
                        "samples" => [
                            "00" => "My Website"
                        ]
                    ],
                    "01" => [
                        "name" => "CSS",
                        "status" => "Claimed",
                        "level" => "advanced",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [
                            "00" => "Mark Hamill"
                        ],
                        "samples" => [
                            "00" => "My Website"
                        ]
                    ],
                    "02" => [
                        "name" => "UX Research",
                        "status" => "Claimed",
                        "level" => "Moderately in Evidence",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [],
                        "samples" => []
                    ]
                ],
                "references" => [
                    "00" => [
                        "name" => "Mark Hamill"
                    ],
                    "01" => [
                        "name" => "Jesse Markham"
                    ],
                    "02" => [
                        "name" => "Lucy Ladderfield"
                    ],
                    "03" => [
                        "name" => "Cameron Trovsky"
                    ]
                ],
                "samples" => [
                    "00" => [
                        "name" => "My Website",
                        "type" => "Website",
                        "date_created" => "2018-01-01",
                        "link" => "https://google.com",
                        "description" => "Lorem Ipsum",
                        "skills" => [
                            "00" => "HTML",
                            "01" => "CSS"
                        ]
                    ]
                ]
            ],
            "job_application" => $application,
            "job" => $jobPoster,
            // "job" => [
            //     "id" => $jobPoster->id,
            //     "link" => "/browse/jobs/00/",
            //     "title" => "Front-end Developer",
            //     "department" => "Treasury Board of Canada Secretariat",
            //     "city" => "Ottawa",
            //     "province" => "Ontario",
            //     "salary" => "80,000 - 120,000",
            //     "duration" => "1 Year",
            //     "remote" => "Allowed",
            //     "telework" => "Allowed",
            //     "time_flexibility" => "Allowed",
            //     "days_remaining" => "12",
            //     "applicants" => "2",
            //     "reference_id" => "14234",
            //     "start" => "January 3rd, 2019",
            //     "language" => "English Essential",
            //     "security" => "Top Secret",
            //     "classification" => "CS3",
            //     "impact" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat. Sed quis laoreet tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla at ligula id porttitor. Nullam ac viverra velit, et rhoncus tellus. Praesent in lacus magna. Duis ut vulputate ipsum. In ut ornare elit. Donec id massa felis. Nam at ullamcorper risus. Vestibulum vitae aliquet ex, et ornare libero. Pellentesque sit amet vehicula neque. Donec auctor a erat posuere vehicula.",
            //     "work" => [
            //         "00" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            //         "01" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            //         "02" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat."
            //     ],
            //     "criteria" => [
            //         "essential" => [
            //             "00" => "Criteria 01",
            //             "01" => "Criteria 02",
            //             "02" => "Criteria 03"
            //         ],
            //         "asset" => [
            //             "00" => "Criteria 01",
            //             "01" => "Criteria 02",
            //             "02" => "Criteria 03"
            //         ]
            //     ],
            //     "extras" => [
            //         "00" => [
            //             "title" => "What You Need for Security Clearance",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ],
            //         "01" => [
            //             "title" => "The Application Process",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ],
            //         "02" => [
            //             "title" => "Other Paperwork & Preparation",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ]
            //     ],
            //     "questions" => [
            //         "00" => [
            //             "value" => "Why are you interested in this job?",
            //             "description" => "We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
            //             "input_name" => "jobPostQuestion0",
            //             "answer_label" => "Your Answer",
            //             "answer" => null
            //         ],
            //         "01" => [
            //             "value" => "Why are you the right person for this job?",
            //             "description" => "Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
            //             "input_name" => "jobPostQuestion1",
            //             "answer_label" => "Your Answer",
            //             "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ]
            //     ],
            //     "skills" => [
            //         "00" => [
            //             "name" => "HTML",
            //             "requirement" => "essential",
            //             "level" => "Intermediate"
            //         ],
            //         "01" => [
            //             "name" => "JavaScript",
            //             "requirement" => "essential",
            //             "level" => "Moderately in Evidence"
            //         ],
            //         "02" => [
            //             "name" => "CSS",
            //             "requirement" => "essential",
            //             "level" => "Advanced"
            //         ],
            //         "03" => [
            //             "name" => "Laravel",
            //             "requirement" => "essential",
            //             "level" => "Intermediate"
            //         ],
            //         "04" => [
            //             "name" => "Docker",
            //             "requirement" => "asset",
            //             "level" => "In Early Development"
            //         ],
            //         "05" => [
            //             "name" => "Responsive Web Design",
            //             "requirement" => "asset",
            //             "level" => "In Early Development"
            //         ],
            //         "06" => [
            //             "name" => "Adobe XD",
            //             "requirement" => "asset",
            //             "level" => "In Early Development"
            //         ]
            //     ]
            // ],
            "skills" => Skill::all(),
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
        $criteria = [
            'essential' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'asset';
            }),
        ];

        return view('applicant/application_post_04', [
            "applicant" => $applicant,
            'skill_template' => Lang::get('common/skills'),
            "form_submit_action" => route('job.application.update.4', $jobPoster),
            'criteria' => $criteria,
            "application" => [
                "id" => "00",
                "title" => "Apply Now",
                "step" => "4",
                "job_context_copy" => "You are applying for:",

                "skills_section" => [
                    "essential_title" => "Need to Have",
                    "asset_title" => "Nice to Have",
                    "add_button_label" => "Add Skill",
                    "null_copy" => "You don't currently have any skills on your profile! Use the button above to add a skill."
                ],

                "modals" => [
                    "00" => [
                        "type" => "createReference",
                        "title" => "Create a New Reference",
                        "content" => [
                            "00" => "By submitting a reference you agree to having first asked their permission to provide their information. Please note that all information provided within a reference might be sent to said reference during a hiring process."
                        ],
                        "id" => "createReference",
                        "action_01" => "Cancel",
                        "action_02" => "Save"
                    ],
                    "01" => [
                        "type" => "createSample",
                        "title" => "Create a New Work Sample",
                        "content" => [
                        ],
                        "id" => "createSample",
                        "action_01" => "Cancel",
                        "action_02" => "Save"
                    ]
                ],
                "question_title" => "My Fit",
                "save_quit_button_label" => "Save & Quit",
                "save_continue_button_label" => "Save & Continue",
                "essential_title" => "Skills You Need to Have",
                "asset_title" => "Skills That Are Nice to Have",
                "essential_context" => "This text is intended to explain the difference between essential and asset criteria while providing context for micro-references and work samples.",
                "asset_context" => "This text is intended to explain the difference between essential and asset criteria while providing context for micro-references and work samples.",
                "essential_start_button_title" => "Scroll to begin filling out the skills you need to have.",
                "asset_start_button_title" => "Scroll to begin filling out the skills that are nice to have.",
                "skills_start_button_label" => "Get Started",
                "essential_sidebar_label" => "Skills Checklist",
                "asset_sidebar_label" => "Skills Checklist",
                "sidebar_item_title" => "Scroll to this skill.",
                "skill_ui" => [
                    "declaration_title" => "Required Information",
                    "declaration_level_help_label" => "Unsure of your level?",
                    "declaration_expertise_title" => "My Level of Expertise",
                    "declaration_expertise" => [
                        "Beginner",
                        "Intermediate",
                        "Expert",
                        "Master"
                    ],
                    "declaration_experience_title" => "My Years of Experience",
                    "declaration_experience" => [
                        "1 of Less",
                        "2 - 3",
                        "4 - 5",
                        "6 - 7",
                        "8 or More"
                    ],
                    "declaration_knowledge_label" => "My Knowledge & Experience",
                    "reference" => [
                        "add_title" => "Add an optional reference.",
                        "add_context" => "Appoint someone who can vouch for your ability in this skill."
                    ],
                    "sample" => [
                        "add_title" => "Add an optional work sample.",
                        "add_context" => "Provide a link to a sample of your work that showcases this skill."
                    ],
                    "save_button_label" => "Save",
                    "delete_button_label" => "Remove"
                ]
            ],
            "user" => [
                "name" => "Jason Greene",
                "photo" => false,
                "skills" => [
                    "00" => [
                        "name" => "HTML",
                        "status" => "Claimed",
                        "level" => "beginner",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [
                            "00" => "Mark Hamill"
                        ],
                        "samples" => [
                            "00" => "My Website"
                        ]
                    ],
                    "01" => [
                        "name" => "CSS",
                        "status" => "Claimed",
                        "level" => "advanced",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [
                            "00" => "Mark Hamill"
                        ],
                        "samples" => [
                            "00" => "My Website"
                        ]
                    ],
                    "02" => [
                        "name" => "UX Research",
                        "status" => "Claimed",
                        "level" => "Moderately in Evidence",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [],
                        "samples" => []
                    ]
                ],
                "references" => [
                    "00" => [
                        "name" => "Mark Hamill"
                    ],
                    "01" => [
                        "name" => "Jesse Markham"
                    ],
                    "02" => [
                        "name" => "Lucy Ladderfield"
                    ],
                    "03" => [
                        "name" => "Cameron Trovsky"
                    ]
                ],
                "samples" => [
                    "00" => [
                        "name" => "My Website",
                        "type" => "Website",
                        "date_created" => "2018-01-01",
                        "link" => "https://google.com",
                        "description" => "Lorem Ipsum",
                        "skills" => [
                            "00" => "HTML",
                            "01" => "CSS"
                        ]
                    ]
                ]
            ],
            "job_application" => $application,
            "job" => $jobPoster,
            // "job" => [
            //     "id" => $jobPoster->id,
            //     "link" => "/browse/jobs/00/",
            //     "title" => "Front-end Developer",
            //     "department" => "Treasury Board of Canada Secretariat",
            //     "city" => "Ottawa",
            //     "province" => "Ontario",
            //     "salary" => "80,000 - 120,000",
            //     "duration" => "1 Year",
            //     "remote" => "Allowed",
            //     "telework" => "Allowed",
            //     "time_flexibility" => "Allowed",
            //     "days_remaining" => "12",
            //     "applicants" => "2",
            //     "reference_id" => "14234",
            //     "start" => "January 3rd, 2019",
            //     "language" => "English Essential",
            //     "security" => "Top Secret",
            //     "classification" => "CS3",
            //     "impact" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat. Sed quis laoreet tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla at ligula id porttitor. Nullam ac viverra velit, et rhoncus tellus. Praesent in lacus magna. Duis ut vulputate ipsum. In ut ornare elit. Donec id massa felis. Nam at ullamcorper risus. Vestibulum vitae aliquet ex, et ornare libero. Pellentesque sit amet vehicula neque. Donec auctor a erat posuere vehicula.",
            //     "work" => [
            //         "00" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            //         "01" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            //         "02" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat."
            //     ],
            //     "criteria" => [
            //         "essential" => [
            //             "00" => "Criteria 01",
            //             "01" => "Criteria 02",
            //             "02" => "Criteria 03"
            //         ],
            //         "asset" => [
            //             "00" => "Criteria 01",
            //             "01" => "Criteria 02",
            //             "02" => "Criteria 03"
            //         ]
            //     ],
            //     "extras" => [
            //         "00" => [
            //             "title" => "What You Need for Security Clearance",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ],
            //         "01" => [
            //             "title" => "The Application Process",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ],
            //         "02" => [
            //             "title" => "Other Paperwork & Preparation",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ]
            //     ],
            //     "questions" => [
            //         "00" => [
            //             "value" => "Why are you interested in this job?",
            //             "description" => "We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
            //             "input_name" => "jobPostQuestion0",
            //             "answer_label" => "Your Answer",
            //             "answer" => null
            //         ],
            //         "01" => [
            //             "value" => "Why are you the right person for this job?",
            //             "description" => "Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
            //             "input_name" => "jobPostQuestion1",
            //             "answer_label" => "Your Answer",
            //             "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ]
            //     ],
            //     "skills" => [
            //         "00" => [
            //             "name" => "HTML",
            //             "requirement" => "essential",
            //             "level" => "Intermediate"
            //         ],
            //         "01" => [
            //             "name" => "JavaScript",
            //             "requirement" => "essential",
            //             "level" => "Moderately in Evidence"
            //         ],
            //         "02" => [
            //             "name" => "CSS",
            //             "requirement" => "essential",
            //             "level" => "Advanced"
            //         ],
            //         "03" => [
            //             "name" => "Laravel",
            //             "requirement" => "essential",
            //             "level" => "Intermediate"
            //         ],
            //         "04" => [
            //             "name" => "Docker",
            //             "requirement" => "asset",
            //             "level" => "In Early Development"
            //         ],
            //         "05" => [
            //             "name" => "Responsive Web Design",
            //             "requirement" => "asset",
            //             "level" => "In Early Development"
            //         ],
            //         "06" => [
            //             "name" => "Adobe XD",
            //             "requirement" => "asset",
            //             "level" => "In Early Development"
            //         ]
            //     ]
            // ],
            "skills" => Skill::all(),
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
        $criteria = [
            'essential' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'essential';
            }),
            'asset' => $jobPoster->criteria->filter(function($value, $key) {
                return $value->criteria_type->name == 'asset';
            }),
        ];

        return view('applicant/application_post_05', [
            "applicant" => $applicant,
            "form_submit_action" => route('job.application.submit', $jobPoster),
            'criteria' => $criteria,
            "application" => [
                "id" => "00",
                "title" => "Apply Now",
                "step" => "5",
                "job_context_copy" => "You are applying for:",

                "skills_section" => [
                    "essential_title" => "Need to Have",
                    "asset_title" => "Nice to Have",
                    "add_button_label" => "Add Skill",
                    "null_copy" => "You don't currently have any skills on your profile! Use the button above to add a skill."
                ],

                "modals" => [
                    "00" => [
                        "type" => "createReference",
                        "title" => "Create a New Reference",
                        "content" => [
                            "00" => "By submitting a reference you agree to having first asked their permission to provide their information. Please note that all information provided within a reference might be sent to said reference during a hiring process."
                        ],
                        "id" => "createReference",
                        "action_01" => "Cancel",
                        "action_02" => "Save"
                    ],
                    "01" => [
                        "type" => "createSample",
                        "title" => "Create a New Work Sample",
                        "content" => [
                        ],
                        "id" => "createSample",
                        "action_01" => "Cancel",
                        "action_02" => "Save"
                    ]
                ],
                "preview" => [
                    "citizenship_null_copy" => "No Citizenship Selected",
                    "veteran_null_copy" => "No Veteran Status Selected",
                    "language_null_copy" => "No Language Selected",
                    "long_question_null" => "This question has not been answered.",
                    "experience" => [
                        "null_degree_copy" => "You have no diplomas or degrees added to your profile.",
                        "null_course_copy" => "You have no courses or certifications added to your profile.",
                        "null_work_copy" => "You have no lived experience added to your profile."
                    ]
                ],
                "question_title" => "My Fit",
                "save_quit_button_label" => "Save & Quit",
                "save_continue_button_label" => "Save & Continue",
                "essential_title" => "Skills You Need to Have",
                "asset_title" => "Skills That Are Nice to Have",
                "essential_context" => "This text is intended to explain the difference between essential and asset criteria while providing context for micro-references and work samples.",
                "asset_context" => "This text is intended to explain the difference between essential and asset criteria while providing context for micro-references and work samples.",
                "essential_start_button_title" => "Scroll to begin filling out the skills you need to have.",
                "asset_start_button_title" => "Scroll to begin filling out the skills that are nice to have.",
                "skills_start_button_label" => "Get Started",
                "essential_sidebar_label" => "Skills Checklist",
                "asset_sidebar_label" => "Skills Checklist",
                "sidebar_item_title" => "Scroll to this skill.",
                "skill_ui" => [
                    "declaration_title" => "Required Information",
                    "declaration_level_help_label" => "Unsure of your level?",
                    "declaration_expertise_title" => "My Level of Expertise",
                    "declaration_expertise" => [
                        "Beginner",
                        "Intermediate",
                        "Expert",
                        "Master"
                    ],
                    "declaration_experience_title" => "My Years of Experience",
                    "declaration_experience" => [
                        "1 of Less",
                        "2 - 3",
                        "4 - 5",
                        "6 - 7",
                        "8 or More"
                    ],
                    "declaration_knowledge_label" => "My Knowledge & Experience",
                    "reference" => [
                        "add_title" => "Add an optional reference.",
                        "add_context" => "Appoint someone who can vouch for your ability in this skill."
                    ],
                    "sample" => [
                        "add_title" => "Add an optional work sample.",
                        "add_context" => "Provide a link to a sample of your work that showcases this skill."
                    ],
                    "save_button_label" => "Save",
                    "delete_button_label" => "Remove"
                ]
            ],
            "user" => [
                "name" => "Jason Greene",
                "photo" => false,
                "skills" => [
                    "00" => [
                        "name" => "HTML",
                        "status" => "Claimed",
                        "level" => "beginner",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [
                            "00" => "Mark Hamill"
                        ],
                        "samples" => [
                            "00" => "My Website"
                        ]
                    ],
                    "01" => [
                        "name" => "CSS",
                        "status" => "Claimed",
                        "level" => "advanced",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [
                            "00" => "Mark Hamill"
                        ],
                        "samples" => [
                            "00" => "My Website"
                        ]
                    ],
                    "02" => [
                        "name" => "UX Research",
                        "status" => "Claimed",
                        "level" => "Moderately in Evidence",
                        "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut dolor tincidunt, malesuada enim vel, ullamcorper velit. Donec sit amet commodo libero. Curabitur gravida consectetur dolor, eu vulputate ligula aliquam in. Praesent tempus lectus et mauris placerat, nec congue lectus placerat.",
                        "references" => [],
                        "samples" => []
                    ]
                ],
                "references" => [
                    "00" => [
                        "name" => "Mark Hamill"
                    ],
                    "01" => [
                        "name" => "Jesse Markham"
                    ],
                    "02" => [
                        "name" => "Lucy Ladderfield"
                    ],
                    "03" => [
                        "name" => "Cameron Trovsky"
                    ]
                ],
                "samples" => [
                    "00" => [
                        "name" => "My Website",
                        "type" => "Website",
                        "date_created" => "2018-01-01",
                        "link" => "https://google.com",
                        "description" => "Lorem Ipsum",
                        "skills" => [
                            "00" => "HTML",
                            "01" => "CSS"
                        ]
                    ]
                ]
            ],
            "job_application" => $application,
            "job" => $jobPoster,
            // "job" => [
            //     "link" => "/browse/jobs/00/",
            //     "title" => "Front-end Developer",
            //     "department" => "Treasury Board of Canada Secretariat",
            //     "city" => "Ottawa",
            //     "province" => "Ontario",
            //     "salary" => "80,000 - 120,000",
            //     "duration" => "1 Year",
            //     "remote" => "Allowed",
            //     "telework" => "Allowed",
            //     "time_flexibility" => "Allowed",
            //     "days_remaining" => "12",
            //     "applicants" => "2",
            //     "reference_id" => "14234",
            //     "start" => "January 3rd, 2019",
            //     "language" => "English Essential",
            //     "security" => "Top Secret",
            //     "classification" => "CS3",
            //     "impact" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat. Sed quis laoreet tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla at ligula id porttitor. Nullam ac viverra velit, et rhoncus tellus. Praesent in lacus magna. Duis ut vulputate ipsum. In ut ornare elit. Donec id massa felis. Nam at ullamcorper risus. Vestibulum vitae aliquet ex, et ornare libero. Pellentesque sit amet vehicula neque. Donec auctor a erat posuere vehicula.",
            //     "work" => [
            //         "00" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            //         "01" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            //         "02" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat."
            //     ],
            //     "criteria" => [
            //         "essential" => [
            //             "00" => "Criteria 01",
            //             "01" => "Criteria 02",
            //             "02" => "Criteria 03"
            //         ],
            //         "asset" => [
            //             "00" => "Criteria 01",
            //             "01" => "Criteria 02",
            //             "02" => "Criteria 03"
            //         ]
            //     ],
            //     "extras" => [
            //         "00" => [
            //             "title" => "What You Need for Security Clearance",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ],
            //         "01" => [
            //             "title" => "The Application Process",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ],
            //         "02" => [
            //             "title" => "Other Paperwork & Preparation",
            //             "copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ]
            //     ],
            //     "questions" => [
            //         "00" => [
            //             "value" => "Why are you interested in this job?",
            //             "description" => "We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
            //             "input_name" => "jobPostQuestion0",
            //             "answer_label" => "Your Answer",
            //             "answer" => null
            //         ],
            //         "01" => [
            //             "value" => "Why are you the right person for this job?",
            //             "description" => "Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
            //             "input_name" => "jobPostQuestion1",
            //             "answer_label" => "Your Answer",
            //             "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
            //         ]
            //     ],
            //     "skills" => [
            //         "00" => [
            //             "name" => "HTML",
            //             "requirement" => "essential",
            //             "level" => "Intermediate"
            //         ],
            //         "01" => [
            //             "name" => "JavaScript",
            //             "requirement" => "essential",
            //             "level" => "Moderately in Evidence"
            //         ],
            //         "02" => [
            //             "name" => "CSS",
            //             "requirement" => "essential",
            //             "level" => "Advanced"
            //         ],
            //         "03" => [
            //             "name" => "Laravel",
            //             "requirement" => "essential",
            //             "level" => "Intermediate"
            //         ],
            //         "04" => [
            //             "name" => "Docker",
            //             "requirement" => "asset",
            //             "level" => "In Early Development"
            //         ],
            //         "05" => [
            //             "name" => "Responsive Web Design",
            //             "requirement" => "asset",
            //             "level" => "In Early Development"
            //         ],
            //         "06" => [
            //             "name" => "Adobe XD",
            //             "requirement" => "asset",
            //             "level" => "In Early Development"
            //         ]
            //     ]
            // ],
            "skills" => Skill::all(),
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

        return redirect( route('job.application.edit.2', $jobPoster));
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

        //TODO: save stuff to application

        //TODO: Note from Tristan: I did test this function, and it works as I expect,
        //TODO:     saving new/updated degrees, courses and work experiences
        //TODO:     to the profile.
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

        return redirect( route('job.application.edit.3', $jobPoster));
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

        //TODO: save stuff to application

        //TODO: Note from Tristan: I haven't tested this. This was copied from the SkillsController.
        //TODO: But for now, if we're just updating the Applicant's Profile through this page,
        //TODO: then this same code, or something very close, should work.

        $skillDeclarations = $input['skill_declarations'];
        $claimedStatusId = SkillStatus::where('name', 'claimed')->firstOrFail()->id;

        //Save new skill declarartions
        if (isset($skillDeclarations['new'])) {
            foreach($skillDeclarations['new'] as $skillType => $typeInput) {
                foreach($typeInput as $skillDeclarationInput) {
                    $skillDeclaration = new SkillDeclaration();
                    $skillDeclaration->applicant_id = $applicant->id;
                    $skillDeclaration->skill_id = $skillDeclarationInput['skill_id'];
                    $skillDeclaration->skill_status_id = $claimedStatusId;
                    $skillDeclaration->fill([
                        'description' => $skillDeclarationInput['description'],
                        'skill_level_id' => $skillDeclarationInput['skill_level_id'],
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
                            'skill_level_id' => $skillDeclarationInput['skill_level_id'],
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

        return redirect( route('job.application.edit.4', $jobPoster));
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

        //TODO: save stuff to application

        //TODO: Note from Tristan: I haven't tested this. This was copied from the SkillsController.
        //TODO: But for now, if we're just updating the Applicant's Profile through this page,
        //TODO: then this same code, or something very close, should work.

        $skillDeclarations = $input['skill_declarations'];
        $claimedStatusId = SkillStatus::where('name', 'claimed')->firstOrFail()->id;

        //Save new skill declarartions
        if (isset($skillDeclarations['new'])) {
            foreach($skillDeclarations['new'] as $skillType => $typeInput) {
                foreach($typeInput as $skillDeclarationInput) {
                    $skillDeclaration = new SkillDeclaration();
                    $skillDeclaration->applicant_id = $applicant->id;
                    $skillDeclaration->skill_id = $skillDeclarationInput['skill_id'];
                    $skillDeclaration->skill_status_id = $claimedStatusId;
                    $skillDeclaration->fill([
                        'description' => $skillDeclarationInput['description'],
                        'skill_level_id' => $skillDeclarationInput['skill_level_id'],
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
                            'skill_level_id' => $skillDeclarationInput['skill_level_id'],
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

        return redirect( route('job.application.edit.5', $jobPoster));
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

        //TODO: Save any input (vows, etc)

        //TODO: Check that application is valid and complete

        //Change status to 'submitted'
        $application->application_status_id = ApplicationStatus::where('name', 'submitted')->firstOrFail()->id;

        //TODO: where should we redirect after submitting?
        return redirect( route('applications.index', $jobPoster));
    }
}
