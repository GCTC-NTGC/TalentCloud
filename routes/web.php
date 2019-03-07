<?php

use App\Http\Controllers\ScreeningPlanController;

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
            Route::get('/', 'HomepageController')->name('home');

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

                Route::get('profile', function () {
                    $applicant = Auth::user()->applicant;
                    return redirect(route('profile.about.edit', $applicant));
                })->name('profile');

                Route::get('profile/about', function () {
                    $applicant = Auth::user()->applicant;
                    return redirect(route('profile.about.edit', $applicant));
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
                Route::get('profile/experience', function () {
                    $applicant = Auth::user()->applicant;
                    return redirect(route('profile.experience.edit', $applicant));
                });

                Route::get('profile/{applicant}/experience', 'ExperienceController@edit')
                    ->middleware('can:view,applicant')
                    ->middleware('can:update,applicant')
                    ->name('profile.experience.edit');

                Route::post('profile/{applicant}/experience/update', 'ExperienceController@update')
                    ->middleware('can:update,applicant')
                    ->name('profile.experience.update');

                /* Profile - My Skills */
                Route::get('profile/skills', function () {
                    $applicant = Auth::user()->applicant;
                    return redirect(route('profile.skills.edit', $applicant));
                });

                Route::get('profile/{applicant}/skills', 'SkillsController@edit')
                    ->middleware('can:view,applicant')
                    ->middleware('can:update,applicant')
                    ->name('profile.skills.edit');

                /* Profile - My References */
                Route::get('profile/references', function () {
                    $applicant = Auth::user()->applicant;
                    return redirect(route('profile.references.edit', $applicant));
                });

                Route::get('profile/{applicant}/references', 'ReferencesController@edit')
                    ->middleware('can:view,applicant')
                    ->middleware('can:update,applicant')
                    ->name('profile.references.edit');

                Route::post('profile/{applicant}/references/update', 'ReferencesController@updateAll')
                    ->middleware('can:update,applicant')
                    ->name('profile.references.update');

                /* Profile - My Portfolio */
                Route::get('profile/portfolio', function () {
                    $applicant = Auth::user()->applicant;
                    return redirect(route('profile.work_samples.edit', $applicant));
                });

                Route::get('profile/{applicant}/portfolio', 'WorkSamplesController@edit')
                    ->middleware('can:view,applicant')
                    ->middleware('can:update,applicant')
                    ->name('profile.work_samples.edit');
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

        $managerGroup = function () : void {
            /* Home */
            Route::get('/', function () {
                return view('manager/home', [
                    "hero" => [
                        "hero_logo" => "/images/logo_tc_colour.png",
                        "hero_logo_alt" => Lang::get('manager/home_hero')['logo_alt_text'],
                        "hero_tagline" => Lang::get('manager/home_hero')['tagline']
                    ]
                ]);
            })->name('manager.home');

            Route::middleware(['auth', 'role:manager'])->group(function () : void {

                Route::get('profile', function () {
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

                Route::post('jobs/{jobPoster?}', 'JobController@store')
                    ->where('jobPoster', '[0-9]+')
                    ->name('manager.jobs.store');

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
            });

            Route::get('jobs/{jobPoster}/screening-plan', 'ScreeningPlanController@createForJob')
                ->name('manager.jobs.screening_plan');

            Route::post('jobs/{jobPoster}/screening-plan', 'ScreeningPlanController@store')
                ->name('manager.jobs.screening_plan.store');

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

        Route::group(['prefix' => config('app.manager_prefix')], $managerGroup);

        Route::group(['prefix' => 'demo', 'middleware' => 'localOnly'], function () : void {
            Route::get('review-applications', 'DemoController@reviewApplications')->name('demo.review_applications');
        });

        /* Language ============================================================= */

        Route::get('fr', function () {
        //TODO
            return redirect()->home();
        })->name('lang.fr');

        Route::get('en', function () {
        //TODO
            return redirect()->home();
        })->name('lang.en');
    }
);

/** ALL NON-LOCALIZED ROUTES **/

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

    Route::post('skill-declarations', 'SkillsController@create')
        ->middleware('can:create,App\Models\SkillDeclaration')
        ->name('skill_declarations.create');

    Route::put('skill-declarations/{skillDeclaration}', 'SkillsController@update')
        ->middleware('can:update,skillDeclaration')
        ->name('skill_declarations.update');

    Route::delete('skill-declarations/{skillDeclaration}', 'SkillsController@destroy')
        ->middleware('can:delete,skillDeclaration')
        ->name('skill_declarations.destroy');

    Route::put('references/{reference}', 'ReferencesController@update')
        ->middleware('can:update,reference')
        ->name('references.update');

    Route::post('references', 'ReferencesController@update')
        ->middleware('can:create,App\Models\Reference')
        ->name('references.create');

    Route::delete('references/{reference}', 'ReferencesController@destroy')
        ->middleware('can:delete,reference')
        ->name('references.destroy');

    Route::put('work-samples/{workSample}', 'WorkSamplesController@update')
        ->middleware('can:update,workSample')
        ->name('work_samples.update');

    Route::post('work-samples', 'WorkSamplesController@update')
        ->middleware('can:create,App\Models\WorkSample')
        ->name('work_samples.create');

    Route::delete('work-samples/{workSample}', 'WorkSamplesController@destroy')
        ->middleware('can:delete,workSample')
        ->name('work_samples.destroy');

    Route::delete('applications/{application}', 'ApplicationController@destroy')
        ->middleware('can:delete,application')
        ->name('applications.destroy');

    Route::put('applications/{application}/review', 'ApplicationReviewController@updateForApplication')
        ->middleware('can:review,application')
        ->name('application_reviews.update');

    Route::delete('screening-plans/{screeningPlan}', 'ScreeningPlanController@destroy')
        ->middleware('role:manager')
        ->middleware('can:delete,screeningPlan')
        //TODO: add can:delete middleware for screening plan
        ->name('screening_plans.destroy');
});
