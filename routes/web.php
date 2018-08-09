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

Route::get('/home', 'Applicant\HomepageController')->name('home')->middleware('auth:oidconnect_applicants');

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
                "classification_label" => "GoC Classification"
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
                    "title" => "Skills: Need to Have",
                    "status" => "complete",
                    "url" => "/step-02/"
                ],
                "02" => [
                    "step" => "3",
                    "title" => "Skills: Nice to Have",
                    "status" => "incomplete",
                    "url" => "/step-03/"
                ],
                "03" => [
                    "step" => "4",
                    "title" => "Review my Application",
                    "status" => "incomplete",
                    "url" => "/step-04/"
                ]
            ],
            "question_title" => "My Fit",
            "save_quit_button_label" => "Save & Quit",
            "save_continue_button_label" => "Save & Continue"
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
                    "title" => "Skills: Need to Have",
                    "status" => "complete",
                    "url" => "/step-02/"
                ],
                "02" => [
                    "step" => "3",
                    "title" => "Skills: Nice to Have",
                    "status" => "incomplete",
                    "url" => "/step-03/"
                ],
                "03" => [
                    "step" => "4",
                    "title" => "Review my Application",
                    "status" => "incomplete",
                    "url" => "/step-04/"
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
            "sidebar_item_title" => "Scroll to this skill."
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
        
    ]);
})->name('application.post03');

/* Step 04 */

Route::get('applications/00/step-04', function () {
    return view('applicant/application_post_04', [
        
    ]);
})->name('application.post04');

/* Profile */

Route::get('profile', function () {
    return view('applicant/profile', [
        "profile" => [
            "save_button_label" => "Save My Answer"
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

/* Auth */

Route::get('/', 'Auth\LoginController@login')->name('login');

Route::get('logout', function() {
    //TODO
    return redirect()->route('test');
})->name('logout');

Route::get('laravel', function () {
    if (Auth::check()) {
        $user = Auth::user();
    } else {
        $user = (object)['name' => 'login failed'];
    }
    debugbar()->info("in laravel route");
    return view('welcome', ['t1' => $user->name]);
})->name('test');