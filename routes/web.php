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

use App\Models\ApplicantProfileQuestion;

Route::get('/locale_test', function () {
    App::setLocale('fr');
    /* @var $question ApplicantProfileQuestion */
    $question = ApplicantProfileQuestion::first();
    //$question localizable properties , like value and description, will be automatically translated with default locale
    //Non localized properties,like name, are also available
    //Other locales are available if we specify a translation
    
    $test = array("firstVar" => $question->value, 
        "secondVar" => $question->name, 
        "thirdVar" => $question->translate('en')->description);
    return view('applicant/locale_test', ["test" => $test ]);
});

Route::get('/laravel', function () {
    return view('welcome');
});
