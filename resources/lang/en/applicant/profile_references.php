<?php

return [
    /*
    * --------------------------------------------------------------------------
    * Profile-Experience Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are applicant profile Edit Experience
    *
    */

    "title" => "My References",
    "reference_section" => [
        "reference_title" => "Talent Cloud | Applicant: Profile - My References",
        "section_title" => "My References",
        "section_description" => "By submitting a reference you agree to having first asked their permission to provide their information. Please note that all information provided within a reference might be sent to said reference during a hiring process.",
        "add_button_label" => "Add Reference",
        "null_copy" => "You don't currently have any references in your portfolio! Use the button above to add a reference."
    ],

    //TODO: move modals to under a ViewComposer's responsability
    "modals" => [
        "delete_reference" => [
            "type" => "deleteConfirmation",
            "title" => "Delete this Reference?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this reference from your profile?",
                "01" => "All previously submitted applications will retain this reference."
            ],
            "id" => "deleteReference",
            "action_01" => "Cancel",
            "action_02" => "Delete",
            "action_02_progress" => "Working..."
        ]
    ]
];
