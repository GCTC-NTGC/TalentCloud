<?php
return [
    /*
    * --------------------------------------------------------------------------
    * FR Manager Portal Profile Edit
    * --------------------------------------------------------------------------
    * Route: /manager/profile/#/edit
    * Controller: Controllers\ManagerProfileController.php
    * View: views/manager/profile.html.twig
    */

    'title' => 'Mon profile',
    'profile_header' => [
        'twitter' => 'Voir le profile twitter de :name.',
        'linkedin' => 'Voir le profile LinkedIn de :name.'
    ],
    'layout' => [
        'sidebar' => [
            'profile_sections' => 'Sections du profile',
            'my_account' => 'Mon compte',
            'about_me' => 'À propos de moi',
            'leadership_style' => 'Mon style de leadership',
            'our_work_environment' => 'Notre environnement de travail',
            'our_team_culture' => 'Notre culture d\'équipe',
            'save_all_sections' => 'Enregistrer toutes les sections'
        ],
        'about' => [
            'about_me' => 'À propos de moi',
            'my_name' => 'Mon prénom et nom',
            'position' => 'Mon poste',
            'position_english' => 'Poste (English)',
            'position_french' => 'Poste (Français)',
            'departmental_information' => 'Renseignements ministériels',
            'department' => 'Ministère',
            'change_department_info' => 'Pour changer de département, veuillez contacter',
            'talent_cloud_email' => [
                'href' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
                'text' => 'le Nuage de talents.',
                'title' => 'Envoyer un courriel au Nuage de talents.'
            ],
            'account_settings' => 'Pour en savoir plus, visitez',
            'account_settings_link' => [
                'href' => '/settings',
                'text' => 'les paramètres de votre compte',
                'title' => 'Visitez la page Paramètres du compte.'
            ],
            'division_english' => 'Division (English)',
            'division_french' => 'Division (Français)',
            'personal_information' => 'Renseignements personnels',
            'education_english' => 'Éducation (English)',
            'education_french' => 'Éducation (Français)',
            'years_of_experience' => 'Années d\'expérience',
            'career_journey_english' => 'Mon parcours de carrière jusqu\'à présent (English)',
            'career_journey_french' => 'Mon parcours de carrière jusqu\'à présent (Français)',
            'learning_path_english' => 'Mon parcours d\'apprentissage (English)',
            'learning_path_french' => 'Mon parcours d\'apprentissage (Français)',
            'biography_english' => 'Un peu à propos de moi en dehors du travail (English)',
            'biography_french' => 'Un peu à propos de moi en dehors du travail (Français)',
            'social_media' => 'Médias sociaux',
            'twitter_username' => 'Mon profil Twitter',
            'linkedin_url' => 'Mon profil LinkedIn',
            'save_about_me' => 'Enregistrer À propos de moi'

        ],
        'leadership' => [
            'my_leadership_style' => 'Mon style de leadership',
            'my_style_values' => 'Mon style de leadership et mes valeurs de gestion',
            'answer_english' => 'Réponse (English)',
            'answer_french' => 'Réponse (Français)',
            'expect_from_employees' => "Ce que j'attends de mes employés",
            'approach_learning_development' => "Mon approche à l'apprentissage et au développement de mes employés",
            'save_leadership_style' => 'Enregistrer Mon style de leadership'
        ],
    ]
];
