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

Route::get('/', function () {
    $test = array("firstVar" => "blah blah");
    return view('applicant/homepage', ["test" => $test ]);
});

Route::get('/laravel', function () {
    return view('welcome');
});
