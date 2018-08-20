<?php

return [
    /*
     * --------------------------------------------------------------------------
     * Menu Language Lines
     * --------------------------------------------------------------------------
     *
     * The following language lines are used in the nav menu.
     *
     */
    "home" => [
        "name" => "Home",
        "access" => [
            "applicant" => true,
            "manager" => false
        ],
        "link" => route('home')
    ],
    "browse" => [
        "name" => "Browse Jobs",
        "access" => [
            "applicant" => true,
            "manager" => false
        ],
        "link" => route('jobs.index')
    ],
    "applications" => [
        "name" => "My Applications",
        "access" => [
            "applicant" => true,
            "manager" => false
        ],
        // "link" => route('application.index')
        "link" => "/applications/"
    ],
    "profile" => [
        "name" => "My Profile",
        "access" => [
            "applicant" => true,
            "manager" => false
        ],
        "link" => route('profile')
    ],
    "admin" => [
        "name" => "Home",
        "access" => [
            "applicant" => false,
            "manager" => true
        ],
        "link" => "/admin/"
    ],
    "adminjobs" => [
        "name" => "My Jobs",
        "access" => [
            "applicant" => false,
            "manager" => true
        ],
        "link" => "/admin/jobs/"
    ],
    "adminprofile" => [
        "name" => "My Profile",
        "access" => [
            "applicant" => false,
            "manager" => true
        ],
        "link" => "/admin/profile/"
    ],
    "register" => [
        "name" => "Register",
        "access" => [
            "applicant" => true,
            "manager" => false
        ],
        //A redirect parameter should be added to this link in MenuComposer
        "link" => "https://account.gccollab.ca/register/" 
    ],
    "login" => [
        "name" => "Login (GC Account)",
        "access" => [
            "applicant" => true,
            "manager" => true
        ],
        "link" => route('login')
    ],
    "logout" => [
        "name" => "Logout",
        "access" => [
            "applicant" => true,
            "manager" => true
        ],
        "link" => route('logout')
    ]
];



