<?php

use Illuminate\Support\Facades\Lang;

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

/* ADD ALL LOCALIZED ROUTES INSIDE THIS GROUP */
Route::group(
    [
        'prefix' => LaravelLocalization::setLocale(),
        'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
    ],
    function (): void {
        /* Routes used for local demos */
        /* If creating public demos, make sure to add a meta robots noindex, nofollow tag */
        Route::group(['prefix' => 'demo'], function (): void {

            /* Temporary Blog Index */
            Route::view('blog', 'common/blog-index')->middleware('localOnly')->name('blog');

            /* Temporary Blog Post */
            Route::view('post', 'common/blog-post')->middleware('localOnly')->name('post');

            /* Static - Reliability Form Demo */
            Route::view('reliability', 'demos/reliability/index', ['reliability' => Lang::get('common/reliability')])->name('reliability');

            /* Temp Builder 01 (Intro) */
            Route::view('builder-01', 'manager/builder-01')->middleware('localOnly')->name('jpb1');
            /* Temp Builder 02 (Job info) */
            Route::view('builder-02', 'manager/builder-02')->middleware('localOnly')->name('jpb2');
            /* Temp Builder 03 (Work Environment) */
            Route::view('builder-03', 'manager/builder-03')->middleware('localOnly')->name('jpb3');
            /* Temp Builder 04 (Impact) */
            Route::view('builder-04', 'manager/builder-04')->middleware('localOnly')->name('jpb4');
            /* Temp Builder 05 (Tasks) */
            Route::view('builder-05', 'manager/builder-05')->middleware('localOnly')->name('jpb5');
            /* Temp Builder 06 (Skills) */
            Route::view('builder-06', 'manager/builder-06')->middleware('localOnly')->name('jpb6');
            /* Temp Builder 07 (Education) */
            Route::view('builder-07', 'manager/builder-07')->middleware('localOnly')->name('jpb7');
            /* Temp Builder 08 (Review) */
            Route::view('builder-08', 'manager/builder-08')->middleware('localOnly')->name('jpb8');
        });

        Route::group(['prefix' => config('app.applicant_prefix')], function (): void {

            Route::get('two-factor/use-recovery-code', 'Auth\RecoveryCodeController@use')->name('recovery_codes.use');
            Route::post('two-factor/use-recovery-code', 'Auth\RecoveryCodeController@authenticate')->name('recovery_codes.authenticate');

            /* Require being logged in */
            Route::middleware(['auth'])->group(function (): void {

                /* Managers */
                Route::get('managers/{manager}', 'ManagerProfileController@show')
                    ->middleware('can:view,manager')
                    ->name('managers.show');
            });

            /*
             * IF user is logged in AND has activated 2fa, require one-time password.
             * This should include all routes except those related to authentication, to avoid loops.
             */
            Route::middleware(['2fa'])->group(function (): void {
                Route::post('/2fa', 'Auth\TwoFactorController@redirectToExpected')->name('2fa');

                /* Home */
                Route::get('/', 'HomepageController@applicant')->name('home');

                /* Jobs */
                Route::get('jobs', 'JobController@index')->name('jobs.index');

                Route::get('jobs/{jobPoster}', 'JobController@show')
                    ->middleware('can:view,jobPoster')
                    ->name('jobs.show');

                /* Require being logged in as applicant */
                Route::middleware(['auth', 'role:applicant'])->group(function (): void {

                    // Application permissions are handled within the controller instead of with middleware.
                    /* Applications */
                    Route::get('applications', 'ApplicationController@index')->name('applications.index');

                    /* View Application */
                    Route::get('applications/{application}', 'ApplicationController@show')
                        ->middleware('can:view,application')
                        ->name('applications.show');

                    /* Step 01 */
                    Route::get('jobs/{jobPoster}/application/step-01', 'ApplicationByJobController@editBasics')->name('job.application.edit.1');

                    /* Step 02 */
                    Route::get('jobs/{jobPoster}/application/step-02', 'ApplicationByJobController@editExperience')->name('job.application.edit.2');

                    /* Step 03 */
                    Route::get('jobs/{jobPoster}/application/step-03', 'ApplicationByJobController@editEssentialSkills')->name('job.application.edit.3');

                    /* Step 04 */
                    Route::get('jobs/{jobPoster}/application/step-04', 'ApplicationByJobController@editAssetSkills')->name('job.application.edit.4');

                    /* Step 05 */
                    Route::get('jobs/{jobPoster}/application/step-05', 'ApplicationByJobController@preview')->name('job.application.edit.5');

                    /* Step 06 */
                    Route::get('jobs/{jobPoster}/application/step-06', 'ApplicationByJobController@confirm')->name('job.application.edit.6');

                    /* Step 06: Complete */
                    Route::get('jobs/{jobPoster}/application/complete', 'ApplicationByJobController@complete')->name('job.application.complete');

                    /* Application Update routes */

                    /* Step 01 */
                    Route::post('jobs/{jobPoster}/application/step-01/update', 'ApplicationByJobController@updateBasics')->name('job.application.update.1');

                    /* Step 02 */
                    Route::post('jobs/{jobPoster}/application/step-02/update', 'ApplicationByJobController@updateExperience')->name('job.application.update.2');

                    /* Step 03 */
                    Route::post('jobs/{jobPoster}/application/step-03/update', 'ApplicationByJobController@updateEssentialSkills')->name('job.application.update.3');

                    /* Step 04 */
                    Route::post('jobs/{jobPoster}/application/step-04/update', 'ApplicationByJobController@updateAssetSkills')->name('job.application.update.4');

                    /* Step 05 */
                    Route::post('jobs/{jobPoster}/application/submit', 'ApplicationByJobController@submit')->name('job.application.submit');

                    Route::get('profile', 'ApplicantProfileController@editAuthenticated')->name('profile');
                    Route::get('profile/about', 'ApplicantProfileController@editAuthenticated');

                    /* Profile - About Me */
                    Route::get('profile/{applicant}/about', 'ApplicantProfileController@edit')
                        ->middleware('can:view,applicant')
                        ->middleware('can:update,applicant')
                        ->name('profile.about.edit');

                    Route::post('profile/{applicant}/about/update', 'ApplicantProfileController@update')
                        ->middleware('can:update,applicant')
                        ->name('profile.about.update');

                    /* Profile - My Experience */
                    Route::get('profile/experience', 'ExperienceController@editAuthenticated');

                    Route::get('profile/{applicant}/experience', 'ExperienceController@edit')
                        ->middleware('can:view,applicant')
                        ->middleware('can:update,applicant')
                        ->name('profile.experience.edit');

                    Route::post('profile/{applicant}/experience/update', 'ExperienceController@update')
                        ->middleware('can:update,applicant')
                        ->name('profile.experience.update');

                    /* Profile - My Skills */
                    Route::get('profile/skills', 'SkillDeclarationController@editAuthenticated');

                    Route::get('profile/{applicant}/skills', 'SkillDeclarationController@edit')
                        ->middleware('can:view,applicant')
                        ->middleware('can:update,applicant')
                        ->name('profile.skills.edit');

                    /* Profile - My References */
                    Route::get('profile/references', 'ReferencesController@editAuthenticated');

                    Route::get('profile/{applicant}/references', 'ReferencesController@edit')
                        ->middleware('can:view,applicant')
                        ->middleware('can:update,applicant')
                        ->name('profile.references.edit');

                    /* Profile - My Portfolio */
                    Route::get('profile/portfolio', 'WorkSamplesController@editAuthenticated');

                    Route::get('profile/{applicant}/portfolio', 'WorkSamplesController@edit')
                        ->middleware('can:view,applicant')
                        ->middleware('can:update,applicant')
                        ->name('profile.work_samples.edit');

                    /* Account Settings */
                    Route::get('settings', 'SettingsController@editAuthenticated')
                        // Permission is checked in controller.
                        ->name('settings.edit');

                    Route::post(
                        'settings/{user}/personal/update',
                        'SettingsController@updatePersonal'
                    )
                        ->middleware('can:view,user')
                        ->middleware('can:update,user')
                        ->name('settings.personal.update');

                    Route::post(
                        'settings/{user}/password/update',
                        'SettingsController@updatePassword'
                    )
                        ->middleware('can:view,user')
                        ->middleware('can:update,user')
                        ->name('settings.password.update');

                    Route::post(
                        'settings/{user}/government/update',
                        'SettingsController@updateGovernment'
                    )
                        ->middleware('can:view,user')
                        ->middleware('can:update,user')
                        ->name('settings.government.update');

                    /* 2FA Settings */
                    Route::get('two-factor/activate', 'Auth\TwoFactorController@activate')->name('two_factor.activate');
                    Route::post('two-factor/deactivate', 'Auth\TwoFactorController@deactivate')->name('two_factor.deactivate');
                    Route::post('two-factor/forget', 'Auth\TwoFactorController@forget')->name('two_factor.forget');
                    Route::post('two-factor/confirm', 'Auth\TwoFactorController@confirm')->name('two_factor.confirm');

                    Route::post('two-factor/generate-recovery-codes', 'Auth\RecoveryCodeController@generate')->name('recovery_codes.generate');
                    Route::get('two-factor/recovery-codes', 'Auth\RecoveryCodeController@show')->name('recovery_codes.show');
                });

                /* Static - FAQ */
                Route::get('faq', 'FaqController')->name('faq');

                /* Static - Privacy Policy */
                Route::view('privacy', 'common/static_privacy', ['privacy' => Lang::get('common/privacy')])
                    ->name('privacy');

                /* Static - Terms of Service */
                Route::view('tos', 'common/static_tos', ['tos' => Lang::get('common/tos')])->name('tos');

                /* Static - ITP */
                Route::view('indigenous', 'common/static-itp', ['itp' => Lang::get('common/itp')])->name('itp');
            });

            /* Authentication =========================================================== */

            // Laravel default login, logout, register, and reset routes.
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
        });

        /* Manager Portal =========================================================== */
        Route::group(['prefix' => config('app.manager_prefix')], function (): void {

            Route::middleware(['finishManagerRegistration'])->group(function (): void {

                Route::get('two-factor/use-recovery-code', 'Auth\RecoveryCodeController@use')->name('manager.recovery_codes.use');
                Route::post('two-factor/use-recovery-code', 'Auth\RecoveryCodeController@authenticate')->name('manager.recovery_codes.authenticate');

                /*
                 * IF user is logged in AND has activated 2fa, require one-time password.
                 * This should include all routes except those related to authentication, to avoid loops.
                 */
                Route::middleware(['2fa'])->group(function (): void {

                    Route::post('/2fa', 'Auth\TwoFactorController@redirectToExpected')->name('manager.2fa');

                    /* Home */
                    Route::get('/', 'HomepageController@manager')->name('manager.home');

                    /* Static - FAQ */
                    Route::get(
                        'faq',
                        'ManagerProfileController@faq'
                    )->name('manager.faq');

                    Route::get(
                        'faq#managers',
                        'ManagerProfileController@faq'
                    )->name('manager.faq.section');

                    Route::middleware(['auth', 'role:manager'])->group(function (): void {

                        Route::get('profile', 'ManagerProfileController@editAuthenticated')->name('manager.profile');

                        /* Profile */
                        Route::get('profile/{manager}/edit', 'ManagerProfileController@edit')
                            ->middleware('can:view,manager')
                            ->middleware('can:update,manager')
                            ->name('manager.profile.edit');

                        Route::post('profile/{manager}/update', 'ManagerProfileController@update')
                            ->middleware('can:update,manager')
                            ->name('manager.profile.update');

                        /* Reviewing applications/applicants requires two-factor authentication */
                        // TODO: Eventually we'll want to wrap the routes for viewing applications in the 2fa.required middleware
                        Route::get('jobs/{jobPoster}/applications', 'ApplicationByJobController@index')
                            ->where('jobPoster', '[0-9]+')
                            ->middleware('can:reviewApplicationsFor,jobPoster')
                            ->name('manager.jobs.applications');

                        /* View Application */
                        Route::get('applications/{application}', 'ApplicationController@show')
                            ->middleware('can:view,application')
                            ->name('manager.applications.show');

                        /* View Applicant Profile */
                        Route::get('applicants/{applicant}', 'ApplicantProfileController@show')
                            ->middleware('can:view,applicant')
                            ->name('manager.applicants.show');

                        /* Job Index */
                        Route::get('jobs', 'JobController@managerIndex')->name('manager.jobs.index');

                        /* View Job Poster */
                        Route::get('jobs/{jobPoster}', 'JobController@show')
                            ->where('jobPoster', '[0-9]+')
                            ->middleware('can:view,jobPoster')
                            ->name('manager.jobs.show');

                        /* Job Builder */
                        Route::get(
                            'jobs/builder',
                            'JobBuilderController@show'
                        )->name('manager.jobs.create');

                        Route::get(
                            'jobs/{jobId}/builder',
                            'JobBuilderController@show'
                        )
                            ->where('jobPoster', '[0-9]+')
                            ->name('manager.jobs.edit');

                        Route::get(
                            'jobs/{jobId}/builder/intro',
                            'JobBuilderController@show'
                        )->where('jobPoster', '[0-9]+');

                        Route::get(
                            'jobs/{jobId}/builder/details',
                            'JobBuilderController@show'
                        )->where('jobPoster', '[0-9]+');

                        Route::get(
                            'jobs/{jobId}/builder/environment',
                            'JobBuilderController@show'
                        )->where('jobPoster', '[0-9]+');

                        Route::get(
                            'jobs/{jobId}/builder/impact',
                            'JobBuilderController@show'
                        )->where('jobPoster', '[0-9]+');

                        Route::get(
                            'jobs/{jobId}/builder/tasks',
                            'JobBuilderController@show'
                        )->where('jobPoster', '[0-9]+');

                        Route::get(
                            'jobs/{jobId}/builder/skills',
                            'JobBuilderController@show'
                        )->where('jobPoster', '[0-9]+');

                        Route::get(
                            'jobs/{jobId}/builder/review',
                            'JobBuilderController@show'
                        )
                            ->where('jobPoster', '[0-9]+')
                            ->name('manager.jobs.review');

                        /* Delete Job */
                        Route::delete('jobs/{jobPoster}', 'JobController@destroy')
                            ->where('jobPoster', '[0-9]+')
                            ->middleware('can:delete,jobPoster')
                            ->name('manager.jobs.destroy');

                        /* Screening Plan Builder */
                        Route::view(
                            'jobs/{jobPoster}/assessment-plan',
                            'manager/assessment_plan'
                        )
                            ->where('jobPoster', '[0-9]+')
                            ->name('manager.jobs.screening_plan');

                        /* Account Settings */
                        Route::get('settings', 'SettingsController@editAuthenticated')
                            // Permissions are checked in Controller.
                            ->name('manager.settings.edit');

                        Route::post(
                            'settings/{user}/personal/update',
                            'SettingsController@updatePersonal'
                        )
                            ->middleware('can:view,user')
                            ->middleware('can:update,user')
                            ->name('manager.settings.personal.update');

                        Route::post(
                            'settings/{user}/password/update',
                            'SettingsController@updatePassword'
                        )
                            ->middleware('can:view,user')
                            ->middleware('can:update,user')
                            ->name('manager.settings.password.update');

                        Route::post(
                            'settings/{user}/government/update',
                            'SettingsController@updateGovernment'
                        )
                            ->middleware('can:view,user')
                            ->middleware('can:update,user')
                            ->name('manager.settings.government.update');

                        /* Two-factor Authentication */
                        Route::get('two-factor/activate', 'Auth\TwoFactorController@activate')->name('manager.two_factor.activate');
                        Route::post('two-factor/deactivate', 'Auth\TwoFactorController@deactivate')->name('manager.two_factor.deactivate');
                        Route::post('two-factor/forget', 'Auth\TwoFactorController@forget')->name('manager.two_factor.forget');
                        Route::post('two-factor/confirm', 'Auth\TwoFactorController@confirm')->name('manager.two_factor.confirm');

                        Route::post('two-factor/generate-recovery-codes', 'Auth\RecoveryCodeController@generate')->name('manager.recovery_codes.generate');
                        Route::get('two-factor/recovery-codes', 'Auth\RecoveryCodeController@show')->name('manager.recovery_codes.show');
                    });
                });
            });

            // These routes must be excluded from the finishManagerRegistration middleware
            // to avoid an infinite loop of redirects.
            Route::middleware(['auth', 'role:manager'])->group(function (): void {
                Route::get('first-visit', 'Auth\FirstVisitController@showFirstVisitManagerForm')
                    ->name('manager.first_visit');
                Route::post('finish_registration', 'Auth\FirstVisitController@finishManagerRegistration')
                    ->name('manager.finish_registration');
            });

            // Laravel default login, logout, register, and reset routes.
            Route::get('login', 'Auth\LoginController@showLoginForm')->name('manager.login');
            Route::post('login', 'Auth\LoginController@login')->name('manager.login.post');
            Route::post('logout', 'Auth\LoginController@logout')->name('manager.logout');

            // Registration Routes...
            Route::get('register', 'Auth\RegisterController@showManagerRegistrationForm')->name('manager.register');
            Route::post('register', 'Auth\RegisterController@registerManager')->name('manager.register.post');

            // Password Reset Routes...
            Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('manager.password.request');
            Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('manager.password.email');
            Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('manager.password.reset');
            Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('manager.password.reset.post');
        });

        /* AJAX calls =============================================================== */

        /* Require being logged in */
        Route::middleware(['auth'])->group(function (): void {

            Route::delete('courses/{course}', 'CourseController@destroy')
                ->middleware('can:delete,course')
                ->name('courses.destroy');

            Route::delete('degrees/{degree}', 'DegreeController@destroy')
                ->middleware('can:delete,degree')
                ->name('degrees.destroy');

            Route::delete('work-experiences/{workExperience}', 'WorkExperienceController@destroy')
                ->middleware('can:delete,workExperience')
                ->name('work_experiences.destroy');

            Route::post('skill-declarations', 'SkillDeclarationController@create')
                ->middleware('can:create,App\Models\SkillDeclaration')
                ->name('skill_declarations.create');

            Route::put('skill-declarations/{skillDeclaration}', 'SkillDeclarationController@update')
                ->middleware('can:update,skillDeclaration')
                ->name('skill_declarations.update');

            Route::delete('skill-declarations/{skillDeclaration}', 'SkillDeclarationController@destroy')
                ->middleware('can:delete,skillDeclaration')
                ->name('skill_declarations.destroy');

            Route::post('references', 'ReferencesController@update')
                ->middleware('can:create,App\Models\Reference')
                ->name('references.create');

            Route::put('references/{reference}', 'ReferencesController@update')
                ->middleware('can:update,reference')
                ->name('references.update');

            Route::delete('references/{reference}', 'ReferencesController@destroy')
                ->middleware('can:delete,reference')
                ->name('references.destroy');

            Route::post('work-samples', 'WorkSamplesController@update')
                ->middleware('can:create,App\Models\WorkSample')
                ->name('work_samples.create');

            Route::put('work-samples/{workSample}', 'WorkSamplesController@update')
                ->middleware('can:update,workSample')
                ->name('work_samples.update');

            Route::delete('work-samples/{workSample}', 'WorkSamplesController@destroy')
                ->middleware('can:delete,workSample')
                ->name('work_samples.destroy');

            Route::delete('applications/{application}', 'ApplicationController@destroy')
                ->middleware('can:delete,application')
                ->name('applications.destroy');

            Route::put('applications/{application}/review', 'ApplicationReviewController@updateForApplication')
                ->middleware('can:review,application')
                ->name('application_reviews.update');
        });

        /* Non-Backpack Admin Portal (localized pages) =========================================================== */
        Route::group(
            [
                'prefix' => 'admin',
                'middleware' => ['auth', 'role:admin']
            ],
            function (): void {
                /* Edit Job */
                Route::get('jobs/{jobPoster}/edit', 'JobController@edit')
                    ->where('jobPoster', '[0-9]+')
                    ->middleware('can:update,jobPoster')
                    ->name('admin.jobs.edit');
                Route::post('jobs/{jobPoster}', 'JobController@store')
                    ->where('jobPoster', '[0-9]+')
                    ->middleware('can:update,jobPoster')
                    ->name('admin.jobs.update');
            }
        );

        /* HR Advisor Portal =========================================================== */

        Route::group([
            'prefix' => config('app.hr_prefix'),
        ], function (): void {

            Route::middleware(['finishHrRegistration'])->group(function (): void {

                Route::get('/', 'HomepageController@hr_advisor')->name('hr_advisor.home');
            });

            // These routes must be excluded from the finishHrAdvisorRegistration middleware to avoid an infinite loop of redirects
            Route::middleware(['auth', 'role:hr_advisor'])->group(function (): void {
                Route::get('first-visit', 'Auth\FirstVisitController@showFirstVisitHrForm')
                    ->name('hr_advisor.first_visit');
                Route::post('finish_registration', 'Auth\FirstVisitController@finishHrRegistration')
                    ->name('hr_advisor.finish_registration');
            });

            // Laravel default login, logout, register, and reset routes
            Route::get('login', 'Auth\LoginController@showLoginForm')->name('hr_advisor.login');
            Route::post('login', 'Auth\LoginController@login')->name('hr_advisor.login.post');
            Route::post('logout', 'Auth\LoginController@logout')->name('hr_advisor.logout');

            // Registration Routes...
            Route::get('register', 'Auth\RegisterController@showHrRegistrationForm')->name('hr_advisor.register');
            Route::post('register', 'Auth\RegisterController@registerHrAdvisor')->name('hr_advisor.register.post');

            // Password Reset Routes...
            Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('hr_advisor.password.request');
            Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('hr_advisor.password.email');
            Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('hr_advisor.password.reset');
            Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('hr_advisor.password.reset.post');
        });
    }
);

/* Non-Backpack Admin Portal (non-localized pages) =========================================================== */
Route::group(
    [
    'prefix' => 'admin',
    'middleware' => ['auth', 'role:admin']
    ],
    function (): void {
        // This page is non-localized, because the middleware that redirects to localized
        // pages changes POSTs to GETs and messes up the request.
        Route::post('jobs/create/as-manager/{manager}', 'JobController@createAsManager')
            ->middleware('can:create,App\Models\JobPoster')
            ->name('admin.jobs.create_as_manager');

        Route::post('/2fa', 'Auth\TwoFactorController@redirectToExpected')->name('admin.2fa');

        Route::get('two-factor/activate', 'Auth\TwoFactorController@activate')->name('admin.two_factor.activate');
        Route::post('two-factor/deactivate', 'Auth\TwoFactorController@deactivate')->name('admin.two_factor.deactivate');
        Route::post('two-factor/forget', 'Auth\TwoFactorController@forget')->name('admin.two_factor.forget');
        Route::post('two-factor/confirm', 'Auth\TwoFactorController@confirm')->name('admin.two_factor.confirm');

        Route::post('two-factor/generate-recovery-codes', 'Auth\RecoveryCodeController@generate')->name('admin.recovery_codes.generate');
        Route::get('two-factor/recovery-codes', 'Auth\RecoveryCodeController@show')->name('admin.recovery_codes.show');
    }
);

/* ALL NON-LOCALIZED ROUTES **/

/* API routes - currently using same default http auth, but not localized */
Route::group(['prefix' => 'api'], function (): void {
    // Protected by a gate in the controller, instead of policy middleware.
    Route::get('jobs/{jobPoster}/assessment-plan', 'AssessmentPlanController@getForJob');
    // Public, not protected by policy or gate.
    Route::get('skills', 'Api\SkillController@index');
    Route::get('departments', 'Api\DepartmentController@index');

    // Resource Routes are protected by policies in controllers instead of middleware.
    Route::resource('assessments', 'AssessmentController')->except([
        'create', 'edit', 'index'
    ]);
    Route::apiResource('rating-guide-answers', 'RatingGuideAnswerController')->except([
        'index'
    ])->parameters([
        'rating-guide-answers' => 'ratingGuideAnswer'
    ]);
    Route::resource('rating-guide-questions', 'RatingGuideQuestionController')->except([
        'create', 'edit', 'index'
    ]);
    Route::resource('assessment-plan-notifications', 'AssessmentPlanNotificationController')->except([
        'store', 'create', 'edit'
    ]);
    // TODO: add policy middleware.
    Route::get('jobs/{jobPoster}/tasks', 'Api\JobTaskController@indexByJob')
        ->where('jobPoster', '[0-9]+')
        ->middleware('can:view,jobPoster');
    Route::put('jobs/{jobPoster}/tasks', 'Api\JobTaskController@batchUpdate')
        ->where('jobPoster', '[0-9]+')
        ->middleware('can:update,jobPoster');

    Route::get('jobs/{jobPoster}/criteria', 'Api\CriteriaController@indexByJob')
        ->where('jobPoster', '[0-9]+')
        ->middleware('can:view,jobPoster');
    Route::put('jobs/{jobPoster}/criteria', 'Api\CriteriaController@batchUpdate')
        ->where('jobPoster', '[0-9]+')
        ->middleware('can:update,jobPoster');

    Route::post('jobs/{job}/submit', 'Api\JobApiController@submitForReview')
        ->where('job', '[0-9]+')
        ->middleware('can:submitForReview,job')
        ->name('api.jobs.submit');
    Route::resource('jobs', 'Api\JobApiController')->only([
        'show', 'store', 'update'
    ])->names([// Specify custom names because default names collied with existing routes.
        'show' => 'api.jobs.show',
        'store' => 'api.jobs.store',
        'update' => 'api.jobs.update'
    ]);

    Route::resource('managers', 'Api\ManagerApiController')->only([
        'show', 'update'
    ])->names([// Specify custom names because default names collied with existing routes.
        'show' => 'api.managers.show',
        'update' => 'api.managers.update'
    ]);

    // User must be logged in to user currentuser routes.
    Route::get('currentuser/manager', 'Api\ManagerApiController@showAuthenticated')
        ->middleware('auth');

    // Claim / unclaim job routes, HR portal
    Route::put('jobs/{job}/claim', 'Api\ClaimJobApiController@store')
        ->middleware('can:claim,job')
        ->where('job', '[0-9]+');
    Route::delete('jobs/{job}/claim', 'Api\ClaimJobApiController@destroy')
        ->middleware('can:unClaim,job')
        ->where('job', '[0-9]+');

    Route::get('hr-advisors/{hrAdvisor}', 'Api\HrAdvisorController@show')
        ->middleware('can:view,hrAdvisor');

    Route::put('hr-advisors/{hrAdvisor}/claims/{job}', 'Api\ClaimJobApiController@claimJob')
        ->middleware('can:update,hrAdvisor')
        ->where('hrAdvisor', '[0-9]+')
        ->where('job', '[0-9]+');
    Route::delete('hr-advisors/{hrAdvisor}/claims/{job}', 'Api\ClaimJobApiController@unclaimJob')
        ->middleware('can:update,hrAdvisor')
        ->where('hrAdvisor', '[0-9]+')
        ->where('job', '[0-9]+');
});
