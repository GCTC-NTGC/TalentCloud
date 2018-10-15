<?php

return [
    /*
    * --------------------------------------------------------------------------
    * Profile-Work Samples Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are used on applicant profile Edit Work Samples page
    *
    */

    "title" => "My Work Samples",
    "sample_section" => [
        "section_title" => "My Work Samples",
        "add_button_label" => "Add Sample",
        "null_copy" => "You don't currently have any work samples in your profile! Use the button above to add a work sample."
    ],

    //TODO: move modals to under a ViewComposer's responsability
    "modals" => [
        "delete_sample" => [
            "type" => "deleteConfirmation",
            "title" => "Delete this Work Sample?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this work sample from your profile?",
                "01" => "All previously submitted applications will retain this work sample. New applications or applications in progress will no longer include it."
            ],
            "id" => "deleteSample",
            "action_01" => "Cancel",
            "action_02" => "Delete"
        ]
    ]
];
