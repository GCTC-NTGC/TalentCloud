<?php
return [
    /*
    * --------------------------------------------------------------------------
    * French Profile-Skills Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are used on applicant profile Edit Skills page
    *
    */
    "title" => "Mes compétences",
    "skills_section" => [
        "soft_title" => "Mes compétences non spécialisées",
        "hard_title" => "Mes compétences spécialisées",
        "add_button_label" => "Ajouter une compétence",
        "null_copy" => "Vous n'avez actuellement aucune compétence sur votre profil. Utilisez le bouton ci-dessus pour ajouter une compétence."
    ],
    //TODO: move modals to under a ViewComposer's responsability
    "modals" => [
        "delete_skill" => [
            "type" => "deleteConfirmation",
            "title" => "Supprimer cette compétence?",
            "content" => [
                "00" => "Êtes-vous sûr de vouloir supprimer définitivement cette compétence de votre profil?",
                "01" => "Toutes les applications soumises précédemment conserveront cette compétence. En supprimant cette compétence, vous reconnaissez la suppression définitive de tous les crédits obtenus pour cette compétence."
            ],
            "id" => "deleteSkill",
            "action_01" => "Annuler",
            "action_02" => "Supprimer"
        ]
    ]
];
