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
            'security_clearance_default_option' => 'Choisir une habilitation de sécurité...',
            'language_requirement' => 'Exigence linguistique',
            'language_requirement_default_option' => 'Choisir une exigence linguistique...',
            'location' => 'Lieu',
            'remote_work_allowed' => 'Travail à distance autorisé',
            'city' => 'Ville',
            'province' => 'Province',
            'province_default_option' => 'Choisir la province...',
            'timetable' => 'Horaire',
            'accepting_applications_from' => 'Accepter les applications à partir de',
            'opening_time' => 'Heure d\'ouverture, UTC',
            'accepting_applications_to' => 'Accepter les applications jusqu\'au',
            'closing_time' => 'Heure de clôture, UTC',
            'position_start' => 'Date de début du poste',
            'position_duration' => 'Durée du poste (mois)',
            'departmental_information' => 'Information ministériel',
            'departmental_info_default_option' => 'Choisissez le ministère...',
            'department' => 'Département',
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
                'skill_information' => 'Information de la compétence',
                'select_skill' => 'Compétence',
                'select_skill_default_option' => 'Choisir une compétence...',
                'select_level_required' => 'Niveau requis',
                'select_level_required_default_option' => 'Choisir le niveau requis...',
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
        '00' => 'Pourquoi êtes-vous intéressé par ce travail?',
        '01' => 'Pourquoi pensez-vous que vous serez un bon candidat pour ce poste?'
    ],
    'strategic_response_questions' => [
        'Quel est votre classification et votre niveau actuel? (par exemple, IS-03)',
        'Quel est votre niveau actuel en français et en anglais? (par exemple, BBB/BBB)',
        'Quel est votre lieu de travail actuel? (Ville, Province)',
        'Quels sont votre ministère d\'attache et votre direction générale? (Ministère, Direction générale)',
        'Pouvez-vous travailler à temps plein? Si ce n’est pas le cas, veuillez indiquer votre disponibilité.',
        'L\'équipe que vous aidez devra-t-elle fournir des mesures d\'adaptation supplémentaires pour que vous puissiez appliquer vos compétences au travail requis?',
        'Avez-vous de l\'expérience ou des compétences (autres que celles requises pour ce poste) qui peuvent être un atout à l\'équipe dans les circonstances actuelles?',
    ]
];
