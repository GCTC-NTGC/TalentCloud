<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

URL::forceScheme('https');

Route::group(['domain' => config('app.applicant_domain'),
    'prefix' => config('app.applicant_prefix')], function() {

    /* Home */
    Route::get('/', 'HomepageController')->name('home');

    /* Jobs */
    Route::get('jobs', 'JobController@index')->name('jobs.index');

    Route::get('jobs/{jobPoster}', 'JobController@show')
        ->middleware('can:view,jobPoster')
        ->name('jobs.show');

    /* Applications */
    Route::get('applications', function () {
        return view('applicant/application_index', [
            "application_index" => [
                "title" => "My Applications",
                "progress_title" => "Applications in Progress",
                "completed_title" => "Completed Applications",
                "expired_title" => "Expired Applications",
                "days_remaining_label" => "Days Remaining",
                "edit_date_label" => "Last Edited",
                "post_label" => "Job Post",
                "post_link_title" => "View the job post for this application",
                "post_link_label" => "View",
                "manager_profile_link_title" => "Visit this manager's profile.",
                "manager_profile_link_label" => "View Profile",
                "draft_link_title" => "Edit this application.",
                "draft_link_label" => "Edit Draft",
                "view_link_title" => "View this application.",
                "view_link_label" => "View Application",
                "delete_title" => "Delete this application.",
                "null" => [
                    "title" => "There are no applications."
                ],
                "modals" => [
                    "00" => [
                        "type" => "confirmation",
                        "title" => "Application Deletion",
                        "content" => [
                            "00" => "Are you sure you want to delete this application? All progress will be lost.",
                            "01" =>  "Experience and Skills that have been saved will remain accessible on your profile for later use."
                        ],
                        "id" => "deleteTrash",
                        "action_01" => "Cancel",
                        "action_02" => "Delete"
                    ],
                    "01" => [
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
                    "02" => [
                        "type" => "logout",
                        "title" => "Logout of Talent Cloud",
                        "content" => [
                            "00" => "Are you sure you want to logout of Talent Cloud?"
                        ],
                        "id" => "logout",
                        "action_01" => "Cancel",
                        "action_02" => "Logout"
                    ]
                ]
            ],
            "applicant" => [
                /* Tristan, I had NOOOO idea how to go about accessing data via a relationship (in this case using a job ID to access that jobs data, as well as a manager ID to access their profile link). */
                "applications" => [
                    "00" => [
                        /* Job Properties */
                        "job_title" => "User Experience Designer",
                        "job_department" => "Treasury Board of Canada Secretariat",
                        "job_days_remaining" => "8",
                        "job_post_url" => "/jobs/1",
                        /* Manager Properties */
                        "manager_profile_photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/7?v=4391",
                        "manager_name" => "Andrew Smith",
                        "manager_profile_link" => "/browse/managers/123/",
                        /* Actual Application Properties */
                        "id" => "00",
                        "status" => "draft",
                        "edit_date" => "2018/09/01"
                    ],
                    "01" => [
                        /* Job Properties */
                        "job_title" => "User Experience Designer",
                        "job_department" => "Treasury Board of Canada Secretariat",
                        "job_days_remaining" => "8",
                        "job_post_url" => "/jobs/1",
                        /* Manager Properties */
                        "manager_profile_photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/7?v=4391",
                        "manager_name" => "Andrew Smith",
                        "manager_profile_link" => "/browse/managers/123/",
                        /* Actual Application Properties */
                        "id" => "00",
                        "status" => "draft",
                        "edit_date" => "2018/09/01"
                    ],
                    "02" => [
                        /* Job Properties */
                        "job_title" => "User Experience Designer",
                        "job_department" => "Treasury Board of Canada Secretariat",
                        "job_days_remaining" => "8",
                        "job_post_url" => "/jobs/1",
                        /* Manager Properties */
                        "manager_profile_photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/7?v=4391",
                        "manager_name" => "Andrew Smith",
                        "manager_profile_link" => "/browse/managers/123/",
                        /* Actual Application Properties */
                        "id" => "00",
                        "status" => "draft",
                        "edit_date" => "2018/09/01"
                    ],
                    "03" => [
                        /* Job Properties */
                        "job_title" => "User Experience Designer",
                        "job_department" => "Treasury Board of Canada Secretariat",
                        "job_days_remaining" => "8",
                        "job_post_url" => "/jobs/1",
                        /* Manager Properties */
                        "manager_profile_photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/7?v=4391",
                        "manager_name" => "Andrew Smith",
                        "manager_profile_link" => "/browse/managers/123/",
                        /* Actual Application Properties */
                        "id" => "00",
                        "status" => "completed",
                        "edit_date" => "2018/09/01"
                    ],
                    "04" => [
                        /* Job Properties */
                        "job_title" => "User Experience Designer",
                        "job_department" => "Treasury Board of Canada Secretariat",
                        "job_days_remaining" => "8",
                        "job_post_url" => "/jobs/1",
                        /* Manager Properties */
                        "manager_profile_photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/7?v=4391",
                        "manager_name" => "Andrew Smith",
                        "manager_profile_link" => "/browse/managers/123/",
                        /* Actual Application Properties */
                        "id" => "00",
                        "status" => "completed",
                        "edit_date" => "2018/09/01"
                    ]
                ]
            ]
        ]);
        })->name('applications.index');

    /* Step 01 */
    Route::get('applications/00/step-01', function () {
        return view('applicant/application_post_01', [
            "application" => [
                "id" => "00",
                "title" => "Apply Now",
                "step" => "1",
                "job_context_copy" => "You are applying for:",
                "tracker_job_link_title" => "Visit this job's post.",
                "tracker_label" => "Step",
                "tracker_link_title" => "Go to step",
                "tracker" => [
                    "00" => [
                        "step" => "1",
                        "title" => "My Information",
                        "status" => "error",
                        "url" => "/step-01/"
                    ],
                    "01" => [
                        "step" => "2",
                        "title" => "My Experience",
                        "status" => "complete",
                        "url" => "/step-02/"
                    ],
                    "02" => [
                        "step" => "3",
                        "title" => "Skills: Need to Have",
                        "status" => "complete",
                        "url" => "/step-03/"
                    ],
                    "03" => [
                        "step" => "4",
                        "title" => "Skills: Nice to Have",
                        "status" => "incomplete",
                        "url" => "/step-04/"
                    ],
                    "04" => [
                        "step" => "5",
                        "title" => "Review my Application",
                        "status" => "incomplete",
                        "url" => "/step-05/"
                    ]
                ],
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
                "photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/10?v=7661",
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
            /* Same with this - job ID - and then we pull what we need */
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
            ]
        ]);
    })->name('applications.edit.1');

    /* Step 02 */
    Route::get('applications/00/step-02', function () {
        return view('applicant/application_post_02', [
            "application" => [
                "id" => "00",
                "title" => "Apply Now",
                "step" => "2",
                "job_context_copy" => "You are applying for:",
                "tracker_job_link_title" => "Visit this job's post.",
                "tracker_label" => "Step",
                "tracker_link_title" => "Go to step",
                "tracker" => [
                    "00" => [
                        "step" => "1",
                        "title" => "My Information",
                        "status" => "error",
                        "url" => "/step-01/"
                    ],
                    "01" => [
                        "step" => "2",
                        "title" => "My Experience",
                        "status" => "complete",
                        "url" => "/step-02/"
                    ],
                    "02" => [
                        "step" => "3",
                        "title" => "Skills: Need to Have",
                        "status" => "complete",
                        "url" => "/step-03/"
                    ],
                    "03" => [
                        "step" => "4",
                        "title" => "Skills: Nice to Have",
                        "status" => "incomplete",
                        "url" => "/step-04/"
                    ],
                    "04" => [
                        "step" => "5",
                        "title" => "Review my Application",
                        "status" => "incomplete",
                        "url" => "/step-05/"
                    ]
                ],
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
                "photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/10?v=7661",
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
            /* Same with this - job ID - and then we pull what we need */
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
                ],
                "questions" => [
                    "00" => [
                        "value" => "Why are you interested in this job?",
                        "description" => "We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
                        "input_name" => "jobPostQuestion0",
                        "answer_label" => "Your Answer",
                        "answer" => null
                    ],
                    "01" => [
                        "value" => "Why are you the right person for this job?",
                        "description" => "Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
                        "input_name" => "jobPostQuestion1",
                        "answer_label" => "Your Answer",
                        "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
                    ]
                ]
            ]
        ]);
    })->name('applications.edit.2');

    /* Step 03 */
    Route::get('applications/00/step-03', function () {
        return view('applicant/application_post_03', [
            "application" => [
                "id" => "00",
                "title" => "Apply Now",
                "step" => "3",
                "job_context_copy" => "You are applying for:",
                "tracker_job_link_title" => "Visit this job's post.",
                "tracker_label" => "Step",
                "tracker_link_title" => "Go to step",
                "skills_section" => [
                    "essential_title" => "Need to Have",
                    "asset_title" => "Nice to Have",
                    "add_button_label" => "Add Skill",
                    "null_copy" => "You don't currently have any skills on your profile! Use the button above to add a skill."
                ],
                "tracker" => [
                    "00" => [
                        "step" => "1",
                        "title" => "My Information",
                        "status" => "error",
                        "url" => "/step-01/"
                    ],
                    "01" => [
                        "step" => "2",
                        "title" => "My Experience",
                        "status" => "complete",
                        "url" => "/step-02/"
                    ],
                    "02" => [
                        "step" => "3",
                        "title" => "Skills: Need to Have",
                        "status" => "complete",
                        "url" => "/step-03/"
                    ],
                    "03" => [
                        "step" => "4",
                        "title" => "Skills: Nice to Have",
                        "status" => "incomplete",
                        "url" => "/step-04/"
                    ],
                    "04" => [
                        "step" => "5",
                        "title" => "Review my Application",
                        "status" => "incomplete",
                        "url" => "/step-05/"
                    ]
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
                "photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/10?v=7661",
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
            /* Same with this - job ID - and then we pull what we need */
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
                ],
                "questions" => [
                    "00" => [
                        "value" => "Why are you interested in this job?",
                        "description" => "We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
                        "input_name" => "jobPostQuestion0",
                        "answer_label" => "Your Answer",
                        "answer" => null
                    ],
                    "01" => [
                        "value" => "Why are you the right person for this job?",
                        "description" => "Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
                        "input_name" => "jobPostQuestion1",
                        "answer_label" => "Your Answer",
                        "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
                    ]
                ],
                "skills" => [
                    "00" => [
                        "name" => "HTML",
                        "requirement" => "essential",
                        "level" => "Intermediate"
                    ],
                    "01" => [
                        "name" => "JavaScript",
                        "requirement" => "essential",
                        "level" => "Moderately in Evidence"
                    ],
                    "02" => [
                        "name" => "CSS",
                        "requirement" => "essential",
                        "level" => "Advanced"
                    ],
                    "03" => [
                        "name" => "Laravel",
                        "requirement" => "essential",
                        "level" => "Intermediate"
                    ],
                    "04" => [
                        "name" => "Docker",
                        "requirement" => "asset",
                        "level" => "In Early Development"
                    ],
                    "05" => [
                        "name" => "Responsive Web Design",
                        "requirement" => "asset",
                        "level" => "In Early Development"
                    ],
                    "06" => [
                        "name" => "Adobe XD",
                        "requirement" => "asset",
                        "level" => "In Early Development"
                    ]
                ]
            ],
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
    })->name('applications.edit.3');

    /* Step 04 */
    Route::get('applications/00/step-04', function () {
        return view('applicant/application_post_04', [
            "application" => [
                "id" => "00",
                "title" => "Apply Now",
                "step" => "4",
                "job_context_copy" => "You are applying for:",
                "tracker_job_link_title" => "Visit this job's post.",
                "tracker_label" => "Step",
                "tracker_link_title" => "Go to step",
                "skills_section" => [
                    "essential_title" => "Need to Have",
                    "asset_title" => "Nice to Have",
                    "add_button_label" => "Add Skill",
                    "null_copy" => "You don't currently have any skills on your profile! Use the button above to add a skill."
                ],
                "tracker" => [
                    "00" => [
                        "step" => "1",
                        "title" => "My Information",
                        "status" => "error",
                        "url" => "/step-01/"
                    ],
                    "01" => [
                        "step" => "2",
                        "title" => "My Experience",
                        "status" => "complete",
                        "url" => "/step-02/"
                    ],
                    "02" => [
                        "step" => "3",
                        "title" => "Skills: Need to Have",
                        "status" => "complete",
                        "url" => "/step-03/"
                    ],
                    "03" => [
                        "step" => "4",
                        "title" => "Skills: Nice to Have",
                        "status" => "incomplete",
                        "url" => "/step-04/"
                    ],
                    "04" => [
                        "step" => "5",
                        "title" => "Review my Application",
                        "status" => "incomplete",
                        "url" => "/step-05/"
                    ]
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
                "photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/10?v=7661",
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
            /* Same with this - job ID - and then we pull what we need */
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
                ],
                "questions" => [
                    "00" => [
                        "value" => "Why are you interested in this job?",
                        "description" => "We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
                        "input_name" => "jobPostQuestion0",
                        "answer_label" => "Your Answer",
                        "answer" => null
                    ],
                    "01" => [
                        "value" => "Why are you the right person for this job?",
                        "description" => "Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
                        "input_name" => "jobPostQuestion1",
                        "answer_label" => "Your Answer",
                        "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
                    ]
                ],
                "skills" => [
                    "00" => [
                        "name" => "HTML",
                        "requirement" => "essential",
                        "level" => "Intermediate"
                    ],
                    "01" => [
                        "name" => "JavaScript",
                        "requirement" => "essential",
                        "level" => "Moderately in Evidence"
                    ],
                    "02" => [
                        "name" => "CSS",
                        "requirement" => "essential",
                        "level" => "Advanced"
                    ],
                    "03" => [
                        "name" => "Laravel",
                        "requirement" => "essential",
                        "level" => "Intermediate"
                    ],
                    "04" => [
                        "name" => "Docker",
                        "requirement" => "asset",
                        "level" => "In Early Development"
                    ],
                    "05" => [
                        "name" => "Responsive Web Design",
                        "requirement" => "asset",
                        "level" => "In Early Development"
                    ],
                    "06" => [
                        "name" => "Adobe XD",
                        "requirement" => "asset",
                        "level" => "In Early Development"
                    ]
                ]
            ],
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
    })->name('applications.edit.4');

    /* Step 05 */
    Route::get('applications/00/step-05', function () {
        return view('applicant/application_post_05', [
            "application" => [
                "id" => "00",
                "title" => "Apply Now",
                "step" => "5",
                "job_context_copy" => "You are applying for:",
                "tracker_job_link_title" => "Visit this job's post.",
                "tracker_label" => "Step",
                "tracker_link_title" => "Go to step",
                "skills_section" => [
                    "essential_title" => "Need to Have",
                    "asset_title" => "Nice to Have",
                    "add_button_label" => "Add Skill",
                    "null_copy" => "You don't currently have any skills on your profile! Use the button above to add a skill."
                ],
                "tracker" => [
                    "00" => [
                        "step" => "1",
                        "title" => "My Information",
                        "status" => "error",
                        "url" => "/step-01/"
                    ],
                    "01" => [
                        "step" => "2",
                        "title" => "My Experience",
                        "status" => "complete",
                        "url" => "/step-02/"
                    ],
                    "02" => [
                        "step" => "3",
                        "title" => "Skills: Need to Have",
                        "status" => "complete",
                        "url" => "/step-03/"
                    ],
                    "03" => [
                        "step" => "4",
                        "title" => "Skills: Nice to Have",
                        "status" => "incomplete",
                        "url" => "/step-04/"
                    ],
                    "04" => [
                        "step" => "5",
                        "title" => "Review my Application",
                        "status" => "incomplete",
                        "url" => "/step-05/"
                    ]
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
                "photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/10?v=7661",
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
            /* Same with this - job ID - and then we pull what we need */
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
                ],
                "questions" => [
                    "00" => [
                        "value" => "Why are you interested in this job?",
                        "description" => "We want to know why you are interested in this job instead of other similar ones. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
                        "input_name" => "jobPostQuestion0",
                        "answer_label" => "Your Answer",
                        "answer" => null
                    ],
                    "01" => [
                        "value" => "Why are you the right person for this job?",
                        "description" => "Tell us what makes you unique. Why should you stand out from other candidates. This information will be used to help inform a decision to choose between fully qualified candidates at the end of the selection process.",
                        "input_name" => "jobPostQuestion1",
                        "answer_label" => "Your Answer",
                        "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci."
                    ]
                ],
                "skills" => [
                    "00" => [
                        "name" => "HTML",
                        "requirement" => "essential",
                        "level" => "Intermediate"
                    ],
                    "01" => [
                        "name" => "JavaScript",
                        "requirement" => "essential",
                        "level" => "Moderately in Evidence"
                    ],
                    "02" => [
                        "name" => "CSS",
                        "requirement" => "essential",
                        "level" => "Advanced"
                    ],
                    "03" => [
                        "name" => "Laravel",
                        "requirement" => "essential",
                        "level" => "Intermediate"
                    ],
                    "04" => [
                        "name" => "Docker",
                        "requirement" => "asset",
                        "level" => "In Early Development"
                    ],
                    "05" => [
                        "name" => "Responsive Web Design",
                        "requirement" => "asset",
                        "level" => "In Early Development"
                    ],
                    "06" => [
                        "name" => "Adobe XD",
                        "requirement" => "asset",
                        "level" => "In Early Development"
                    ]
                ]
            ],
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
    })->name('applications.edit.5');

    /* Managers */
    Route::get('browse/managers/{manager}', function () {
        return view('applicant/manager', [
            "manager_profile" => [
                "title" => "Manager Profile",
                "manager_department_bridge" => " at ",
            ],
            "manager" => [
                "name" => "Jason Greene",
                "title" => "Project Manager",
                "department" => "Treasury Board of Canada Secretariat",
                "tagline" => "This is Jason's default tagline.",
                "photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/10?v=7661",
                "twitter" => [
                    "url" => "https://twitter.com/joshdrink",
                    "title" => "Visit Jason's Twitter profile."
                ],
                "linkedin" => [
                    "url" => "https://linkedin.com/joshdrink",
                    "title" => "Visit Jason's Linkedin profile."
                ],
                "profile_sections" => [
                    "00" => [
                        "title" => "My Approach as a Manager",
                        "questions" => [
                            "00" => [
                                "title" => "My Leadership Style and Management Values",
                                "answer" => null
                            ],
                            "01" => [
                                "title" => "What I Expect from My Employees",
                                "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut ante aliquet felis finibus luctus. Vivamus justo ante, convallis id justo sed, venenatis ornare magna. Maecenas tempor nunc sit amet mollis venenatis. Proin vitae nunc interdum, porttitor leo a, mollis diam. Sed auctor ultricies massa at aliquam."
                            ],
                            "02" => [
                                "title" => "My Approach to Employee Learning and Development",
                                "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut ante aliquet felis finibus luctus. Vivamus justo ante, convallis id justo sed, venenatis ornare magna. Maecenas tempor nunc sit amet mollis venenatis. Proin vitae nunc interdum, porttitor leo a, mollis diam. Sed auctor ultricies massa at aliquam."
                            ]
                        ]
                    ],
                    "01" => [
                        "title" => "About Me",
                        "questions" => [
                            "00" => [
                                "title" => "My Career Journey So Far",
                                "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut ante aliquet felis finibus luctus. Vivamus justo ante, convallis id justo sed, venenatis ornare magna. Maecenas tempor nunc sit amet mollis venenatis. Proin vitae nunc interdum, porttitor leo a, mollis diam. Sed auctor ultricies massa at aliquam."
                            ],
                            "01" => [
                                "title" => "My Learning Path",
                                "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut ante aliquet felis finibus luctus. Vivamus justo ante, convallis id justo sed, venenatis ornare magna. Maecenas tempor nunc sit amet mollis venenatis. Proin vitae nunc interdum, porttitor leo a, mollis diam. Sed auctor ultricies massa at aliquam."
                            ],
                            "02" => [
                                "title" => "A Bit About Me Outside Work",
                                "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut ante aliquet felis finibus luctus. Vivamus justo ante, convallis id justo sed, venenatis ornare magna. Maecenas tempor nunc sit amet mollis venenatis. Proin vitae nunc interdum, porttitor leo a, mollis diam. Sed auctor ultricies massa at aliquam."
                            ]
                        ]
                    ]
                ]
            ]
        ]);
    })->name('managers.show');

    /* Profile */
    Route::middleware(['auth', 'role:applicant'])->group(function(){

        Route::get('profile', function() {
            $applicant = Auth::user()->applicant;
            return redirect(route('profile.about.edit', $applicant));
        })->name('profile');

        Route::get('profile/about', function() {
            $applicant = Auth::user()->applicant;
            return redirect( route('profile.about.edit', $applicant) );
        });

        /* Profile - About Me */
        Route::get('profile/{applicant}/about', 'ApplicantProfileController@edit')
            ->middleware('can:view,applicant')
            ->middleware('can:update,applicant')
            ->name('profile.about.edit');

        Route::get('profile/experience', function() {
            $applicant = Auth::user()->applicant;
            return redirect( route('profile.experience.edit', $applicant) );
        });

        /* Profile - My Experience */
        Route::get('profile/{applicant}/experience', 'ExperienceController@edit')
            ->middleware('can:view,applicant')
            ->middleware('can:update,applicant')
            ->name('profile.experience.edit');

        /* Profile - My Experience */
        Route::post('profile/{applicant}/experience/update', 'ExperienceController@update')
            ->middleware('can:update,applicant')
            ->name('profile.experience.update');

        Route::get('profile/skills', function() {
            $applicant = Auth::user()->applicant;
            return redirect( route('profile.skills.edit', $applicant) );
        });

        /* Profile - My Skills */
        Route::get('profile/{applicant}/skills', 'SkillsController@edit')
            ->middleware('can:view,applicant')
            ->middleware('can:update,applicant')
            ->name('profile.skills.edit');

        Route::post('profile/{applicant}/skills/update', 'SkillsController@update')
            ->middleware('can:update,applicant')
            ->name('profile.skills.update');

        /* Profile - My References */
        Route::get('profile/references', function () {
            return view('applicant/profile_04_references', [
                'applicant' => [
                    "id" => 1
                ],
                "profile" => [
                    "title" => "My References",
                    "experience_section" => [
                    ],
                    "skills_section" => [
                    ],
                    "reference_section" => [
                        "section_title" => "My References",
                        "section_description" => "By submitting a reference you agree to having first asked their permission to provide their information. Please note that all information provided within a reference might be sent to said reference during a hiring process.",
                        "add_button_label" => "Add Reference",
                        "null_copy" => "You don't currently have any references in your portfolio! Use the button above to add a reference."
                    ],
                    "sample_section" => [
                    ],
                    "menu" => [
                        "00" => [
                            "active" => false,
                            "link" => "/profile/about",
                            "title" => "Go to the About Me section of your profile.",
                            "label" => "About Me"
                        ],
                        "01" => [
                            "active" => false,
                            "link" => "/profile/experience",
                            "title" => "Go to the Experience section of your profile.",
                            "label" => "My Experience"
                        ],
                        "02" => [
                            "active" => false,
                            "link" => "/profile/skills",
                            "title" => "Go to the Skills section of your profile.",
                            "label" => "My Skills"
                        ],
                        "03" => [
                            "active" => true,
                            "link" => "/profile/references",
                            "title" => "Go to the References section of your profile.",
                            "label" => "My References"
                        ],
                        "04" => [
                            "active" => false,
                            "link" => "/profile/portfolio",
                            "title" => "Go to the Portfolio section of your profile.",
                            "label" => "My Portfolio"
                        ]
                    ],
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
                            "title" => "Delete this Reference?",
                            "content" => [
                                "00" => "Are you sure you want to permanently delete this reference from your profile?",
                                "01" => "All previously submitted applications will retain this reference."
                            ],
                            "id" => "deleteReference",
                            "action_01" => "Cancel",
                            "action_02" => "Delete"
                        ]
                    ]
                ],
                "user" => [
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
                    ]
                ]
            ]);
        })->name('references.edit');

        /* Profile - My Portfolio */
        Route::get('profile/portfolio', function () {
            return view('applicant/profile_05_portfolio', [
                'applicant' => [
                    "id" => 1
                ],
                "profile" => [
                    "title" => "My Portfolio",
                    "experience_section" => [
                    ],
                    "skills_section" => [
                        "soft_title" => "My Soft Skills",
                        "hard_title" => "My Hard Skills",
                        "add_button_label" => "Add Skill",
                        "null_copy" => "You don't currently have any skills on your profile! Use the button above to add a skill."
                    ],
                    "reference_section" => [
                        "section_title" => "My References",
                        "section_description" => "By submitting a reference you agree to having first asked their permission to provide their information. Please note that all information provided within a reference might be sent to said reference during a hiring process.",
                        "add_button_label" => "Add Reference",
                        "null_copy" => "You don't currently have any references in your portfolio! Use the button above to add a reference."
                    ],
                    "sample_section" => [
                        "section_title" => "My Work Samples",
                        "add_button_label" => "Add Sample",
                        "null_copy" => "You don't currently have any work samples in your portfolio! Use the button above to add a work sample."
                    ],
                    "menu" => [
                        "00" => [
                            "active" => false,
                            "link" => "/profile/about",
                            "title" => "Go to the About Me section of your profile.",
                            "label" => "About Me"
                        ],
                        "01" => [
                            "active" => false,
                            "link" => "/profile/experience",
                            "title" => "Go to the Experience section of your profile.",
                            "label" => "My Experience"
                        ],
                        "02" => [
                            "active" => false,
                            "link" => "/profile/skills",
                            "title" => "Go to the Skills section of your profile.",
                            "label" => "My Skills"
                        ],
                        "03" => [
                            "active" => false,
                            "link" => "/profile/references",
                            "title" => "Go to the References section of your profile.",
                            "label" => "My References"
                        ],
                        "04" => [
                            "active" => true,
                            "link" => "/profile/portfolio",
                            "title" => "Go to the Portfolio section of your profile.",
                            "label" => "My Portfolio"
                        ]
                    ],
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
                            "title" => "Delete this Work Sample?",
                            "content" => [
                                "00" => "Are you sure you want to permanently delete this work sample from your portfolio?",
                                "01" => "All previously submitted applications will retain this work sample, however new applications or applications in progress will no longer include it."
                            ],
                            "id" => "deleteSample",
                            "action_01" => "Cancel",
                            "action_02" => "Delete"
                        ]
                    ]
                ],
                "user" => [
                    "skills" => [
                        "00" => [
                            "name" => "HTML",
                            "type" => "hard",
                            "references" => [
                                "00" => "Mark Hamill"
                            ],
                            "samples" => [
                                "00" => "My Website"
                            ]
                        ],
                        "01" => [
                            "name" => "CSS",
                            "type" => "hard",
                            "references" => [
                                "00" => "Mark Hamill"
                            ],
                            "samples" => [
                                "00" => "My Website"
                            ]
                        ]
                    ],
                    "portfolio" => [
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
                        "label" => "Select a Skill",
                        "add_label" => "Add a Skill",
                        "delete_title" => "Remove this skill."
                    ],
                    "reference" => [
                        "title" => "Linked References",
                        "label" => "Select a Reference",
                        "add_label" => "Add a Reference",
                        "delete_title" => "Remove this reference."
                    ],
                    "sample" => [
                        "title" => "Linked Work Samples",
                        "label" => "Select a Work Sample",
                        "add_label" => "Add a Work Sample",
                        "delete_title" => "Remove this work sample."
                    ]
                ],
                "skills" => [
                    "00" => "UX Research",
                    "01" => "Youth Leadership",
                    "02" => "Reading Comprehension",
                    "03" => "HTML",
                    "04" => "CSS",
                    "05" => "UX Surveying"
                ]
            ]);
        })->name('portfolio.edit');

        Route::get('profile/{applicant}/edit', 'ApplicantProfileController@edit')
            ->middleware('can:view,applicant')
            ->middleware('can:update,applicant')
            ->name('profile.edit');

        Route::post('profile/{applicant}/update','ApplicantProfileController@update')
            ->middleware('can:update,applicant')
            ->name('profile.update');

    });

    /* Authentication =========================================================== */

    Route::get('login', 'LoginController@login')->middleware('guest')->name('login');

    Route::get('logout', 'LoginController@logout')->name('logout');

    Route::get('logout/callback', 'LoginController@logoutCallback')->name('logout.callback');

    Route::get('register', function() {
        return redirect('https://account.gccollab.ca/register/');
    })->middleware('guest')->name('register');

});


/* Manager Portal =========================================================== */

$managerGroup = function() {
    /* Home */
    Route::get('/', function () {
        return view('manager/home', [

        ]);
    })->name('manager.home');

    Route::middleware(['auth', 'role:manager'])->group(function(){

        Route::get('profile', function() {
            $manager = Auth::user()->manager;
            return redirect()->route('manager.profile.edit', $manager);
        })->name('manager.profile');

        /* Profile */
        Route::get('profile/{manager}/edit', 'ManagerProfileController@edit')
            ->middleware('can:view,manager')
            ->middleware('can:update,manager')
            ->name('manager.profile.edit');

        Route::post('profile/{manager}/update', 'ManagerProfileController@update')
            ->middleware('can:update,manager')
            ->name('manager.profile.update');


        /* Job Index */
        Route::get('jobs', function () {
            return view('manager/job_index', [
                "manager_job_index" => [
                    "title" => "My Job Posts"
                ],
                "user" => [
                    "posts" => [
                        "00" => [
                            "status" => "draft",
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
                            "end_date" => "2018-04-09",
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
                        ],
                        "01" => [
                            "status" => "draft",
                            "link" => "/browse/jobs/00/",
                            "title" => "Back-end Developer",
                            "department" => "Treasury Board of Canada Secretariat",
                            "city" => "Ottawa",
                            "province" => "Ontario",
                            "salary" => "80,000 - 120,000",
                            "duration" => "1 Year",
                            "remote" => "Allowed",
                            "telework" => "Allowed",
                            "time_flexibility" => "Allowed",
                            "end_date" => "2018-04-09",
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
                        ],
                        "02" => [
                            "status" => "active",
                            "link" => "/browse/jobs/00/",
                            "title" => "UX Designer",
                            "department" => "Treasury Board of Canada Secretariat",
                            "city" => "Ottawa",
                            "province" => "Ontario",
                            "salary" => "80,000 - 120,000",
                            "duration" => "1 Year",
                            "remote" => "Allowed",
                            "telework" => "Allowed",
                            "time_flexibility" => "Allowed",
                            "end_date" => "2018-04-09",
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
                            "applicants" => [
                                "00" => [
                                    "name" => "Jake McMahon",
                                    "link" => "http://google.com",
                                    "application_link" => "http://google.com"
                                ],
                                "01" => [
                                    "name" => "Jake McMahon",
                                    "link" => "http://google.com",
                                    "application_link" => "http://google.com"
                                ],
                                "02" => [
                                    "name" => "Jake McMahon",
                                    "link" => "http://google.com",
                                    "application_link" => "http://google.com"
                                ],
                                "03" => [
                                    "name" => "Jake McMahon",
                                    "link" => "http://google.com",
                                    "application_link" => "http://google.com"
                                ],
                                "04" => [
                                    "name" => "Jake McMahon",
                                    "link" => "http://google.com",
                                    "application_link" => "http://google.com"
                                ]
                            ]
                        ],
                        "03" => [
                            "status" => "active",
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
                            "end_date" => "2018-04-09",
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
                            "applicants" => [
                                "00" => [
                                    "name" => "Jake McMahon",
                                    "link" => "http://google.com",
                                    "application_link" => "http://google.com"
                                ],
                                "01" => [
                                    "name" => "Jake McMahon",
                                    "link" => "http://google.com",
                                    "application_link" => "http://google.com"
                                ],
                                "02" => [
                                    "name" => "Jake McMahon",
                                    "link" => "http://google.com",
                                    "application_link" => "http://google.com"
                                ],
                                "03" => [
                                    "name" => "Jake McMahon",
                                    "link" => "http://google.com",
                                    "application_link" => "http://google.com"
                                ],
                                "04" => [
                                    "name" => "Jake McMahon",
                                    "link" => "http://google.com",
                                    "application_link" => "http://google.com"
                                ]
                            ]
                        ],
                        "04" => [
                            "status" => "closed",
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
                            "end_date" => "2018-04-09",
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
                    ]
                ]
            ]);
        })->name('manager.jobs.index');

        /* Create Job */
        Route::get('jobs/create', 'JobController@create')
            ->middleware('can:create,App\Models\JobPoster')
            ->name('manager.jobs.create');

        Route::post('jobs', 'JobController@store')
            ->middleware('can:create,App\Models\JobPoster')
            ->name('manager.jobs.store');


    });

    /* Authentication =========================================================== */

    Route::get('login', 'LoginController@login')->middleware('guest')->name('manager.login');

    Route::get('logout', 'LoginController@logout')->name('manager.logout');

    Route::get('logout/callback', 'LoginController@logoutCallback')->name('manager.logout.callback');

    Route::get('register', function() {
        return redirect('https://account.gccollab.ca/register/');
    })->middleware('guest')->name('manager.register');
};

Route::group(['domain' => config('app.manager_domain'),
    'prefix' => config('app.manager_prefix')], $managerGroup);
//Route::group(['domain' => 'hr.tc.gccollab.ca'], $managerGroup);


/* Testing ================================================================== */

Route::get('laravel', function () {
    if (Auth::check()) {
        $user = Auth::user();
    } else {
        $user = (object)['name' => 'login failed'];
    }
    return view('welcome', ['t1' => $user->name]);
})->name('test');

/* Language ================================================================= */

Route::get('fr', function() {
    //TODO
    return redirect()->home();
})->name('lang.fr');

Route::get('en', function() {
    //TODO
    return redirect()->home();
})->name('lang.en');
