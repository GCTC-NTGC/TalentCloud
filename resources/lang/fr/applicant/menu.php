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
        "name" => "Accueil",
        "link" => route('home')
    ],
    "browse" => [
        "name" => "Parcourir les emplois",
        "link" => route('jobs.index')
    ],
    "applications" => [
        "name" => "Mes applications",
        // "link" => route('application.index')
        "link" => "/applications/"
    ],
    "profile" => [
        "name" => "Mon profile",
        "link" => route('profile')
    ],
    "register" => [
        "name" => "Inscription",
        //A redirect parameter should be added to this link in MenuComposer
        "link" => "https://account.gccollab.ca/register/" 
    ],
    "login" => [
        "name" => "Ouverture de session (Compte GC)",
        "link" => route('login')
    ],
    "logout" => [
        "name" => "Se déconnecter",
        "link" => route('logout')
    ]
];



