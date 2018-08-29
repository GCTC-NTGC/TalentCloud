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

Route::group(['domain' => 'tc.gccollab.ca'], function() {
    /* Home */
    Route::get('/', 'HomepageController')->name('home');

    /* Jobs */
    Route::get('jobs', 'JobController@index')->name('jobs.index');

    Route::get('jobs/{jobPoster}', 'JobController@show')->name('jobs.show');

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
    })->name('applications.edit.3');

    /* Step 04 */
    Route::get('applications/00/step-04', function () {
        return view('applicant/application_post_04', [

        ]);
    })->name('applications.edit.4');

    /* Step 05 */
    Route::get('applications/00/step-05', function () {
        return view('applicant/application_post_05', [

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
            return redirect(route('profile.edit', $applicant));
        })->name('profile');

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
        })->middleware('can:view,job')->name('manager.jobs.index');

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

Route::group(['domain' => 'manager.tc.gccollab.ca'], $managerGroup);
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
