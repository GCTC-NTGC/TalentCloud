<?php
return [
    /*
    * --------------------------------------------------------------------------
    * Skills Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are used when displaying Skills
    *
    */
    'new_skill_title' => 'New Skill',
    "accordion_sr_helper" => "Click to edit...",
    'name_label' => 'Project Name',
    'type_label' => 'Project Type',
    'skill_selection_label' => 'Select Skill',
    'skill_selection_default_option' => "Select a skill...",
    'level_label' => 'My Level',
    'level_link_title' => 'Learn more about finding your skill level.',
    'level_link_label' => "(Don't know your level? Find out here.)",
    'knowledge_label' => 'How I Acquired This Skill',
    'knowledge_link_label' => '(Need help? See example.)',
    'knowledge_prompt' => 'This is your opportunity to shine! Make sure that you use specific examples to demonstrate you have this skill at the required level.',
    // Start of Info Modal
    'modal_info' => [
        'title' => 'Writing my application',
        'subtext' => [
            "0" => "Skills-based hiring means that there are NO resumes and NO cover letters. (Seriously, there will be no opportunity to submit either of these at any point during the application process.)",
            "1" => "This section of the application is your opportunity to tell your story. Use specific examples from your work and personal life that demonstrate you have these skills. Then, submit references or work samples to back up your claims."
        ],
        'close_button_text' => 'Got it!',
        'example_lists' => [
            'dos_example_list' => [
                'title' => "DO",
                'examples' => [
                    "example_1" => [
                        "name" => "Relevant, Concise, Thorough.",
                        "content" => "E.g. “I worked at Talent Cloud for eight years as a front-end developer. For the past three years, I have been the lead front-end developer for several client-side web applications, including a payment portal and help desk. Both of these web applications were designed using HTLM5 and Javascript. As the lead developer, I assigned work to 6 entry level developers, monitored their progress, and provided guidance on complex issues.”"
                    ]
                ]
            ],
            'donts_example_list' => [
                'title'=> 'DONT\'S',
                'examples' => [
                    'example_1' => [
                        'name' => 'Too short, Vague, Not enough information.',
                        'content' => "E.g. “I worked at Talent Cloud for 8 years.”"
                    ],
                    'example_2' => [
                        'name' => 'Too long, Stretched or Irrelevant information.',
                        'content' => [
                            "0" => 'E.g. “When I was in elementary school, I took my first computer class: Mavis Beacon Teaches Typing. I got the highest mark in the class and my teacher said that they have never seen anyone type so well as an eight year old. Throughout the rest of public school and university, I used the internet regularly and had an interest in coding and web design. When I got to university, I built a basic HTML website and decided that I wanted to switch to a computer science program.',

                            "1" => 'Unfortunately, that would have added a year to my degree, so I just took some elective courses in computer science. Once I graduated, I decided to look for a job in IT, but it was 2008 and the global economic crisis limited my job opportunities to service positions. After working at several restaurants and coffee shops, I got a job with Talent Cloud as a front-end developer. I spent my first 6 months working on small components of client-side applications. During my first months, I started the day by looking at the checklist of work that had been assigned to me. If I wasn’t sure about how to prioritize my tasks, I would ask the lead developer that supervised my work.',

                            "2" => 'After that, I would usually check email, which I try to do only a couple of times a day to keep from being distracted. After that I started working on projects in a more dedicated way. While this allowed me to develop certain skills, I missed being able to see the variety of projects that our department was working on. One time, when the lead developer was on holiday and his replacement was sick, I was acted as the lead developer for two days.”'
                        ]
                    ]
                ],
            ]
        ]
    ],
    // End of Info Modal
    'skill_status_null_label' => 'Status: Skill Unclaimed',
    'skill_status_label' => 'Status:',
    'skill_level_null' => 'No level has been selected.',
    'skill_levels' => [
        'hard' => [
            'basic' => 'Basic',
            'intermediate' => 'Intermediate',
            'advanced' => 'Advanced',
            'expert' => 'Lead'
        ],
        'soft' => [
            'basic' => 'In Early Development',
            'intermediate' => 'Moderately in Evidence',
            'advanced' => 'Strongly in Evidence',
            'expert' => 'Deep Level Demonstration'
        ],
    ],
    'skill_description_null' => 'You have not yet described how this skill applies to you.',
    'action_01' => 'Delete Skill',
    'action_02' => 'Save Skill',
    'action_02_working' => 'Saving...',
    'action_02_saved' => 'Saved!',
    'skills' => [
        'front_end_dev' => [
            'name' => 'Front-end development',
            'description' => 'Defined as: Developing web applications using HTML5, CSS3, Javascript'
        ],
        'web_programming' => [
            'name' => 'Web programming',
            'description' => 'Defined as: Developing web applications using Javascript and a server side language such as PHP, Python or other'
        ],
        'server_admin' => [
            'name' => 'Web Server Administration',
            'description' => 'Defined as: Setting up and administering web servers'
        ],
        'linux' => [
            'name' => 'Linux',
            'description' => 'Defined as: Working in Linux and configuring applications in Linux based environments'
        ],
        'css' => [
            'name' => 'CSS',
            'description' => 'Defined as: Building web pages using HTML and CSS'
        ],
        'javascript' => [
            'name' => 'Javascript',
            'description' => 'Defined as: Developing web applications using Javascript'
        ],
        'c_plus_plus' => [
            'name' => 'C++',
            'description' => 'Defined As: A middle level object oriented programming language to develop low to high end software applications.'
        ],
        'sass' => [
            'name' => 'SASS',
            'description' => 'Defined as: A preprocessor scripting, stylesheet language that is interpreted or compiled into CSS for web development.'
        ],
        'python' => [
            'name' => 'Python',
            'description' => 'Defined as: An interpreted, object oriented, and high level programming language that is flexibly used to accomplish various programming objectives.'
        ],
        'php' => [
            'name' => 'PHP',
            'description' => 'Defined as: A programming language used for developing and executing web application code that processed on the server side.'
        ],
        'git' => [
            'name' => 'Git',
            'description' => 'Defined as: A version control system used for tracking changes in files and coordinating work on projects involving multiple users.'
        ],
        'docker' => [
            'name' => 'Docker',
            'description' => 'Defined as: A safe virtual environment to create, edit, and freely develop projects on.'
        ],
        'html' => [
            'name' => 'HTML',
            'description' => 'Defined as: A markup language to build the framework and essential blocks of a webpage.'
        ],
        'sql' => [
            'name' => 'SQL',
            'description' => 'Defined as: A language used in database programming, to manage, query, update, and govern databases and information banks.'
        ],
        'open_source' => [
            'name' => 'Open Source Development',
            'description' => 'Defined as: Developing applications using open source tools and languages.'
        ],
        'verbal_communication' => [
            'name' => 'Verbal Communication',
            'description' => 'Defined as: Ability to share concepts, coordinate work and advance goals through discussion. Ability to deliver messages with clarity. Ability to listen well and translate what is heard into meaningful next steps.'
        ],
        'written_communication' => [
            'name' => 'Written Communication',
            'description' => 'Defined as: Ability to craft ideas and discussions in a clear, logical written progression that allows readers to understand and use the concepts shared.'
        ],
        'ability_distributed_team' => [
            'name' => 'Ability to work on a distributed team',
            'description' => 'Defined as: Ability to communicate and deliver work in a way that engages team members in other locations. Ability to use online tools to collaborate with co-workers in other locations, including project management software, chat and video chat tools.'
        ],
        'ability_learn' => [
            'name' => 'Ability to learn',
            'description' => 'Defined as: Ability to rapidly pick up new skills and competencies, and apply them in a work situation. Ability to apply curiosity and cognitive abilities to find new approaches to advancing work when existing skill sets are insufficient.'
        ],
        'integrity' => [
            'name' => 'Integrity',
            'description' => 'Defined as: Treating all those in the work environment with fairness, courtesy and respect for differences; performing the job in a manner that upholds the public trust and values co-workers.'
        ],
        'ability_collaborate' => [
            'name' => 'Ability to collaborate',
            'description' => 'Defined as: Ability to work with others to advance initiatives and build bridges within and across teams, generating mutual trust and respect.'
        ],
        'initiative' => [
            'name' => 'Initiative',
            'description' => 'Defined as: Willingness to take on responsibilities and going above and beyond to take on challenges.'
        ],
        'humility' => [
            'name' => 'Humility',
            'description' => 'Defined as: Continuously demonstrated awareness that a person is only one among many; behaving in a way that creates space for others and makes others feel valued.'
        ],
        'passion' => [
            'name' => 'Passion',
            'description' => 'Defined as: Ability to demonstrate conviction in the task, initiative or approach; bringing heart and inspiration to others. '
        ],
        'flexibility' => [
            'name' => 'Flexibility',
            'description' => 'Defined as: Being open to multiple perspectives when working interpersonally; demonstrating willingness to use a variety of approaches to advance initiatives and deliver work.'
        ],
        'judgement' => [
            'name' => 'Judgement',
            'description' => 'Defined as: Ability to make considered decisions or come to sensible conclusions.'
        ],
        'adaptability' => [
            'name' => 'Adaptability',
            'description' => 'Defined as: Being open to changing circumstances and considerable variety in the workplace.'
        ],
        'accountability' => [
            'name' => 'Accountability',
            'description' => 'Defined as: Taking responsibility for one\'s own actions and the actions of a group.'
        ],
        'attention_detail' => [
            'name' => 'Attention to Detail',
            'description' => 'Defined as: Being careful about detail and thorough in completing work tasks. Ability to perceive pertinent detail in verbal or tabular material; to observe differences in copy, to proofread words and numbers, and to avoid perceptual errors in arithmetical computation.'
        ],
        'complex_problem_solving' => [
            'name' => 'Complex Problem Solving',
            'description' => 'Defined as: Identifying problems and reviewing related information to develop and evaluate options and implement solutions.'
        ],
        'courage' => [
            'name' => 'Courage',
            'description' => 'Defined as: Pushing barriers, questioning the status quo, openness to change, and risk taking.'
        ],
        'originality' => [
            'name' => 'Originality',
            'description' => 'Defined as: The ability to come up with unusual or clever ideas about a given topic or situation, or to develop creative ways to solve a problem.'
        ],
        'critical_thinking' => [
            'name' => 'Critical Thinking',
            'description' => 'Defined as: Using logic and reasoning to identify the strengths and weaknesses of alternative solutions, conclusions or approaches to problems.'
        ],
        'curiosity' => [
            'name' => 'Curiosity',
            'description' => 'Defined as: The desire to explore multiple possibilities. '
        ],
        'dependability' => [
            'name' => 'Dependability',
            'description' => 'Defined as: Being reliable, responsible and fulfilling obligations; demonstrated by being good at estimating timelines, clear on what you can deliver, ensuring things get done, and communicating in advance when there are issues or delays'
        ],
        'ability_follow_instructions' => [
            'name' => 'Ability to follow instructions',
            'description' => 'Defined as: Ability to "catch on" or understand instructions and underlying principles; to reason and make judgments and complete the task.'
        ],
        'persistence' => [
            'name' => 'Persistence',
            'description' => 'Defined as: Conscientiously working towards an outcome and not giving up despite obstacles. '
        ],
        'resilience' => [
            'name' => 'Resilience',
            'description' => 'Defined as: Ability to recover from difficulties or change – to function as well as before and then move forward. It is often referred to as the ability to \'bounce back\' from difficulties or challenges. The perseverance to deal with resistance.'
        ],
        'service_orientation' => [
            'name' => 'Service Orientation',
            'description' => 'Defined as: Actively looking for ways to help people.'
        ],
        'social_perceptiveness' => [
            'name' => 'Social Perceptiveness',
            'description' => 'Defined as: Being aware of others\' reactions and understanding why they react as they do.'
        ],
        'stress_management' => [
            'name' => 'Stress Management',
            'description' => 'Defined as: Controlling stress level and preventing unproductive distress, in order to improve/maintain functioning; being conscientious about impact of one\'s own stress level on others.'
        ],
        'stress_tolerance' => [
            'name' => 'Stress Tolerance',
            'description' => 'Defined as: Dealing calmly and effectively with situations and people despite repeated exposure to high stress environments.'
        ],
        'time_management' => [
            'name' => 'Time Management',
            'description' => 'Defined as: Managing one\'s own time and the time of others effectively in order to deliver on commitments. '
        ],
        'willingness_learn' => [
            'name' => 'Willingness to learn',
            'description' => 'Defined as: Seeking opportunities and taking the initiative to continuously develop.'
        ],
        'management_ability' => [
            'name' => 'Management Ability',
            'description' => 'Defined as: Having been given responsibility for a team or initiative, demonstrating the ability to plan, organize, motivate and enable others, strategize, make decisions and collaborate in order to deliver'
        ],
        'experience_design' => [
            'name' => 'Service Experience Design',
            'description' => 'Defined as: Planning and organizing people, infrastructure, communication and material components as a service in order to improve its quality and the interaction between the service provider and its user'
        ],
        'project_management' => [
            'name' => 'Project Management',
            'description' => 'Defined as: Ability to prioritize the most impactful changes, managing competing priorities, advancing a continuous cycle of improvement'
        ],
        'stakeholder_relations' => [
            'name' => 'Stakeholder Relations',
            'description' => 'Defined as: Ability to communicate clearly with stakeholders and negotiate outcomes in collaboration with partners, advancing common goals through collaboration and skilled communication '
        ],
        'dot_net' => [
            'name' => '.Net Programming',
            'description' => 'Defined as: Ability to program .Net applications using C#, C++, F# or Visual Basic'
        ],
        'geospacial_programming' => [
            'name' => 'Geospacial programming',
            'description' => 'Defined as: Ability to design and build applications that handle, transform, use and display geospatial data.'
        ],
        'microsoft_dynamics' => [
            'name' => 'Microsoft Dynamics',
            'description' => 'Defined as: Ability to use Microsoft Dynamics for enterprise resource planning and customer relationship management'
        ],
        'facilitation' => [
            'name' => 'Facilitation',
            'description' => 'Defined as: Ability to run a meeting or workshop in a manner that encourages full participation, promotes mutual understanding and cultivates shared responsibility '
        ],
        'systems_thinking' => [
            'name' => 'Systems Thinking',
            'description' => 'Defined as: Ability to understand and analyze how disparate aspects of service integrate and impact eachother and turn into a clear direction for the service'
        ],
        'web_architecture' => [
            'name' => 'Web Information Architecture',
            'description' => 'Defined as: ability to redesign web architecture from an information management perspective (not coding) '
        ],
        'storytelling' => [
            'name' => 'Storytelling',
            'description' => 'Defined as: Ability to communicate progress, sharing success stories and lessons learned with diverse audiences and senior management in a clear, compelling manner'
        ],
        'user_design' => [
            'name' => 'User-Centered Design',
            'description' => 'Defined as: Ability to apply user centred design techniques to: understand the user journey; develop and test new approaches to user-product interaction; and provide results that support an improved, intuitive, pleasant user experience'
        ],
        'empathy' => [
            'name' => 'Empathy',
            'description' => 'Defined as: being able to put themselves in the shoes of people with a very different mindset and set of priorities'
        ],
        'analysis' => [
            'name' => 'Analysis',
            'description' => 'Defined as: Ability to collect and utilize qualitative and quantitative data to make design decisions'
        ],
        'data_science' => [
            'name' => 'Data Science',
            'description' => 'Defined as: Ability to use scientific methods, processes, algorithms and systems to extract knowledge and insights from data in various forms, both structured and unstructured.'
        ],
        'results_oriented' => [
            'name' => 'Results-Oriented',
            'description' => 'Defined as: Ability to focus efforts on achieving quality results consistent with the overall vision.'
        ],
        'relationship_management' => [
            'name' => 'Relationship Management',
            'description' => 'Defined as: Ability to develop respectful, constructive and cooperative working relationships with others, and maintaining them over time.'
        ],
        'data_analysis' => [
            'name' => 'Data Analysis',
            'description' => 'Defined as: Ability to inspect, cleanse, transform, and model data with the goal of discovering useful information, informing conclusions, and supporting decision-making.'
        ],
        'data_mining' => [
            'name' => 'Data Mining',
            'description' => 'Defined as: Ability to use a data analysis technique that focuses on modeling and knowledge discovery for predictive rather than purely descriptive purposes.'
        ],
        'r_programming' => [
            'name' => 'R programming',
            'description' => 'Defined as: A programming language for statistical computing and graphics. The R language is widely used among statisticians and data miners for developing statistical software and data analysis.'
        ],
        'database_design_and_management' => [
            'name' => 'Database Design & Management',
            'description' => 'Defined as: Knowledge and ability to apply the methods, practices and policies that are used in the design and the management of databases'
        ],
        'scrum' => [
            'name' => 'SCRUM',
            'description' => 'Defined as: Ability to work under Scrum, an Agile framework for complex projects that helps break down a project into tangible goals through daily meetings, detailed project timelines, and identification of potential project roadblocks.'
        ],
        'team_foundation_server' => [
            'name' => 'TFS Work Items',
            'description' => 'Defined as: Ability to work with Team Foundation Server (commonly abbreviated to TFS), which covers the entire application lifecycle, and enables DevOps capabilities.'
        ],
        'n_unit_testing' => [
            'name' => 'N-Unit Testing',
            'description' => 'Defined as: Ability to work with N-Unit, an evolving, open source framework designed for writing and running tests in Microsoft .NET programming languages.'
        ],
        'asp_net_mvc' => [
            'name' => 'ASP.net MVC',
            'description' => 'Defined as: Ability to work with ASP.NET MVC, a web application framework developed by Microsoft, which implements the model–view–controller (MVC) pattern. '
        ],
        'ef6' => [
            'name' => 'EF6',
            'description' => 'Defined as: Ability to work with Entity Framework (EF), an open source object-relational mapping (ORM) framework for ADO.NET.'
        ],
        'cloud_architecture_for_mobile_and_applications' => [
            'name' => 'Cloud Architecture for Mobile and Applications',
            'description' => 'Defined as: Ability to architect, design and implement infrastructure technologies, solutions and services such as: compute, storage, networking, physical infrastructures, software, commercial off the shelf (COTS) and Open Source packages and solutions, virtual and cloud including PaaS, SaaS, using Azure, AWS, Xamarin, Java, C#, CSS or Python.'
        ],
        'cloud_computing_platform_configuration' => [
            'name' => 'Cloud Computing Platform Configuration',
            'description' => 'Defined as: Ability to work with Azure and AWS to set hardware and software details for elements of a cloud environment to ensure that they can interoperate and communicate.'
        ],
        'strategy_development' => [
            'name' => 'Strategy Development',
            'description' => 'Defined as: Ability to identify specific objectives, then set achievable goals, identify priorities, allocate energy and resources, and work with stakeholders to work towards intended outcomes/results, while assessing and adjusting the organization\'s direction in response to a changing environment.'
        ],
        'requirements_analysis' => [
            'name' => 'Requirements Analysis',
            'description' => 'Defined as: Ability to collect and utilize qualitative and quantitative data to make design decisions and identify appropriate solutions, and to inform the preparation of business and technical documentation.'
        ],
        'quality_assurance' => [
            'name' => 'Quality Assurance',
            'description' => 'Defined as: Ability to design a wide range of testing techniques, identify the most effective techniques, data sets and tools to use, and communicate the testing approaches to both technical and non-technical stakeholders.'
        ],
        'accessibility_assessment_apps' => [
            'name' => 'Accessibility Assessment for Applications',
            'description' => 'Defined as: Familiar with accessibility guidelines and best practices in industry and the public sector.'
        ],
        'community_engagement' => [
            'name' => 'Community Engagement',
            'description' => 'Defined as: Ability to effectively communicate with a community of interested parties or stakeholders.'
        ],
        'solution_architecture_mobile' => [
            'name' => 'Solution Architecture for Mobile',
            'description' => 'Defined as: Ability to architect, design and implement infrastructure technologies, solutions and services for mobile using languages such as Xamarin, Java, C#, CSS, Python, Objective-C, Swift, Apple Xcode, ADT, Android SDK, React Native, JavaScript, or HTML 5.'
        ],
        'mobile_app_design' => [
            'name' => 'Mobile App Design, Architecture and Development',
            'description' => 'Defined as: Ability to architect, design and develop mobile applications using either hybrid or native solutions.'
        ],
        'mobile_development_cloud' => [
            'name' => 'Mobile Development in the Cloud',
            'description' => 'Defined as: Ability to architect, design and develop and/or deploy and test mobile applications on a Cloud (MS Azure or Amazon AWS) platform.'
        ],
        'business_process_modelling_software' => [
            'name' => 'Business process modelling software',
            'description' => 'Defined as: Ability to work in modelling software or applications, including but not limited to Visio, Powerpoint, Excel, and Dia, to produce workflows.'
        ],
        'business_process_modelling' => [
            'name' => 'Business process modelling',
            'description' => 'Defined as: Ability to map processes and sub-processes of an enterprise, as well as to create models that visually represents the ways in which operations are carried out to accomplish the intended objectives of an organization.'
        ],
        'business_analysis' => [
            'name' => 'Business analysis',
            'description' => 'Defined as: Ability to gather, document, and analyze business needs and requirements, and to investigate problems and opportunities to contribute to determining solutions.'
        ],
        'project_management_practices' => [
            'name' => 'Knowledge of project management practices',
            'description' => 'Defined as: Familiarity with the practices of initiating, planning, executing, controlling, and closing the work of a team to achieve specific goals and meet specific success criteria at the specified time.'
        ],
        'goc_policy_project_management' => [
            'name' => 'Knowledge of Government of Canada policy suite on project management',
            'description' => 'Defined as: Familiarity with the Government of Canada\'s policy suite on the management of projects.'
        ],
        'it_project_management' => [
            'name' => 'IT project management',
            'description' => 'Defined as: Ability to manage IT Transformation projects throughout the entire lifecycle of the project.'
        ],
    ],
    'status' => [
        'claimed' => 'Claimed'
    ]
];
