<?php
return [
    /*
    * --------------------------------------------------------------------------
    * French Profile-Work Samples Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are used on applicant profile Edit Work Samples page
    *
    */
    "title" => "Mes échantillons de travail",
    "sample_section" => [
        "sample_title" => "Nuage de talents | Candidat : Profil - Mes échantillons de travail",
        "section_title" => "Mes échantillons de travail",
        "add_button_label" => "Ajouter un échantillon de travail",
        "null_copy" => "Vous n'avez actuellement aucun échantillon de travail dans votre portefeuille. Utilisez le bouton ci-dessus pour ajouter un échantillon de travail."
    ],
    //TODO: move modals to under a ViewComposer's responsability
    "modals" => [
        "delete_sample" => [
            "type" => "deleteConfirmation",
            "title" => "Supprimer cet échantillon de travail?",
            "content" => [
                "00" => "Êtes-vous sûr de vouloir supprimer définitivement cet échantillon de travail de votre profil?",
                "01" => "Toutes les applications soumises précédemment conserveront cet exemple de travail. Les nouvelles applications ou les applications en cours ne l'incluront plus."
            ],
            "id" => "deleteSample",
            "action_01" => "Annuler",
            "action_02" => "Supprimer",
            "action_02_progress" => "Agissant..."
        ]
    ]
];
