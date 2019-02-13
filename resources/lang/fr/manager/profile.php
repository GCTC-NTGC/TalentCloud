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
            'branch_english' => 'Branche (English)',
            'branch_french' => 'Branche (Français)',
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
            'my_leadership_style' => "Mon style de leadership",
            'my_style_values' => "Mon style de leadership et mes valeurs de gestion",
            'answer_english' => "Réponse (English)",
            'answer_french' => "Réponse (Français)",
            'expect_from_employees' => "Ce que j'attends de mes employés",
            'approach_learning_development' => "Mon approche à l'apprentissage et au développement de mes employés",
            'save_leadership_style' => "Enregistrer Mon style de leadership"
        ],
        'environment' => [
            'work_environment' => "Notre environnement de travail",
            'things_to_know' => "Ce qu'il faut savoir",
            'answer_english' => "Réponse (English)",
            'answer_french' => "Réponse (Français)",
            'telework_frequency' => "À quelle fréquence le télétravail est-il autorisé?",
            'flexible_hour_frequency' => "À quelle fréquence les heures flexibles sont-elles autorisées?",
            'environment_photos' => "Photos de l'environnement de travail",
            'upload_image' => "Télécharger un photo",
            'alt_text_english' => "Texte alternatif de l'image (English)",
            'alt_text_french' => "Texte alternatif de l'image (Français)",
            'save_work_environment' => "Enregistrer Notre environnement de travail",
            'frequency' => [
              'never' => 'Jamais',
              'rarely' => 'Rarement',
              'sometimes' => 'Parfois',
              'often' => 'Habituellement',
              'always' => 'Presque toujours',
            ]

        ],
        'culture' => [
            'team_culture' => "Notre culture d'équipe",
            'primary_information' => "Informations primaires",
            'team_size' => "Taille de l'équipe",
            'gc_directory_link' => "Lien GCannuaire",
            'operating_context' => "Notre contexte opérationnel",
            'answer_english' => "Réponse (English)",
            'answer_french' => "Réponse (Français)",
            'what_we_value' => "Nos valeurs",
            'how_we_work' => "Notre mode de fonctionnement",
            'save_team_culture' => "Enregistrer Notre culture d'équipe"
        ]

    ]
];
