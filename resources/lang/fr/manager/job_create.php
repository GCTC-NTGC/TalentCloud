<?php

return [
    /*
    * --------------------------------------------------------------------------
    * FR  Manager Portal Job Create Localization
    * --------------------------------------------------------------------------
    * Route: /manager/jobs/create
    * Controller: Controllers\JobController.php
    * View: views/manager/job_create.html.twig
    */

    'title' => 'Créer une affiche d\'emploi',
    'layout' => [
        'sidebar' => [
            'poster_sections' => 'Sections de l\'affiche',
            'job_details' => 'Détails du travail',
            'key_tasks' => 'Tâches principales',
            'skills_n_competencies' => 'Compétences',
            'questions' => 'Questions pour le candidat'
        ],
        'form' => [
            'job_details' => 'Détails du travail',
            'job_title' => 'Titre d\'emploi',
            'job_title_english' => 'Titre d\'emploi (English)',
            'job_title_french' => 'Titre d\'emploi (Français)',
            'salary_range' => 'Échelle salariale',
            'minimum_value' => 'Valeur minimum',
            'maximum_value' => 'Valeur maximum',
            'classifications' => 'Classifications',
            'occupational_group' => 'Catégorie professionnelle',
            'noc_code' => 'Code de Classification nationale des professions (CNP)',
            'security_clearance' => 'Habilitation de sécurité',
            'language_requirement' => 'Exigence linguistique',
            'location' => 'Lieu',
            'remote_work_allowed' => 'Travail à distance autorisé',
            'city' => 'Ville',
            'province' => 'Province',
            'timetable' => 'Horaire',
            'accepting_applications_from' => 'Accepter les applications à partir de',
            'opening_time' => 'Heure d\'ouverture, UTC',
            'accepting_applications_to' => 'Accepter les applications jusqu\'au',
            'closing_time' => 'Heure de clôture, UTC',
            'position_start' => 'Date de début du poste',
            'position_duration' => 'Durée du poste (mois)',
            'departmental_information' => 'Information ministériel',
            'department' => 'Département',
            'branch_english' => 'Branche (English)',
            'branch_french' => 'Branche (Français)',
            'division_english' => 'Division (English)',
            'division_french' => 'Division (Français)',
            'impact' => 'Impact',
            'impact_english' => 'Impact (English)',
            'impact_french' => 'Impact (Français)',
            'key_tasks' => 'Tâches principales',
            'task' => [
                'task_information' => 'Information pour la tâche',
                'task_name_english' => 'Nom de la tâche (English)',
                'task_name_french' => 'Nom de la tâche (Français)'
            ],
            'add_a_task' => 'Ajouter une tâche',
            'skills_n_competencies' => 'Compétences',
            'education_or_equivalency' => 'Education ou équivalence',
            'education_english' => 'Education (English)',
            'education_french' => 'Education (Français)',
            'criteria_heading' => 'Critère :criteria_type (Compétences :skill_type)',
            'criterion' => [
                'skill_information' => 'Information de la compétences',
                'select_skill' => 'Choisir la compétences',
                'select_level_required' => 'Choisir le niveau requis',
                'skill_context_english' => 'Contexte facultatif des compétences (English)',
                'skill_context_french' => 'Contexte facultatif des compétences (Français)'
            ],
            'add_a_skill' => 'Ajouter un compétences :criteria_type :skill_type',
            'questions_for_applicant' => 'Questions pour le candidat',
            'question' => [
                'question_information' => 'Information pour la question',
                'question_english' => 'Question (English)',
                'description_english' => 'Description (English)',
                'question_french' => 'Question (Français)',
                'description_french' => 'Description (Français)'
            ],
            'add_a_question' => 'Ajouter une question',
            'save_and_preview' => 'Enregistrer et visualiser',
            'publish' => 'Publier'

        ]
    ],
    /* Localizations for Default questions fuction in controller */
    'questions' => [
        "00" => "Pourquoi êtes-vous intéressé par ce travail?",
        "01" => "Pourquoi pensez-vous que vous serez un bon candidat pour ce poste?"
    ]
];
