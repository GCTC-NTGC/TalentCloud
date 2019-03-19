<?php

return [
    /*
    * --------------------------------------------------------------------------
    * Manager Applicant Profile Localization
    * --------------------------------------------------------------------------
    * route: /en/manager/applicants/#
    * controller: Controllers/ApplicantProfileController.php
    * view: views/manager/applicant_profile.html.twig
    *
    *
    */

    'title' => 'Profil du candidat',
    'header' => [
        'twitter_title' => 'Voir le profile twitter de :name.',
        'linkedin_title' => 'Voir le profile LinkedIn de :name.'
    ],
    'content' => [
        'whose_profile' => 'Voici le profil de :name.',
        'no_applicant_answers' => 'Le candidat n\'a répondu à aucune question.',
        'no_applicant_answer' => "Le candidat n'a pas répondu à cette question de profil.",
        'their_answer' => 'Leur réponse :'
    ]
];
