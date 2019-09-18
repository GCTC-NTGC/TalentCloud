<?php
return [
    /*
    * --------------------------------------------------------------------------
    * Manager Portal Job Index Localization
    * --------------------------------------------------------------------------
    * Route: /manager/jobs
    * Controller: Controllers\JobController.php
    * View: views/manager/job_index.html.twig
    */
    'title' => 'Mes affiches d\'emploi',
    'legend' => 'Légende:',
    'draft_poster' => 'Affiche ébauche',
    'submitted_published' => 'Soumis / publié',
    'action_required' => 'Action requise',
    'create_poster' => 'Créer une nouvelle affiche',
    'create_job_poster' => 'Créer une nouvelle affiche d\'emploi',
    'active_posters' => 'Mes affiches actives',
    'no_active_posters' => "Vous n'avez actuellement aucune affiche active! Créez-en un nouveau en utilisant le bouton ci-dessus.",
    'preview' => '(Aperçu)',
    'created_on' => 'Créé :',
    'submitted_on' => 'Soumis :',
    'published_on' => 'Publié :',
    'closed_on' => 'Fermé :',
    'in_review_for' => 'En révision pour', // Time since marked for review.
    'remaining' => 'restante', // Time remaining.
    'applicants' => 'Candidats', // Count of applicants.
    'edit_this_poster' => 'Modifier cette affiche d\'emploi.',
    'edit_job_poster' => 'Modifier cette affiche d\'emploi.',
    'edit_this_plans' => 'Modifier le plan d\'évaluation pour ce travail.',
    'edit_screening_plans' => 'Modifier le plan d\'évaluation',
    'send_for_review' => 'Envoyer pour révision',
    'send_this_review' => 'Envoyez cette affiche pour révision.',
    'review_applicants' => 'Réviser les candidats',
    'review_this_applicants' => 'Révisez les candidats qui ont postulé à cet emploi.',
    'delete_this_poster' => 'Supprimer cet affiche ébauche',
    'archived_posters' => 'Mes affiches archivées',
    'no_archived_posters' => 'Vous pourrez bientôt archiver vos affiches!',
    'view_this_job_poster' => "Voir cette affiche d'emploi.",
    'view_preview_job_poster' => "Afficher un aperçu de cette affiche d'emploi.",
    // Older version translations, still on page.
    'job_poster' => 'Affiche d\'emploi',
    'edit' => 'Modifier',
    'screening_plan_builder' => 'Constructeur de plan d\'évaluation',
    'veteran_applicants' => 'Candidats vétérans',
    'citizen_applicants' => 'Candidats citoyens',
    'other_applicants' => 'Autres candidats',
    'none' => 'Aucun',
    'review' => [
        'name' => 'Nom',
        'info' => 'Info',
        'reviewed' => 'Réviser?',
        'decision' => 'Décision',
        'reviewer' => 'Réviseur',
        'notes' => 'Notes',
        'form' => [
            'email' => 'Courriel',
            'profile' => 'Profil',
            'application' => 'Application',
            'placeholder' => [
                'reviewer' => 'Réviseur',
                'other_notes' => 'Autres notes...'
            ],
            'save' => 'Enregistrer'
        ]
    ],
    'notification_modal' => [
        'title' => 'Sorry about that, eh!',
        'description' => [
            'first' => 'Job Poster review and publishing is only available to Talent Cloud\'s partner departments.',
            'second' => 'To find out if you can access these features,',
            'link' => [
                'text' => 'click here',
                'title' => 'Find out how to access Job Poster review and publishing features.',
                'href' => '#upgrade'
            ]
        ],
        'cancel' => 'Go back'
    ]
];
