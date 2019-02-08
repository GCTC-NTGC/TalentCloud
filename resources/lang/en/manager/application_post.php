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
        'twitter_title' => 'Visit :name\'s Twitter profile.',
        'linkedin_title' => 'Visit :name\'s LinkedIn profile.'
    ],
    'content' => [
        'job_poster' => 'Job Poster',
        'review' => [
            'name' => 'Name',
            'info' => 'Info',
            'reviewed' => 'Reviewed?',
            'decision' => 'Decision',
            'reviewer' => 'Reviewer',
            'notes' => 'Notes',
            'form' => [
                'email' => 'Email',
                'profile' => 'Profile',
                'application' => 'Application',
                'placeholder' => [
                    'reviewer' => 'Reviewer',
                    'other_notes' => 'Other Notes...'
                ],
                'save' => 'Save'
            ]
        ]
    ]
];
