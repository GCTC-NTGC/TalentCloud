<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobApplication;
use App\Models\Lookup\ApplicationStatus;
use App\Models\JobPoster;
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
        $application = $this->getApplicationFromJob($jobPoster);

        //This is an alternative way of using policies instead of via middleware
        if (!Auth::user()->can('view', $application) ||
            !Auth::user()->can('update', $application)) {
            abort(401);
        }

        return view('applicant/application_post_01', [
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
            "job_application" => $application,
            "user" => [
                "name" => "Jason Greene",
                "photo" => false,
                "application" => [
                    "citizenship" => "Canadian Citizen",
                    "veteran" => "No - I am not a veteran or a member of the Canadian Armed Forces.",
                    "language" => true,
                    "questions" => [
                        "00" => [
                            "id" => "00",
                            "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat. Sed quis laoreet tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        ],
                        "01" => [
                            "id" => "01",
                            "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat. Sed quis laoreet tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        ]
                    ]
                ],
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
            "degree_template" => [
                "new_degree_label" => "New Diploma/Degree",
                "type_label" => "Type",
                "types" => [
                    "00" => "Bachelor's Degree",
                    "02" => "Diploma",
                    "03" => "Master's Degree",
                    "04" => "PhD"
                ],
                "aoe_label" => "Area of Study",
                "institution_label" => "Institution",
                "thesis_label" => "Thesis Title (Optional)",
                "start_date_label" => "Start Date",
                "end_date_label" => "End Date",
                "action_01" => "Delete Diploma/Degree",
                "action_02" => "Save Diploma/Degree"
            ],
            "course_template" => [
                "new_course_label" => "New Course/Certification",
                "name_label" => "Course/Certification Name",
                "institution_label" => "Institution",
                "status_label" => "Status",
                "statuses" => [
                    "00" => "Course Certificate Granted",
                    "01" => "Credits Towards Degree (Passing Grade)",
                    "02" => "Audited",
                    "03" => "Online Course (No Proof of Completion)",
                    "04" => "Online Course (With Certificate/License)",
                    "05" => "Learning in Progress"
                ],
                "start_date_label" => "Start Date",
                "end_date_label" => "End Date",
                "action_01" => "Delete Diploma/Degree",
                "action_02" => "Save Diploma/Degree"
            ],
            "work_template" => [
                "new_work_label" => "New Lived Experience",
                "role_label" => "Role",
                "company_label" => "Company/Group",
                "description_label" => "Description",
                "start_date_label" => "Start Date",
                "end_date_label" => "End Date",
                "action_01" => "Delete Lived Experience",
                "action_02" => "Save Lived Experience"
            ],
            "job" => $jobPoster
            /* Same with this - job ID - and then we pull what we need */
            /*"job" => [
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
                ],
                "questions" => [
                    "00" => [
                        "value" => "Why are you interested in this job?",
                        "id" => "00",
                        "description" => "We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process."
                    ],
                    "01" => [
                        "value" => "Why are you the right person for this job?",
                        "id" => "01",
                        "description" => "Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process."
                    ]
                ]
            ]*/
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
        $application = $this->getApplicationFromJob($jobPoster);
        return view('applicant/application_post_02', [
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
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
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
            "degree_template" => [
                "new_degree_label" => "New Diploma/Degree",
                "type_label" => "Type",
                "types" => [
                    "00" => "Bachelor's Degree",
                    "02" => "Diploma",
                    "03" => "Master's Degree",
                    "04" => "PhD"
                ],
                "aoe_label" => "Area of Study",
                "institution_label" => "Institution",
                "thesis_label" => "Thesis Title (Optional)",
                "start_date_label" => "Start Date",
                "end_date_label" => "End Date",
                "action_01" => "Delete Diploma/Degree",
                "action_02" => "Save Diploma/Degree"
            ],
            "course_template" => [
                "new_course_label" => "New Course/Certification",
                "name_label" => "Course/Certification Name",
                "institution_label" => "Institution",
                "status_label" => "Status",
                "statuses" => [
                    "00" => "Course Certificate Granted",
                    "01" => "Credits Towards Degree (Passing Grade)",
                    "02" => "Audited",
                    "03" => "Online Course (No Proof of Completion)",
                    "04" => "Online Course (With Certificate/License)",
                    "05" => "Learning in Progress"
                ],
                "start_date_label" => "Start Date",
                "end_date_label" => "End Date",
                "action_01" => "Delete Diploma/Degree",
                "action_02" => "Save Diploma/Degree"
            ],
            "work_template" => [
                "new_work_label" => "New Lived Experience",
                "role_label" => "Role",
                "company_label" => "Company/Group",
                "description_label" => "Description",
                "start_date_label" => "Start Date",
                "end_date_label" => "End Date",
                "action_01" => "Delete Lived Experience",
                "action_02" => "Save Lived Experience"
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
        $application = $this->getApplicationFromJob($jobPoster);

        return view('applicant/application_post_03', [
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
            "skill_template" => [
                "application_asset_requirement_label" => "Recommended",
                "application_essential_requirement_label" => "Required",
                "new_skill_title" => "New Skill",
                "name_label" => "Project Name",
                "type_label" => "Project Type",
                "skill_selection_label" => "Select Skill",
                "level_label" => "My Level",
                "knowledge_label" => "My Knowledge",
                "hard_levels" => [
                    "00" => "Beginner",
                    "01" => "Intermediate",
                    "02" => "Advanced",
                    "03" => "Expert"
                ],
                "soft_levels" => [
                    "00" => "In Early Development",
                    "01" => "Moderately in Evidence",
                    "02" => "Strongly in Evidence",
                    "03" => "Deep Level Demonstration"
                ],
                "action_01" => "Delete Skill",
                "action_02" => "Save Skill"
            ],
            "reference_template" => [
                "new_reference_title" => "New Reference",
                "name_label" => "Reference's Name",
                "relationship_label" => "Your Relationship",
                "relationships" => [
                    "00" => "Coworker",
                    "01" => "Supervisor",
                    "02" => "Employee"
                ],
                "email_label" => "Reference's Email",
                "description_label" => "How You Worked Together",
                "action_01" => "Delete Reference",
                "action_02" => "Save Reference"
            ],
            "sample_template" => [
                "new_sample_label" => "New Work Sample",
                "name_label" => "Project Name",
                "type_label" => "Project Type",
                "types" => [
                    "00" => "PDF",
                    "01" => "Website"
                ],
                "link_label" => "The Link to Your Work",
                "description_label" => "The Story Behind the Work",
                "linked_skills_label" => "Linked Skills",
                "search_label" => "Search Through My Skills",
                "skill_label" => "Select a Skill",
                "add_skill_label" => "Add a Skill",
                "action_01" => "Delete Sample",
                "action_02" => "Save Sample"
            ],
            "relative_template" => [
                "skill" => [
                    "title" => "Linked Skills",
                    "create_title" => "Create a new skill.",
                    "create_label" => "Create New Skill",
                    "label" => "Select a Skill",
                    "add_label" => "Add Existing Skill",
                    "delete_title" => "Remove this skill."
                ],
                "reference" => [
                    "title" => "Linked References",
                    "create_title" => "Create a new reference.",
                    "create_label" => "Create New Reference",
                    "label" => "Select a Reference",
                    "add_label" => "Add Existing Reference",
                    "delete_title" => "Remove this reference."
                ],
                "sample" => [
                    "title" => "Linked Work Samples",
                    "create_title" => "Create a new work sample.",
                    "create_label" => "Create New Work Sample",
                    "label" => "Select a Work Sample",
                    "add_label" => "Add Existing Work Sample",
                    "delete_title" => "Remove this work sample."
                ],
                "project" => [
                    "title" => "Related Projects",
                    "name_label" => "Project Name",
                    "start_date_label" => "Project Started",
                    "end_date_label" => "Project Ended",
                    "add_label" => "Add Project",
                    "delete_title" => "Delete this project."
                ]
            ],
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
                ]
            ]
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
        $application = $this->getApplicationFromJob($jobPoster);

        return view('applicant/application_post_04', [
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
            "skill_template" => [
                "application_asset_requirement_label" => "Recommended",
                "application_essential_requirement_label" => "Required",
                "new_skill_title" => "New Skill",
                "name_label" => "Project Name",
                "type_label" => "Project Type",
                "skill_selection_label" => "Select Skill",
                "level_label" => "My Level",
                "knowledge_label" => "My Knowledge",
                "hard_levels" => [
                    "00" => "Beginner",
                    "01" => "Intermediate",
                    "02" => "Advanced",
                    "03" => "Expert"
                ],
                "soft_levels" => [
                    "00" => "In Early Development",
                    "01" => "Moderately in Evidence",
                    "02" => "Strongly in Evidence",
                    "03" => "Deep Level Demonstration"
                ],
                "action_01" => "Delete Skill",
                "action_02" => "Save Skill"
            ],
            "reference_template" => [
                "new_reference_title" => "New Reference",
                "name_label" => "Reference's Name",
                "relationship_label" => "Your Relationship",
                "relationships" => [
                    "00" => "Coworker",
                    "01" => "Supervisor",
                    "02" => "Employee"
                ],
                "email_label" => "Reference's Email",
                "description_label" => "How You Worked Together",
                "action_01" => "Delete Reference",
                "action_02" => "Save Reference"
            ],
            "sample_template" => [
                "new_sample_label" => "New Work Sample",
                "name_label" => "Project Name",
                "type_label" => "Project Type",
                "types" => [
                    "00" => "PDF",
                    "01" => "Website"
                ],
                "link_label" => "The Link to Your Work",
                "description_label" => "The Story Behind the Work",
                "linked_skills_label" => "Linked Skills",
                "search_label" => "Search Through My Skills",
                "skill_label" => "Select a Skill",
                "add_skill_label" => "Add a Skill",
                "action_01" => "Delete Sample",
                "action_02" => "Save Sample"
            ],
            "relative_template" => [
                "skill" => [
                    "title" => "Linked Skills",
                    "create_title" => "Create a new skill.",
                    "create_label" => "Create New Skill",
                    "label" => "Select a Skill",
                    "add_label" => "Add Existing Skill",
                    "delete_title" => "Remove this skill."
                ],
                "reference" => [
                    "title" => "Linked References",
                    "create_title" => "Create a new reference.",
                    "create_label" => "Create New Reference",
                    "label" => "Select a Reference",
                    "add_label" => "Add Existing Reference",
                    "delete_title" => "Remove this reference."
                ],
                "sample" => [
                    "title" => "Linked Work Samples",
                    "create_title" => "Create a new work sample.",
                    "create_label" => "Create New Work Sample",
                    "label" => "Select a Work Sample",
                    "add_label" => "Add Existing Work Sample",
                    "delete_title" => "Remove this work sample."
                ],
                "project" => [
                    "title" => "Related Projects",
                    "name_label" => "Project Name",
                    "start_date_label" => "Project Started",
                    "end_date_label" => "Project Ended",
                    "add_label" => "Add Project",
                    "delete_title" => "Delete this project."
                ]
            ],
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
            ]
        ]);
    }

    /**
     * Show the Application Preview for the application for the specified job.
     *
     * @param  \App\Models\JobPoster  $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function preview(JobPoster $jobPoster) {
        $application = $this->getApplicationFromJob($jobPoster);

        return view('applicant/application_post_05', [
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
            "skill_template" => [
                "application_asset_requirement_label" => "Recommended",
                "application_essential_requirement_label" => "Required",
                "new_skill_title" => "New Skill",
                "name_label" => "Project Name",
                "type_label" => "Project Type",
                "skill_selection_label" => "Select Skill",
                "level_label" => "My Level",
                "knowledge_label" => "My Knowledge",
                "hard_levels" => [
                    "00" => "Beginner",
                    "01" => "Intermediate",
                    "02" => "Advanced",
                    "03" => "Expert"
                ],
                "soft_levels" => [
                    "00" => "In Early Development",
                    "01" => "Moderately in Evidence",
                    "02" => "Strongly in Evidence",
                    "03" => "Deep Level Demonstration"
                ],
                "action_01" => "Delete Skill",
                "action_02" => "Save Skill"
            ],
            "reference_template" => [
                "new_reference_title" => "New Reference",
                "name_label" => "Reference's Name",
                "relationship_label" => "Your Relationship",
                "relationships" => [
                    "00" => "Coworker",
                    "01" => "Supervisor",
                    "02" => "Employee"
                ],
                "email_label" => "Reference's Email",
                "description_label" => "How You Worked Together",
                "action_01" => "Delete Reference",
                "action_02" => "Save Reference"
            ],
            "sample_template" => [
                "new_sample_label" => "New Work Sample",
                "name_label" => "Project Name",
                "type_label" => "Project Type",
                "types" => [
                    "00" => "PDF",
                    "01" => "Website"
                ],
                "link_label" => "The Link to Your Work",
                "description_label" => "The Story Behind the Work",
                "linked_skills_label" => "Linked Skills",
                "search_label" => "Search Through My Skills",
                "skill_label" => "Select a Skill",
                "add_skill_label" => "Add a Skill",
                "action_01" => "Delete Sample",
                "action_02" => "Save Sample"
            ],
            "relative_template" => [
                "skill" => [
                    "title" => "Linked Skills",
                    "create_title" => "Create a new skill.",
                    "create_label" => "Create New Skill",
                    "label" => "Select a Skill",
                    "add_label" => "Add Existing Skill",
                    "delete_title" => "Remove this skill."
                ],
                "reference" => [
                    "title" => "Linked References",
                    "create_title" => "Create a new reference.",
                    "create_label" => "Create New Reference",
                    "label" => "Select a Reference",
                    "add_label" => "Add Existing Reference",
                    "delete_title" => "Remove this reference."
                ],
                "sample" => [
                    "title" => "Linked Work Samples",
                    "create_title" => "Create a new work sample.",
                    "create_label" => "Create New Work Sample",
                    "label" => "Select a Work Sample",
                    "add_label" => "Add Existing Work Sample",
                    "delete_title" => "Remove this work sample."
                ],
                "project" => [
                    "title" => "Related Projects",
                    "name_label" => "Project Name",
                    "start_date_label" => "Project Started",
                    "end_date_label" => "Project Ended",
                    "add_label" => "Add Project",
                    "delete_title" => "Delete this project."
                ]
            ],
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
            ]
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
        $application = $this->getApplicationFromJob($jobPoster);

        //TODO: save stuff to application

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
        $application = $this->getApplicationFromJob($jobPoster);

        //TODO: save stuff to application

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
        $application = $this->getApplicationFromJob($jobPoster);

        //TODO: save stuff to application

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
        $application = $this->getApplicationFromJob($jobPoster);

        //TODO: save stuff to application

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
        $application = $this->getApplicationFromJob($jobPoster);

        //TODO: Save any input (vows, etc)

        //TODO: Check that application is valid and complete

        //Change status to 'submitted'
        $application->application_status_id = ApplicationStatus::where('name', 'submitted')->firstOrFail()->id;

        //TODO: where should we redirect after submitting?
        return redirect( route('applications.index'));
    }
}
