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
        "link" => route('home')
    ],
    "jobs" => [
        "name" => "Browse Jobs",
        "link" => route('jobs.index')
    ],
    "applications" => [
        "name" => "My Applications",
        "link" => route('applications.index')
    ],
    "profile" => [
        "name" => "My Profile",
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
        "link" => route('register')
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
