<?php

return [
    /*
    * --------------------------------------------------------------------------
    * Profile-Skills Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are used on applicant profile Edit Skills page
    *
    */

    'title' => 'My Skills',
    'skills_section' => [
        'skills_title' => 'Talent Cloud | Applicant: Profile - My Skills',
        'soft_title' => 'My Soft Skills',
        'hard_title' => 'My Hard Skills',
        'add_soft_button_label' => 'Add soft skill',
        'add_hard_button_label' => 'Add hard skill',
        'null_copy' => "You don't currently have any skills on your profile! Use the button above to add a skill.",
    ],
    // TODO: move modals to a ViewComposer's responsibility.
    'modals' => [
        'delete_skill' => [
            'type' => 'deleteConfirmation',
            'title' => 'Delete this Skill?',
            'content' => [
                '00' => 'Are you sure you want to permanently delete this skill from your profile?',
                '01' => 'All previously submitted applications will retain this skill. By deleting this skill you acknowledge the permanent deletion of all credit earned towards this skill.',
            ],
            'id' => 'deleteSkill',
            'action_01' => 'Cancel',
            'action_02' => 'Delete',
            'action_02_progress' => 'Working...',
        ],
        'need_help' => [
            'title' => 'Writing my application',
            'subtext' => [
                '0' => 'Skills-based hiring means that there are NO resumes and NO cover letters. (Seriously, there will be no opportunity to submit either of these at any point during the application process.)',
                '1' => 'This section of the application is your opportunity to tell your story. Use specific examples from your work and personal life that demonstrate you have these skills. Then, submit references or work samples to back up your claims.',
            ],
            'header_button_text' => 'close',
            'close_button_text' => 'Got it!',
            'example_lists' => [
                'dos_example_list' => [
                    'title' => 'DO',
                    'examples' => [
                        'example_1' => [
                            'name' => 'Relevant, Concise, Thorough.',
                            'content' => 'E.g. “I worked at Talent Cloud for eight years as a front-end developer. For the past three years, I have been the lead front-end developer for several client-side web applications, including a payment portal and help desk. Both of these web applications were designed using HTLM5 and Javascript. As the lead developer, I assigned work to 6 entry level developers, monitored their progress, and provided guidance on complex issues.”',
                        ],
                    ],
                ],
                'donts_example_list' => [
                    'title'=> 'DONT\'S',
                    'examples' => [
                        'example_1' => [
                            'name' => 'Too short, Vague, Not enough information.',
                            'content' => 'E.g. “I worked at Talent Cloud for 8 years.”',
                        ],
                        'example_2' => [
                            'name' => 'Too long, Stretched or Irrelevant information.',
                            'content' => [
                                '0' => 'E.g. “When I was in elementary school, I took my first computer class: Mavis Beacon Teaches Typing. I got the highest mark in the class and my teacher said that they have never seen anyone type so well as an eight year old. Throughout the rest of public school and university, I used the internet regularly and had an interest in coding and web design. When I got to university, I built a basic HTML website and decided that I wanted to switch to a computer science program.',

                                '1' => 'Unfortunately, that would have added a year to my degree, so I just took some elective courses in computer science. Once I graduated, I decided to look for a job in IT, but it was 2008 and the global economic crisis limited my job opportunities to service positions. After working at several restaurants and coffee shops, I got a job with Talent Cloud as a front-end developer. I spent my first 6 months working on small components of client-side applications. During my first months, I started the day by looking at the checklist of work that had been assigned to me. If I wasn’t sure about how to prioritize my tasks, I would ask the lead developer that supervised my work.',

                                '2' => 'After that, I would usually check email, which I try to do only a couple of times a day to keep from being distracted. After that I started working on projects in a more dedicated way. While this allowed me to develop certain skills, I missed being able to see the variety of projects that our department was working on. One time, when the lead developer was on holiday and his replacement was sick, I was acted as the lead developer for two days.”',
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
];
