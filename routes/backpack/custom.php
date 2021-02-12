<?php

// --------------------------
// Custom Backpack Routes.
// --------------------------
// This route file is loaded automatically by Backpack\Base.
// Routes you generate using Backpack\Generators will be placed here.
Route::group([
    'prefix' => config('backpack.base.route_prefix', 'admin'),
    'middleware' => ['web', config('backpack.base.middleware_key', 'admin')],
    'namespace' => 'App\Http\Controllers\Admin',
], function (): void {
    // Custom admin routes.
    Route::crud('skill', 'SkillCrudController');
    Route::crud('job-poster', 'JobPosterCrudController');
    Route::crud('user', 'UserCrudController');
    Route::crud('user-role', 'UserRoleCrudController');
    Route::crud('manager', 'ManagerCrudController');
    Route::crud('department', 'DepartmentCrudController');
    Route::crud('classification', 'ClassificationCrudController');
    Route::crud('job-poster-status', 'JobPosterStatusCrudController');
    Route::crud('job-poster-status-transition', 'JobPosterStatusTransitionCrudController');
    Route::crud('talent-stream', 'TalentStreamCrudController');
    Route::crud('talent-stream-category', 'TalentStreamCategoryCrudController');
    Route::crud('job-skill-level', 'JobSkillLevelCrudController');
    Route::crud('resource', 'ResourcesCrudController');
    Route::crud('2fa', 'TwoFactorCrudController');
    Route::crud('applicant', 'ApplicantCrudController');
    Route::crud('job-application', 'JobApplicationCrudController');
    Route::crud('skill-category', 'SkillCategoryCrudController');
});
