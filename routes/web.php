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
    return view('applicant/home', [
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
                "active" => true
            ],
            "browse" => [
                "name" => "Browse Jobs",
                "link" => "/browse/",
                "active" => false
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
        /* Home */
        "home" => [
            "hero_logo_alt" => "The GC Talent Cloud Logo.",
            "hero_logo" => "/images/logo_tc_colour.png",
            "hero_tagline" => "People want meaningful work.",
            "about_card_copy_01" => "The jobs are not real (for now).",
            "about_card_copy_02" => "The platform is experimental.",
            "about_cta" => "Help us build a new hiring model for the Government of Canada.",
            "about_copy" => "GC Talent Cloud is making government hiring transparent and connecting hiring managers to people with mad wicked skills, like you.",
            "how_title" => "How It Works",
            "how_intro" => "GC Talent Cloud connects you to teams and projects where you can use your unique skills to make a difference in the lives of Canadians.",
            "how_copy" => "We want GC Talent Cloud to be a drive engine that allows more Canadians to have a chance to work in Government. We want diverse talent to bring new ideas that will shape programs and services across Canada.",
            "how_cta_copy" => "Interested in chatting about a potential partnership?",
            "how_cta_link" => "talent.cloud-nuage.de.talents@tbs-sct.gc.ca",
            "how_cta_title" => "Get in touch with GC Talent Cloud via email.",
            "how_cta_label" => "Contact Us!",
            "team_title" => "Our Team",
            "team_copy" => "We are a small but growing team of public servants passionate about the future of talent in Canada. Learn more about us and make your own contribution to GC Talent Cloud by joining us on one of these channels.",
            "team_button_gccollab_link" => "https://gccollab.ca/groups/profile/19750/talent-cloud-nuage-de-talent",
            "team_button_gccollab_title" => "Visit the team on GCCollab.",
            "team_button_gccollab_label" => "GC Collab",
            "team_button_twitter_link" => "https://twitter.com/TalentCloudGC",
            "team_button_twitter_title" => "Visit the team on Twitter.",
            "team_button_twitter_label" => "Twitter"
        ]
    ]);
});

Route::get('/browse/', function () {
    return view('applicant/browse', [
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
                "link" => "/browse/",
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
        /* Browse */
        "page" => [
            "title" => "Browse Jobs"
        ],
        "browse" => [
            "hero_logo_alt" => "The GC Talent Cloud Logo.",
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
});

Route::get('/profile/', function () {
    return view('applicant/profile', [
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
                "link" => "/browse/",
                "active" => false
            ],
            "applications" => [
                "name" => "My Applications",
                "link" => "/applications/",
                "active" => false
            ],
            "profile" => [
                "name" => "My Profile",
                "link" => "/profile/",
                "active" => true
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
});

Route::get('/laravel', function () {
    return view('welcome');
});
