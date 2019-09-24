<?php

return [
    /*
     * --------------------------------------------------------------------------
     * Manager Portal Home Localization
     * --------------------------------------------------------------------------
     * Route: /manager/
     * View: views/manager/home.html.twig
     */
    'hero' => [
        'heading' => 'Talent Cloud',
        'heading_alt' => 'Canadian Maple Leaf',
        'subheading' => 'An experimental platform. Hiring made easier.',
        'button' => [
            'text' => 'Sign Up',
            'title' => 'Sign up as a manager to demo Talent Cloud\'s manager portal.'
        ]
    ],
    'banner' => [
        'content' => 'Welcome to the Talent Cloud :open manager :close portal.',
        'anchor' => [
            'text' => 'Click here to return to the applicant portal.',
            'title' => 'Return to the applicant portal.'
        ]
    ],
    'info' => [
        'heading' => 'What Kind of Jobs Can I Post?',
        'content_first' => 'Talent Cloud is for externally advertised classified term positions, instead of contract or casual jobs (which typically don’t come with benefits, union representation, or worker’s rights). Using behavioural processes and business engineering, term workers can be hired quickly and easily using Talent Cloud, with an emphasis on a best fit match.',
        'content_second' => 'The platform can be used for jobs of any classification and level.',
        'list_heading' => 'Talent Cloud is great for:',
        'list' => [
            'Hiring during an election period (when you’re not sure what your budget might be next year)',
            'Program funding of limited duration (e.g. fixed term or sunsetting programs)',
            'Special projects (e.g. DM task teams, innovation projects)',
            'Hiring a specialist to a team for a particular project phase'
        ]
    ],
    'features' => [
        'heading' => 'Available Features',
        'mobile_table' => [
            'columns' => [
                'demo_features' => [
                    'heading' => 'Demo Account Features',
                    'subheading' => [
                        'content' => 'You :open do not :close work at a department that is :link with Talent Cloud.',
                        'anchor' => [
                            'text' => 'partnered',
                            'title' => 'View the departments partnered with Talent Cloud.'
                        ]
                    ],
                    'rows' => [
                        'poster_creation' => [
                            'heading' => 'Job Poster Creation',
                            'content' => 'Features such as pre-populated paragraphs and suggested options based on your previous selections make it easy for you to create a job.'
                        ],
                        'screening_plan' => [
                            'heading' => 'Screening Plan',
                            'content' => 'Build plan you\'ll use to evaluate all the skills you asked for in your job poster. Review it with your HR advisor.'
                        ],
                        'manager_profile' => [
                            'heading' => 'Manager Profile',
                            'content' => 'Create a profile that tells applicants more about you.'
                        ]
                    ]
                ],
                'partner_features' => [
                    'heading' => 'Partner Department Account Features',
                    'subheading' => [
                        'content' => 'You work at a department that is :link with Talent Cloud.',
                        'anchor' => [
                            'text' => 'partnered',
                            'title' => 'View the departments partnered with Talent Cloud.'
                        ]
                    ],
                    'rows' => [
                        [
                            'heading' => 'All demo account features, plus:'
                        ],
                        [
                            'heading' => 'Post Job',
                            'content' => 'Post the position you’re staffing to the Talent Cloud website and watch high quality applicants roll in on your manager dashboard.'
                        ],
                        [
                            'heading' => 'Applicant Tracking',
                            'content' => 'Automatically sort applicants according to your criteria and screen them right on the platform.'
                        ],
                        [
                            'heading' => 'Personalized Support',
                            'content' => 'Contact our team at any time for help or suggestions as you move through the staffing process.'
                        ],
                        [
                            'heading' => [
                                'content' => 'Record of Decision for HR',
                                'tag' => 'Coming Soon!'
                            ],
                            'content' => 'Screen applicants, take notes, and record decisions as you go, and easily submit your paperwork to HR.'
                        ]
                    ]
                ]
            ],
        ],
        'table' => [
            'columns' => [
                'features' => [
                    'heading' => 'Features'
                ],
                'demo_account' => [
                    'heading' => 'Demo Account',
                    'subheading' => [
                        'content' => 'You :open do not :close work at a department that is :link with Talent Cloud.',
                        'anchor' => [
                            'text' => 'partnered',
                            'title' => 'View the departments partnered with Talent Cloud.'
                        ]
                    ]
                ],
                'partner_account' => [
                    'heading' => 'Partner Department',
                    'subheading' => [
                        'content' => 'You work at a department that is :link with Talent Cloud.',
                        'anchor' => [
                            'text' => 'partnered',
                            'title' => 'View the departments partnered with Talent Cloud.'
                        ]
                    ]
                ]
            ],
            'rows' => [
                [
                    'heading' => 'Job Poster Creation',
                    'content' => 'Features such as pre-populated paragraphs and suggested options based on your previous selections make it easy for you to create a job.',
                    'demo' => true,
                    'partner' => true
                ],
                [
                    'heading' => 'Screening Plan',
                    'content' => 'Build plan you\'ll use to evaluate all the skills you asked for in your job poster. Review it with your HR advisor.',
                    'demo' => true,
                    'partner' => true
                ],
                [
                    'heading' => 'Manager Profile',
                    'content' => 'Create a profile that tells applicants more about you.',
                    'demo' => true,
                    'partner' => true
                ],
                [
                    'heading' => 'Post Job',
                    'content' => 'Post the position you’re staffing to the Talent Cloud website and watch high quality applicants roll in on your manager dashboard.',
                    'demo' => false,
                    'partner' => true
                ],
                [
                    'heading' => 'Applicant Tracking',
                    'content' => 'Automatically sort applicants according to your criteria and screen them right on the platform.',
                    'demo' => false,
                    'partner' => true
                ],
                [
                    'heading' => 'Personalized Support',
                    'content' => 'Contact our team at any time for help or suggestions as you move through the staffing process.',
                    'demo' => false,
                    'partner' => true
                ],
                [
                    'heading' => [
                        'content' => 'Record of Decision for HR',
                        'tag' => 'Coming Soon!'
                    ],
                    'content' => 'Screen applicants, take notes, and record decisions as you go, and easily submit your paperwork to HR.',
                    'demo' => false,
                    'partner' => true
                ]
            ]
        ]
    ],
    'lower_info' => [
        'heading' => 'How Can I Post a Job?',
        'content_first' => [
            'heading' => [
                'content' => 'Are you a member of one of these',
                'anchor' => [
                    'title' => 'View the departments partnered with Talent Cloud.',
                    'text' => 'partner departments'
                ]
            ],
            'content_before' => 'If you’re a member,',
            'content_after' => 'to let us know that we should level up your account. This will allow you to post jobs on Talent Cloud, as well as provide you with all the features that come with a Partner Department Account. To be able to post a job, you’ll need to confirm that you have a classified box.',
            'anchor' => [
                'href' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
                'text' => 'contact Talent Cloud',
                'title' => 'Send an email to Talent Cloud.'
            ]
        ],
        'content_second' => [
            'heading' => 'Not a member? You can still use Talent Cloud!',
            'content' => 'If you’re not a member of a partner department, you can use Talent Cloud with a demo account to create a job poster and an assessment plan, but you won’t be able to post on the live site. Your job poster and assessment plan will have to be integrated into your HR processes. If you like what you see, get in touch with your HR advisor to see how you can join the pilot.'
        ]
    ],
    'steps' => [
        [
            'button' => 'Step 1: Draft Job',
            'heading' => 'Step 1: Draft a Job',
            'content' => [
                'Use the Job Poster Builder to develop a poster that tells applicants about the impact their work will have on Canadians. Let them know about you, your team, and your work culture so you find someone that is a great fit for your team. Brainstorm the tasks that you need your new employee to perform and then list the skills required to complete them.',
                'Once you’ve completed your job poster, we’ll handle the translations, send it to your HR advisor so they can provide advice, and check in with the signing authority.',
                'This step is available for demo accounts.'
            ]
        ],
        [
            'button' => 'Step 2: Screening Plan',
            'heading' => 'Step 2: Create a Screening Plan',
            'content' => [
                'Build the screening plan you’ll use to evaluate all the skills you asked for in your job poster. Create a ratings guide with expected answers that you’ll use to determine whether an applicant reflects their knowledge on a particular skill. Then, share it with your HR Advisor so they can review your plan and suggest changes.',
                'This step is available for demo accounts.'
            ]
        ],
        [
            'button' => 'Step 3: Live Job',
            'heading' => 'Step 3: Live Job',
            'content' => [
                'Your job will be posted on Talent Cloud as well as <a href="https://emploisfp-psjobs.cfp-psc.gc.ca/psrs-srfp/applicant/page2440?fromMenu=true&toggleLanguage=en" title="Visit GC Jobs to learn more." target="_blank">GC Jobs</a>. As people apply, you can view the number of applicants increase on your dashboard. We will also handle priority clearance so that priorities will be clearly indicated in your list of applicants once the poster closes.',
                'This step is only available for partner department accounts.'
            ]
        ],
        [
            'button' => 'Step 4: Screening',
            'heading' => 'Step 4: Screen Candidates',
            'content' => [
                'Review each application right on the Talent Cloud platform. Follow your screening plan and evaluate your candidates. Use the applicant sorting tool to track who is still in the process. Coordinate with your HR Advisor to get your candidate’s security clearance and language testing.',
                'This step is only available for partner department accounts.'
            ]
        ],
        [
            'button' => 'Step 5: Selection',
            'heading' => 'Step 5: Select Final Candidate',
            'content' => [
                'Found the perfect candidate for your position? Now it’s time to work with your HR advisor and the successful candidate to collect everything you need to finalize the hire. The record of decision tool that is coming soon will allow you record your justifications as you go, and easily submit your paperwork to HR.',
                'Time to send them a letter of offer!',
                'This step is only available for partner department accounts.'
            ]
        ]
    ],
    'footer' => [
        'heading' => 'Get in Touch',
        'subheading' => 'We’d love to hear from you! Want to help us improve the platform? We’re always looking for feedback about the platform and people to user test new tools!',
        'email' => [
            'href' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
            'text' => 'Email Us'
        ],
        'gccollab' => [
            'href' => 'https://gccollab.ca/groups/profile/19750/talent-cloud-nuage-de-talent',
            'text' => 'GC Collab'
        ],
        'twitter' => [
            'href' => 'https://twitter.com/gc_talent?lang=en',
            'text' => 'Twitter'
        ]
    ]
];
