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
                "link" => "/browse/jobs/00/",
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
                "link" => "/brwose/jobs/01/",
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

Route::get('/browse/jobs/00/', function () {
    return view('applicant/job-post', [
        /* Alerts */
        "alert" => [
            "copy" => "This site is under construction. The jobs are not in fact real at the moment.",
            "feedback_copy" => "Help us improve GC Talent Cloud.",
            "feedback_link" => "talent.cloud-nuage.de.talents@tbs-sct.gc.ca",
            "feedback_link_title" => "Submit feedback to GC Talent Cloud via email.",
            "feedback_link_copy" => "Submit Feedback"
        ],
        /* GoC */
        "goc" => [
            "logo_link" => "https://www.canada.ca/en.html",
            "logo_link_title" => "Visit Canada.ca.",
            "logo_alt" => "The Government of Canada Logo.",
            "logo_url" => "/images/logo_goc_white.svg",
            "talent_cloud" => "GC Talent Cloud",
            "portal" => "Applicant Portal",
            "language_link" => "/fr",
            "language_link_title" => "Cliquez içi pour le site Français.",
            "language" => "Français"
        ],
        /* Menu */
        "menu" => [
            "home" => [
                "name" => "Home",
                "link" => "/",
                "active" => false
            ],
            "browse" => [
                "name" => "Browse Jobs",
                "link" => "/browse/jobs/",
                "active" => true
            ],
            "applications" => [
                "name" => "My Applications",
                "link" => "/applications/",
                "active" => false
            ],
            "profile" => [
                "name" => "My Profile",
                "link" => "/profile/",
                "active" => false
            ],
            "register" => [
                "name" => "Register",
                "link" => "http://gccollab.gc.ca/",
                "active" => false
            ],
            "login" => [
                "name" => "Login",
                "link" => "http://gccollab.gc.ca/",
                "active" => false
            ],
            "logout" => [
                "name" => "Logout",
                "link" => "#",
                "active" => false
            ]
        ],
        /* Footer */
        "footer" => [
            "terms" => [
                "link" => "/terms/",
                "link_title" => "View our terms and conditions.",
                "link_label" => "Terms & Conditions"
            ],
            "privacy" => [
                "link" => "/privacy/",
                "link_title" => "View our privacy policy.",
                "link_label" => "Privacy Policy"
            ],
            "canada" => [
                "link" => "https://www.canada.ca/en.html",
                "link_title" => "Visit Canada.ca.",
                "link_label" => "Canada.ca"
            ],
            "logo_link" => "https://www.canada.ca/en.html",
            "logo_link_title" => "Visit Canada.ca.",
            "logo_alt" => "Canada's Logo.",
            "logo_url" => "/images/logo_canada_white.png"
        ],
        /* Template */
        "template" => [
            "title" => "Browse Jobs",
            "days_remaining_label" => "days remaining.",
            "applicants_label" => "applicants so far.", 
            "location_icon_label" => "Location Icon.",
            "remote_icon_label" => "Remote Work Icon.",
            "reference_id_label" => "Reference ID #",
            "sidebar_label" => "About this job:",
            "basics" => [
                "sidebar_title" => "View this job's basic information.",
                "title" => "Basic Information",
                "salary_label" => "Salary Range",
                "duration_label" => "Duration",
                "start_label" => "Target Start Date",
                "language_label" => "Language Requirement",
                "security_label" => "Security Clearance",
                "classification_label" => "GoC Classification"
            ],
            "impact" => [
                "sidebar_title" => "View this job's impact information.",
                "title" => "Impact"
            ],
            "work" => [
                "sidebar_title" => "View this job's work information.",
                "title" => "Your Work"
            ],
            "criteria" => [
                "sidebar_title" => "View this job's criteria information.",
                "title" => "Criteria"
            ],
            "culture" => [
                "sidebar_title" => "View this job's culture information.",
                "title" => "Team Culture"
            ],
            "know" => [
                "sidebar_title" => "View this job's extra information.",
                "title" => "Nice to Know"
            ],
            "apply" => [
                "sidebar_title" => "View this job's application section.",
                "title" => "Apply Now"
            ]
        ],
        "job" => [
            "link" => "/browse/jobs/00/",
            "title" => "Front-end Developer",
            "department" => "Treasury Board of Canada Secretariat",
            "city" => "Ottawa",
            "province" => "Ontario",
            "salary" => "80,000 - 120,000",
            "duration" => "1 Year",
            "remote" => "Allowed",
            "days_remaining" => "12",
            "applicants" => "2",
            "reference_id" => "14234",
            "start" => "January 3rd, 2019",
            "language" => "English Essential",
            "security" => "Top Secret",
            "classification" => "CS3"
        ]
    ]);
});

Route::get('profile', function () {
    return view('applicant/profile', [
        /* Browse */
        "template" => [
            "title" => "My Profile"
        ],
        /* Applicant Profile Questions */
        "applicant_profile_questions" => [
            "0" => [
                "value" => "My career journey so far...",
                "description" => "This is your chance to share the unique story of how you got to where you are now… and where you want to go from here.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion0",
                "answer" => null
            ],
            "1" => [
                "value" => "My learning journey so far...",
                "description" => "Learning never stops, and it comes to all of us in different ways. Whether it comes from formal education or life lessons, knowledge passed on from elders or things you’ve picked up along the way, here’s your chance to share a bit about this side of who you are.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion1",
                "answer" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut ante aliquet felis finibus luctus. Vivamus justo ante, convallis id justo sed, venenatis ornare magna. Maecenas tempor nunc sit amet mollis venenatis. Proin vitae nunc interdum, porttitor leo a, mollis diam. Sed auctor ultricies massa at aliquam."
            ],
            "2" => [
                "value" => "What I bring to a team...",
                "description" => "People take note of the rock star and forget they are nothing without the band. Help potential teams and managers see what unique skills, attributes and knowledge you bring to help a team do great work.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion2",
                "answer" => null
            ],
            "3" => [
                "value" => "I work best when...",
                "description" => "Introvert? Extrovert? Bit of both? Do you like tight deadlines or do you prefer to have time to process ideas? Do you work well independently or are team products more your thing? Here’s your chance to let a potential manager know what will let you give the team your best.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion3",
                "answer" => null
            ],
            "4" => [
                "value" => "I learn best when...",
                "description" => "Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion4",
                "answer" => null
            ],
            "5" => [
                "value" => "Types of teams I work well on...",
                "description" => "Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.",
                "answer_label" => "Your Answer",
                "input_name" => "applicantProfileQuestion5",
                "answer" => null
            ],
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
