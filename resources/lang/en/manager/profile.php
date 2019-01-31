<?php
return [
    /*
    * --------------------------------------------------------------------------
    * Manager Portal Profile Edit
    * --------------------------------------------------------------------------
    * Route: /manager/profile/#/edit
    * Controller: Controllers\ManagerProfileController.php
    * View: views/manager/profile.html.twig
    */

    'title' => 'My Profile',
    'profile_header' => [
        'twitter' => 'Visit :name\'s Twitter profile.',
        'linkedin' => 'Visit :name\'s LinkedIn profile.'
    ],
    'layout' => [
        'sidebar' => [
            'profile_sections' => 'Profile Sections',
            'about_me' => 'About Me',
            'leadership_style' => 'My Leadership Style',
            'our_work_environment' => 'Our Work Environment',
            'our_team_culture' => 'Our Team Culture',
            'save_all_sections' => 'Save All Sections'
        ]

    ]
];
