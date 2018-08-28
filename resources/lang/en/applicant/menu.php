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
    "register" => [
        "name" => "Register",
        "link" => route('register')
    ],
    "login" => [
        "name" => "Login (GC Account)",
        "link" => route('login')
    ],
    "logout" => [
        "name" => "Logout",
        "link" => route('logout')
    ]
];
