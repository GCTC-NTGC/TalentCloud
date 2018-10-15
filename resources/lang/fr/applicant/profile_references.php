<?php
return [
    /*
    * --------------------------------------------------------------------------
    * French Profile-Experience Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are applicant profile Edit Experience
    *
    */
    "title" => "Mes références",
    "reference_section" => [
        "section_title" => "Mes références",
        "section_description" => "En soumettant une référence, vous acceptez d'avoir préalablement demandé l'autorisation de fournir leurs informations. Veuillez noter que toutes les informations fournies dans une référence peuvent être envoyées à cette référence au cours d'un processus d'embauche.",
        "add_button_label" => "Ajouter une référence",
        "null_copy" => "Vous n'avez actuellement aucune référence dans votre portefeuille. Utilisez le bouton ci-dessus pour ajouter une référence."
    ],
    //TODO: move modals to under a ViewComposer's responsability
    "modals" => [
        "delete_reference" => [
            "type" => "deleteConfirmation",
            "title" => "Supprimer cette référence?",
            "content" => [
                "00" => "Êtes-vous sûr de vouloir supprimer définitivement cette référence de votre profil?",
                "01" => "Toutes les applications soumises précédemment conserveront cette référence."
            ],
            "id" => "deleteReference",
            "action_01" => "Annuler",
            "action_02" => "Supprimer"
        ]
    ]
];
