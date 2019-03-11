<?php

return [
    /*
    * --------------------------------------------------------------------------
    * Manager Application Post Localization
    * --------------------------------------------------------------------------
    * route: /manager/applications/#
    * controller: Controllers/ApplicationController.php
    * view: views/manager/application_post.html.twig
    *
    *
    */

    'header' => [
      'twitter_title' => 'Voir le profile twitter de :name.',
      'linkedin_title' => 'Voir le profile LinkedIn de :name.'
    ],
    'content' => [
        'job_poster' => 'Affiche d\'emploi',
        'review' => [
            'name' => 'Prénom et nom',
            'info' => 'Info',
            'reviewed' => 'Réviser?',
            'decision' => 'Décision',
            'reviewer' => 'Réviseur',
            'notes' => 'Notes',
            'form' => [
                'email' => 'Courriel',
                'profile' => 'Profil',
                'application' => 'Application',
                'placeholder' => [
                    'reviewer' => 'Réviseur',
                    'other_notes' => 'Autres notes...'
                ],
                'save' => 'Enregistrer'
            ]
        ]
    ]
];
