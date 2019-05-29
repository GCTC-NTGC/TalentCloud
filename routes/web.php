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

Route::group(
    [
        'prefix' => LaravelLocalization::setLocale(),
        'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
    ],
    function () : void {
        /** ADD ALL LOCALIZED ROUTES INSIDE THIS GROUP **/
        Route::group(['prefix' => config('app.applicant_prefix')], function () : void {

            /* Home */
            Route::get('/', 'HomepageController@applicant')->name('home');

            /* Jobs */
            Route::get('jobs', 'JobController@index')->name('jobs.index');

            Route::get('jobs/{jobPoster}', 'JobController@show')
                ->middleware('can:view,jobPoster')
                ->name('jobs.show');

            /* Require being logged in */
            Route::middleware(['auth'])->group(function () : void {
                /* Managers */
                Route::get('managers/{manager}', 'ManagerProfileController@show')
                    ->middleware('can:view,manager')
                    ->name('managers.show');
            });

            /* Require being logged in as applicant */
            Route::middleware(['auth', 'role:applicant'])->group(function () : void {

            //Application permissions are handled within the controller instead of with middleware

                /* Applications */
                Route::get('applications', 'ApplicationController@index')->name('applications.index');

                /* View Application */
                Route::get('applications/{application}', 'ApplicationController@show')
                    ->middleware('can:view,application')
                    ->name('applications.show');

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

                /* Step 06 */
                Route::get('jobs/{jobPoster}/application/step-06', 'ApplicationByJobController@confirm')->name('job.application.edit.6');

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
            });

            /* Static - FAQ */
            Route::view('faq', 'applicant/static_faq', ['faq' => Lang::get('applicant/faq')])->name('faq');

            /* Static - Privacy Policy */
            Route::view('privacy', 'common/static_privacy', ['privacy' => Lang::get('common/privacy')])
                ->name('privacy');

            /* Static - Terms of Service */
            Route::view('tos', 'common/static_tos', ['tos' => Lang::get('common/tos')])->name('tos');

            /* Static - ITP */
            Route::view('indigenous', 'common/static-itp', ['itp' => Lang::get('common/itp')])->name('itp');

            // /* Temp Builder 01 (Intro) */
            // Route::view('builder-01', 'manager/builder-01')->name('jpb1');

            // /* Temp Builder 02 (Job info) */
            // Route::view('builder-02', 'manager/builder-02')->name('jpb2');

            // /* Temp Builder 03 (Work Environment) */
            // Route::view('builder-03', 'manager/builder-03')->name('jpb3');

            // /* Temp Builder 04 (Impact) */
            // Route::view('builder-04', 'manager/builder-04')->name('jpb4');

            /* Authentication =========================================================== */

            // Laravel default login, logout, register, and reset routes
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
            /* Home */
            Route::get('/', 'HomepageController@manager')->name('manager.home');

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

                /* Create Job */
                Route::get('jobs/create', 'JobController@create')
                    ->middleware('can:create,App\Models\JobPoster')
                    ->name('manager.jobs.create');

                Route::post('jobs', 'JobController@store')
                    ->middleware('can:create,App\Models\JobPoster')
                    ->name('manager.jobs.store');

                Route::post('jobs/{jobPoster}', 'JobController@store')
                    ->where('jobPoster', '[0-9]+')
                    ->middleware('can:update,jobPoster')
                    ->name('manager.jobs.update');

                Route::get('jobs/{jobPoster}/applications', 'ApplicationByJobController@index')
                    ->where('jobPoster', '[0-9]+')
                    ->middleware('can:review,jobPoster')
                    ->name('manager.jobs.applications');

                /* Edit Job */
                Route::get('jobs/{jobPoster}/edit', 'JobController@edit')
                    ->where('jobPoster', '[0-9]+')
                    ->middleware('can:update,jobPoster')
                    ->name('manager.jobs.edit');

                /* Delete Job */
                Route::delete('jobs/{jobPoster}', 'JobController@destroy')
                    ->where('jobPoster', '[0-9]+')
                    ->middleware('can:delete,jobPoster')
                    ->name('manager.jobs.destroy');

                /* Request Review */
                Route::post('jobs/{jobPoster}/review', 'JobController@submitForReview')
                    ->where('jobPoster', '[0-9]+')
                    ->middleware('can:update,jobPoster')
                    ->name('manager.jobs.review');

                Route::view(
                    'jobs/{jobPoster}/assessment-plan',
                    'common/redux',
                    ['title' => Lang::get('manager/screening-plan')['title']]
                )->where('jobPoster', '[0-9]+')
                ->name('manager.jobs.screening_plan');
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
        });

        /* AJAX calls =============================================================== */

        /* Require being logged in */
        Route::middleware(['auth'])->group(function () : void {

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

        /* Language ============================================================= */

        // Route::redirect('fr', '/')->name('lang.fr');

        // Route::redirect('en', '/')->name('lang.en');
    }
);

/** ALL NON-LOCALIZED ROUTES **/

/* Non-Backpack Admin Portal =========================================================== */

Route::group(
    [
        'prefix' => 'admin',
        'middleware' => ['auth', 'role:admin']
    ],
    function (): void {
        Route::get('jobs/create/as-manager/{manager}', 'JobController@createAsManager')
            ->middleware('can:create,App\Models\JobPoster')
            ->name('admin.jobs.create.as_manager');
    }
);

/** API routes - currently using same default http auth, but not localized */
Route::group(['prefix' => 'api'], function (): void {
    Route::get("jobs/{jobPoster}", "JobController@get")
        ->middleware('can:view,jobPoster');

        // Protected by a gate in the controller, instead of policy middleware
    Route::get("jobs/{jobPoster}/assessment-plan", "AssessmentPlanController@getForJob");

    // Public, not protected by policy or gate
    Route::get("skills", "SkillController@index");

    // Resource Routes are protected by policies in controllers instead of middleware.
    Route::resource('assessments', 'AssessmentController')->except([
        'create', 'edit', 'index'
    ]);
    Route::resource('rating-guide-answers', 'RatingGuideAnswerController')->except([
        'create', 'edit', 'index'
    ]);
    Route::resource('rating-guide-questions', 'RatingGuideQuestionController')->except([
        'create', 'edit', 'index'
    ]);
    Route::resource('assessment-plan-notifications', 'AssessmentPlanNotificationController')->except([
        'store', 'create', 'edit'
    ]);
});
