<?php
return [
    /*
     * --------------------------------------------------------------------------
     * French Menu Language Lines
     * --------------------------------------------------------------------------
     *
     * The following language lines are used in the nav menu.
     *
     */
    "home" => [
        "name" => "Page d'accueil",
        "access" => [
            "applicant" => true,
            "manager" => false
        ],
        //"link" => route('home')
    ],
    "browse" => [
        "name" => "Parcourir les emplois",
        "access" => [
            "applicant" => true,
            "manager" => false
        ],
        //"link" => route('jobs.index')
    ],
    "applications" => [
        "name" => "Mes applications",
        "access" => [
            "applicant" => true,
            "manager" => false
        ],
        // //"link" => route('application.index')
        //"link" => "/applications/"
    ],
    "profile" => [
        "name" => "Mon profil",
        "access" => [
            "applicant" => true,
            "manager" => false
        ],
        //"link" => route('profile')
    ],
    "admin" => [
        "name" => "Page d'accueil",
        "access" => [
            "applicant" => false,
            "manager" => true
        ],
        //"link" => "/admin/"
    ],
    "adminjobs" => [
        "name" => "Mes emplois",
        "access" => [
            "applicant" => false,
            "manager" => true
        ],
        //"link" => "/admin/emplois/"
    ],
    "adminprofile" => [
        "name" => "My profile",
        "access" => [
            "applicant" => false,
            "manager" => true
        ],
        //"link" => "/admin/profil/"
    ]
];
