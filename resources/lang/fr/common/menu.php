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
            "applicant" => vrai,
            "manager" => faux
        ],
        //"link" => route('home')
    ],
    "browse" => [
        "name" => "Parcourir les emplois",
        "access" => [
            "applicant" => vrai,
            "manager" => faux
        ],
        //"link" => route('jobs.index')
    ],
    "applications" => [
        "name" => "Mes applications",
        "access" => [
            "applicant" => vrai,
            "manager" => faux
        ],
        // //"link" => route('application.index')
        //"link" => "/applications/"
    ],
    "profile" => [
        "name" => "Mon profil",
        "access" => [
            "applicant" => vrai,
            "manager" => faux
        ],
        //"link" => route('profile')
    ],
    "admin" => [
        "name" => "Page d'accueil",
        "access" => [
            "applicant" => faux,
            "manager" => vrai
        ],
        //"link" => "/admin/"
    ],
    "adminjobs" => [
        "name" => "Mes emplois",
        "access" => [
            "applicant" => faux,
            "manager" => vrai
        ],
        //"link" => "/admin/emplois/"
    ],
    "adminprofile" => [
        "name" => "My profile",
        "access" => [
            "applicant" => faux,
            "manager" => vrai
        ],
        //"link" => "/admin/profil/"
    ]
];
