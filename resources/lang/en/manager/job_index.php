<?php
return [
    /*
    * --------------------------------------------------------------------------
    * Manager Portal Job Index Localizations
    * --------------------------------------------------------------------------
    * Route: /manager/jobs
    * Controller: Controllers\JobController.php
    * View: views/manager/job_index.html.twig
    */

    'title' => 'My Job Posts',
    'temp_layout' => [
        'job_poster' => 'Job Poster',
        'edit' => 'Edit mewo',
        'screening_plan_builder' => 'Screening Plan Builder',
        'veteran_applicants' => 'Veteran Applicants',
        'citizen_applicants' => 'Citizen Applicants',
        'other_applicants' => 'Other Applicants',
        'none' => 'None',
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
