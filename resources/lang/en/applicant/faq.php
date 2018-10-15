<?php

return [
    /*
     * --------------------------------------------------------------------------
     * FAQ Language Lines
     * --------------------------------------------------------------------------
     *
     * The following language lines are used in the applicant home page.
     *
     */
    "title" => "Talent Cloud User Guide",
    "sidebar_label" => "On This Page",
    "modals" => [
        "00" => [
            "type" => "login",
            "title" => "Register or Login with GC Account",
            "content" => [
                "00" => "Talent Cloud leverages a platform called GC Account that allows you to sign in to a variety of tools using the same account information.",
                "01" => "If you already have a GC Account, please use the Login link below to sign in. If you don't have an account, please use the Register link to create one."
            ],
            "id" => "login",
            "action_01" => "Register",
            "action_02" => "Login"
        ],
        "01" => [
            "type" => "logout",
            "title" => "Logout of Talent Cloud",
            "content" => [
                "00" => "Are you sure you want to logout of Talent Cloud?"
            ],
            "id" => "logout",
            "action_01" => "Cancel",
            "action_02" => "Logout"
        ],
        "02" => [
            "type" => "confirmation",
            "title" => "Delete this Diploma/Degree?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this diploma or degree from your profile?",
                "01" => "All previously submitted applications will retain this experience."
            ],
            "id" => "deleteDegree",
            "action_01" => "Cancel",
            "action_02" => "Delete"
        ],
        "03" => [
            "type" => "confirmation",
            "title" => "Delete this Course/Certification?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this course or certification from your profile?",
                "01" => "All previously submitted applications will retain this experience."
            ],
            "id" => "deleteCourse",
            "action_01" => "Cancel",
            "action_02" => "Delete"
        ],
        "04" => [
            "type" => "confirmation",
            "title" => "Delete this Lived Experience?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this lived experience from your profile?",
                "01" => "All previously submitted applications will retain this experience."
            ],
            "id" => "deleteWork",
            "action_01" => "Cancel",
            "action_02" => "Delete"
        ]
    ],
    "know" => [
        "sidebar_title" => "Things to Know",
        "category_anchor" => "to-know",
        "category_title" => "Things to Know",
        "sections" => [
            "00" => [
                "title" => "Why does Canada need a platform for project-based work?",
                "copy" => [
                    "00" => "In the 20th Century workers overwhelmingly fell into two categories: permanent (“owned” by the organization, but with benefits); or contract (self-employed freelancers without benefits). But with the rise of the internet, a different type of employment has emerged to keep pace with the new economies unlocked by the digital age. Sometimes called “gig”, project-based or non-traditional employment, this new work category now accounts for almost 30% of employment in Canada and the United States, with similar increases in Europe. But despite the staggering growth in project-based work, governments haven’t adapted their hiring models.",
                    "01" => "To break out of old dualities, Talent Cloud is testing the introduction of a third category of worker: a project-based employee with rights and benefits, on a self-directed career path with high mobility. To make this work, applicants need a platform that lets them find opportunities and be valued in different ways, and managers need a staffing model optimized for the digital age. While the Government of Canada has had “term” workers for a long time, this is the first public sector talent model created - from tech to behavioural design - to enable a thriving marketplace for project-based work."
                ]
            ],
            "01" => [
                "title" => "Who can apply?",
                "copy" => [
                    "00" => "Anyone in the world can apply to Talent Cloud. All jobs at this phase of the project are open to the public and competitively posted.",
                    "01" => "Under the Government of Canada’s staffing policies, Canadian veterans and Canadian citizens will be given preference in staffing. (In non-government speak, this means if you’re a permanent resident or non-Canadian, your application will be considered if no qualified Canadian citizen applies for the position… and then there’s some extra paperwork.)"
                ]
            ],
            "02" => [
                "title" => "What types of jobs will be posted?",
                "copy" => [
                    "00" => "All positions posted on Talent Cloud for the pilot are term positions. That means you are a Government of Canada employee for the duration of the term, and can accrue benefits after 3 months and pension after 6 months of continuous term employment. It is possible to take sequential terms, lining them up for continuous employment with the Government of Canada, while taking on different projects in different departments if you choose. Term positions can be extended up to 3 years. After 3 years, term employees become indeterminate (or permanent) employees, except in exceptional circumstances.",
                    "01" => "Talent Cloud is starting with jobs related to digital, tech and UX. So look for positions like “data scientist”, “programmer”, “tech project manager”, “user experience designer”… etc.",
                    "02" => "If the platform is working well (remember: big experiment), we’ll be launching staffing streams in administrative positions and HR around January. Policy and project management positions will launch around March."
                ]
            ],
            "03" => [
                "title" => "Why are there so few jobs posted on Talent Cloud?",
                "copy" => [
                    "00" => "At any given time, Talent Cloud should have 2-3 jobs posted. And the site may have to come down on Monday mornings from time to time… We’re a tiny team working on a shoestring budget on a highly experimental idea. So posting a few jobs at a time is the best way for us to gather quality data to know if the platform is working as it should, while still providing a quality experience (we hope) to applicants, hiring managers and departmental HR advisors."
                ]
            ],
            "04" => [
                "title" => "What departments are participating in this experimental staffing model?",
                "copy" => [
                    "00" => "As an experiment, Talent Cloud is funded through Memorandums of Understanding (MOUs) with partner departments. This isn’t a fee for service to staff using the platform. This is a group of departments co-funding an alternative to the traditional HR model. Only partner departments may staff using Talent Cloud under this funding model.",
                    "01" => "Partner departments with signed MOUs are:",
                    "02" => [
                        "type" => "ul",
                        "items" => [
                            "00" => "Treasury Board Secretariat (host department)",
                            "01" => "Employment and Skills Development Canada",
                            "02" => "Environment and Climate Change Canada",
                            "03" => "Natural Resources Canada",
                            "04" => "Transport Canada",
                            "05" => "Global Affairs Canada",
                            "06" => "Canada Border Services Agency",
                            "07" => "Fisheries and Oceans Canada",
                            "08" => "Innovation, Science and Economic Development Canada",
                            "09" => "Public Services and Procurement Canada"
                        ]
                    ]
                ]
            ],
            "05" => [
                "title" => "What can I expect in the application and selection process?",
                "copy" => [
                    "00" => "Eventually, Talent Cloud is hoping to be able to offer a 30 day hiring experience (from job advertisement to letter of offer). For the initial experiment, applicants should expect to hear back about their initial application within 2 weeks of the job advertisement closing. For those moving on to further rounds of screening in a position that has been advertised as bilingual, expect language testing early in the process. (If you have never taken any language testing with the Government of Canada before, you may want to try these <a href='https://www.canada.ca/en/public-service-commission/services/second-language-testing-public-service/self-assessment-tests.html' title'Take the tests.'>self-assessment tests</a> to get a sense of what the tests are like.)",
                    "01" => "In terms of screening for other competencies, you can also expect alternative testing and evaluation approaches throughout the process that are more informal and designed to test right fit to team and overall capacity. Talent Cloud encourages managers to apply a “best overall” approach to selection, rather than a “screen out a few at each stage” approach.",
                    "02" => "All Government of Canada employees are required to pass reliability security checks and many will require secret level clearance. This involves giving fingerprints, having a criminal record check and a credit check. These functions are conducted by authorized security officials in Government (not Talent Cloud).",
                    "03" => "If you’ve lived outside of Canada for more than six months in a row in the last 5 years (10, if your job requires secret clearance) then you’ll need to provide an “out of country” criminal record check. This can take a while, as it depends on procedural timelines of the country you’ve lived in. Applicants can request this “out of country” criminal record check at any time, outside of any staffing process. This record is submitted from the applicant to the Government of Canada at the time of security screening. So if you’ve spent 8 months in South Africa or hung out in the Alps for a year or been at school in Australia, we suggest requesting your records up front. This can save you and your hiring manager a lot of time later. (And if a particular project-based position starts at fixed date, the lack of security clearance in time may force the hiring manager to select another candidate…)"
                ]
            ],
            "06" => [
                "title" => "What should I apply to?",
                "copy" => [
                    "00" => "Read the team culture, work environment and hiring manager sections. Think carefully about whether or not you would be a good fit. Try to seek out and apply for positions that will let you give your best to the team and the project every day. Apply to jobs that will be fulfilling for you, in an operating environment that will help you thrive."
                ]
            ],
            "07" => [
                "title" => "When should I not apply?",
                "copy" => [
                    "00" => "The idea of a government job can be very appealing. This leads a lot of people to apply for a lot of jobs they aren’t qualified for… or jobs they wouldn’t actually take if they knew more about the position to begin with. All these extra applications block up the system and slow down staffing to a painfully slow pace. Talent Cloud shares a lot more information with applicants about the position and the hiring manager to help applicants be part of the discussion on right fit. If a position requires collaboration and you prefer to work alone, maybe it’s not right for you. If a position is fast-paced and you like time to digest tasks, perhaps consider applying for the next job instead."
                ]
            ],
            "08" => [
                "title" => "Is this a marketplace for casual appointments?",
                "copy" => [
                    "00" => "A “casual appointment” is government-speak for a 90 day position that can be given to a worker on the basis of merit without a competitive process. Those in casual positions don’t earn pension or benefits, and can only hold one casual appointment a year in a department. Some workers string together government employment by taking a series of casuals over the course of the year. Because of Talent Cloud’s commitment to advancing workers’ rights and benefits, casual appointments are not permitted on the platform."
                ]
            ]
        ]
    ],
    "skills" => [
        "sidebar_title" => "Skill Recognition",
        "category_anchor" => "skill-recognition",
        "category_title" => "How does Talent Cloud’s Skill Recognition Model work?",
        "sections" => [
            "00" => [
                "title" => "Dynamic Skill Records: What the heck is that?",
                "copy" => [
                    "00" => "This is where the magic happens. You’re more than a resume and your skills are more than formal credentials. So why shouldn’t you be able to show a potential employer how much more? With Talent Cloud’s dynamic skill records you can be recognized for your current skills, knowledge and abilities, regardless of how or where you got them. This means that you can claim all of your lived experiences as a way to demonstrate your expertise and what you are capable of. Each time something gets validated it becomes part of your dynamic skills record."
                ]
            ],
            "01" => [
                "title" => "Unique life path? No problem!",
                "copy" => [
                    "00" => "You have a degree? Great. You don’t have a degree? Great. We care about what you’re capable of. Our dynamic skill recognition method helps you tell us that, no matter what life path you’ve chosen to get here. While some jobs still require a specific university degree (under Government’s Classification standards), Talent Cloud is helping managers develop a broad approach to recognizing skills and equivalencies. The idea is to open up the way Government sees and values experience so that a wider range of Canada’s talent can apply to Government work."
                ]
            ],
            "02" => [
                "title" => "Why bother and what’s in it for you?",
                "copy" => [
                    "00" => "Recognition: You become the owner of recognized dynamic skill records that reflect your current skills and potential.",
                    "01" => "Create Trust: Your dynamic skill records can be trusted by potential employers because they have already been validated.",
                    "02" => "Time Savings: You save a ton of time when you apply for new opportunities because you can reuse your dynamic skill records."
                ]
            ],
            "03" => [
                "title" => "How does it work?",
                "copy" => [
                    "00" => "It’s actually really simple!",
                    "01" => [
                        "type" => "ol",
                        "items" => [
                            "00" => "Claim: You tell us about a skill you have",
                            "01" => "Collect: You send us a work sample that demonstrates your skill",
                            "02" => "Corroborate: You choose someone who can act as a micro-reference to support your claim",
                            "03" => "Reuse: The next time you apply for a job, you can simply reuse this record - no need to reinvent the wheel each time!",
                            "04" => "Evolve: You can add to your dynamic skill records so that they grow over time as you do"
                        ]
                    ]
                ]
            ]
        ]
    ],
    "levels" => [
        "sidebar_title" => "Skill Levels",
        "category_anchor" => "levels",
        "category_title" => "How do I know what level my skills are at?",
        "sections" => [
            "00" => [
                "title" => "Talent Cloud’s Skills Model",
                "copy" => [
                    "00" => "Rather than defining experience by how many years you’ve done something, Talent Cloud looks at a person’s ability to do the job under various conditions of complexity and autonomy. Basically, your level is determined by how challenging a task is, measured against how much help or supervision you require to complete it. This approach acknowledges that people will learn skills at different rates and will show strengths in different ways."
                ]
            ],
            "01" => [
                "title" => "Find your level: Hard Skills",
                "copy" => [
                    "00" => "Basic:",
                    "01" => [
                        "type" => "ul",
                        "items" => [
                            "00" => "You have the ability to accomplish basic tasks with steady supervision and clear direction. The tasks you’re assigned are clear and don’t involve significant complexity. Their impact is usually locally felt.",
                            "01" => "As you advance in this category, you should be developing the ability to accomplish tasks of moderate complexity with steady supervision. You will also need to be able to accomplish basic tasks with little or no supervision.",
                            "02" => "This level is usually associated with tasks that form the bulk of the work for lower level positions, such as junior analysts or entry level developers."
                        ]
                    ],
                    "02" => "Intermediate:",
                    "03" => [
                        "type" => "ul",
                        "items" => [
                            "00" => "You have the ability to accomplish tasks of moderate complexity or moderate impact with supervision. The approach to the tasks, and how they are delivered, is determined by the supervisor. You contribute input and advice. You are able to advance the task, even in the face of small to moderate hurdles and complications.",
                            "01" => "As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with steady supervision. You will also need to be able to accomplish tasks of moderate complexity or impact with little or no supervision.",
                            "02" => "This level is usually associated with tasks that form the bulk of the work for mid-level positions, such as analysts or developers."
                        ]
                    ],
                    "04" => "Advanced:",
                    "05" => [
                        "type" => "ul",
                        "items" => [
                            "00" => "You have the ability to accomplish tasks of significant complexity or impact with supervision. You provide advice and input on the approach to the tasks, and how they are delivered, for the supervisor’s consideration. You are able to advance the task, even in the face of moderate to large hurdles and complications.",
                            "01" => "As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with only light levels of supervision, where you are effectively the lead on the initiative. You may also take on a role of training others in this skills set or take on a light supervisory role for those at lower levels.",
                            "02" => "This level is usually associated with tasks that form the bulk of the work for higher level positions, such as senior analysts or senior developers."
                        ]
                    ],
                    "06" => "Lead:",
                    "07" => [
                        "type" => "ul",
                        "items" => [
                            "00" => "You have the ability to accomplish tasks of significant complexity or impact, where you call the shots and answer to the organization’s senior management for your decisions. You bring forward the tasks, the approach and the delivery plan for senior management consideration. You often supervise others (individuals or teams) in delivering tasks of high complexity or system wide impact. You are able to advance these tasks, even in the face of significant unforeseen hurdles and complications.",
                            "01" => "As you advance in this category, you should be developing the ability to assess others at more junior levels, becoming able to clearly identify the difference between beginner, intermediate and advanced tasks. You should be able to build teams, set direction and provide supervision.",
                            "02" => "This level is usually associated with tasks that form the bulk of the work for management and executive level positions."
                        ]
                    ]
                ]
            ],
            "02" => [
                "title" => "Find your level: Soft Skills",
                "copy" => [
                    "00" => "In Early Development:",
                    "01" => [
                        "type" => "ul",
                        "items" => [
                            "00" => "You’re working on acquiring this skill or attribute. You are able to demonstrate it under favourable conditions (low stress, minimal difficulty) and can apply it in a work context intermittently."
                        ]
                    ],
                    "02" => "Moderately in Evidence:",
                    "03" => [
                        "type" => "ul",
                        "items" => [
                            "00" => "You’re able to consistently demonstrate this skill or attribute in the workplace, including under conditions of low-to-moderate stress or difficulty.",
                            "01" => "Your peers and supervisors are able to attest to the fact that you have been able to demonstrate this skill or attribute on a regular basis."
                        ]
                    ],
                    "04" => "Strongly in Evidence:",
                    "05" => [
                        "type" => "ul",
                        "items" => [
                            "00" => "You’re able to consistently demonstrate this skill or attribute in the workplace, including under conditions of high stress or difficulty.",
                            "01" => "Your peers and supervisors recognize this as a strength you demonstrate in the workplace."
                        ]
                    ],
                    "06" => "Deep Level Understanding:",
                    "07" => [
                        "type" => "ul",
                        "items" => [
                            "00" => "This is a foundational part of who you are. You consistently demonstrate this skill or attribute, even under conditions of extreme stress or difficulty.",
                            "01" => "Your peers and supervisors recognize this as a significant strength you demonstrate in the workplace, providing an example to others."
                        ]
                    ]
                ]
            ]
        ]
    ]
];