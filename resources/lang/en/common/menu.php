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
    "browse" => [
        "name" => "Browse Jobs",
        "link" => route('jobs.index')
    ],
    "applications" => [
        "name" => "My Applications",
        // "link" => route('application.index')
        "link" => "/applications/"
    ],
    "profile" => [
        "name" => "My Profile",
        "link" => route('profile')
    ],
    "register" => [
        "name" => "Register",
        //A redirect parameter should be added to this link in MenuComposer
        "link" => "https://account.gccollab.ca/register/" 
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



