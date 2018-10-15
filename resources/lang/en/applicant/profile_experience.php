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

    "title" => "My Experience",
    "experience_section" => [
        "section_degree_title" => "My Diplomas/Degrees",
        "add_degree_label" => "Add Diploma/Degree",
        "null_degree_copy" => "You don't currently have any diplomas or degrees on your profile! Use the button above to add one.",
        "section_course_title" => "My Courses/Certifications",
        "add_course_label" => "Add Course/Certification",
        "null_course_copy" => "You don't currently have any courses or certifications on your profile! Use the button above to add one.",
        "section_work_title" => "My Equivalent Experience",
        "add_work_label" => "Add Equivalent Experience",
        "null_work_copy" => "You don't currently have any equivalent experiences on your profile! Use the button above to add some.",
    ],

    //TODO: move modals to under a ViewComposer's responsability
    "modals" => [
        "delete_degree" => [
            "type" => "deleteConfirmation",
            "title" => "Delete this Diploma/Degree?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this diploma or degree from your profile?",
                "01" => "All previously submitted applications will retain this experience."
            ],
            "id" => "deleteDegree",
            "action_01" => "Cancel",
            "action_02" => "Delete"
        ],
        "delete_course" => [
            "type" => "deleteConfirmation",
            "title" => "Delete this Course/Certification?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this course or certification from your profile?",
                "01" => "All previously submitted applications will retain this experience."
            ],
            "id" => "deleteCourse",
            "action_01" => "Cancel",
            "action_02" => "Delete"
        ],
        "delete_work_experience" => [
            "type" => "deleteConfirmation",
            "title" => "Delete this equivalent experience?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this equivalent experience from your profile?",
                "01" => "All previously submitted applications will retain this equivalent experience."
            ],
            "id" => "deleteWork",
            "action_01" => "Cancel",
            "action_02" => "Delete"
        ]
    ]
];
