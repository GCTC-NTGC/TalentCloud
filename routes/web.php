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

/* Home */
Route::get('/', 'Applicant\HomepageController')->name('home');

/* Jobs */
Route::get('jobs', 'Applicant\JobController@index')->name('jobs.index');

Route::get('jobs/{id}', function () {
    return view('applicant/job_post', [
        /* Template */
        "job_post" => [
            "title" => "Browse Jobs",
            "days_remaining_label" => "Days Remaining",
            "applicants_label" => "Applicants", 
            "location_icon_label" => "Location Icon.",
            "remote_icon_label" => "Remote Work Icon.",
            "reference_id_label" => "Reference ID #",
            "remote_label" => "Remote Work",
            "sidebar_label" => "About this job:",
            "basics" => [
                "sidebar_title" => "View this job's basic information.",
                "title" => "Basic Information",
                "salary_label" => "Salary Range",
                "duration_label" => "Duration",
                "start_label" => "Target Start Date",
                "language_label" => "Language Requirement",
                "security_label" => "Security Clearance",
                "classification_label" => "Government Classification"
            ],
            "impact" => [
                "sidebar_title" => "View this job's impact information.",
                "title" => "Impact"
            ],
            "work" => [
                "sidebar_title" => "View this job's work information.",
                "title" => "Your Work"
            ],
            "criteria" => [
                "sidebar_title" => "View this job's criteria information.",
                "title" => "Criteria",
                "essential_title" => "Need to Have",
                "asset_title" => "Nice to Have"
            ],
            "culture" => [
                "sidebar_title" => "View this job's culture information.",
                "title" => "Team Culture",
                "manager_title" => "Your Manager",
                "manager_department_bridge" => " at ",
                "manager_link_label" => "View Profile",
                "work_environment_label" => "Work Environment",
                "team_narrative_label" => "Things to Know",
                "telework_label" => "Telework",
                "time_flexibility_label" => "Flex Hours",
                "team_culture_label" => "Team Culture",
                "team_size_label" => "Team Size",
                "gcdirectory_label" => "Meet the Team in GC Directory",
                "team_link_title" => "View this team's profile.",
                "team_link_label" => "Team Profile",
                "operating_label" => "Our Operating Context",
                "team_value_label" => "What We Value",
                "team_work_label" => "How We Work"
            ],
            "know" => [
                "sidebar_title" => "View this job's extra information.",
                "title" => "Nice to Know"
            ],
            "apply" => [
                "sidebar_title" => "View this job's application section.",
                "title" => "Apply Now",
                "accommodation" => "Please advise Talent Cloud at talent.cloud-nuage.de.talents@tbs-sct.gc.ca of any accommodations you may require during the application process.",
                "preference" => "Preference will be given to veterans and to Canadian citizens, in that order.",
                "apply_link_title" => "Apply to this job.",
                "apply_link_label" => "Apply Now",
                "login_link_title" => "Log in to apply for this job.",
                "login_link_label" => "Login & Apply"
            ]
        ],
        /* This should probably just be a manager ID, and then we can pull all this data through that. */
        "manager" => [
            "name" => "Hiro Yamanaka",
            "url" => "/browse/managers/123/",
            /* Tristan, this will have to be one of your fancy partials as it doesn't belong as a property of the manager. */
            "photo_title" => "Hiro's profile photo.",
            "photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/7?v=4391",
            "title" => "Project Manager",
            "department" => "Treasury Board of Canada Secretariat",
            /* Tristan, this will have to be one of your fancy partials as it doesn't belong as a property of the manager. */
            "link_title" => "View Hiro's Profile.",
            "about_me" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            "team_narrative" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            "work_env_0" => [
                "url" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/getWorkplacePhotoByManagerProfileAndName/14/workplace_photo_1",
                "title" => "This is work environment photo 1."
            ],
            "work_env_1" => [
                "url" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/getWorkplacePhotoByManagerProfileAndName/14/workplace_photo_2",
                "title" => "This is work environment photo 2."
            ],
            "work_env_2" => [
                "url" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/getWorkplacePhotoByManagerProfileAndName/14/workplace_photo_3",
                "title" => "This is work environment photo 3."
            ],
            "team_size" => "12",
            "team_link" => "https://gccollab.ca/groups/profile/19750/talent-cloud-nuage-de-talent",
            "team_context" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            "team_value" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat.",
            "team_work" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat."
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
            ]
        ]
    ]);
})->name('jobs.show');

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
})->name('application.index');

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
            "question_title" => "My Fit",
            "save_quit_button_label" => "Save & Quit",
            "save_continue_button_label" => "Save & Continue",
            "language_title" => "Language Requirement",
            "language_copy" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci.",
            "language_agree" => "I Agree",
            "language_disagree" => "I Disagree"
        ],
        "user" => [
            "name" => "Jason Greene",
            "photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/10?v=7661"
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
})->name('application.post01');

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
            "experience" => [
                "title" => "My Experience",
                "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci.",
                "degree_label" => "Diploma / Degree",
                "degree_label_bridge" => "in",
                "degree_type_label" => "Degree Type",
                "degree_options" => [
                    "00" => "Bachelor's Degree",
                    "01" => "Certificate",
                    "02" => "Diploma",
                    "03" => "Master's Degree",
                    "04" => "PhD"
                ],
                "area_of_study_label" => "Area of Study",
                "institution_label" => "Institution Name",
                "start_date_label" => "Start Date",
                "end_date_label" => "End Date",
                "delete_button_label" => "Delete This",
                "save_button_label" => "Save This",
                "course_label" => "Course",
                "course_name_label" => "Course Name",
                "lived_label" => "Lived",
                "role_label" => "Role",
                "group_label" => "Group / Company Name",
                "description_label" => "Description",
                "add_degree_label" => "Add a Diploma / Degree",
                "add_course_label" => "Add a Course",
                "add_work_label" => "Add Lived Experience"
            ],
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
            "declarations" => [
                "00" => [
                    "skill_id" => "000",
                    "status" => "complete",
                    "expertise" => "2",
                    "experience" => "3",
                    "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ]
            ],
            "experience" => [
                "00" => [
                    "type" => "degree",
                    "level" => "diploma",
                    "area_of_study" => "Psychology",
                    "institution" => "Sample University",
                    "start_date" => "2018-01-01",
                    "end_date" => "2018-01-02"
                ],
                "01" => [
                    "type" => "course",
                    "course_name" => "Experimental Physics and their Properties",
                    "institution" => "Sample University",
                    "start_date" => "2018-01-01",
                    "end_date" => "2018-01-02"
                ],
                "02" => [
                    "type" => "work",
                    "role" => "Front-end Developer",
                    "group" => "Government of Canada",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.",
                    "start_date" => "2018-01-01",
                    "end_date" => "2018-01-02"
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
                    "id" => "000",
                    "title" => "HTML5",
                    "type" => "essential",
                    "status" => "complete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "01" => [
                    "id" => "001",
                    "title" => "JavaScript",
                    "type" => "essential",
                    "status" => "incomplete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "02" => [
                    "id" => "002",
                    "title" => "CSS3 & Sass",
                    "type" => "essential",
                    "status" => "incomplete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "03" => [
                    "id" => "003",
                    "title" => "Laravel",
                    "type" => "essential",
                    "status" => "incomplete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "04" => [
                    "id" => "004",
                    "title" => "Docker",
                    "type" => "asset",
                    "status" => "incomplete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "05" => [
                    "id" => "005",
                    "title" => "Responsive Web Design",
                    "type" => "asset",
                    "status" => "complete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "06" => [
                    "id" => "006",
                    "title" => "Adobe XD",
                    "type" => "asset",
                    "status" => "incomplete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ]
            ]
        ]
    ]);
})->name('application.post02');

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
            "declarations" => [
                "00" => [
                    "skill_id" => "000",
                    "status" => "complete",
                    "expertise" => "2",
                    "experience" => "3",
                    "knowledge" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
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
                    "id" => "000",
                    "title" => "HTML5",
                    "type" => "essential",
                    "status" => "complete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "01" => [
                    "id" => "001",
                    "title" => "JavaScript",
                    "type" => "essential",
                    "status" => "incomplete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "02" => [
                    "id" => "002",
                    "title" => "CSS3 & Sass",
                    "type" => "essential",
                    "status" => "incomplete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "03" => [
                    "id" => "003",
                    "title" => "Laravel",
                    "type" => "essential",
                    "status" => "incomplete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "04" => [
                    "id" => "004",
                    "title" => "Docker",
                    "type" => "asset",
                    "status" => "incomplete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "05" => [
                    "id" => "005",
                    "title" => "Responsive Web Design",
                    "type" => "asset",
                    "status" => "complete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ],
                "06" => [
                    "id" => "006",
                    "title" => "Adobe XD",
                    "type" => "asset",
                    "status" => "incomplete",
                    "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio."
                ]
            ]
        ]
    ]);
})->name('application.post03');

/* Step 04 */
Route::get('applications/00/step-04', function () {
    return view('applicant/application_post_04', [
        
    ]);
})->name('application.post04');

/* Step 05 */
Route::get('applications/00/step-05', function () {
    return view('applicant/application_post_05', [
        
    ]);
})->name('application.post05');

/* Managers */
Route::get('browse/managers/123', function () {
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
})->name('manager');

/* Profile - About Me */
Route::get('profile/about', function () {
    return view('applicant/profile_01_about', [
        "profile" => [
            "title" => "About Me",
            "about_title" => "My Information",
            "about_gc_disclaimer" => "Please note that your name can be changed through your GC Account settings. Profile photos will be added as a feature at a later time.",
            "gc_link" => "https://account.gccollab.ca/profile/",
            "gc_link_title" => "Visit your GC Account in a new tab or window.",
            "gc_link_label" => "Visit GC Account",
            "questions_title" => "Things to Know About Me",
            "menu" => [
                "00" => [
                    "active" => true,
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
                    "active" => false,
                    "link" => "/profile/portfolio",
                    "title" => "Go to the Portfolio section of your profile.",
                    "label" => "My Portfolio"
                ]
            ],
            "save_button_label" => "Save My Answer",
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
                ]
            ]
        ],
        /* Applicant Profile Questions */
        "applicant_profile_questions" => [
            "0" => [
                "value" => "My career journey so far...",
                "description" => "This is your chance to share the unique story of how you got to where you are now… and where you want to go from here.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion0",
                "answer" => null
            ],
            "1" => [
                "value" => "My learning journey so far...",
                "description" => "Learning never stops, and it comes to all of us in different ways. Whether it comes from formal education or life lessons, knowledge passed on from elders or things you’ve picked up along the way, here’s your chance to share a bit about this side of who you are.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion1",
                "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut ante aliquet felis finibus luctus. Vivamus justo ante, convallis id justo sed, venenatis ornare magna. Maecenas tempor nunc sit amet mollis venenatis. Proin vitae nunc interdum, porttitor leo a, mollis diam. Sed auctor ultricies massa at aliquam."
            ],
            "2" => [
                "value" => "What I bring to a team...",
                "description" => "People take note of the rock star and forget they are nothing without the band. Help potential teams and managers see what unique skills, attributes and knowledge you bring to help a team do great work.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion2",
                "answer" => null
            ],
            "3" => [
                "value" => "I work best when...",
                "description" => "Introvert? Extrovert? Bit of both? Do you like tight deadlines or do you prefer to have time to process ideas? Do you work well independently or are team products more your thing? Here’s your chance to let a potential manager know what will let you give the team your best.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion3",
                "answer" => null
            ],
            "4" => [
                "value" => "I learn best when...",
                "description" => "Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion4",
                "answer" => null
            ],
            "5" => [
                "value" => "Types of teams I work well on...",
                "description" => "Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion5",
                "answer" => null
            ],
        ],
        /* User Data */
        "user" => [
            "name" => "Jason Greene",
            "tagline" => "This is Jason's default tagline.",
            "photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/10?v=7661",
            "twitter" => [
                "url" => "https://twitter.com/joshdrink",
                "title" => "Visit Jason's Twitter profile."
            ],
            "linkedin" => [
                "url" => "https://linkedin.com/joshdrink",
                "title" => "Visit Jason's Linkedin profile."
            ]
        ]
    ]);
})->name('profile');

/* Profile - My Experience */

/* Profile - My Skills */
Route::get('profile/skills', function () {
    return view('applicant/profile_03_skills', [
        "profile" => [
            "title" => "My Skills",
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
                    "active" => true,
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
                    "type" => "confirmation",
                    "title" => "Delete this Skill?",
                    "content" => [
                        "00" => "Are you sure you want to permanently delete this skill from your profile?",
                        "01" => "All previously submitted applications will retain this skill, its references, and its work samples. By deleting this skill you acknowledge the permanent deletion of all credit earned towards this skill."
                    ],
                    "id" => "deleteSkill",
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
        "skill_template" => [
            "name_label" => "Project Name",
            "type_label" => "Project Type",
            "types" => [
                "00" => "PDF",
                "01" => "Website"
            ],
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
            "link_label" => "The Link to Your Work",
            "description_label" => "The Story Behind the Work",
            "action_01" => "Delete Skill",
            "action_02" => "Save Skill"
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
})->name('skills');

/* Profile - My References */
Route::get('profile/references', function () {
    return view('applicant/profile_04_references', [
        "profile" => [
            "title" => "My References",
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
                    "type" => "confirmation",
                    "title" => "Delete this Skill?",
                    "content" => [
                        "00" => "Are you sure you want to permanently delete this skill from your profile?",
                        "01" => "All previously submitted applications will retain this skill, its references, and its work samples. By deleting this skill you acknowledge the permanent deletion of all credit earned towards this skill."
                    ],
                    "id" => "deleteSkill",
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
})->name('references');

/* Profile - My Portfolio */
Route::get('profile/portfolio', function () {
    return view('applicant/profile_05_portfolio', [
        "profile" => [
            "title" => "My Portfolio",
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
                    "type" => "confirmation",
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
})->name('portfolio');

/* Managers ================================================================= */

/* Home */
Route::get('admin', function () {
    return view('manager/home', [
        
    ]);
})->name('admin');

/* Profile */
Route::get('admin/profile', function () {
    return view('manager/profile', [
        "profile" => [
            "title" => "My Profile",
            "departments" => [
                "00" => "Employment and Social Development Canada",
                "01" => "Environment and Climate Change Canada",
                "02" => "Natural Resources Canada",
                "03" => "Transport Canada",
                "04" => "Treasury Board of Canada Secretariat"
            ],
            "telework" => [
                "00" => "Never",
                "01" => "Occasionally",
                "02" => "Sometimes",
                "03" => "Frequently",
                "04" => "Most of the Time"
            ],
            "flex_hours" => [
                "00" => "Never",
                "01" => "Occasionally",
                "02" => "Sometimes",
                "03" => "Frequently",
                "04" => "Most of the Time"
            ]
        ],
        /* User Data */
        "user" => [
            "name" => "Gray O'Byrne",
            "title" => "Hiring Manager",
            "title_fr" => null,
            "photo" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/profilePic/7?v=8291",
            "twitter" => [
                "url" => "https://twitter.com/joshdrink",
                "title" => "Visit Jason's Twitter profile."
            ],
            "linkedin" => [
                "url" => "https://linkedin.com/joshdrink",
                "title" => "Visit Jason's Linkedin profile."
            ],
            "department" => "Treasury Board of Canada Secretariat",
            "branch" => "CIOB",
            "branch_fr" => null,
            "division" => "Talent Cloud",
            "division_fr" => "Nuage de Talents",
            "education" => "Sample University",
            "education_fr" => null,
            "experience" => 5,
            "career_journey" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.",
            "career_journey_fr" => null,
            "learning_path" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.",
            "learning_path_fr" => null,
            "biography" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.",
            "biography_fr" => null,
            "leadership_style" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.",
            "leadership_style_fr" => null,
            "expectations" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.",
            "expectations_fr" => null,
            "approach" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.",
            "approach_fr" => null,
            "env_context" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.",
            "env_context_fr" => null,
            "telework" => "Occasionally",
            "flex_hours" => "Most of the Time",
            "env_photos" => [
                "00" => [
                    "id" => 1,
                    "image" => "https://talentcloud-nuagedetalents.gccollab.ca/tc/api/v1/getWorkplacePhotoByManagerProfileAndName/14/workplace_photo_1",
                    "alt" => "Gray's Workspace",
                    "alt_fr" => null
                ],
                "01" => [
                    "id" => 2,
                    "image" => null,
                    "alt" => null,
                    "alt_fr" => null
                ],
                "02" => [
                    "id" => 3,
                    "image" => null,
                    "alt" => null,
                    "alt_fr" => null
                ]
            ],
            "team_size" => 12,
            "gc_link" => null,
            "operating_context" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.",
            "operating_context_fr" => null,
            "values" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.",
            "values_fr" => null,
            "how_work" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.",
            "how_work_fr" => null
        ]
    ]);
})->name('admin.profile');

/* Job Index */
Route::get('admin/jobs', function () {
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
})->name('admin.jobIndex');

/* Create Job */
Route::get('admin/jobs/create', function () {
    return view('manager/job_create', [
        "manager_job_create" => [
            "title" => "Create a Job Poster",
            "security" => [
                "00" => "Reliability",
                "01" => "Secret",
                "02" => "Top Secret"
            ],
            "language" => [
                "00" => "English Essential",
                "01" => "French Essential",
                "02" => "Bilingual"
            ],
            "provinces" => [
                "00" => "Alberta",
                "01" => "British-Colombia",
                "02" => "Manitoba",
                "03" => "New Brunswick",
                "04" => "Newfoundland and Labrador",
                "05" => "Northwest Territories",
                "06" => "Nova Scotia",
                "07" => "Nunavut",
                "08" => "Ontario",
                "09" => "Prince Edward Island",
                "10" => "Quebec",
                "11" => "Saskatchewan",
                "12" => "Yukon"
            ],
            "departments" => [
                "00" => "Employment and Social Development Canada",
                "01" => "Environment and Climate Change Canada",
                "02" => "Natural Resources Canada",
                "03" => "Transport Canada",
                "04" => "Treasury Board of Canada Secretariat"
            ]
        ],
        "manager" => [
            "department" => "Treasury Board of Canada Secretariat",
            "branch" => "CIOB",
            "branch_fr" => null,
            "division" => "Talent Cloud",
            "division_fr" => "Nuage de Talents",
            "post" => [
                "status" => "draft",
                "title" => "Front-end Developer",
                "title_fr" => null,
                "salary_min" => 90000,
                "salary_max" => 120000,
                "classification" => "CS3",
                "noc" => "90123",
                "security" => "Top Secret",
                "language" => "English Essential",
                "city" => "Ottawa",
                "province" => "Ontario",
                "post_start" => "2018-08-19",
                "post_end" => "2019-12-28",
                "start" => "January 3rd, 2019",
                "duration" => 12,
                "department" => "Natural Resources Canada",
                "branch" => null,
                "branch_fr" => null,
                "division" => null,
                "division_fr" => null,
                "impact" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat. Sed quis laoreet tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla at ligula id porttitor. Nullam ac viverra velit, et rhoncus tellus. Praesent in lacus magna. Duis ut vulputate ipsum. In ut ornare elit. Donec id massa felis. Nam at ullamcorper risus. Vestibulum vitae aliquet ex, et ornare libero. Pellentesque sit amet vehicula neque. Donec auctor a erat posuere vehicula.",
                "impact_fr" => null,
                /* Tristan, I changed "work" to tasks. I've updated the job poster template to reflect this. Had to account for the language options here too. */
                "tasks" => [
                    "00" => [
                        "en" => "Sample task name 01.",
                        "fr" => null
                    ],
                    "01" => [
                        "en" => "Sample task name 02.",
                        "fr" => null
                    ],
                    "02" => [
                        "en" => "Sample task name 03.",
                        "fr" => null
                    ]
                ],
                "questions" => [
                    "00" => [
                        "title" => "Sample Question 01?",
                        "title_fr" => null,
                        "description" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor magna et ante ornare faucibus. Quisque ligula enim, finibus vel velit quis, aliquam cursus nunc. Fusce quis urna ut dolor pharetra bibendum. Aliquam erat volutpat. Sed quis laoreet tortor.",
                        "description_fr" => null
                    ]
                ]
            ]
        ]
    ]);
})->name('admin.jobCreate');

/* Authentication =========================================================== */

Route::get('login', function() {
    //TODO
    return redirect()->route('home');
})->name('login');

Route::get('logout', function() {
    //TODO
    return redirect()->route('home');
})->name('logout');

Route::get('laravel', function () {
    return view('welcome');
});