<?php

return [
    /*
    * --------------------------------------------------------------------------
    * Manager Application Post View Language Lines
    * --------------------------------------------------------------------------
    * controller: Controllers/ApplicationController.php
    * view: views/manager/application_post.html.twig
    * route: /manager/applications/#
    *
    *
    */

    'title' => 'Applicant Profile',
    'header' => [
        'twitter_title' => 'Visit :name\'s Twitter profile.',
        'linkedin_title' => 'Visit :name\'s LinkedIn profile.'
    ],
    'content' => [
        'job_poster' => 'Job Poster',
        'review' => [
            'name' => 'Name',
            'info' => 'Info',
            'reviewed' => 'Reviewed?tasitc',
            'decision' => 'Decision',
            'reviewer' => 'Reviewer',
            'notes' => 'Notestasitc',
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
