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
        'heading' => 'Nuage de talents',
        'heading_alt' => 'Feuille d\'érable canadienne.',
        'subheading' => 'Il est maintenant plus facile d’embaucher pour le gouvernement.',
        'button' => [
            'text' => 'Inscrivez-vous',
            'title' => 'Inscrivez-vous à titre de gestionnaire pour faire l’essai du portail des gestionnaires du Nuage de talents.'
        ]
    ],
    'banner' => [
        'content' => 'Bienvenue au Portail des :open gestionnaires :close du Nuage de talents.',
        'anchor' => [
            'text' => 'Cliquez ici pour revenir au Portail des candidats.',
            'title' => 'Revenir au portail des candidats.'
        ]
    ],
    'info' => [
        'heading' => 'Quel genre d’emploi puis-je afficher?',
        'content_first' => 'Le Nuage de talents vise les postes de durée déterminée classifiés qui sont annoncés à l’externe, plutôt que les emplois contractuels ou occasionnels (qui ne sont habituellement pas assortis d’avantages sociaux ou de représentation syndicale). Grâce aux processus comportementaux et à l’ingénierie opérationnelle, les travailleurs temporaires peuvent être embauchés rapidement et facilement à l’aide du Nuage de talents, en mettant l’accent sur un jumelage optimal.',
        'content_second' => 'La plateforme peut être utilisée pour des emplois de TOUTE classification et de TOUT niveau.',
        'list_heading' => 'L’embauche pour une période déterminée convient parfaitement aux cas suivants :',
        'list' => [
            'Remplacement des employés en congé.',
            'Programmes arrivant à échéance ou cas où le budget du prochain exercice n’est pas clair.',
            'Les projets spéciaux (p. ex., équipes de travail des SM, projets d’innovation).',
            'Embauche d’un spécialiste pour une phase particulière de projet.'
        ]
    ],
    'features' => [
        'heading' => 'Fonctions disponibles',
        'mobile_table' => [
            'columns' => [
                'demo_features' => [
                    'heading' => 'Fonctions du compte de démonstration',
                    'subheading' => [
                        'content' => 'Vous :open ne travaillez pas :close dans un ministère qui est :link au Nuage de talents.',
                        'anchor' => [
                            'text' => 'associé',
                            'title' => 'Voir les ministères associés au Nuage de talents.'
                        ]
                    ],
                    'rows' => [
                        'poster_creation' => [
                            'heading' => 'Création d’offres d’emploi',
                            'content' => 'Créez une affiche d’emploi plus facilement en utilisant les fonctions du Nuage de talents, comme des paragraphes préremplis et des options suggérées en fonction de vos sélections précédentes.'
                        ],
                        'screening_plan' => [
                            'heading' => 'Plan de présélection',
                            'content' => 'Élaborez un plan que vous utiliserez pour évaluer toutes les compétences que vous avez demandées dans votre offre d’emploi. Examinez-le avec votre conseiller en RH.'
                        ],
                        'manager_profile' => [
                            'heading' => 'Profil du gestionnaire',
                            'content' => 'Créez un profil qui permet aux candidats de mieux vous connaître.'
                        ]
                    ]
                ],
                'partner_features' => [
                    'heading' => 'Fonctions des comptes des ministères partenaires',
                    'subheading' => [
                        'content' => 'Vous travaillez dans un ministère qui est :link au Nuage de talents.',
                        'anchor' => [
                            'text' => 'associé',
                            'title' => 'Voir les ministères associés au Nuage de talents.'
                        ]
                    ],
                    'rows' => [
                        [
                            'heading' => 'Toutes les fonctionnalités du compte de démonstration, plus :'
                        ],
                        [
                            'heading' => 'Affichage d’un emploi',
                            'content' => 'Affichez le poste que vous dotez à partir du site Web du Nuage de talents et voyez des candidats de grande qualité apparaître sur votre tableau de bord de gestionnaire.'
                        ],
                        [
                            'heading' => 'Suivi des candidats',
                            'content' => 'Triez automatiquement les candidats selon vos critères, et sélectionnez-les directement à partir de la plateforme.'
                        ],
                        [
                            'heading' => 'Soutien personnalisé',
                            'content' => 'Communiquez avec notre équipe en tout temps pour obtenir de l’aide ou des suggestions tout au long du processus de dotation'
                        ],
                        [
                            'heading' => [
                                'content' => 'Compte rendu des décisions pour les RH',
                                'tag' => 'À venir bientôt!'
                            ],
                            'content' => 'Présélectionnez les candidats, prenez des notes et consignez les décisions au fur et à mesure, et envoyez facilement vos documents aux RH.'
                        ]
                    ]
                ]
            ],
        ],
        'table' => [
            'columns' => [
                'features' => [
                    'heading' => 'Fonctionnalités'
                ],
                'demo_account' => [
                    'heading' => 'Compte de démonstration',
                    'subheading' => [
                        'content' => 'Vous :open ne travaillez pas :close dans un ministère qui est :link au Nuage de talents.',
                        'anchor' => [
                            'text' => 'associé',
                            'title' => 'Voir les ministères associés au Nuage de talents.'
                        ]
                    ]
                ],
                'partner_account' => [
                    'heading' => 'Ministères partenaires',
                    'subheading' => [
                        'content' => 'Vous travaillez dans un ministère qui est :link au Nuage de talents.',
                        'anchor' => [
                            'text' => 'associé',
                            'title' => 'Voir les ministères associés au Nuage de talents.'
                        ]
                    ]
                ]
            ],
            'rows' => [
                [
                    'heading' => 'Création d’offres d’emploi',
                    'content' => 'Des fonctions comme des paragraphes déjà remplis et des options suggérées selon vos sélections précédentes vous permettent de créer facilement une offre emploi.',
                    'demo' => true,
                    'partner' => true
                ],
                [
                    'heading' => 'Plan de présélection',
                    'content' => 'Élaborez un plan que vous utiliserez pour évaluer toutes les compétences que vous avez demandées dans votre offre d’emploi. Examinez-le avec votre conseiller en RH.',
                    'demo' => true,
                    'partner' => true
                ],
                [
                    'heading' => 'Profil du gestionnaire',
                    'content' => 'Créez un profil qui permet aux candidats de mieux vous connaître.',
                    'demo' => true,
                    'partner' => true
                ],
                [
                    'heading' => 'Affichage d’un emploi',
                    'content' => 'Affichez le poste que vous dotez à partir du site Web du Nuage de talents et voyez des candidats de grande qualité apparaître sur votre tableau de bord de gestionnaire.',
                    'demo' => false,
                    'partner' => true
                ],
                [
                    'heading' => 'Suivi des candidats',
                    'content' => 'Triez automatiquement les candidats selon vos critères, et sélectionnez-les directement à partir de la plateforme.',
                    'demo' => false,
                    'partner' => true
                ],
                [
                    'heading' => 'Soutien personnalisé',
                    'content' => 'Communiquez avec notre équipe en tout temps pour obtenir de l’aide ou des suggestions tout au long du processus de dotation.',
                    'demo' => false,
                    'partner' => true
                ],
                [
                    'heading' => [
                        'content' => 'Compte rendu des décisions pour les RH',
                        'tag' => 'À venir bientôt!'
                    ],
                    'content' => 'Présélectionnez les candidats, prenez des notes et consignez les décisions au fur et à mesure, et envoyez facilement vos documents aux RH.',
                    'demo' => false,
                    'partner' => true
                ]
            ]
        ]
    ],
    'lower_info' => [
        'heading' => 'Comment puis-je afficher un emploi?',
        'content_first' => [
            'heading' => [
                'content' => 'Êtes-vous membre de l’un de ces',
                'anchor' => [
                    'title' => 'Voir les ministères associés au Nuage de talents.',
                    'text' => 'ministères partenaires'
                ]
            ],
            'content_before' => 'Si vous êtes membre,',
            'content_after' => 'pour nous faire savoir que nous devrions mettre votre compte à niveau. Cela vous permettra d’afficher des emplois dans le Nuage de talents, ainsi que de vous procurer toutes les fonctionnalités associées à un compte de ministère partenaire. Pour pouvoir afficher un emploi, vous devrez confirmer que vous avez une case classifiée.',
            'anchor' => [
                'href' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
                'text' => 'communiquer avec le Nuage de talents',
                'title' => 'Envoyer un courriel au Nuage de talents.'
            ]
        ],
        'content_second' => [
            'heading' => 'Vous n’êtes pas membre? Vous pouvez quand même utiliser le Nuage de talents!',
            'content' => 'Si vous n’êtes pas membre d’un ministère partenaire, vous pouvez utiliser le Nuage de talents avec un compte de démonstration pour créer une offre d’emploi et un plan d’évaluation, mais vous ne pourrez pas l’afficher à partir du site en direct. Votre offre d’emploi et votre plan d’évaluation devront être intégrés aux processus des RH. Si vous aimez ce que vous voyez, veuillez communiquer avec votre conseiller en RH pour savoir comment vous pouvez vous joindre au projet-pilote.'
        ]
    ],
    'steps' => [
        [
            'button' => '1 : Ébauche de l’offre d’emploi',
            'heading' => 'Étape 1 : Rédiger une offre d’emploi',
            'content' => [
                'Utilisez le générateur d’offres d’emploi pour préparer une offre qui informera les candidats de l’incidence que leur travail aura sur les Canadiens. Laissez-leur savoir qui vous êtes, de même que votre équipe et votre culture de travail, afin que vous puissiez trouvez quelqu’un qui s’intègrera bien à votre équipe. Faites un remue-méninges sur les tâches que votre nouvel employé devra accomplir, puis énumérez les compétences nécessaires pour y parvenir.',
                'Une fois que vous aurez terminé votre offre d’emploi, nous nous occuperons de la faire traduire, puis nous l’enverrons à votre conseiller en RH pour qu’il vous donne des conseils, et nous communiquerons avec le signataire autorisé.',
                'Cette étape est disponible pour les comptes de démonstration.'
            ]
        ],
        [
            'button' => '2 : Plan de présélection',
            'heading' => 'Étape 2 : Créer un plan de présélection',
            'content' => [
                'Élaborez un plan de présélection que vous utiliserez pour évaluer toutes les compétences que vous avez demandées dans le cadre de votre offre d’emploi. Créez un guide de notation avec les réponses escomptées que vous utiliserez pour déterminer si les connaissances d’un candidat correspondent à une compétence en particulier. Partagez-le ensuite avec votre conseiller en RH pour qu’il puisse examiner votre plan et proposer des changements.',
                'Cette étape est disponible pour les comptes de démonstration.'
            ]
        ],
        [
            'button' => '3 : Publication de l’offre d’emploi',
            'heading' => 'Étape 3 : Publication de l’offre d’emploi',
            'content' => [
                'Votre emploi sera affiché dans le Nuage de talents ainsi que dans <a href="https://emploisfp-psjobs.cfp-psc.gc.ca/psrs-srfp/applicant/page2440?fromMenu=true&toggleLanguage=en" title="Pour en savoir plus, visitez Emplois GC." target="_blank">Emplois GC</a>. À mesure que les gens postulent, vous pouvez voir le nombre de postulants augmenter à partir de votre tableau de bord. Nous traiterons également les autorisations en matière de priorité afin qu’elles soient clairement indiquées dans votre liste de candidats après la date de clôture de l’offre.',
                'Cette étape n’est disponible que pour les comptes des ministères partenaires.'
            ]
        ],
        [
            'button' => '4: Évaluer les candidats',
            'heading' => 'Étape 4: Évaluer les candidats',
            'content' => [
                'Examinez chaque application directement à partir de la plateforme du Nuage de talents. Suivez votre plan de présélection et évaluez vos candidats. Utilisez l’outil de tri des candidats pour effectuer un suivi de ceux qui figurent toujours dans le cadre du processus. Veuillez communiquer avec votre conseiller en RH pour obtenir une copie de l’autorisation de sécurité et les tests linguistiques de votre candidat.',
                'Cette étape n’est disponible que pour les comptes des ministères partenaires.'
            ]
        ],
        [
            'button' => '5: Finaliser',
            'heading' => 'Étape 5 : Sélection finale du candidat',
            'content' => [
                'Vous avez trouvé le candidat idéal pour votre poste? Il est maintenant temps de travailler avec votre conseiller en RH et le candidat retenu pour recueillir tout ce dont vous aurez besoin pour conclure le processus d’embauche. L’outil de compte rendu des décisions qui sera bientôt offert vous permettra de consigner vos justifications au fur et à mesure, et de soumettre facilement vos documents aux RH.',
                'Il est temps de leur envoyer une lettre d’offre!',
                'Cette étape n’est disponible que pour les comptes des ministères partenaires.'
            ]
        ]
    ],
    'footer' => [
        'heading' => 'Communiquez avec nous',
        'subheading' => 'Nous aimerions que vous nous fassiez part de vos commentaires! Vous aimeriez nous aider à améliorer la plateforme? Nous sommes toujours à la recherche de commentaires sur la plateforme et de personnes pour tester les nouveaux outils!',
        'email' => [
            'href' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
            'text' => 'Envoyez-nous un courriel.'
        ],
        'gccollab' => [
            'href' => 'https://gccollab.ca/groups/profile/19750/talent-cloud-nuage-de-talent',
            'text' => ' GCcollab'
        ],
        'twitter' => [
            'href' => 'https://twitter.com/gc_talent?lang=fr',
            'text' => 'Twitter'
        ]
    ]
];
