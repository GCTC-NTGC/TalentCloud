<?php

return [
    /*
    * --------------------------------------------------------------------------
    * Manager Applicant Profile Localization
    * --------------------------------------------------------------------------
    * route: /manager/applicants/#
    * controller: Controllers/ApplicantProfileController.php
    * view: views/manager/applicant_profile.html.twig
    *
    *
    */

    'title' => 'Applicant Profile',
    'header' => [
        'twitter_title' => 'Visit :name\'s Twitter profile.',
        'linkedin_title' => 'Visit :name\'s LinkedIn profile.'
    ],
    'content' => [
        'whose_profile' => 'You are viewing :name\'s profile.',
        'no_applicant_answers' => 'The applicant hasn\'t answered any questions.',
        'their_answer' => 'Their Answer:'
    ]
];
