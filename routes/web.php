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

Route::get('/', 'Applicant\HomepageController')->name('home');

Route::get('jobs', function () {
    return view('applicant/browse', [  
        /* Browse */
        "browse" => [
            "title" => "Browse Jobs",
            "index" => [
                "view_title" => "View the job post for",
                "location_label" => "Location",
                "salary_label" => "Salary",
                "duration_label" => "Duration",
                "remote_label" => "Remote Work",
                "days_remaining_label" => "days until close.",
                "applicants_label" => "applicants so far.",
                "button_label" => "View Job"
            ]
        ],
        "jobs" => [
            "0" => [
                "link" => "/jobs/00/",
                "title" => "Front-end Developer",
                "department" => "Treasury Board of Canada Secretariat",
                "city" => "Ottawa",
                "province" => "Ontario",
                "salary" => "80,000 - 120,000",
                "duration" => "1 Year",
                "remote" => "Allowed",
                "days_remaining" => "12",
                "applicants" => "2"
            ],
            "1" => [
                "link" => "/jobs/01/",
                "title" => "Consultant",
                "department" => "Treasury Board of Canada Secretariat",
                "city" => "Ottawa",
                "province" => "Ontario",
                "salary" => "85,000 - 115,000",
                "duration" => "6 Months",
                "remote" => "Not Allowed",
                "days_remaining" => "1",
                "applicants" => "10"
            ]
        ]
    ]);
})->name('jobs');

Route::get('profile', function () {
    return view('applicant/profile', [
        /* Browse */
        "page" => [
            "title" => "My Profile"
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

Route::get('applications', function() {
    //TODO
    return redirect()->route('home');
})->name('applications');

Route::get('login', function() {
    //TODO
    return redirect()->route('home');
})->name('login');

Route::get('logout', function() {
    //TODO
    return redirect()->route('home');
})->name('logout');

Route::get('laravel', function () {
    return view('welcome');
});
