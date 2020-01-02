<?php

return [
    /*
    * --------------------------------------------------------------------------
    * FAQ Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are used on the FAQ page.
    *
    */
    /* Example of how content should be structured. Content should be entered into a content item. Each piece of content needs a type property for Twig to understand what kind of HTML to output.
    "hiring" => [
        "title" => "For Hiring Managers",
        "hash" => "managers",
        "sections" => [
            "0" => [
                "title" => "",
                "hash" => "",
                "content" => [
                    "0" => [
                        "type" => "title",
                        "hash" => "HASH",
                        "copy" => "YOUR TITLE GOES HERE"
                    ],
                    "1" => [
                        "type" => "text",
                        "copy" => "YOUR TEXT GOES HERE"
                    ],
                    "2" => [
                        "type" => "ul",
                        "items" => [
                            "0" => "SINGLE LIST ITEM",
                            "1" => [
                                "copy" => "NEST LIST ITEM COPY (THIS IS A LABEL FOR THE SUB LISTED ITEMS)",
                                "items" => [
                                    "0" => "NESTED LIST ITEM COPY"
                                ]
                            ]
                        ]
                    ],
                    "3" => [
                        "type" => "ol",
                        "items" => [
                            "0" => "SINGLE LIST ITEM",
                            "1" => [
                                "copy" => "NEST LIST ITEM COPY (THIS IS A LABEL FOR THE SUB LISTED ITEMS)",
                                "items" => [
                                    "0" => "NESTED LIST ITEM COPY"
                                ]
                            ]
                        ]
                    ],
                    "4" => [
                        "type" => "accordion",
                        "label" => "ACCORDION TITLE",
                        "content" => [
                            /* All content types work in here.
                            "0" => [
                                "type" => "title",
                                "hash" => "HASH",
                                "copy" => "YOUR TITLE GOES HERE."
                            ]
                        ]
                    ],
                    "5" => [
                        "type" => "section",
                        "content" => [
                            /* All content types work in here.
                            "0" => [
                                "type" => "title",
                                "hash" => "HASH",
                                "copy" => "YOUR TITLE GOES HERE."
                            ]
                        ],
                        "links" => [
                            "0" => "<a href=\"\" title=\"\" target=\"\">LINK TEXT</a>"
                        ]
                    ]
                ],
                "links" => [
                    "0" => "<a href=\"\" title=\"\" target=\"\">LINK TEXT</a>"
                ]
            ]
        ]
    ],
    */
    /* UI Content */
    'title' => 'Talent Cloud User Guide',
    'faq_title' => 'Talent Cloud FAQ',
    'breadcrumbs' => [
        'home' => [
            'title' => 'Return to the homepage.',
            'text' => 'Home'
        ],
        'faq' => [
            'text' => 'FAQ'
        ]
    ],
    'sidebar' => [
        'users' => [
            'applicants' => 'For Applicants',
            'managers' => 'For Managers',
            'hr' => 'For HR Advisors',
        ],
    ],
    'accordion' => [
        'expand' => 'Click to expand...'
    ],
    /* Applicant Content */
    'applicants' => [
        'title' => 'For Applicants',
        'hash' => 'applicants',
        'sections' => [
            'know' => [
                'title' => 'Things to Know',
                'hash' => 'to-know',
                'content' => [
                    '0' => [
                        'type' => 'accordion',
                        'label' => 'Why does Canada need a platform for project-based work?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "In the 20th Century most workers fell into two categories: permanent (\"owned\" by the organization, but with benefits); or contract (self-employed freelancers without benefits). The internet has unlocked new economies as well as a rise in project-based or non-traditional employment. Sometimes called the \"gig\" economy, employees in this new category of work now account for almost 30% of employment in Canada and the United States, with similar trends in Europe. Despite this seismic shift, governments haven't adapted their hiring models.\n\nTo break out of old dualities, Talent Cloud is testing the introduction of a third category of worker: a project-based employee on a self-directed career path with high mobility but with the rights and benefits that have traditionally been restricted to permanent employees. To make this work, applicants need a platform that lets them find opportunities and easily demonstrate their value, and managers need an efficient and scalable staffing model optimized for the digital age. While the Government of Canada has had \"term\" workers for a long time, this is the first public sector talent model created to enable a thriving marketplace for project-based work."
                            ]
                        ]
                    ],
                    '1' => [
                        'type' => 'accordion',
                        'label' => 'Who can apply?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "Anyone in the world can apply to Talent Cloud. All jobs at this phase of the project are open to the public and competitively posted.\n\nUnder the Government of Canada's staffing policies, Canadian veterans and Canadian citizens will be given preference in staffing. (In non-government speak, this means if you're a permanent resident or non-Canadian, your application will be considered if no qualified Canadian citizen applies for the position… and then there's some extra paperwork.)"
                            ]
                        ]
                    ],
                    '2' => [
                        'type' => 'accordion',
                        'label' => 'What types of jobs will be posted?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "All jobs posted on Talent Cloud during the pilot are term positions. That means you are a Government of Canada employee for the duration of your contract. You can start to accrue benefits after 3 months and pension after 6 months of continuous term employment. It's possible to take sequential terms, lining them up for continuous employment with the Government of Canada, while taking on different projects in different departments if you choose. For most departments, term positions can be extended up to 3 years at the discretion of the manager and their organization. After 3 years in the same position, term employees become indeterminate (permanent) employees, except in exceptional circumstances.\n\nTalent Cloud started with jobs related to digital, tech, and UX. Think positions like \"data scientist\", \"programmer\", \"tech project manager\", and \"user experience designer\".\n\nSince then, we've launched staffing streams in administrative positions and HR. Next we'll be expanding to include policy, project management, and procurement positions, which we expect to post later on this spring."
                            ]
                        ]
                    ],
                    '3' => [
                        'type' => 'accordion',
                        'label' => 'Why are there so few jobs posted on Talent Cloud?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "At any given time, Talent Cloud should have 2-3 jobs posted. And the site may have to come down on Monday mornings from time to time… We're a tiny team working on a shoestring budget on a highly experimental idea. So posting a few jobs at a time is the best way for us to gather quality data to know if the platform is working as it should, while still providing what we hope is a quality experience to applicants, hiring managers, and departmental HR advisors."
                            ]
                        ]
                    ],
                    '4' => [
                        'type' => 'accordion',
                        'label' => 'What can I expect in the application and selection process?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "Talent Cloud is working toward a 30-day hiring experience from job advertisement to letter of offer. We're currently piloting the project so, right now, applicants should expect to hear back about their initial application within 2-weeks of the job advertisement closing. For those who move past the initial screening in a position that has been advertised as bilingual, expect language testing early in the process. (If you have never taken any language testing with the Government of Canada before, you may want to try these %link0% to get a sense of what the tests are like).\n\nYou can also expect alternative testing and evaluation approaches that are more informal throughout the process. They are designed to screen for other competencies, test right fit to team, and overall capacity. Talent Cloud encourages managers to apply a \"best overall\" approach to selection, rather than screening out a few applicants at each stage.\n\nAll Government of Canada employees are required to pass reliability security checks and many will require secret level clearance. This involves giving finger prints, having a criminal record check and a credit check. These functions are conducted by authorized security officials in Government (not Talent Cloud).\n\nIf you've lived outside of Canada for more than six months in a row in the last 5 years (10, if your job requires secret clearance) then you'll need to provide an \"out of country\" criminal record check. This can take a while, as it depends on the processing timelines of the country you've lived in. Applicants can request this \"out of country\" criminal record check at any time and the request doesn't need to be linked to a staffing process. This record is submitted from the applicant to the Government of Canada at the time of security screening. So if you've spent 8 months in South Africa or hung out in the Alps for a year or been at school in Australia, we suggest requesting your records up front. This can save you and your hiring manager a lot of time later. (And if a particular project-based position starts at a fixed date, the lack of security clearance in time may force the hiring manager to select another candidate…)"
                            ]
                        ]
                    ],
                    '5' => [
                        'type' => 'accordion',
                        'label' => 'How should I decide whether or not to apply?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "The idea of a government job can be very appealing. This leads a lot of people to apply for a lot of jobs they aren't qualified for… or jobs they wouldn't actually take if they knew more about the position to begin with. All these extra applications block up the system and bring staffing down to a painfully slow pace.\n\nTalent Cloud shares a lot more information with applicants about the position and the hiring manager to help applicants be part of the discussion on right fit. If a position requires collaboration and you prefer to work alone, maybe it's not right for you. If a position is fast-paced and you like time to digest tasks, perhaps consider applying for another opportunity on Talent Cloud instead.\n\nRead the team culture, work environment and hiring manager sections. Think carefully about whether or not you would be a good fit. Make sure you seek out and apply to jobs that will be fulfilling for you and in an operating environment that will help you thrive so you can give your best to the team and the project every day!"
                            ]
                        ]
                    ],
                    '6' => [
                        'type' => 'accordion',
                        'label' => 'Is this a marketplace for casual appointments?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "A \"casual appointment\" is government-speak for a 90 day position that can be given to a worker on the basis of merit without a competitive process. Those in casual positions don't earn pension or benefits, and can only hold one casual appointment a year in a department. Some workers string together government employment by taking a series of casuals over the course of the year. Because of Talent Cloud's commitment to advancing workers' rights and benefits, casual appointments are not permitted on the platform."
                            ]
                        ]
                    ]
                ],
                'links' => [
                    '0' => '<a href="https://www.canada.ca/en/public-service-commission/services/second-language-testing-public-service/self-assessment-tests.html" target="_blank" rel="noopener noreferrer" title="Take the tests">self-assessment tests</a>'
                ]
            ],
            'benefits' => [
                'title' => 'Employee Benefits',
                'hash' => 'benefits',
                'content' => [
                    '0' => [
                        'type' => 'text',
                        'copy' => "When you’re thinking about where to apply for a job there are several factors to consider. Salary, location, fit, and passion for the work are all important. Another super important factor is the employee benefits that are available. Unfortunately, if you’re a part of the estimated thirty-percent of Canadian employees who work in the gig economy, you’re likely working without that safety net. Many of those workers are right here at the Government of Canada (one of the largest employers of gig workers in the country), and what’s great is that if you hold a term position you can access many of the same benefits as indeterminate employees.\n\nAll jobs posted on Talent Cloud are for term positions. That means you are a Government of Canada employee for the duration of your contract. Term positions provide paid holidays and vacation leave, and offer you protection by making some benefits mandatory. The information below will be correct for most jobs posted on Talent Cloud, but we recommend asking the hiring manager, or using the first two letters in the government classification on the job poster to find the %link0% that applies to the position. And, you can always find more information about the public service pension and benefit plans at %link1%."
                    ],
                    '1' => [
                        'type' => 'title',
                        'hash' => 'benefits-breakdown',
                        'copy' => 'Here’s what you should expect...'
                    ],
                    '2' => [
                        'type' => 'accordion',
                        'label' => 'Paid Holidays',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'There are 11 designated paid holidays available to you. They are: New Year’s Day, Good Friday, Easter Monday, Victoria Day, Canada Day, Labour Day, Thanksgiving, Remembrance Day, Christmas Day, Boxing Day, and a provincial or civic holiday in the area where you are employed (e.g., August Civic Holiday). Remote workers take note, this is based on the location of your team’s official office, and not the location where you do your work.'
                            ]
                        ]
                    ],
                    '3' => [
                        'type' => 'accordion',
                        'label' => 'Paid Leave',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "In addition to paid holidays, there are several other types of paid leave available to you. The following are some of the most commonly used.\n\nVacation: You will earn 1.25 days of vacation a month, which works out to three-weeks each year. For the first six-months, you can only use the vacation days you have earned. After that, you can start using anticipated vacation days for the rest of the year.\n\nSick leave: You will earn 1.25 days of sick leave with pay a month, which works out to 3 weeks each year but you can still take paid sick leave even if you haven’t earned the days (pending approval from your manager).\n\nFamily leave: You have up to five days each year to take care of family-related responsibilities. This covers circumstances like school or daycare being closed unexpectedly, school functions, or to care for an ill or elderly family member.\n\nPersonal leave: You have up to two days each year to take care of personal matters."
                            ]
                        ]
                    ],
                    '4' => [
                        'type' => 'accordion',
                        'label' => 'Health Care',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "You can immediately apply for %link2% (PSHCP) coverage if your initial term position is more than six months. For most eligible health care products and services like prescription drugs, vision care, medical practitioner services, and emergency dental treatment, the plan covers 80% of the eligible expenses, with some specified maximums, after you take advantage of any benefits provided by your provincial/territorial health insurance plan or any other source of health care assistance you’re entitled to.\n\nAn application is required to enroll. %link3%."
                            ]
                        ]
                    ],
                    '5' => [
                        'type' => 'accordion',
                        'label' => 'Dental Care',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "The %link4% (PSDCP) is 100% employer-paid and covers 90% of basic services and 50% of major services and orthodontics. If your initial term position is more than six months and you work more than an average 12.5 hours per week, eligibility for the PSDCP starts immediately with coverage beginning after a three month waiting period. That means that three months after you begin your term, you can start using the dental care plan.\n\nNo application form is required. %link5%."
                            ]
                        ]
                    ],
                    '6' => [
                        'type' => 'accordion',
                        'label' => 'Pension Plan',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'If the term of your position is more than six months the good news is that you’re eligible to participate in the %link6% beginning on your first day of work. Plan members and the Government of Canada contribute equally to this defined benefit pension plan. The amount deducted from your pay will vary depending on your salary. Pension benefits are based on average salary and years of pensionable service. %link7%.'
                            ]
                        ]
                    ],
                    '7' => [
                        'type' => 'accordion',
                        'label' => 'Disability Insurance',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "%link8% is mandatory for all employees occupying a unionized position. Premiums are 85% employer-paid. If you are unable to work for long periods due to a totally disabling illness or injury, this benefit pays 70% of your monthly salary after 13 weeks from the date of disability or the exhaustion of all paid sick leave, whichever is longer.\n\nIf your initial term position is more than six months and you work more than an average 12.5 hours per week, coverage starts on your first day."
                            ]
                        ]
                    ],
                    '8' => [
                        'type' => 'accordion',
                        'label' => 'Long-Term Disability (LTD)',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "Long-Term Disability insurance under the %link9% is mandatory for all employees occupying excluded or unrepresented positions. Premiums are 85% employer-paid. If you are unable to work for long periods due to a totally disabling illness or injury, this benefit pays 70% of your monthly salary after 13 weeks from the date of disability or the exhaustion of all paid sick leave, whichever is longer.\n\nIf your initial term is longer than six months and you work more than an average of 12.5 hours per week, coverage starts on your first day."
                            ]
                        ]
                    ],
                    '9' => [
                        'type' => 'accordion',
                        'label' => 'Exceptions for Returning Employees',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Moving from gig-to-gig in the Federal Government? If you signed a contract for a term position that lasts less than six months and you are extended or if you start another term contract soon enough you could still be eligible for health care, dental, disability insurance and long-term disability. Take a closer look at the links provided above or ask the hiring manager to see if you qualify.'
                            ]
                        ]
                    ],
                    '10' => [
                        'type' => 'text',
                        'copy' => 'The summary above is for information purposes only and is not a legal document on your rights and obligations. Should there be any discrepancy between the information above and that contained in the Public Service Superannuation Act and related regulations or other applicable laws, the legislative provisions will apply. Similarly, should there be any discrepancy between the information above and that contained in the group insurance benefits plan provisions, insurance contracts, or collective agreements, the plan provisions, insurance contracts or collective agreements will apply.'
                    ],
                ],
                'links' => [
                    '0' => '<a href="http://www.tbs-sct.gc.ca/agreements-conventions/list-eng.aspx" title="Learn more about the collective bargaining agreement." target="_blank">collective bargaining agreement</a>',
                    '1' => '<a href="https://www.canada.ca/en/treasury-board-secretariat/topics/pension-benefits.html" title="Learn more about pension benefits." target="_blank">canada.ca/pension-benefits</a>',
                    '2' => '<a href="https://www.canada.ca/en/treasury-board-secretariat/topics/benefit-plans/plans/health-care-plan.html" title="Learn more about the Public Service Health Care Plan." target="_blank">Public Service Health Care Plan</a>',
                    '3' => '<a href="https://www.njc-cnm.gc.ca/directive/d9/en" title="Learn more about the plan." target="_blank">A complete description of what is covered under the Plan can be found here</a>',
                    '4' => '<a href="https://www.canada.ca/en/treasury-board-secretariat/topics/benefit-plans/plans/dental-care-plan.html" title="Learn more about the Public Service Dental Care Plan." target="_blank">Public Service Dental Care Plan</a>',
                    '5' => '<a href="https://www.canada.ca/en/treasury-board-secretariat/topics/benefit-plans/plans/dental-care-plan/rules-dental-care-plan-public-service-canada.html" title="Learn more about the plan." target="_blank">A complete description of what is covered under the Plan can be found here</a>',
                    '6' => '<a href="https://www.canada.ca/en/treasury-board-secretariat/services/pension-plan/active-members/new-public-service-pension.html" title="Learn more about the Public Service Pension Plan." target="_blank">public service pension plan</a>',
                    '7' => '<a href="https://www.tpsgc-pwgsc.gc.ca/remuneration-compensation/services-pension-services/pension/info/bienvenue-welcome-eng.html" title="Learn more about the plan." target="_blank">More information about the pension plan can be found here</a>',
                    '8' => '<a href="https://www.canada.ca/en/treasury-board-secretariat/services/benefit-plans/disability-insurance-plan/disability-insurance-plan-benefits-glance.html" title="Learn more about disability insurance." target="_blank">Disability insurance</a>',
                    '9' => '<a href="https://www.canada.ca/en/treasury-board-secretariat/topics/benefit-plans/plans/management-insurance-plan.html" title="Learn more about LTD benefits." target="_blank">Public Service Management Insurance Plan</a>',
                ]
            ],
            'post-application' => [
                'title' => 'How You Can Speed Things Up After Applying',
                'hash' => 'post-application',
                'content' => [
                    '0' => [
                        'type' => 'text',
                        'copy' => "All Government of Canada employees are required to pass reliability security checks and many will require secret level clearance. This involves giving fingerprints, having a criminal record check and a credit check. These functions are conducted by authorized security officials in Government (not Talent Cloud).\n\nAll this can take a while.\n\nWant to speed this up?\n\nThere are 2 things you can do:"
                    ],
                    '1' => [
                        'type' => 'ul',
                        'items' => [
                            '0' => "Fill out the papers you'll need to submit in advance",
                            '1' => "If you've lived out of Canada, read below",
                        ]
                    ],
                    '2' => [
                        'type' => 'text',
                        'copy' => "If the job you've applied to requires Reliability Level security, complete the %link0% and then hold onto it. Once complete, don't email it to Talent Cloud until you get asked for it.\n\nIf the job you've applied to requires Secret Level security, you'll need to complete both a %link1% and a %link2%. Once these two forms are complete, don't email them to Talent Cloud until you get asked for them.\n\nIf you've lived outside of Canada for more than six months in a row in the last 5 years (10, if your job requires secret clearance) then you'll need to provide an \"out of country\" criminal record check. This can take a while, as it depends on procedural timelines of the country you've lived in. Applicants can request this \"out of country\" criminal record check at any time, outside of any staffing process. This record is submitted from the applicant to the Government of Canada at the time of security screening. So if you've spent 8 months in South Africa or hung out in the Alps for a year or been at school in Australia, we suggest requesting your records up front. This can save you and your hiring manager a lot of time later. (And if a particular project-based position starts at fixed date, the lack of security clearance in time may force the hiring manager to select another candidate…)"
                    ],
                ],
                'links' => [
                    '0' => '<a href="http://www.tbs-sct.gc.ca/tbsf-fsct/330-23-eng.asp" target="_blank" rel="noopener noreferrer" title="Open the form in a new tab or window.">form found here</a>',
                    '1' => '<a href="http://www.tbs-sct.gc.ca/tbsf-fsct/330-23-eng.asp" target="_blank" rel="noopener noreferrer" title="Open the form in a new tab or window.">Reliability Clearance form</a>',
                    '2' => '<a href="http://www.tbs-sct.gc.ca/tbsf-fsct/330-60-eng.asp" target="_blank" rel="noopener noreferrer" title="Open the form in a new tab or window.">Secret Clearance form</a>',
                ],
            ],
            'skills' => [
                'title' => "How does Talent Cloud's Skill Recognition Model work?",
                'hash' => 'skill-recognition',
                'content' => [
                    '0' => [
                        'type' => 'accordion',
                        'label' => 'Dynamic Skill Records: What the heck is that?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "This is where the magic happens. You're more than a resume and your skills are more than formal credentials. So why shouldn't you be able to show a potential employer how much more? With Talent Cloud's dynamic skill records you can be recognized for your current skills, knowledge and abilities, regardless of how or where you got them. This means that you can claim all of your lived experiences as a way to demonstrate your expertise and what you are capable of. Each time something gets validated it becomes part of your dynamic skills record."
                            ]
                        ]
                    ],
                    '1' => [
                        'type' => 'accordion',
                        'label' => 'Unique life path? No problem!',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "You have a degree? Great. You don't have a degree? Great. We care about what you're capable of. Our dynamic skill recognition method helps you tell us that, no matter what life path you've chosen to get here. While some jobs still require a specific university degree (under Government's Classification standards), Talent Cloud is helping managers develop a broad approach to recognizing skills and equivalencies. The idea is to open up the way Government sees and values experience so that a wider range of Canada's talent can apply to Government work."
                            ]
                        ]
                    ],
                    '2' => [
                        'type' => 'accordion',
                        'label' => "Why bother and what's in it for you?",
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "Recognition: You become the owner of recognized dynamic skill records that reflect your current skills and potential.\n\nCreate Trust: Your dynamic skill records can be trusted by potential employers because they have already been validated.\n\nTime Savings: You save a ton of time when you apply for new opportunities because you can reuse your dynamic skill records."
                            ]
                        ]
                    ],
                    '3' => [
                        'type' => 'accordion',
                        'label' => 'How does it work?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "It's actually really simple!"
                            ],
                            '1' => [
                                'type' => 'ol',
                                'items' => [
                                    '0' => 'Claim: You tell us about a skill you have',
                                    '1' => 'Collect: You send us a work sample that demonstrates your skill',
                                    '2' => 'Corroborate: You choose someone who can act as a micro-reference to support your claim',
                                    '3' => 'Reuse: The next time you apply for a job, you can simply reuse this record - no need to reinvent the wheel each time!',
                                    '4' => 'Evolve: You can add to your dynamic skill records so that they grow over time as you do',
                                ]
                            ]
                        ]
                    ],
                ],
            ],
            'levels' => [
                'title' => 'How do I know what level my skills are at?',
                'hash' => 'levels',
                'content' => [
                    '0' => [
                        'type' => 'title',
                        'hash' => 'levels-model',
                        'copy' => "Talent Cloud's Skills Model"
                    ],
                    '1' => [
                        'type' => 'text',
                        'copy' => "Rather than defining experience by how many years you've done something, Talent Cloud looks at a person's ability to do the job under various conditions of complexity and autonomy. Basically, your level is determined by how challenging a task is, measured against how much help or supervision you require to complete it. This approach acknowledges that people will learn skills at different rates and will show strengths in different ways."
                    ],
                    '2' => [
                        'type' => 'title',
                        'hash' => 'levels-hard-skills',
                        'copy' => 'Find your level: Hard Skills'
                    ],
                    '3' => [
                        'type' => 'accordion',
                        'label' => 'Basic Level',
                        'content' => [
                            '0' => [
                                'type' => 'ul',
                                'items' => [
                                    '0' => "You have the ability to accomplish basic tasks with steady supervision and clear direction. The tasks you're assigned are clear and don't involve significant complexity. Their impact is usually locally felt.",
                                    '1' => 'As you advance in this category, you should be developing the ability to accomplish tasks of moderate complexity with steady supervision. You will also need to be able to accomplish basic tasks with little or no supervision.',
                                    '2' => 'This level is usually associated with tasks that form the bulk of the work for lower level positions, such as junior analysts or entry level developers.',
                                ]
                            ]
                        ]
                    ],
                    '4' => [
                        'type' => 'accordion',
                        'label' => 'Intermediate Level',
                        'content' => [
                            '0' => [
                                'type' => 'ul',
                                'items' => [
                                    '0' => 'You have the ability to accomplish tasks of moderate complexity or moderate impact with supervision. The approach to the tasks, and how they are delivered, is determined by the supervisor. You contribute input and advice. You are able to advance the task, even in the face of small to moderate hurdles and complications.',
                                    '1' => 'As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with steady supervision. You will also need to be able to accomplish tasks of moderate complexity or impact with little or no supervision.',
                                    '2' => 'This level is usually associated with tasks that form the bulk of the work for mid-level positions, such as analysts or developers.',
                                ]
                            ]
                        ]
                    ],
                    '5' => [
                        'type' => 'accordion',
                        'label' => 'Advanced Level',
                        'content' => [
                            '0' => [
                                'type' => 'ul',
                                'items' => [
                                    '0' => "You have the ability to accomplish tasks of significant complexity or impact with supervision. You provide advice and input on the approach to the tasks, and how they are delivered, for the supervisor's consideration. You are able to advance the task, even in the face of moderate to large hurdles and complications.",
                                    '1' => 'As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with only light levels of supervision, where you are effectively the lead on the initiative. You may also take on a role of training others in this skills set or take on a light supervisory role for those at lower levels.',
                                    '2' => 'This level is usually associated with tasks that form the bulk of the work for higher level positions, such as senior analysts or senior developers.',
                                ]
                            ]
                        ]
                    ],
                    '6' => [
                        'type' => 'accordion',
                        'label' => 'Lead Level',
                        'content' => [
                            '0' => [
                                'type' => 'ul',
                                'items' => [
                                    '0' => "You have the ability to accomplish tasks of significant complexity or impact, where you call the shots and answer to the organization's senior management for your decisions. You bring forward the tasks, the approach and the delivery plan for senior management consideration. You often supervise others (individuals or teams) in delivering tasks of high complexity or system wide impact. You are able to advance these tasks, even in the face of significant unforeseen hurdles and complications.",
                                    '1' => 'As you advance in this category, you should be developing the ability to assess others at more junior levels, becoming able to clearly identify the difference between beginner, intermediate and advanced tasks. You should be able to build teams, set direction and provide supervision.',
                                    '2' => 'This level is usually associated with tasks that form the bulk of the work for management and executive level positions.',
                                ]
                            ]
                        ]
                    ],
                    '7' => [
                        'type' => 'title',
                        'hash' => 'levels-soft-skills',
                        'copy' => 'Find your level: Soft Skills'
                    ],
                    '8' => [
                        'type' => 'accordion',
                        'label' => 'In Early Development',
                        'content' => [
                            '0' => [
                                'type' => 'ul',
                                'items' => [
                                    '0' => "You're working on acquiring this skill or attribute. You are able to demonstrate it under favourable conditions (low stress, minimal difficulty) and can apply it in a work context intermittently."
                                ]
                            ]
                        ]
                    ],
                    '9' => [
                        'type' => 'accordion',
                        'label' => 'Moderately in Evidence',
                        'content' => [
                            '0' => [
                                'type' => 'ul',
                                'items' => [
                                    '0' => "You're able to consistently demonstrate this skill or attribute in the workplace, including under conditions of low-to-moderate stress or difficulty.",
                                    '1' => 'Your peers and supervisors are able to attest to the fact that you have been able to demonstrate this skill or attribute on a regular basis.',
                                ]
                            ]
                        ]
                    ],
                    '10' => [
                        'type' => 'accordion',
                        'label' => 'Strongly in Evidence',
                        'content' => [
                            '0' => [
                                'type' => 'ul',
                                'items' => [
                                    '0' => "You're able to consistently demonstrate this skill or attribute in the workplace, including under conditions of high stress or difficulty.",
                                    '1' => 'Your peers and supervisors recognize this as a strength you demonstrate in the workplace.',
                                ]
                            ]
                        ]
                    ],
                    '11' => [
                        'type' => 'accordion',
                        'label' => 'Deep Level Understanding',
                        'content' => [
                            '0' => [
                                'type' => 'ul',
                                'items' => [
                                    '0' => 'This is a foundational part of who you are. You consistently demonstrate this skill or attribute, even under conditions of extreme stress or difficulty.',
                                    '1' => 'Your peers and supervisors recognize this as a significant strength you demonstrate in the workplace, providing an example to others.',
                                ]
                            ]
                        ]
                    ],
                ],
            ],
        ]
    ],
    /* Hiring Manager Content */
    'hiring' => [
        'title' => 'For Hiring Managers',
        'hash' => 'managers',
        'sections' => [
            'keys' => [
                'title' => 'Key Information',
                'hash' => 'manager-key-questions',
                'content' => [
                    '0' => [
                        'type' => 'title',
                        'hash' => 'manager-what',
                        'copy' => 'What is Talent Cloud?'
                    ],
                    '1' => [
                        'type' => 'text',
                        'copy' => "Talent Cloud is an experimental new staffing model for the Government of Canada, focused on bringing in high performing external talent for project-based work. It’s also the world’s first public sector marketplace for the gig economy, structured around next generation workers rights.\n\nTalent Cloud is designed to significantly reduce time to staff, provide optimized applicant-to-team fit, and create a great user experience for everyone involved.\n\nWe’re working with hiring managers as we design the platform to ensure the choices are intuitive and that policies are respected without losing flexibilities where they exist.\n\nThe project is funded by partner departments and hosted by the Office of the Chief Information Officer at the Treasury Board of Canada Secretariat. For the current list of partner departments, %link0%.\n\nWhile anyone can create an account and access the manager tools, only managers from partner departments can post jobs and track applicants on the Talent Cloud site."
                    ],
                    '2' => [
                        'type' => 'title',
                        'hash' => 'manager-why',
                        'copy' => 'Why should managers use Talent Cloud?'
                    ],
                    '3' => [
                        'type' => 'text',
                        'copy' => "One main reason is that managers tell us they really like using the platform and those who’ve hired are thrilled with their candidates. The words “pleasant experience” come up fairly often.\n\nAll jobs posted on Talent Cloud are externally advertised term positions. There are a couple reasons for hiring a term:"
                    ],
                    '4' => [
                        'type' => 'ul',
                        'items' => [
                            '0' => 'Staffing during an election period, when you’re not sure what your budget might be next year',
                            '1' => 'Program funding of limited duration (e.g. fixed term or sunsetting programs)',
                            '2' => 'Special projects (e.g. DM task teams, innovation projects)',
                            '3' => 'A specialist for a particular project phase (e.g. start/early project design - UX tester; mid-project development - programmer; project completion/communication - graphic designer; assessment - project evaluator)'
                        ]
                    ],
                    '5' => [
                        'type' => 'title',
                        'hash' => 'manager-selection',
                        'copy' => 'How does using Talent Cloud speed up the selection process?'
                    ],
                    '6' => [
                        'type' => 'text',
                        'copy' => 'Using Talent Cloud speeds up the section process in several ways:'
                    ],
                    '7' => [
                        'type' => 'ul',
                        'items' => [
                            '0' => 'Smaller, stronger candidate pool. Behavioural design that returns 10-30 applicants that meet all the essential criteria. Managers report being able to do their initial screening in 2-3 hours of time.',
                            '1' => [
                                'copy' => 'Online tools directly on the platform',
                                'items' => [
                                    '0' => 'Job poster builder: Tool that allows managers to craft a poster and manager profile with ease. Process and design that allow managers to get a live poster (translated and HR approved) in 2 days.',
                                    '1' => 'Screening plan builder: Designed to help managers significantly accelerate the timeline for developing assessment plans and ratings guides with HR advisors.',
                                    '2' => 'Applicant tracking tool: Tracking and presentation design that rapidly allows managers to screen applicants who will advance to the next stage of screening. The tool also integrates and displays information like priorities and preferred groups for hires directly on the portal.'
                                ]
                            ]
                        ]
                    ],
                    '8' => [
                        'type' => 'title',
                        'hash' => 'manager-who',
                        'copy' => 'Who can post jobs to Talent Cloud?'
                    ],
                    '9' => [
                        'type' => 'text',
                        'copy' => "Only managers from partner departments can post jobs to Talent Cloud. For the current list of partner departments, %link0%.\n\nIf you are from one of the partner departments, create an account on %link1% and send us an email at %link2%. After we confirm with your department’s HR Superuser, you’ll be able to start using Talent Cloud for your term staffing needs!"
                    ],
                    '10' => [
                        'type' => 'title',
                        'hash' => 'manager-demo',
                        'copy' => 'My department is NOT a Talent Cloud partner, can I still use Talent Cloud?'
                    ],
                    '11' => [
                        'type' => 'text',
                        'copy' => "Starting in October, Talent Cloud will be offering a limited set of tools to all Government of Canada managers. The tools available to these “demo” accounts include the job poster builder and the screening plan builder.\n\nTo create a demo account of your own, go to %link1%.\n\nTalent Cloud is open to new partners. If your department is interested, email us at %link2%."
                    ]
                ],
                'links' => [
                    '0' => "<a href=\"#partners\" title=\"See Talent Cloud's partner departments.\">check out the FAQ section of the Talent Cloud website</a>",
                    '1' => "<a href=\"talent.canada.ca/manager\" title=\"Visit Talent Cloud's manager portal.\">Talent Cloud's manager portal</a>",
                    '2' => '<a href="mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca" title="Send an email to Talent Cloud.">talent.cloud-nuage.de.talents@tbs-sct.gc.ca</a>'
                ]
            ],
            'partners' => [
                'title' => 'Talent Cloud Partner Departments',
                'hash' => 'partners',
                'content' => [
                    '0' => [
                        'type' => 'title',
                        'hash' => 'partners-participating',
                        'copy' => 'What departments are participating in this experimental staffing model?'
                    ],
                    '1' => [
                        'type' => 'text',
                        'copy' => "Talent Cloud is funded through Memorandums of Understanding (MOUs) with partner departments. This isn't a fee for service to staff using the platform. This is a group of departments co-funding an experimental alternative to the traditional HR model. Under this model, only partner departments may staff using Talent Cloud.\n\nPartner departments with signed MOUs are:"
                    ],
                    '2' => [
                        'type' => 'ul',
                        'items' => [
                            '0' => 'Treasury Board Secretariat (host department)',
                            '1' => 'Transport Canada',
                            '2' => 'Global Affairs Canada',
                            '3' => 'Natural Resources Canada',
                            '4' => 'Canada Border Services Agency',
                            '5' => 'Department of National Defense',
                            '6' => 'Shared Services Canada',
                            '7' => 'Health Canada',
                            '8' => 'National Research Council',
                            '9' => 'Employment and Social Development Canada',
                            '10' => 'The Royal Canadian Mounted Police',
                            '11' => 'Public Services and Procurement Canada'
                        ]
                    ]
                ]
            ],
            'tc-usage' => [
                'title' => 'What can managers use Talent Cloud for?',
                'hash' => 'manager-usage',
                'content' => [
                    '0' => [
                        'type' => 'accordion',
                        'label' => 'What type of jobs can managers post on Talent Cloud?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'You can post jobs of any classification and level.'
                            ]
                        ]
                    ],
                    '1' => [
                        'type' => 'accordion',
                        'label' => 'What positions can managers post on Talent Cloud?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'All jobs posted on Talent Cloud are externally advertised term positions. In other words, Talent Cloud cannot be used for indeterminate, casual, assignment, or secondment job posters.'
                            ]
                        ]
                    ],
                    '2' => [
                        'type' => 'accordion',
                        'label' => 'Who is responsible for classification?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'You are required to have a classified position with the corresponding linguistic profile in place before they can post on Talent Cloud. If you don’t have one or have challenges with classification, we can work with you and your HR advisor to explore options.'
                            ]
                        ]
                    ],
                    '3' => [
                        'type' => 'accordion',
                        'label' => 'What should I do if I’m looking to hire multiple complementary positions/a team through Talent Cloud?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Get in touch with the Talent Cloud team if you are looking to hire multiple complementary positions/a team. We’ll work with you and your HR advisor to craft job posters that will capture all the skills sets you are seeking to fill the number of open positions you have.'
                            ]
                        ]
                    ],
                    '4' => [
                        'type' => 'accordion',
                        'label' => 'Why does Talent Cloud only work with externally advertised term positions?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "Managers have told us that there’s an increasing need to hire talent quickly for project-based work, yet the current staffing process for term positions takes as long as the process for indeterminate hires. Many managers have resorted to using casuals or staffing agencies, which do not offer any protection to workers.\n\nTalent Cloud aims to design the term hiring process to be so efficient and easy that this will become the preferred method when managers need to hire someone for a limited period of time.\n\nIf after you make a hire, it turns out to be a good fit and there’s a continual need, we’d be happy to work with you and your HR advisors to explore options."
                            ]
                        ]
                    ],
                    '5' => [
                        'type' => 'accordion',
                        'label' => 'Can indeterminate employees apply to jobs on Talent Cloud?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "As with other externally advertised term positions, public servants are welcome to apply to jobs posted on Talent Cloud. However, indeterminate employees will need to make arrangements with the hiring manager should they become the chosen candidates and wish to protect their indeterminate status. Managers should discuss with their HR advisors to identify available options.\n\nSome positions posted on Talent Cloud have identified public servants as their top candidate, and in these cases, assignment or secondment arrangements have been made."
                            ]
                        ]
                    ],
                    '6' => [
                        'type' => 'accordion',
                        'label' => 'How long can term positions be?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Jobs posted on Talent Cloud typically range from 6 months to 2 years. The term duration can last as long as the %link0% allows. In most cases, this is up to 3 years after which "the department/agency must appoint the employee indeterminately".'
                            ]
                        ]
                    ],
                    '7' => [
                        'type' => 'accordion',
                        'label' => 'How does Talent Cloud handle priority clearance?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "Talent Cloud initiates priority clearance on behalf of the department when the job is ready to be posted.\n\nIf a priority entitled individual expresses an interest in being considered, Talent Cloud will ask the individual to show they are qualified for the position by responding to the job poster on the Talent Cloud website rather than by submitting their resume and a cover letter.\n\nAfter the job is closed, Talent Cloud will ask the manager to assess the priority entitled individual first (and against essential criteria only) before assessing other candidates.\n\nIf the priority entitled individual is found to be not qualified, Talent Cloud will ask the manager for the assessment results in writing and submit feedback on PIMS.\n\nAll priority-related documentation is shared with the HR advisor for their staffing files."
                            ]
                        ]
                    ],
                    '8' => [
                        'type' => 'accordion',
                        'label' => 'Are Talent Cloud jobs posted on GC Jobs (previously jobs.gc.ca)?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "Yes. To meet the policy requirement for externally advertised positions all Talent Cloud jobs are posted on GC Jobs as an alternative recruitment advertisement.\n\nWhen applicants click on an alternative recruitment advertisement on GC jobs, they are redirected to the Talent Cloud portal to complete their application.\n\n%link1%."
                            ]
                        ]
                    ],
                    '9' => [
                        'type' => 'accordion',
                        'label' => 'Does Talent Cloud create pools?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "Yes, but the pools created using Talent Cloud will function a little differently.\n\nWe are currently testing a new type of pool that aims to provide a better experience to both candidates and managers. Candidates will be able to identify which manager will have access to their information, and managers will only be connected with candidates who are genuinely interested in the opportunity.\n\nIf you are interested in trying this new type of pool, get in touch with the Talent Cloud team at %link2%."
                            ]
                        ]
                    ],
                    '10' => [
                        'type' => 'accordion',
                        'label' => 'Can I consider applicants on Talent Cloud for jobs other than the one they applied for?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Yes, the Talent Cloud team can work with you and your HR advisor to see how this can be done.'
                            ]
                        ]
                    ]
                ],
                'links' => [
                    '0' => '<a href="https://www.tbs-sct.gc.ca/pol/doc-eng.aspx?id=12584" title="Learn more about the term employment policy." target="_blank">Term Employment Policy</a>',
                    '1' => '<a href="http://bit.ly/ARAExample" title="See an example of how cross-posting works." target="_blank">Here is an example</a>',
                    '2' => '<a href="mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca" title="Send an email to Talent Cloud." target="_blank">talent.cloud-nuage.de.talents@tbs-sct.gc.ca</a>'
                ]
            ],
            'tc-how' => [
                'title' => 'How Talent Cloud works - Job Poster',
                'hash' => 'manager-how',
                'content' => [
                    '0' => [
                        'type' => 'accordion',
                        'label' => "What is the manager's role in drafting the job poster?",
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "The manager is responsible for drafting the job poster, and Talent Cloud has a tool to help! Using the job poster builder, managers have been able to create a job poster that is tailored to their operational requirements, team culture, and work environment in about an hour.\n\nOnce the manager completes the draft, both their HR advisor and the Talent Cloud team have the chance to provide feedback. With that in hand, the manager finalizes the job poster.\n\nTalent Cloud will translate the finalized version and share the bilingual job poster with both the manager and the HR advisor for the final review before it is posted."
                            ]
                        ]
                    ],
                    '1' => [
                        'type' => 'accordion',
                        'label' => 'Why do Talent Cloud job posters have an Impact Statement?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "Our user research has shown that one of the most common reasons external applicants consider a government job is the positive impact they can have on the lives of Canadians. Many external applicants told us they would be willing to take a pay cut for this type of work.\n\nUser research has also shown that by asking managers to draft an impact statement, it helps them to be more diligent on how the staffing action will serve Canadians."
                            ]
                        ]
                    ],
                    '2' => [
                        'type' => 'accordion',
                        'label' => 'Why does Talent Cloud encourage managers to use the minimum education requirement and the equivalent experience provision in the Qualification Standards?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Recognizing that individuals can build their portfolio of skills in many different ways, using the minimum education requirement and the equivalent experience provision in the %link0% allows managers to access a wider and more diverse talent pool. It also gives applicants with unconventional life / career paths an opportunity to demonstrate how they are qualified for the position, rather than being systematically screening out because they didn’t follow a conventional path.'
                            ]
                        ]
                    ],
                    '3' => [
                        'type' => 'accordion',
                        'label' => 'Why are the essential and asset criteria not grouped into “Experience”, “Knowledge”, “Abilities”, “Personal Suitability”?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'There is %link1% for a job poster. What we’re testing is a competency-based approach to describe the merit criteria, which allows applicants more flexibility to demonstrate how they meet the requirements for the position.'
                            ]
                        ]
                    ],
                    '4' => [
                        'type' => 'accordion',
                        'label' => 'Why is there no mention of “years of experience” in the Talent Cloud job poster?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "The use of experience (biography-based staffing) tends to screen in candidates who follow expected life paths and screen out qualified candidates who have had an unconventional career or education. This has disproportionately disadvantaged applicants from underrepresented groups.\n\nTo help managers access a more diverse pool of talent and focus on what candidates can do rather than where they have worked, Talent Cloud is testing a skills-based staffing model. This approach asks managers to describe the skills and the level that are required to perform the job, without being prescriptive about how the candidate developed those requirements. This allows applicants to use a wide variety of evidence to demonstrate how they meet the requirement."
                            ]
                        ]
                    ],
                    '5' => [
                        'type' => 'accordion',
                        'label' => 'Why do Talent Cloud job posters have information on work environment and manager’s leadership style?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "This is part of Talent Cloud’s design to facilitate a five-factor best-fit. The five factors are applicant, job, manager, operational environment, and team culture. By providing information on the work environment and the manager’s leadership style, it allows applicants to self-assess whether they’ll be a good fit before investing the time and effort to apply for a job.\n\nBecause applicants have the opportunity to self-select themselves out if they perceive themselves to be a bad fit, it also makes the assessment process fast and easier for the manager by reducing the number of poor-fit applicants."
                            ]
                        ]
                    ],
                    '6' => [
                        'type' => 'accordion',
                        'label' => 'Can managers save their job posters and re-use them again?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'All posters are archived in the manager portal. If you would like to reuse any of the previous job posters, the Talent Cloud team can load it up for you manually over the next few months. This will be an automated option next year.'
                            ]
                        ]
                    ]
                ],
                'links' => [
                    '0' => '<a href="https://www.canada.ca/en/treasury-board-secretariat/services/staffing/qualification-standards/core.html" title="Learn more about Qualification Standards." target="_blank">Qualification Standards</a>',
                    '1' => '<a href="https://twitter.com/PSCofCanada/status/1087386962288406529" title="Learn more about job poster formats." target="_blank">no prescribed format</a>',
                ]
            ],
            'tc-assessment' => [
                'title' => 'How Talent Cloud works - Assessment',
                'hash' => 'manager-assessment',
                'content' => [
                    '0' => [
                        'type' => 'accordion',
                        'label' => 'Who is responsible for developing the assessment tools?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => "The manager, with support from their HR advisor, is responsible for developing the assessment tools. That being said, the Talent Cloud team is working with the HR community across the Government of Canada to gather best practices. The Talent Cloud is also collecting tools that have been used by managers hiring through the platform.\n\nUsing these resources and the collective wisdom of the HR community, Talent Cloud is building tools that will make it easier for managers to develop their screening plans and assessment tools."
                            ]
                        ]
                    ],
                    '1' => [
                        'type' => 'accordion',
                        'label' => 'Does Talent Cloud assess candidates?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'No. The Talent Cloud does not participate in candidate assessment. This is the responsibility of the manager and the HR Advisor.'
                            ]
                        ]
                    ],
                    '2' => [
                        'type' => 'accordion',
                        'label' => 'Who is responsible for notifying screened-out candidates?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Talent Cloud has a suite of email templates that managers and their HR advisors can use to notify candidates that have been screened-out of the process. If the manager would like some help, Talent Cloud can also send notification emails to unsuccessful candidates. All emails will be shared with the manager and their HR advisor for their record.'
                            ]
                        ]
                    ],
                    '3' => [
                        'type' => 'accordion',
                        'label' => 'Who is responsible for sending take-home exams / portfolio requests?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Talent Cloud has email templates that managers and their HR advisors can use to send exams and portfolio requests. If the manager would like some help, Talent Cloud can also coordinating these requests. All emails will be shared with the manager and their HR advisor for their record.'
                            ]
                        ]
                    ],
                    '4' => [
                        'type' => 'accordion',
                        'label' => 'Who is responsible for scheduling interviews?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Managers and their HR advisors are responsible for scheduling interviews.'
                            ]
                        ]
                    ],
                    '5' => [
                        'type' => 'accordion',
                        'label' => 'Who is responsible for scheduling second language evaluations?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Managers will need to coordinate with their HR advisors to schedule second language evaluations.'
                            ]
                        ]
                    ],
                    '6' => [
                        'type' => 'accordion',
                        'label' => 'Who is responsible for requesting security clearance?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Managers will need to coordinate with their HR advisors to request security clearance.'
                            ]
                        ]
                    ],
                    '7' => [
                        'type' => 'accordion',
                        'label' => 'Who is responsible for accommodation measures?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Applicants are asked to contact Talent Cloud if they require accommodation. When the Talent Cloud team receives an accommodation request, we will forward the request to the manager and their HR advisors to coordinate the accommodation measure with the candidate.'
                            ]
                        ]
                    ],
                    '8' => [
                        'type' => 'text',
                        'copy' => 'If you have a less frequently asked question send it to %link0% or get in touch with us %link1%'
                    ]
                ],
                'links' => [
                    '0' => '<a href="mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca" title="Send an email to Talent Cloud." target="_blank">talent.cloud-nuage.de.talents@tbs-sct.gc.ca</a>',
                    '1' => '<a href="https://twitter.com/gc_talent" title="Visit Talent Cloud on Twitter." target="_blank">on Twitter @GC_Talent</a>',
                ]
            ],
            'others' => [
                'title' => 'Other Questions',
                'hash' => 'manager-others',
                'content' => [
                    '0' => [
                        'type' => 'accordion',
                        'label' => 'Can I communicate with applicants through the Talent Cloud portal?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'For the time being, communication with applicants will still occur mostly over email.'
                            ]
                        ]
                    ],
                    '1' => [
                        'type' => 'accordion',
                        'label' => 'Can applicants upload official documents (e.g., diplomas, proof of citizenship) to the Talent Cloud portal?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'For the time being, applicants will still need to present official documents in the way you requested them before (i.e. bring a copy in-person or through emails).'
                            ]
                        ]
                    ],
                    '2' => [
                        'type' => 'accordion',
                        'label' => 'When advertising my jobs on other sites, can we link to Talent Cloud directly?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Yes, you can use the Talent Cloud link when promoting the job opportunity on other job search sites.'
                            ]
                        ]
                    ],
                    '3' => [
                        'type' => 'accordion',
                        'label' => 'Our department currently has a job posted on GC Jobs. Is it too late to take advantage of your platform?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'It is possible, but it’ll require extra work for managers. We’d be happy to discuss with you and see what the options are. Get in touch by emailing %link0%.'
                            ]
                        ]
                    ],
                    '4' => [
                        'type' => 'accordion',
                        'label' => 'Can I make changes to my poster when it’s live on Talent Cloud?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'In the spirit of fairness and transparency, we cannot make changes to a job poster when it is live on the Talent Cloud platform. That’s why we work with you and your HR advisor closely throughout the poster drafting process. Both you and your HR advisor will have several opportunities to review the job poster before it goes live.'
                            ]
                        ]
                    ],
                    '5' => [
                        'type' => 'accordion',
                        'label' => 'How long does Talent Cloud keep the applicants information?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'Applications submitted on Talent Cloud are retained for five years. The applications are available to hiring managers on their account.'
                            ]
                        ]
                    ],
                    '6' => [
                        'type' => 'accordion',
                        'label' => 'Is it possible to insert promotional videos of our department directly in the manager’s profile?',
                        'content' => [
                            '0' => [
                                'type' => 'text',
                                'copy' => 'You can’t embed videos into the manager’s profile, but if it’s hosted somewhere else (like YouTube) you can include that link.'
                            ]
                        ]
                    ]
                ],
                'links' => [
                    '0' => '<a href="mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca" title="Send an email to Talent Cloud." target="_blank">talent.cloud-nuage.de.talents@tbs-sct.gc.ca</a>'
                ]
            ]
        ]
    ],
    /* HR Advisor Content */
    'hr' => [
        'title' => 'For HR Advisors',
        'hash' => 'hr',
        'sections' => [
            'coming-soon' => [
                'title' => 'Coming Soon!',
                'hash' => 'hr-coming-soon',
                'content' => [
                    '0' => [
                        'type' => 'text',
                        'copy' => 'HR FAQ content for Talent Cloud is coming soon!'
                    ]
                ]
            ]
        ]
    ]
];
