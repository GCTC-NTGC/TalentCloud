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
// Route::get('/', 'HomepageController')->name('home');

Route::group(['domain' => config('app.applicant_domain'),
    'prefix' => config('app.applicant_prefix')], function() {

    /* Home */
    Route::get('/', 'HomepageController')->name('home');

    /* Jobs */
    Route::get('jobs', 'JobController@index')->name('jobs.index');

    Route::get('jobs/{jobPoster}', 'JobController@show')
        ->name('jobs.show');

    /* Require being logged in */
    Route::middleware(['auth'])->group(function(){
        /* Managers */
        Route::get('managers/{manager}', 'ManagerProfileController@show')
            ->middleware('can:view,manager')
            ->name('managers.show');
    });

    /* Require being logged in as applicant */
    Route::middleware(['auth', 'role:applicant'])->group(function() {

        //Application permissions are handled within the controller instead of with middleware

        /* Applications */
        Route::get('applications', 'ApplicationController@index')->name('applications.index');

        /* Step 01 */
        Route::get('jobs/{jobPoster}/application/step-01', 'ApplicationByJobController@edit_basics')->name('job.application.edit.1');

        /* Step 02 */
        Route::get('jobs/{jobPoster}/application/step-02', 'ApplicationByJobController@edit_experience')->name('job.application.edit.2');

        /* Step 03 */
        Route::get('jobs/{jobPoster}/application/step-03', 'ApplicationByJobController@edit_essential_skills')->name('job.application.edit.3');

        /* Step 04 */
        Route::get('jobs/{jobPoster}/application/step-04', 'ApplicationByJobController@edit_asset_skills')->name('job.application.edit.4');

        /* Step 05 */
        Route::get('jobs/{jobPoster}/application/step-05', 'ApplicationByJobController@preview')->name('job.application.edit.5');

        /* Step 06: Complete */
        Route::get('jobs/{jobPoster}/application/complete', 'ApplicationByJobController@complete')->name('job.application.complete');

        /* Application Update routes */

        /* Step 01 */
        Route::post('jobs/{jobPoster}/application/step-01/update', 'ApplicationByJobController@update_basics')->name('job.application.update.1');

        /* Step 02 */
        Route::post('jobs/{jobPoster}/application/step-02/update', 'ApplicationByJobController@update_experience')->name('job.application.update.2');

        /* Step 03 */
        Route::post('jobs/{jobPoster}/application/step-03/update', 'ApplicationByJobController@update_essential_skills')->name('job.application.update.3');

        /* Step 04 */
        Route::post('jobs/{jobPoster}/application/step-04/update', 'ApplicationByJobController@update_asset_skills')->name('job.application.update.4');

        /* Step 05 */
        Route::post('jobs/{jobPoster}/application/submit', 'ApplicationByJobController@submit')->name('job.application.submit');

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

        Route::post('profile/{applicant}/about/update', 'ApplicantProfileController@update')
            ->middleware('can:update,applicant')
            ->name('profile.about.update');

        /* Profile - My Experience */
        Route::get('profile/experience', function() {
            $applicant = Auth::user()->applicant;
            return redirect( route('profile.experience.edit', $applicant) );
        });

        Route::get('profile/{applicant}/experience', 'ExperienceController@edit')
            ->middleware('can:view,applicant')
            ->middleware('can:update,applicant')
            ->name('profile.experience.edit');

        Route::post('profile/{applicant}/experience/update', 'ExperienceController@update')
            ->middleware('can:update,applicant')
            ->name('profile.experience.update');

        /* Profile - My Skills */
        Route::get('profile/skills', function() {
            $applicant = Auth::user()->applicant;
            return redirect( route('profile.skills.edit', $applicant) );
        });

        Route::get('profile/{applicant}/skills', 'SkillsController@edit')
            ->middleware('can:view,applicant')
            ->middleware('can:update,applicant')
            ->name('profile.skills.edit');

        Route::post('profile/{applicant}/skills/update', 'SkillsController@update')
            ->middleware('can:update,applicant')
            ->name('profile.skills.update');

        /* Profile - My References */
        Route::get('profile/references', function() {
            $applicant = Auth::user()->applicant;
            return redirect( route('profile.references.edit', $applicant) );
        });

        Route::get('profile/{applicant}/references','ReferencesController@edit')
            ->middleware('can:view,applicant')
            ->middleware('can:update,applicant')
            ->name('profile.references.edit');

        Route::post('profile/{applicant}/references/update','ReferencesController@update')
            ->middleware('can:update,applicant')
            ->name('profile.references.update');

        /* Profile - My Portfolio */
        Route::get('profile/portfolio', function() {
            $applicant = Auth::user()->applicant;
            return redirect( route('profile.work_samples.edit', $applicant) );
        });

        Route::get('profile/{applicant}/portfolio', 'WorkSamplesController@edit')
            ->middleware('can:view,applicant')
            ->middleware('can:update,applicant')
            ->name('profile.work_samples.edit');

        Route::post('profile/{applicant}/portfolio/update', 'WorkSamplesController@update')
            ->middleware('can:update,applicant')
            ->name('profile.work_samples.update');
    });

    /* Static - FAQ */
        Route::get('faq', function () {
            return view('applicant/static_faq', [
                'faq' => Lang::get('applicant/faq')
            ]);
        })->name('faq');

    /* Static - Privacy Policy */
        Route::get('privacy', function () {
            return view('common/static_privacy', [
                'privacy' => Lang::get('common/privacy')
            ]);
        })->name('privacy');

    /* Static - Terms of Service */
        Route::get('tos', function () {
            return view('common/static_tos', [
                'tos' => Lang::get('common/tos')
            ]);
        })->name('tos');

    /* Static - Credentialing */

        Route::get('credentialing', function () {
            return view('applicant/static_credentialing', [
                "credentialing" => [
                    "title" => "Title TBD",
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
                    ]
                ]
            ]);
        })->name('credentialing');

    /* Authentication =========================================================== */

    //Laravel default login, logout, register, and reset routes
    Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
    Route::post('login', 'Auth\LoginController@login')->name('login.post');
    Route::post('logout', 'Auth\LoginController@logout')->name('logout');

    // Registration Routes...
    Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
    Route::post('register', 'Auth\RegisterController@register')->name('register.post');

    // Password Reset Routes...
    Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.reset.post');

    // Route::get('login', 'LoginController@login')->middleware('guest')->name('login');
    //
    // Route::get('logout', 'LoginController@logout')->name('logout');
    //
    // Route::get('logout/callback', 'LoginController@logoutCallback')->name('logout.callback');
    //
    // Route::get('register', function() {
    //     return redirect('https://account.gccollab.ca/register/');
    // })->middleware('guest')->name('register');

});


/* Manager Portal =========================================================== */

$managerGroup = function() {
    /* Home */
    Route::get('/', function () {
        return view('manager/home', [
            "hero" => [
                "hero_logo" => "/images/logo_tc_colour.png",
                "hero_logo_alt" => "The GC Talent Cloud Graphic Identifier.",
                "hero_tagline" => "People want meaningful work."
            ]
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

    //Laravel default login, logout, register, and reset routes
    Route::get('login', 'Auth\LoginController@showLoginForm')->name('manager.login');
    Route::post('login', 'Auth\LoginController@login')->name('manager.login.post');
    Route::post('logout', 'Auth\LoginController@logout')->name('manager.logout');

    // Registration Routes...
    Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('manager.register');
    Route::post('register', 'Auth\RegisterController@register')->name('manager.register.post');

    // Password Reset Routes...
    Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('manager.password.request');
    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('manager.password.email');
    Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('manager.password.reset');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('manager.password.reset.post');
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
