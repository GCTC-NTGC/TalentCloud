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
], function () : void {
    // Custom admin routes.
    CRUD::resource('skill', 'SkillCrudController');
    CRUD::resource('job-poster', 'JobPosterCrudController');
    CRUD::resource('user', 'UserCrudController');
    CRUD::resource('manager', 'ManagerCrudController');
    CRUD::resource('department', 'DepartmentCrudController');
});
