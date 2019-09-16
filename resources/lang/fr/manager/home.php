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
        'subheading' => 'Une plateforme expérimentale. L’embauche facilitée.',
        'button' => [
            'text' => 'Inscrivez-vous',
            'title' => 'Inscrivez-vous à titre de gestionnaire pour faire l’essai du portail des gestionnaires du Nuage de talents.'
        ]
    ],
    'banner' => [
        'content' => 'Bienvenue au portail des :open gestionnaires :close du Nuage de talents.',
        'anchor' => [
            'text' => 'Cliquez ici pour revenir au portail des candidats.',
            'title' => 'Revenir au portail des candidats.'
        ]
    ],
    'info' => [
        'heading' => 'Quel genre d’emplois puis-je afficher?',
        'content_first' => 'Le Nuage de talents vise les postes de durée déterminée classifiés annoncés à l’externe, plutôt que les emplois contractuels ou occasionnels (qui ne sont habituellement pas assortis d’avantages sociaux, de représentation syndicale ou de droits des travailleurs). Grâce aux processus comportementaux et à l’ingénierie opérationnelle, les travailleurs temporaires peuvent être embauchés rapidement et facilement à l’aide du Nuage de talents, en mettant l’accent sur un jumelage optimal.',
        'content_second' => 'La plateforme peut être utilisée pour des emplois de TOUTE classification et de TOUT niveau.',
        'list_heading' => 'Le Nuage de talents convient parfaitement dans les cas suivants :',
        'list' => [
            'La dotation en période électorale (en cas d’incertitude quant au montant de votre budget de l’année prochaine).',
            'La dotation en période électorale (en cas d’incertitude quant au montant de votre budget de l’année prochaine).',
            'Les projets spéciaux (p. ex., équipes de travail du SM, projets d’innovation).',
            'L’embauche d’un spécialiste pour une phase particulière de projet.'
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
                            'content' => 'Des fonctions comme des paragraphes déjà remplis et des options suggérées selon vos sélections précédentes vous permettent de créer facilement un emploi.'
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
                            'content' => 'Affichez le poste que vous dotez sur le site Web du Nuage de talents et voyez des candidats de grande qualité apparaître sur votre tableau de bord de gestionnaire.'
                        ],
                        [
                            'heading' => 'Suivi des candidats',
                            'content' => 'Triez automatiquement les candidats selon vos critères et faites une sélection préliminaire directement sur la plateforme.'
                        ],
                        [
                            'heading' => 'Soutien personnalisé',
                            'content' => 'Communiquez avec notre équipe en tout temps pour obtenir de l’aide ou des suggestions pendant le processus de dotation.'
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
                    'content' => 'Affichez le poste que vous dotez sur le site Web du Nuage de talents et voyez des candidats de grande qualité apparaître sur votre tableau de bord de gestionnaire.',
                    'demo' => false,
                    'partner' => true
                ],
                [
                    'heading' => 'Suivi des candidats',
                    'content' => 'Triez automatiquement les candidats selon vos critères et sélectionnez-les directement sur la plateforme.',
                    'demo' => false,
                    'partner' => true
                ],
                [
                    'heading' => 'Soutien personnalisé',
                    'content' => 'Communiquez avec notre équipe en tout temps pour obtenir de l’aide ou des suggestions pendant le processus de dotation.',
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
                'content' => 'Êtes-vous membre de l’un de ceux-ci? ',
                'anchor' => [
                    'title' => 'Voir les ministères associés au Nuage de talents.',
                    'text' => 'Ministères partenaires.'
                ]
            ],
            'content_before' => 'Si vous êtes membre,',
            'content_after' => 'pour nous faire savoir que nous devrions mettre votre compte à niveau. Cela vous permettra d’afficher des emplois sur le Nuage de talents, ainsi que de vous procurer toutes les fonctionnalités associées à un compte de ministère partenaire. Pour pouvoir afficher un emploi, vous devrez confirmer que vous avez une case classifiée.',
            'anchor' => [
                'href' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
                'text' => 'communiquer avec le Nuage de talents',
                'title' => 'Envoyer un courriel au Nuage de talents.'
            ]
        ],
        'content_second' => [
            'heading' => 'Pas un membre? Vous pouvez quand même utiliser le Nuage de talents!',
            'content' => 'Si vous n’êtes pas membre d’un ministère partenaire, vous pouvez utiliser le Nuage de talents avec un compte de démonstration pour créer une offre d’emploi et un plan d’évaluation, mais vous ne pourrez pas l’afficher sur le site en direct. Votre offre d’emploi et votre plan d’évaluation devront être intégrés à vos processus de RH. Si ce que vous voyez vous plaît, communiquez avec votre conseiller en RH pour savoir comment vous pouvez vous joindre au projet pilote.'
        ]
    ],
    'steps' => [
        [
            'button' => '1 : Ébauche de l’offre d’emploi',
            'heading' => 'Étape 1 : Rédiger une offre d’emploi',
            'content' => [
                'Utilisez le générateur d’offres d’emploi pour préparer une offre qui informe les candidats de l’impact que leur travail aura sur les Canadiens. Faites-leur connaître qui vous êtes, votre équipe et votre culture de travail afin que vous trouviez quelqu’un qui s’intègre bien à votre équipe. Faites un remue-méninges sur les tâches que votre nouvel employé doit accomplir, puis énumérez les compétences nécessaires pour les accomplir.',
                'Une fois que vous aurez terminé votre offre d’emploi, nous nous occuperons des traductions, nous les enverrons à votre conseiller en RH pour qu’il vous donne des conseils, et nous communiquerons avec le signataire autorisé.',
                'Cette étape est disponible pour les comptes de démonstration.'
            ]
        ],
        [
            'button' => '2 : Plan de présélection',
            'heading' => 'Étape 2 : Créer un plan de présélection',
            'content' => [
                'Élaborez un plan de présélection que vous utiliserez pour évaluer toutes les compétences que vous avez demandées dans votre offre d’emploi. Créez un guide de notation avec les réponses attendues que vous utiliserez pour déterminer si les connaissances d’un candidat correspondent à une compétence particulière. Partagez-le ensuite avec votre conseiller en RH pour qu’il puisse examiner votre plan et suggérer des changements.',
                'Cette étape est disponible pour les comptes de démonstration.'
            ]
        ],
        [
            'button' => '3 : Publication de l’offre d’emploi',
            'heading' => 'Étape 3 : Publication de l’offre d’emploi',
            'content' => [
                'Votre emploi sera affiché dans le Nuage de talents ainsi que dans <a href="https://emploisfp-psjobs.cfp-psc.gc.ca/psrs-srfp/applicant/page2440?fromMenu=true&toggleLanguage=en" title="Pour en savoir plus, visitez Emplois GC." target="_blank">Emplois GC</a>. À mesure que les gens postulent, vous pouvez voir le nombre de postulants augmenter sur votre tableau de bord. Nous traiterons également les autorisations en matière de priorité afin qu’elles soient clairement indiquées dans votre liste de candidats après la clôture de l’offre.',
                'Cette étape n’est disponible que pour les comptes des ministères partenaires.'
            ]
        ],
        [
            'button' => '4 : Présélection',
            'heading' => 'Étape 4 : Présélection des candidats',
            'content' => [
                'Examinez chaque application directement sur la plateforme du Nuage de talents. Suivez votre plan de présélection et évaluez vos candidats. Utilisez l’outil de tri des candidats pour faire le suivi de ceux qui sont encore en processus. Coordonnez-vous avec votre conseiller en RH pour obtenir l’autorisation de sécurité et les tests linguistiques de votre candidat.',
                'Cette étape n’est disponible que pour les comptes des ministères partenaires.'
            ]
        ],
        [
            'button' => '5 : Sélection',
            'heading' => 'Étape 5 : Sélection du candidat final',
            'content' => [
                'Vous avez trouvé le candidat idéal pour votre poste? Il est maintenant temps de travailler avec votre conseiller en RH et le candidat retenu pour recueillir tout ce dont vous avez besoin pour conclure l’embauche. L’outil de compte rendu des décisions qui sera offert bientôt vous permettra de consigner vos justifications au fur et à mesure et de soumettre facilement vos documents aux RH.',
                'Il est temps de leur envoyer une lettre d’offre!',
                'Cette étape n’est disponible que pour les comptes des ministères partenaires.'
            ]
        ]
    ],
    'footer' => [
        'heading' => 'Communiquez avec nous',
        'subheading' => 'Nous aimerions recevoir vos commentaires! Vous voulez nous aider à améliorer la plateforme? Nous sommes toujours à la recherche de commentaires sur la plateforme et de personnes pour tester les nouveaux outils!',
        'email' => [
            'href' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
            'text' => 'Envoyez-nous un courriel.'
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
