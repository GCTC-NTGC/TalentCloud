<?php

return [
    /*
     * --------------------------------------------------------------------------
     * Home Language Lines
     * --------------------------------------------------------------------------
     *
     * The following language lines are used in the applicant home page.
     *
     */
    /* New Content for Homepage */
    'hero' => [
        'title' => 'Talent Cloud',
        'tagline' => 'Applying to government jobs just got easier.',
        'pilot' => 'BETA'
    ],
    'slogan' => [
        'copy' => 'No cover letter. No resume. Build a profile of your skills and experience while saving time applying to government jobs that inspire you. ',
        'link' => [
            'title' => 'Learn more about how Talent Cloud works.',
            'href' => '#how',
            'label' => 'Learn more'
        ]
    ],
    'browse' => [
        'title' => 'Recently Posted Jobs',
        'browse_link' => [
            'title' => 'View all jobs posted to Talent Cloud.',
            'label' => 'Browse All Jobs'
        ],
        'null' => 'More Jobs Coming Soon!'
    ],
    'holiday' => [
        'title' => 'Closed for the Holidays',
        'main_message' => 'We aren’t posting jobs over the holidays but we’re looking forward to connecting talented people with awesome and impactful jobs in the New Year! Until then stay warm and have some fun!',
        'sign_off' => 'See you in 2020!',
        'signature' => 'The Talent Cloud Team'
    ],
    'hiw' => [
        'title' => 'How Talent Cloud Works',
        'steps' => [
            '1' => '1. Create an Account',
            '2' => '2. Apply',
            '3' => '3. Re-use',
            '4' => '4. Get Recognized'
        ],
        'step_content' => [
            '1' => [
                'title' => 'Step 1: Create an Account',
                'copy' => 'To register for a Talent Cloud account, you just need to provide your name and email address (and then choose your password). You don’t need an account to browse the jobs we have posted, but you will need one to apply. Even if you don’t see a job that’s a good fit, you might want to fill out your applicant profile to give you a head start when you see a job that looks perfect.'
            ],
            '2' => [
                'title' => 'Step 2: Apply',
                'copy' => "You'll notice there is nowhere to upload your resume or cover letter as part of our application process. That’s not a glitch, we did it on purpose! Instead of telling us about your experience, we want you to tell us about yourself and how you demonstrate the skills that are needed for the position. We think that this will give applicants with unconventional life / career paths an opportunity to demonstrate how they are qualified, rather than being systematically screening out because they didn’t follow the road most travelled.\n\nThis is likely quite different from other job applications you’ve filled out, so check out our FAQ page to learn more about %levels%.",
                'links' => [
                    'levels' => '<a href="' . route('faq') . '#levels" title="Learn more about skill levels on Talent Cloud." target="_blank">how to find your skill level</a>'
                ]
            ],
            '3' => [
                'title' => 'Step 3: Re-use',
                'copy' => "When you complete a typical job application, you send it off into a void and never see it again. That means its on you to save your old job applications and hunt through files and folders if you want to re-use any of that content.\n\nWhen you fill out a Talent Cloud job application, the information doesn’t vanish when you hit submit. We store it for you so that you can use it in future applications on Talent Cloud. Already crafted a killer narrative that demonstrates that you are a continuous learner? You can use it again, or even tweak it a bit, when that skill comes up in another job you want to apply for."
            ],
            '4' => [
                'title' => 'Step 4: Get Recognized',
                'copy' => "Right now, Talent Cloud gives you the chance to show what makes you unique in your job application. This is a big change in the way government recognizes talent, but we’re working towards something even bigger.\n\nWhen you apply for a job with Talent Cloud, you tell us how you demonstrate the skills required for the position. If your application is strong, you might be considered for an interview or asked to complete a take-home exam. Let’s say you do really well, but you just narrowly miss out on the job. We think there is value in that success and we’re working towards recognizing that.\n\nWe want to make it possible for managers to give a credential, or a badge, to those who pass assessments (like a take home test) even if they don’t get the job. If you get one of these credentials you could present it in future applications and managers could choose whether to accept it in place of doing a similar test again.\n\nLet’s say you do get the job, you demonstrate the skills you said you have and gain some new ones. Your manager could give you credentials for the skills you demonstrated on the job at the end of your term. Think of it as a new type of job reference that doesn’t need an email or a phone call.\n\nWe’re still working out the details, but are committed to making sure your credentials are owned by you and that you’re able to use them both inside, and outside government.\n\nIf you’re interested in learning more, check out our proof-of-concept issuing %certs%.",
                'links' => [
                    'certs' => '<a href="https://open.canada.ca/en/blog/securing-future-talent-mobility-government-canada" title="Learn more about blockcert validated credentials." target="_blank">Blockcerts validated credentials to Canada\'s Free Agents</a>'
                ]
            ]
        ]
    ],
    'bts' => [
        'title' => 'Behind the Scenes',
        'intro' => "Talent Cloud is different in a lot of ways. We're open source, iterative, trying to transform bias in hiring, and do our best to design with everyone in mind.",
        // "intro_link" => [
        // "os" => "<a href='' title='' target='_blank'>open source</a>",
        // "iterative" => "<a href='' title='' target='_blank'>iterative</a>",
        // "bias" => "<a href='' title='' target='_blank'>transform bias in hiring</a>",
        // "design" => "<a href='' title='' target='_blank'>design with everyone</a>",
        // ],
        'items' => [
            '1' => [
                'title' => "How it's designed:",
                'copy' => 'Talent Cloud is designed based on user research. We talk to people like you: applicant, managers, and HR advisors to inform what features are needed and how they should work. Everything we build is designed to be accessible by anyone.',
                'links' => [
                    '1' => [
                        'link' => 'https://github.com/GCTC-NTGC/TalentCloud',
                        'title' => 'Visit the Talent Cloud Github page.',
                        'label' => 'Our Code on Github'
                    ]
                ]
            ],
            '2' => [
                'title' => "How it's funded:",
                'copy' => 'GC Talent Cloud is an experimental initiative that relies solely on financial support from participating federal departments who are committed to helping build an alternative to the traditional HR model.',
                'links' => [
                    '1' => [
                        'link' => '/faq#partners',
                        'title' => 'Learn more about how Talent Cloud is funded.',
                        'label' => 'Learn More'
                    ]
                ]
            ],
            '3' => [
                'title' => 'How we communicate:',
                'copy' => 'Talent Cloud is all about working in the open. Our source code is on GitHub and you can contact us anytime to learn more or even participate in some user-testing to help us continue to improve the platform.',
                'links' => [
                    '1' => [
                        'link' => 'https://twitter.com/gc_talent',
                        'title' => 'Visit Talent Cloud on Twitter.',
                        'label' => 'Twitter'
                    ],
                    '2' => [
                        'link' => 'https://gccollab.ca/groups/profile/19750/entalent-cloud-nuage-de-talentsfrnuage-de-talents-talent-cloud',
                        'title' => 'Visit Talent Cloud on GCcollab.',
                        'label' => 'GCcollab'
                    ],
                    '3' => [
                        'link' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
                        'title' => 'Email Talent Cloud.',
                        'label' => 'Email'
                    ]
                ]
            ]
        ]
    ],
    'blogTitle' => 'Our Blog',
    'blogs' => [
        '1' => [
            'title' => 'You are now free to move about the workforce',
            'link' => [
                'title' => "Read Val's blog post.",
                'anchor' => 'https://gccollab.ca/blog/view/2325565/enwe-did-it-canadas-free-agents-receive-validated-skill-credentials-anchored-on-the-blockchainfrlearning-machine-et-le-nuage-de-talents-u00e9mettent-des-justificatifs-du2019identitu00e9-ancru00e9s-dans-une-chau00eene-de-blocs-aux-agents-libres-du-canada-u00e0-titre-de-validation-de-principe',
                'label' => 'Read on GC collab'
            ],
            'date' => 'Tuesday May 28th, 2019',
            'author' => 'Authored by: Val Thomas',
            'eta' => 'About a 2 minute read.',
            'summary' => 'As part of a one-year talent mobility project being conducted by Talent Cloud and the Digital Identity Unit at the Treasury Board Secretariat of Canada (TBS) in partnership with Learning Machine, Government of Canada ‘Free Agents’ have been issued Blockcerts, blockchain...'
        ],
        '2' => [
            'title' => 'Can We Talk About Tokenism?',
            'link' => [
                'title' => "Read Meagan's blog post.",
                'anchor' => 'https://medium.com/@meagan.commonda/can-we-talk-about-tokenism-9400c0af55fd',
                'label' => 'Read on Medium'
            ],
            'date' => 'Monday April 15th, 2019',
            'author' => 'Authored by: Meagan Commonda',
            'eta' => 'About a 6 minute read.',
            'summary' => 'Ah yes, the elephant in the room that takes up so much space and no one wants to be the one to broach the topic. It happens every single day, sometimes in latent forms, and other times it is loud, blatant and boisterous. Yes, we’re going to talk about the big T: Tokenism...'
        ],
        '3' => [
            'title' => 'Govcloud - First Impressions',
            'link' => [
                'title' => "Read Lauren's blog post.",
                'anchor' => 'https://gccollab.ca/blog/view/1740665/engovcloud-first-impressionsfrgovcloud-premiu00e8res-impressions',
                'label' => 'Read on GC collab'
            ],
            'date' => 'Monday January 21st, 2019',
            'author' => 'Authored by: Lauren Hunter',
            'eta' => 'About a 5 minute read.',
            'summary' => 'When I first heard of Deloitte’s GovCloud concept, my initial reaction was, "I don’t get it." That was back in the summer of 2013. In the early days of Blueprint 2020, I’d gotten permission from NRCan’s Deputy Minister to form a collection of tiger teams based (against the...'
        ]
    ],
    'cta' => [
        'copy' => "Can't find the job you're looking for on Talent Cloud? %gcjobs% for more public sector opportunities. Students, be sure to %fswep% too!",
        'copy_links' => [
            'gcjobs' => '<a href="https://emploisfp-psjobs.cfp-psc.gc.ca/psrs-srfp/applicant/page2440?fromMenu=true&toggleLanguage=en" title="Visit GC Jobs for more information." target="_blank">Check out GC Jobs</a>',
            'fswep' => '<a href="https://www.canada.ca/en/public-service-commission/jobs/services/recruitment/students/federal-student-work-program.html" title="Visit FSWEP for more information on student opportunities." target="_blank">check out FSWEP</a>'
        ]
    ],
    'leaf' => 'Canadian maple leaf.',
    /* Old Content */
    'home_title' => 'Talent Cloud | Applicant: Home',
    'about_card_copy_01' => 'The jobs are real.',
    'about_card_copy_02' => 'The platform is experimental.',
    'about_cta' => 'Talent Cloud is the Government of Canada\'s experimental new hiring platform for project-based or "gig" employment. For the next few months, Government will be posting a few cool new jobs a week in digital, tech, and user experience design.',
    'about_copy' => 'Each poster lets you learn about the work, the teams, and the managers of each position, so you can think about where you\'ll fit before you apply.',
    'about_copy_2' => 'Test it out and tell us what you think.',
    'about_copy_3' => 'Help us build a new hiring model for the Government of Canada.',
    'how_title' => 'How It Works',
    'how_intro' => 'GC Talent Cloud connects you to teams and projects where you can use your unique skills to make a difference in the lives of Canadians.',
    'how_intro_2' => 'All Talent Cloud jobs are competitively staffed term positions, open to the public.',
    'how_intro_3' => 'Do good, with pension and benefits.',
    'how_step01_title' => 'Own Your Story',
    'how_step01_copy' => 'Everyone is unique. Participate in a job selection process that lets you showcase your skills in your own way. Have access to information about the job that lets you choose your own right fit.',
    'how_step02_title' => 'Get Recognized',
    'how_step02_copy' => 'Earn and validate skills, knowledge, and abilities through Talent Cloud by applying to jobs and while you\'re on the job. What does this mean? Credentials earned through Talent Cloud are recognized and transferable between job applications... and one day potentially across Canada.',
    'how_step03_title' => 'Contribute',
    'how_step03_copy' => 'Find meaningful work that has an impact on Canadians... and be part of the effort to design a new platform for project-based work in Government.',
    'how_step04_title' => 'Credentialing TBD',
    'how_step04_copy' => 'Credentialing Copy TBD',
    'how_step04_link' => '/en/credentialing',
    'how_step04_link_title' => 'Learn more about credentialing on Talent Cloud.',
    'how_step04_link_label' => 'Learn More',
    'how_copy' => 'We want GC Talent Cloud to be a drive engine that allows more Canadians to have a chance to work in Government. We want diverse talent to bring new ideas that will shape programs and services across Canada.',
    'how_cta_copy' => 'Interested in chatting about a potential partnership?',
    'how_cta_link' => 'talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
    'how_cta_title' => 'Get in touch with GC Talent Cloud via email.',
    'how_cta_label' => 'Contact Us!',
    'team_title' => 'Our Team',
    'team_copy' => 'We are a small but growing team of public servants passionate about the future of talent in Canada. Learn more about us and make your own contribution to GC Talent Cloud by joining us on one of these channels.',
    'team_button_gccollab_link' => 'https://gccollab.ca/groups/profile/19750/talent-cloud-nuage-de-talent',
    'team_button_gccollab_title' => 'Visit the team on GCcollab.',
    'team_button_gccollab_label' => 'GCcollab',
    'team_button_twitter_link' => 'https://twitter.com/GC_Talent',
    'team_button_twitter_title' => 'Visit the team on Twitter.',
    'team_button_twitter_label' => 'Twitter',
    'team_button_email_link' => 'talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
    'team_button_email_title' => 'Get in touch with GC Talent Cloud via email.',
    'team_button_email_label' => 'Email'
];
