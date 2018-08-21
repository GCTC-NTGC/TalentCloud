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
        "link" => route('manager.home')
    ],
    "jobs" => [
        "name" => "My Job Posters",
        "link" => route('manager.jobs.index')
    ],
    "create_job" => [
        "name" => "Create Job Poster",
        "link" => route('manager.jobs.create')
    ],
    "profile" => [
        "name" => "My Profile",
        "link" => route('manager.profile.edit')
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
