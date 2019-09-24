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
    "title" => "Nuage de talents : mode d'emploi",
    "faq_title" => "Nuage de talents FAQ",
    "breadcrumbs" => [
        "home" => [
            "title" => "Retour à la page d'accueil.",
            "text" => "Accueil"
        ],
        "faq" => [
            "text" => "FAQ"
        ]
    ],
    "sidebar" => [
        "users" => [
            "applicants" => "For Applicants",
            "managers" => "For Managers",
            "hr" => "For HR Advisors",
        ],
    ],
    "accordion" => [
        "expand" => "Cliquez ici pour voir ce contenu ..."
    ],
    /* Applicant Content */
    "applicants" => [
        "title" => "For Applicants",
        "hash" => "applicants",
        "sections" => [
            "know" => [
                "title" => "Choses à savoir",
                "hash" => "to-know",
                "content" => [
                    "0" => [
                        "type" => "accordion",
                        "label" => "Pourquoi le Canada a-t-il besoin d'une plateforme pour le travail axé sur les projets?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Au XXe siècle, la plupart des travailleurs se classaient dans deux catégories : les travailleurs permanents(qui « appartenaient » à l'organisation, mais qui avaient des avantages sociaux); ou à contrat (travailleurs autonomes sans avantages sociaux). Internet a débloqué de nouvelles économies, ainsi qu'une augmentation de l'emploi axé sur des projets ou de l'emploi non traditionnel. Parfois appelé « emploi à la demande », cette nouvelle catégorie de travail représente maintenant près de 30 % de l'emploi au Canada et aux États-Unis, avec des tendances semblables en Europe. Malgré ce changement radical, les gouvernements n'ont pas adapté leurs modèles d'embauche.\n\nPour sortir des vieilles dualités, le Nuage de talents met à l'essai l'introduction d'une troisième catégorie de travailleurs, à savoir un employé à la demande, sur un cheminement de carrière autodirigé et à mobilité élevée, mais avec les droits et avantages qui ont traditionnellement été réservés aux employés permanents. Pour que cela fonctionne, les demandeurs ont besoin d'une plateforme qui leur permet de trouver des possibilités et de démontrer facilement leur valeur, et les gestionnaires ont besoin d'un modèle de dotation optimisé pour l'ère numérique. Bien que le gouvernement du Canada ait des travailleurs « temporaires » depuis longtemps, il s'agit du premier modèle de talent du secteur public créé pour permettre un marché florissant pour le travail axé sur des projets."
                            ]
                        ]
                    ],
                    "1" => [
                        "type" => "accordion",
                        "label" => "Qui peut présenter une demande?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "N'importe qui dans le monde peut postuler au moyen du Nuage de talents. Tous les emplois à cette étape du projet sont ouverts au public et publiés de façon concurrentielle.\n\nEn vertu des politiques de dotation du gouvernement du Canada, les anciens combattants canadiens et les citoyens canadiens auront la préférence en matière de dotation(dans le jargon non gouvernemental, cela signifie que si vous êtes résident(e) permanent(e) ou non canadien(ne), votre demande sera prise en considération si aucun citoyen canadien qualifié ne pose sa candidature au poste… et il y aura ensuite des formalités supplémentaires)."
                            ]
                        ]
                    ],
                    "2" => [
                        "type" => "accordion",
                        "label" => "Quels types d'emplois seront publiés?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Tous les emplois publiés dans le Nuage de talents pendant le projet-pilote sont des postes pour une période déterminée. Cela signifie que vous êtes un(e) employé(e) du gouvernement du Canada pour la durée de votre contrat et que vous pouvez commencer à accumuler des prestations après trois mois et une pension après six mois d'emploi continu. Il est possible de prendre des mandats séquentiels et de les jumeler à un emploi continu au sein du gouvernement du Canada, tout en entreprenant différents projets dans différents ministères, si vous le souhaitez. Pour la plupart des ministères, les postes à durée déterminée peuvent être prolongés jusqu’à trois ans à la discrétion du gestionnaire et de son organisation. Après trois ans au même poste, les employés nommés pour une période déterminée deviennent des employés nommés pour une période indéterminée (permanente), sauf dans des circonstances exceptionnelles.\n\nLe Nuage de talents a commencé par offrir des emplois liés au numérique, à la technologie, et à l'expérience de l'utilisateur. Pensez à des postes comme « scientifique des données », « programmeur », « gestionnaire de projet technique », et « concepteur de l'expérience utilisateur ».\n\nDepuis lors, nous avons lancé des volets de dotation dans les postes administratifs et les ressources humaines(RH). Ensuite, nous élargirons notre champ d'action pour y inclure les postes en matière de politiques, de gestion de projets et d'approvisionnement, que nous prévoyons publier plus tard ce printemps."
                            ]
                        ]
                    ],
                    "3" => [
                        "type" => "accordion",
                        "label" => "Pourquoi y a-t-il si peu d'emplois publiés dans le Nuage de talents?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "En tout temps, le Nuage de talents devrait publier de deux à trois postes. Il est également possible que le site doive fermer le lundi matin de temps à autre. Nous sommes une petite équipe qui travaille à un budget restreint sur une idée hautement expérimentale. La publication de quelques emplois à la fois est donc la meilleure façon pour nous de recueillir des données de qualité pour savoir si la plateforme fonctionne comme il se doit, tout en offrant ce que nous espérons être une expérience de qualité aux candidats, aux gestionnaires d'embauche et aux conseillers ministériels en RH."
                            ]
                        ]
                    ],
                    "4" => [
                        "type" => "accordion",
                        "label" => "À quoi puis-je m'attendre dans le processus de demande et de sélection?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Le Nuage de talents travaille à l'élaboration d'une expérience d'embauche de 30 jours de l'annonce d'emploi à la lettre d'offre. Nous sommes actuellement en train de mettre à l'essai le projet. Donc, en ce moment, les candidats doivent s'attendre à recevoir des nouvelles au sujet de leur demande initiale dans les deux semaines suivant la fermeture de l'annonce d'emploi. Pour ceux qui passent l'étape de la présélection initiale dans un poste qui a été annoncé comme étant bilingue, il faut s'attendre à des tests de langue tôt dans le processus (si vous n'avez jamais passé d'examen linguistique auprès du gouvernement du Canada auparavant, vous voudrez peut-être essayer ces %link0% pour avoir une idée de la nature des tests).\n\nVous pouvez également vous attendre à d'autres approches d'évaluation et de mise à l'essai tout au long du processus qui sont plus informelles et conçues pour dépister d'autres compétences, mettre à l'essai le bon ajustement à l'équipe et la capacité globale. Le Nuage de talents encourage les gestionnaires à appliquer une approche de sélection « optimale dans l'ensemble » plutôt que de « présélectionner quelques candidats à chaque étape ».\n\nTous les employés du gouvernement du Canada sont tenus de réussir les vérifications de la fiabilité, et bon nombre d'entre eux devront obtenir une autorisation de niveau secret. Il s'agit de donner des empreintes digitales, ainsi que de faire vérifier son casier judiciaire et son crédit. Ces fonctions sont exercées par des agents de sécurité autorisés au gouvernement (et non par le Nuage de talents).\n\nSi vous avez vécu à l'extérieur du Canada pendant plus de six mois consécutifs au cours des cinq dernières années(dix ans, si votre emploi exige une cote de sécurité de niveau secret), vous devrez être soumis(e) à une vérification du casier judiciaire « à l'extérieur du pays ». Cela peut prendre un certain temps, car cela dépend des délais de traitement du pays où vous avez vécu. Les demandeurs peuvent demander cette vérification du casier judiciaire « à l'extérieur du pays » en tout temps, et la demande n'a pas besoin d'être liée à un processus de dotation. Ce dossier est présenté par le demandeur au gouvernement du Canada au moment du contrôle de sécurité. Donc, si vous avez passé huit mois en Afrique du Sud ou avez été dans les Alpes pendant un an ou à l'école en Australie, nous vous suggérons de demander vos dossiers dès le départ. Cela peut vous faire gagner beaucoup de temps, à vous et à votre gestionnaire d'embauche, plus tard(et si un poste axé sur un projet en particulier commence à une date fixe, le manque d'autorisation de sécurité à temps peut forcer le gestionnaire d'embauche à sélectionner un autre candidat)."
                            ]
                        ]
                    ],
                    "5" => [
                        "type" => "accordion",
                        "label" => "Comment décider si je dois postuler ou non?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "L'idée d'un emploi au gouvernement peut être très attrayante. Cela amène beaucoup de gens à postuler pour beaucoup d'emplois pour lesquels ils ne sont pas qualifiés ou des emplois qu'ils n'accepteraient pas s'ils en savaient davantage sur le poste au départ. Toutes ces candidatures supplémentaires bloquent le système et ralentissent douloureusement la dotation en personnel.\n\nLe Nuage de talents communique beaucoup plus d'information aux candidats au sujet du poste et au gestionnaire d'embauche pour aider les candidats à prendre part à la discussion sur le choix de la bonne personne. Si un poste exige de la collaboration et que vous préférez travailler seul, ce n'est peut-être pas bon pour vous. Si un poste est occupé à un rythme rapide et que vous aimez prendre de votre temps pour accomplir les tâches, envisagez plutôt de poser votre candidature pour un autre poste dans le Nuage de talents.\n\nLisez les sections sur la culture d'équipe, le milieu de travail et le gestionnaire d'embauche. Réfléchissez sérieusement à la question de savoir si vous seriez un bon candidat. Assurez-vous de chercher et de postuler à des emplois qui vous combleront et dans un environnement opérationnel qui vous aidera à vous épanouir afin que vous puissiez donner le meilleur de vous-même à l'équipe et au projet chaque jour!"
                            ]
                        ]
                    ],
                    "6" => [
                        "type" => "accordion",
                        "label" => "S'agit-il d'un marché pour les nominations à un poste occasionnel?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Au gouvernement, une « nomination occasionnelle » désigne un poste d'une durée de 90 jours qui peut être accordée à un travailleur au mérite sans concours. Ceux qui occupent des postes occasionnels n'ont pas droit à une pension ou à des avantages sociaux et ne peuvent occuper qu'un poste occasionnel par année dans un ministère. Certains travailleurs cumulent les emplois du gouvernement en prenant une série d'emplois occasionnels au cours de l'année. En raison de l'engagement du Nuage de talents à faire avancer les droits et les avantages sociaux des travailleurs, les nominations occasionnelles ne sont pas permises sur la plateforme."
                            ]
                        ]
                    ]
                ],
                "links" => [
                    "0" => "<a href=\"https://www.canada.ca/fr/commission-fonction-publique/services/evaluation-langue-seconde/tests-autoevaluation.html\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"Ouvrir les tests\">tests d'autoévaluation</a>"
                ]
            ],
            "partners" => [
                "title" => "Les ministères partenaires du Nuage de talents",
                "hash" => "partners",
                "content" => [
                    "0" => [
                        "type" => "title",
                        "hash" => "partners-participating",
                        "copy" => "Quels ministères participent à ce modèle de dotation expérimental?"
                    ],
                    "1" => [
                        "type" => "text",
                        "copy" => "Le Nuage de talents est financé par des protocoles d'entente (PE) avec les ministères partenaires. Il ne s'agit pas de frais de service pour le personnel qui utilise la plateforme. Il s'agit d'un groupe de ministères qui cofinancent une solution de rechange expérimentale au modèle traditionnel des RH. Selon ce modèle, seuls les ministères partenaires peuvent embaucher du personnel à l'aide du Nuage de talents.\n\nLes ministères partenaires qui ont signé des PE sont les suivants :"
                    ],
                    "2" => [
                        "type" => "ul",
                        "items" => [
                            "0" => "Secrétariat du Conseil du Trésor (ministère hôte)",
                            "1" => "Transports Canada",
                            "2" => "Affaires mondiales Canada",
                            "3" => "Ressources naturelles Canada",
                            "4" => "Agence des services frontaliers du Canada",
                            "5" => "Ministère de la Défense nationale",
                            "6" => "Services partagés Canada",
                            "7" => "Santé Canada",
                            "8" => "Conseil national de recherches Canada",
                        ]
                    ]
                ]
            ],
            "benefits" => [
                "title" => "Avantages sociaux des employés",
                "hash" => "benefits",
                "content" => [
                    "0" => [
                        "type" => "text",
                        "copy" => "Lorsque vous songez à l’endroit où postuler pour un emploi, il y a plusieurs facteurs à prendre en considération. Le salaire, l’endroit, la compatibilité et la passion pour le travail sont tous importants. Un autre facteur extrêmement important, ce sont les avantages sociaux offerts aux employés. Malheureusement, si vous faites partie des 30 % estimés d’employés canadiens qui travaillent dans l’économie à la demande, vous travaillez probablement sans ce filet de sécurité. Un grand nombre de ces travailleurs sont ici, au gouvernement du Canada (l’un des plus importants employeurs de travailleurs de la fonction publique au pays), et ce qui est formidable, c’est que si vous occupez un poste de durée déterminée, vous pouvez bénéficier de plusieurs des mêmes avantages que les employés nommés pour une période indéterminée.\n\nTous les postes affichés dans le Nuage de talents sont des postes à durée déterminée. Cela signifie que vous êtes un employé du gouvernement du Canada pendant la durée de votre contrat. Les postes de durée déterminée offrent des congés payés et des congés annuels et vous garantissent une protection en rendant certains avantages sociaux obligatoires. L’information ci-dessous s’appliquera à la plupart des postes affichés sur le nuage de talents, mais nous recommandons de demander au gestionnaire responsable de l’embauche ou d’utiliser les deux premières lettres de la classification du gouvernement sur les avis d’emplois pour trouver la %link0% correspondant au poste. De plus, vous pouvez toujours trouver plus d’information sur les régimes de pension et d’avantages sociaux de la fonction publique à l’adresse %link1%."
                    ],
                    "1" => [
                        "type" => "title",
                        "hash" => "benefits-breakdown",
                        "copy" => "Voici ce à quoi vous pouvez vous attendre ..."
                    ],
                    "2" => [
                        "type" => "accordion",
                        "label" => "Jours fériés payés",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Vous avez droit à 11 jours fériés désignés payés. Les voici : Le jour de l’An, le Vendredi saint, le lundi de Pâques, la fête de la Reine, la fête du Canada, la fête du Travail, l’Action de grâces, le jour du Souvenir, le jour de Noël, le lendemain de Noël et un jour férié provincial ou municipal dans la région où vous travaillez (par exemple, congé civil du mois d’août). Travailleurs à distance prenez note, cela dépend de l’emplacement du bureau officiel de votre équipe et non celui où vous faites votre travail."
                            ]
                        ]
                    ],
                    "3" => [
                        "type" => "accordion",
                        "label" => "Congés payés",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "En plus des jours fériés payés, vous avez accès à plusieurs autres types de congés payés. Voici quelques-uns des plus couramment utilisés.\n\nVacances : Vous accumulerez 1,25 jour de vacances par mois, ce qui équivaut à trois semaines par année. Pour les six premiers mois, vous ne pouvez utiliser que les jours de vacances que vous avez accumulés. Par la suite, vous pouvez commencer à utiliser les jours de vacances prévus pour le reste de l’année.\n\nCongé de maladie : Vous accumulerez 1,25 jour de congé de maladie payé par mois, ce qui équivaut à trois semaines par année, mais vous pouvez quand même prendre des congés de maladie payés même si vous n’avez pas encore accumulé les journées (conditionnel à l’approbation de votre gestionnaire).\n\nCongé familial : Vous pouvez prendre jusqu’à cinq jours par année pour vous occuper de vos responsabilités familiales. Cela couvre des situations comme la fermeture inattendue d’une école ou d’une garderie, des activités scolaires ou des soins à un membre de la famille malade ou âgé.\n\nCongé personnel : Vous pouvez prendre jusqu’à deux jours par année pour vous occuper de vos affaires personnelles."
                            ]
                        ]
                    ],
                    "4" => [
                        "type" => "accordion",
                        "label" => "Soins de santé",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Vous pouvez immédiatement faire une demande au titre du %link2% (RSSFP) si la durée initiale de votre poste de durée déterminée est de plus de six mois. Pour la plupart des produits et services de soins de santé admissibles, comme les médicaments sur ordonnance, les soins de la vue, les services d’un médecin et les soins dentaires d’urgence, le régime couvre 80 % des frais admissibles, avec certains plafonds précis, après avoir bénéficié de prestations offertes par votre régime provincial ou territorial d’assurance-santé ou toute autre source d’aide médicale à laquelle vous êtes admissible.\n\nVous devez présenter une demande pour vous inscrire. %link3%."
                            ]
                        ]
                    ],
                    "5" => [
                        "type" => "accordion",
                        "label" => "Soins dentaires",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Le %link4% (RSDFP) est entièrement payé par l’employeur et couvre 90 % des services de base et 50 % des principaux services et services orthodontiques. Si la durée initiale de votre poste de durée déterminée est de plus de six mois et que vous travaillez en moyenne plus de 12,5 heures par semaine, l’admissibilité au RSDFP commence immédiatement et la protection commence après une période d’attente de trois mois. Cela signifie que trois mois après le début de votre mandat, vous pouvez commencer à utiliser le régime de soins dentaires.\n\nAucun formulaire de demande n’est requis. %link5%."
                            ]
                        ]
                    ],
                    "6" => [
                        "type" => "accordion",
                        "label" => "Régime de pension de retraite",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Si votre poste est d’une durée de plus de six mois, la bonne nouvelle est que vous êtes admissible à participer au %link6% à compter de votre premier jour de travail. Le gouvernement du Canada et les membres du régime contribuent à ce régime à prestations déterminées à parts égales. Le montant déduit de votre paye variera selon votre salaire. Les prestations de pension sont fondées sur le salaire moyen et les années de service ouvrant droit à pension. %link7%."
                            ]
                        ]
                    ],
                    "7" => [
                        "type" => "accordion",
                        "label" => "Régime d’assurance-invalidité",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "%link8% est obligatoire pour tous les employés qui occupent un poste syndiqué. Les cotisations sont payées à 85 % par l’employeur. Si vous n’êtes pas en mesure de travailler pour des périodes prolongées en raison d’une maladie ou d’une blessure qui vous rend complètement invalide, cette prestation vous verse 70 % de votre salaire mensuel après 13 semaines à partir de la date d’invalidité ou de l’épuisement de tous vos congés de maladie payés, selon laquelle des deux périodes est la plus longue.\n\nSi la durée initiale de votre poste de durée déterminée est de plus de six mois et que vous travaillez en moyenne plus de 12,5 heures par semaine, la protection commence le premier jour."
                            ]
                        ]
                    ],
                    "8" => [
                        "type" => "accordion",
                        "label" => "Assurance-invalidité de longue durée (AILD)",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "L'assurance-invalidité de longue durée sous le %link9% est obligatoire pour tous les employés qui occupent des postes exclus ou non représentés. Les cotisations sont payées à 85 % par l’employeur. Si vous n’êtes pas en mesure de travailler pour des périodes prolongées en raison d’une maladie ou d’une blessure qui vous rend complètement invalide, cette prestation vous verse 70 % de votre salaire mensuel après 13 semaines à partir de la date d’invalidité ou de l’épuisement de tous vos congés de maladie payés, selon laquelle des deux périodes est la plus longue.\n\nSi la durée initiale de votre poste de durée déterminée est de six mois et que vous travaillez en moyenne plus de 12,5 heures par semaine, la protection commence le premier jour."
                            ]
                        ]
                    ],
                    "9" => [
                        "type" => "accordion",
                        "label" => "Exceptions pour les employés de retour au travail",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Passer d’un emploi à l’autre au gouvernement fédéral? Si la durée de votre période d’emploi initiale est de moins de six mois, mais est prolongée ou si vous commencez un autre emploi d’une durée déterminée et que vous n’avez pas connu une interruption de service trop long, vous avez peut-être droit aux soins de santé, soins dentaires, et assurance--invalidité et congé d’invalidité de longue durée. Examinez de plus près les liens fournis ci-dessus ou demandez au gestionnaire d'embauche de voir si vous êtes éligible."
                            ]
                        ]
                    ],
                    "10" => [
                        "type" => "text",
                        "copy" => "Le sommaire ci-dessus est à titre d’information seulement et ne constitue pas un document juridique sur vos droits et vos obligations. En cas de divergence entre les renseignements présentés ci-haut et l’information contenue dans la Loi sur la pension de la fonction publique, les règlements connexes ou d’autres lois applicables, les dispositions législatives auront préséance. Dans le même ordre d’idées, en cas de divergence entre les renseignements présentés ci-haut et ceux contenus dans les dispositions des régimes d’assurance collective, les contrats d’assurance ou les conventions collectives, les dispositions des régimes d’assurance, les contrats d’assurance ou les conventions collectives seront applicables."
                    ],
                ],
                "links" => [
                    "0" => "<a href=\"https://www.tbs-sct.gc.ca/agreements-conventions/list-fra.aspx\" title=\"Pour en savoir plus sur la convention collective.\" target=\"_blank\">convention collective</a>",
                    "1" => "<a href=\"https://www.canada.ca/fr/secretariat-conseil-tresor/sujets/pension-avantages-sociaux.html\" title=\"Pour en savoir plus sur les prestations de retraite.\" target=\"_blank\">https://www.canada.ca/fr/secretariat-conseil-tresor/sujets/pension-avantages-sociaux.html</a>",
                    "2" => "<a href=\"https://www.canada.ca/fr/secretariat-conseil-tresor/sujets/regimes-assurance/regimes/regime-soins-sante.html\" title=\"Pour en savoir plus sur le Régime de soins de santé de la fonction publique.\" target=\"_blank\">Régime de soins de santé de la fonction publique</a>",
                    "3" => "<a href=\"https://www.njc-cnm.gc.ca/directive/d9/fr\" title=\"Pour en savoir plus sur le plan.\" target=\"_blank\">Une description complète de ce qui est couvert par le régime se trouve ici</a>",
                    "4" => "<a href=\"https://www.canada.ca/fr/secretariat-conseil-tresor/sujets/regimes-assurance/regimes/regime-soins-dentaires.html\" title=\"Pour en savoir plus sur le Régime de soins dentaires de la fonction publique.\" target=\"_blank\">Régime de soins dentaires de la fonction publique</a>",
                    "5" => "<a href=\"https://www.canada.ca/fr/treasury-board-secretariat/topics/benefit-plans/plans/dental-care-plan/rules-dental-care-plan-public-service-canada.html\" title=\"Pour en savoir plus sur le plan.\" target=\"_blank\">Une description complète de ce qui est couvert par le régime se trouve ici</a>",
                    "6" => "<a href=\"https://www.canada.ca/fr/secretariat-conseil-tresor/services/regime-retraite/participants-actifs/nouvel-employe-fonction-publique-pension.html\" title=\"Pour en savoir plus sur le Régime de pension de retraite de la fonction publique.\" target=\"_blank\">Régime de pension de retraite de la fonction publique</a>",
                    "7" => "<a href=\"https://www.tpsgc-pwgsc.gc.ca/remuneration-compensation/services-pension-services/pension/info/bienvenue-welcome-fra.html\" title=\"Pour en savoir plus sur le plan.\" target=\"_blank\">Pour en savoir plus sur le régime de retraite, cliquez ici</a>",
                    "8" => "<a href=\"https://www.canada.ca/fr/secretariat-conseil-tresor/services/regimes-assurance/regime-assurance-invalidite/regime-assurance-invalidite-coup-oeil.html\" title=\"Pour en savoir plus sur l\'assurance invalidité.\" target=\"_blank\">L\'assurance-invalidité</a>",
                    "9" => "<a href=\"https://www.canada.ca/fr/secretariat-conseil-tresor/sujets/regimes-assurance/regimes/regime-assurance-gestion.html\" title=\"Pour en savoir plus sur les prestations d'AILD.\" target=\"_blank\">Régime d’assurance pour les cadres de gestion de la fonction publique</a>",
                ]
            ],
            "post-application" => [
                "title" => "Comment accélérer les choses après la présentation d'une candidature",
                "hash" => "post-application",
                "content" => [
                    "0" => [
                        "type" => "text",
                        "copy" => "Tous les employés du gouvernement du Canada sont tenus de réussir les vérifications de la fiabilité, et bon nombre d'entre eux devront obtenir une autorisation de niveau secret. Il s'agit de donner des empreintes digitales, ainsi que de faire vérifier son casier judiciaire et son crédit. Ces fonctions sont exercées par des agents de sécurité autorisés au gouvernement (et non par le Nuage de talents).\n\nTout le processus peut prendre du temps.\n\nVoulez-vous l'accélérer?\n\nIl y a deux choses que vous pouvez faire :"
                    ],
                    "1" => [
                        "type" => "ul",
                        "items" => [
                            "0" => "Remplissez les documents que vous devrez soumettre à l'avance.",
                            "1" => "Si vous avez vécu à l'extérieur du Canada, lisez ce qui suit.",
                        ]
                    ],
                    "2" => [
                        "type" => "text",
                        "copy" => "Si l'emploi pour lequel vous postulez exige une cote de fiabilité, remplissez le %link0% et conservez-le. Lorsque vous aurez terminé, ne l'envoyez pas par courriel au Nuage de talents jusqu'à ce qu'on vous le demande.\n\nSi l'emploi pour lequel vous postulez exige une cote de sécurité de niveau Secret, vous devrez remplir un %link1% et un %link2%. Une fois ces deux formulaires remplis, ne les envoyez pas par courriel au Nuage de talents avant qu'on vous les demande.\n\nSi vous avez vécu à l'extérieur du Canada pendant plus de six mois consécutifs au cours des cinq dernières années (dix ans, si votre emploi exige une cote de sécurité de niveau secret), vous devrez être soumis(e) à une vérification du casier judiciaire « à l'extérieur du pays ». Cela peut prendre un certain temps, car cela dépend des délais procéduraux du pays où vous avez vécu. Les candidats peuvent demander cette vérification du casier judiciaire « à l'extérieur du pays » en tout temps, en dehors de tout processus de dotation. Ce dossier est présenté par le candidat au gouvernement du Canada au moment du contrôle de sécurité. Donc, si vous avez passé huit mois en Afrique du Sud ou avez été dans les Alpes pendant un an ou à l'école en Australie, nous vous suggérons de demander vos dossiers dès le départ. Cela peut vous faire gagner beaucoup de temps, à vous et à votre gestionnaire d'embauche, plus tard (et si un poste axé sur un projet en particulier commence à une date fixe, le manque d'autorisation de sécurité à temps peut forcer le gestionnaire d'embauche à sélectionner un autre candidat)."
                    ],
                ],
                "links" => [
                    "0" => "<a href=\"http://www.tbs-sct.gc.ca/tbsf-fsct/330-23-fra.asp\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"Ouvrez le formulaire.\">formulaire qui se trouve ici</a>",
                    "1" => "<a href=\"http://www.tbs-sct.gc.ca/tbsf-fsct/330-23-fra.asp\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"Ouvrez le formulaire.\">formulaire de vérification de la fiabilité</a>",
                    "2" => "<a href=\"http://www.tbs-sct.gc.ca/tbsf-fsct/330-60-fra.asp\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"Ouvrez le formulaire.\">formulaire d'attestation de sécurité de niveau Secret</a>",
                ],
            ],
            "skills" => [
                "title" => "Comment fonctionne le modèle de reconnaissance des compétences du Nuage des talents?",
                "hash" => "skill-recognition",
                "content" => [
                    "0" => [
                        "type" => "accordion",
                        "label" => "Dossiers de compétences dynamiques : Qu'est-ce que c'est?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "C'est là que la magie se produit. Vous êtes plus qu'un CV et vos compétences sont plus que des titres de compétence officiels. Alors pourquoi ne pourriez-vous pas montrer à un employeur potentiel votre valeur réelle? Grâce aux dossiers de compétences dynamiques du Nuage des talents, vous pouvez être reconnu pour vos compétences, vos connaissances et vos capacités actuelles, peu importe comment, et où vous les avez obtenus. Cela signifie que vous pouvez revendiquer toutes vos expériences vécues comme moyen de démontrer votre expertise et ce dont vous êtes capable. Chaque fois que quelque chose est validé, elle fait partie de votre dossier de compétences dynamiques."
                            ]
                        ]
                    ],
                    "1" => [
                        "type" => "accordion",
                        "label" => "Voie de vie unique? Pas de problème!",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Vous avez un diplôme? Parfait. Vous n'en avez pas? Parfait. Nous nous soucions de ce dont vous êtes capable. Notre méthode dynamique de reconnaissance des compétences vous aide à nous le dire, quel que soit le chemin que vous avez choisi pour arriver ici. Bien que certains emplois exigent toujours un diplôme universitaire en particulier (selon les normes de classification du gouvernement). Le Nuage des talents aide les gestionnaires à élaborer une approche générale de reconnaissance des compétences et des équivalences. L'idée est de modifier la façon dont le gouvernement voit et valorise l'expérience afin qu'un plus large éventail de talents canadiens puisse s'appliquer au travail du gouvernement."
                            ]
                        ]
                    ],
                    "2" => [
                        "type" => "accordion",
                        "label" => "Pourquoi vous en donnez la peine et qu'est-ce que vous en retirez?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Reconnaissance : Vous devenez propriétaire de dossiers de compétences dynamiques reconnus qui tiennent compte de vos compétences et votre potentiel actuels.\n\nInstaurer la confiance : Les employeurs potentiels peuvent avoir confiance dans vos dossiers de compétences dynamiques parce qu'ils ont déjà été validés.\n\nÉconomies de temps : Vous gagnez beaucoup de temps en présentant une demande pour de nouvelles possibilités parce que vous pouvez réutiliser vos dossiers de compétences dynamiques."
                            ]
                        ]
                    ],
                    "3" => [
                        "type" => "accordion",
                        "label" => "Comment cela fonctionne-t-il?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "C'est vraiment très simple!"
                            ],
                            "1" => [
                                "type" => "ol",
                                "items" => [
                                    "0" => "Réclamer : Vous nous parlez d'une compétence que vous possédez",
                                    "1" => "Recueillir : Vous nous envoyez un échantillon de travail qui démontre votre compétence",
                                    "2" => "Corroborer : Vous choisissez quelqu'un qui peut agir comme microréférence pour appuyer votre demande",
                                    "3" => "Réutiliser : La prochaine fois que vous postulez un emploi, vous pouvez tout simplement réutiliser ce dossier – il n'est pas nécessaire de réinventer la roue chaque fois!",
                                    "4" => "Évoluer : Vous pouvez ajouter des éléments à vos dossiers dynamiques de compétences afin qu'ils grandissent au fil du temps comme vous",
                                ]
                            ]
                        ]
                    ],
                ],
                "links" => [
                    "0" => "",
                ],
            ],
            "levels" => [
                "title" => "Comment puis-je connaître le niveau de mes compétences?",
                "hash" => "levels",
                "content" => [
                    "0" => [
                        "type" => "title",
                        "hash" => "levels-model",
                        "copy" => "Modèle de compétences du Nuage de talents"
                    ],
                    "1" => [
                        "type" => "text",
                        "copy" => "Plutôt que de définir l'expérience en fonction du nombre d'années d'expérience, le Nuage de talents examine la capacité d'une personne à faire son travail dans diverses conditions de complexité et d'autonomie. Essentiellement, votre niveau est déterminé par la difficulté d'une tâche, qui est mesurée en fonction de l'aide ou de la supervision dont vous avez besoin pour l'accomplir. Cette approche reconnaît que les gens acquerront des compétences à des rythmes différents, et que leurs forces se manifesteront de différentes façons."
                    ],
                    "2" => [
                        "type" => "title",
                        "hash" => "levels-hard-skills",
                        "copy" => "Trouvez votre niveau: Compétences spécialisées"
                    ],
                    "3" => [
                        "type" => "accordion",
                        "label" => "Niveau débutant",
                        "content" => [
                            "0" => [
                                "type" => "ul",
                                "items" => [
                                    "0" => "Vous êtes capable d'accomplir des tâches de base avec une supervision régulière et une orientation claire. Les tâches qui vous sont assignées sont claires et ne sont pas très complexes. Elles ont généralement une incidence locale.",
                                    "1" => "Au fur et à mesure que vous progressez dans cette catégorie, vous devriez être en mesure d'accomplir des tâches de complexité modérée avec une supervision régulière. Vous devriez aussi être en mesure d'accomplir des tâches de base avec peu ou pas de supervision.",
                                    "2" => "Ce niveau est habituellement associé aux tâches qui constituent le gros du travail pour les postes de niveau inférieur, comme les analystes ou les développeurs de niveau débutant.",
                                ]
                            ]
                        ]
                    ],
                    "4" => [
                        "type" => "accordion",
                        "label" => "Niveau intermédiaire",
                        "content" => [
                            "0" => [
                                "type" => "ul",
                                "items" => [
                                    "0" => "Vous avez la capacité d'accomplir des tâches de complexité modérée ou d'incidence modérée avec supervision. C'est le superviseur qui détermine l'approche à préconiser pour effectuer les tâches, de même que la façon dont elles sont exécutées. Vous apportez des commentaires et des conseils. Vous êtes en mesure de faire progresser la tâche, même face à des obstacles et à des complications de petite à moyenne envergure.",
                                    "1" => "Au fur et à mesure que vous progressez dans cette catégorie, vous devriez être en mesure d'accomplir des tâches d'une complexité importante ou ayant une incidence plus grande avec une supervision régulière. Vous devriez également être en mesure d'accomplir des tâches d'une complexité ou d'une incidence modérée avec peu ou pas de supervision.",
                                    "2" => "Ce niveau est habituellement associé aux tâches qui constituent le gros du travail pour les postes de niveau intermédiaire, comme les analystes ou les développeurs.",
                                ]
                            ]
                        ]
                    ],
                    "5" => [
                        "type" => "accordion",
                        "label" => "Niveau avancé",
                        "content" => [
                            "0" => [
                                "type" => "ul",
                                "items" => [
                                    "0" => "Vous avez la capacité d'accomplir des tâches d'une complexité ou d'une incidence importante avec supervision. Vous donnez des conseils et des commentaires au superviseur sur l'approche à employer pour effectuer les tâches et la façon dont elles sont exécutées. Vous êtes en mesure de faire progresser la tâche, même face à des obstacles et à des complications d'envergure moyenne à importante.",
                                    "1" => "Au fur et à mesure que vous progressez dans cette catégorie, vous êtes être en mesure d'accomplir des tâches d'une complexité importante ou ayant une incidence plus grande avec seulement de légers niveaux de supervision, en étant effectivement le responsable de l'initiative. Vous pouvez également jouer un rôle de formation d'autres personnes dans cet ensemble de compétences ou assumer un rôle de supervision léger pour les personnes aux niveaux inférieurs.",
                                    "2" => "Ce niveau est habituellement associé à des tâches qui constituent la majeure partie du travail pour des postes de niveau supérieur, comme les analystes principaux ou les développeurs principaux.",
                                ]
                            ]
                        ]
                    ],
                    "6" => [
                        "type" => "accordion",
                        "label" => "Niveau responsable",
                        "content" => [
                            "0" => [
                                "type" => "ul",
                                "items" => [
                                    "0" => "Vous êtes en mesure d'accomplir des tâches d'une complexité ou d'une incidence importante, où vous prenez les décisions et répondez de vos décisions auprès de la haute direction de l'organisation. Vous présentez les tâches, l'approche et le plan de réalisation à la haute direction. Vous supervisez souvent d'autres personnes (personnes ou équipes) dans l'exécution de tâches très complexes ou ayant une incidence sur l'ensemble du système. Vous êtes en mesure de faire progresser ces tâches, même face à des obstacles et à des complications importants et imprévus.",
                                    "1" => "Au fur et à mesure que vous progressez dans cette catégorie, vous devriez être en mesure d'évaluer les autres à des niveaux plus subalternes, et de déterminer clairement la différence entre les tâches débutantes, intermédiaires et avancées. Vous devriez également être en mesure de pouvoir former des équipes, définir des orientations et assurer une supervision.",
                                    "2" => "Ce niveau est habituellement associé aux tâches qui constituent la majeure partie du travail pour les postes de direction et de direction.",
                                ]
                            ]
                        ]
                    ],
                    "7" => [
                        "type" => "title",
                        "hash" => "levels-soft-skills",
                        "copy" => "Trouvez votre niveau: Compétences non spécialisées"
                    ],
                    "8" => [
                        "type" => "accordion",
                        "label" => "Phase de développement précoce",
                        "content" => [
                            "0" => [
                                "type" => "ul",
                                "items" => [
                                    "0" => "Vous êtes en processus d'acquérir cette compétence ou cet attribut. Vous êtes capable de le démontrer dans des conditions favorables (peu de stress, difficulté minimale) et pouvez l'appliquer dans un contexte de travail de façon intermittente."
                                ]
                            ]
                        ]
                    ],
                    "9" => [
                        "type" => "accordion",
                        "label" => "Modérément en évidence",
                        "content" => [
                            "0" => [
                                "type" => "ul",
                                "items" => [
                                    "0" => "Vous êtes capable de démontrer cette compétence ou cet attribut de façon constante en milieu de travail, y compris lorsque les conditions de difficulté ou le niveau de stress sont bas ou modérés.",
                                    "1" => "Vos pairs et vos superviseurs peuvent attester le fait que vous êtes capable de démontrer cette compétence ou cet attribut de façon régulière.",
                                ]
                            ]
                        ]
                    ],
                    "10" => [
                        "type" => "accordion",
                        "label" => "Fortement en évidence",
                        "content" => [
                            "0" => [
                                "type" => "ul",
                                "items" => [
                                    "0" => "Vous êtes capable de démontrer cette compétence ou cet attribut de façon constante en milieu de travail, y compris lorsque les conditions de difficulté ou le niveau de stress sont élevés.",
                                    "1" => "Vos pairs et vos superviseurs reconnaissent qu'il s'agit d'une force dont vous faites preuve en milieu de travail.",
                                ]
                            ]
                        ]
                    ],
                    "11" => [
                        "type" => "accordion",
                        "label" => "Démonstration à un niveau profond",
                        "content" => [
                            "0" => [
                                "type" => "ul",
                                "items" => [
                                    "0" => "Il s'agit d'une partie fondamentale de qui vous êtes. Vous démontrez cette compétence ou cet attribut de façon constante en milieu de travail, y compris lorsque les conditions de difficulté ou le niveau de stress sont extrêmes.",
                                    "1" => "Vos pairs et vos superviseurs reconnaissent qu'il s'agit d'une force importante dont vous faites preuve en milieu de travail, en donnant un exemple aux autres.",
                                ]
                            ]
                        ]
                    ],
                ],
                "links" => [
                    "0" => "",
                ],
            ],
        ]
    ],
    /* Hiring Manager Content */
    "hiring" => [
        "title" => "For Hiring Managers",
        "hash" => "managers",
        "sections" => [
            "keys" => [
                "title" => "Key Information",
                "hash" => "manager-key-questions",
                "content" => [
                    "0" => [
                        "type" => "title",
                        "hash" => "manager-what",
                        "copy" => "Qu’est-ce que le Nuage de talents?"
                    ],
                    "1" => [
                        "type" => "text",
                        "copy" => "Le Nuage de talents est un nouveau modèle de dotation expérimental au gouvernement du Canada. Il vise à attirer des gens talentueux très performants de l’extérieur pour remplir des fonctions axées sur les projets. Il s’agit également du premier marché du secteur public dans le monde pour l’économie à la demande, organisé autour des droits des travailleurs de la prochaine génération.\n\nLe Nuage de talents est conçu pour réduire considérablement le temps de dotation, pour optimiser l’adaptation des candidats aux équipes et pour procurer à l’utilisateur une expérience formidable pour toutes les personnes concernées.\n\nNous travaillons avec des gestionnaires responsables de l’embauche pendant notre conception de la plateforme afin de nous assurer que les choix sont intuitifs et que les politiques sont respectées sans perdre de marge de manœuvre lorsqu’il y en a.\n\nLes ministères partenaires financent le projet et le Bureau du dirigeant principal de l’information du Secrétariat du Conseil du Trésor du Canada s’occupe de l’hébergement. Pour obtenir la liste la plus récente des ministères partenaires, %link0%.\n\nMême si tout le monde peut créer un compte et accéder aux outils de gestion, seuls les gestionnaires des ministères partenaires peuvent publier des emplois et suivre les candidats dans le site du Nuage de talents."
                    ],
                    "2" => [
                        "type" => "title",
                        "hash" => "manager-why",
                        "copy" => "Pourquoi les gestionnaires devraient-ils utiliser le Nuage de talents?"
                    ],
                    "3" => [
                        "type" => "text",
                        "copy" => "L’une des principales raisons est que les gestionnaires nous disent qu’ils aiment vraiment utiliser la plateforme et que les recruteurs sont ravis de leurs candidats. Les mots « expérience agréable » reviennent assez souvent.\n\nTous les postes publiés dans le Nuage de talents sont des postes de durée déterminée annoncés à l’externe. Voici quelques raisons d’embaucher un employé pour une période déterminée :"
                    ],
                    "4" => [
                        "type" => "ul",
                        "items" => [
                            "0" => "utile pour la dotation en période électorale, en cas d’incertitude quant au montant de votre budget de l’année prochaine;",
                            "1" => "financement de programme d’une durée limitée (p. ex., programmes à durée déterminée ou arrivant à échéance);",
                            "2" => "projets spéciaux (p. ex., équipes de travail du SM, projets d’innovation);",
                            "3" => "besoin d’un spécialiste pour une phase particulière de projet (p. ex., conception de projet au début – testeur de l’expérience utilisateur; élaboration de mi-projet – programmeur; fin du projet, communication – concepteur graphique; évaluation – évaluation du projet)."
                        ]
                    ],
                    "5" => [
                        "type" => "title",
                        "hash" => "manager-selection",
                        "copy" => "De quelle manière l’utilisation du Nuage de talents a-t-il accéléré le processus de sélection?"
                    ],
                    "6" => [
                        "type" => "text",
                        "copy" => "L’utilisation du Nuage de talents accélère le processus de sélection de plusieurs façons."
                    ],
                    "7" => [
                        "type" => "ul",
                        "items" => [
                            "0" => "Répertoire des candidats plus petits et plus résilients. Conception comportementale qui renvoie de 10 à 30 demandeurs qui répondent à tous les critères essentiels. Les gestionnaires disent qu’ils sont capables de faire la présélection initiale en deux ou trois heures.",
                            "1" => [
                                "copy" => "Outils en ligne directement dans la plateforme",
                                "items" => [
                                    "0" => "Concepteur d’offres d’emploi : Outil permettant aux gestionnaires de concevoir facilement une offre et un profil de gestionnaire. Processus et conception qui permettent aux gestionnaires d’obtenir une offre en direct (traduit et approuvé par les Ressources humaines [RH]) en deux jours.",
                                    "1" => "Créateur de plan de présélection : Conçu pour aider les gestionnaires à grandement accélérer le calendrier de l’élaboration des plans d’évaluation et des guides de cotation avec les conseillers en RH.",
                                    "2" => "Outil de suivi des demandeurs : Conception de suivi et de présentation qui permet aux gestionnaires de rapidement présélectionner les candidats qui passeront à l’étape suivante de la présélection. L’outil intègre et publie également des renseignements tels que les priorités et les groupes préférés pour les embauches directement dans le portail."
                                ]
                            ]
                        ]
                    ],
                    "8" => [
                        "type" => "title",
                        "hash" => "manager-who",
                        "copy" => "Qui peut publier des emplois dans le Nuage de talents?"
                    ],
                    "9" => [
                        "type" => "text",
                        "copy" => "Seuls les gestionnaires des ministères partenaires peuvent publier des emplois dans le Nuage de talents. Pour obtenir la liste la plus récente des ministères partenaires, %link0%.\n\nSi vous appartenez à l’un des ministères partenaires, créez un compte sur le %link1% et envoyez-nous un courrier électronique à l’adresse suivante : %link2%. Une fois que nous avons confirmé auprès du superutilisateur RH de votre ministère, vous pourrez commencer à utiliser le Nuage de talents pour vos besoins en personnel pour une durée déterminée."
                    ],
                    "10" => [
                        "type" => "title",
                        "hash" => "manager-demo",
                        "copy" => "Mon service N’est PAS un partenaire du Nuage de talents, puis-je quand même utiliser le Nuage de talents?"
                    ],
                    "11" => [
                        "type" => "text",
                        "copy" => "À compter d’octobre, le Nuage de talents offrira un ensemble limité d’outils à tous les gestionnaires du gouvernement du Canada. Ces comptes de « démonstration » donnent accès à divers outils, comme le concepteur d’offres d’emploi et le concepteur de plans de présélection.\n\nPour créer votre propre compte de démonstration, rendez-vous sur le %link1%.\n\nLe Nuage de talents est ouvert aux nouveaux partenaires. Si votre ministère est intéressé, envoyez-nous un courriel à l’adresse suivante : %link2%."
                    ]
                ],
                "links" => [
                    "0" => "<a href=\"https://talent.canada.ca/fr/faq/#partners\" title=\"See Talent Cloud's partner departments.\">veuillez consulter la foire aux questions du site Web du Nuage de talents</a>",
                    "1" => "<a href=\"talent.canada.ca/manager\" title=\"Visit Talent Cloud's manager portal.\">portail des gestionnaires de Nuages de talents</a>",
                    "2" => "<a href=\"mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca\" title=\"Envoyer un courriel au Nuage de talents.\">talent.cloud-nuage.de.talents@tbs-sct.gc.ca</a>"
                ]
            ],
            "tc-usage" => [
                "title" => "Utilité du Nuage de talents pour les gestionnaires",
                "hash" => "manager-usage",
                "content" => [
                    "0" => [
                        "type" => "accordion",
                        "label" => "Quels types d’emplois les gestionnaires peuvent-ils publier dans le Nuage de talents?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Vous pouvez publier des postes de toutes classifications et de tous niveaux."
                            ]
                        ]
                    ],
                    "1" => [
                        "type" => "accordion",
                        "label" => "Quels postes les gestionnaires peuvent-ils publier dans le Nuage de talents?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Tous les postes publiés dans le Nuage de talents sont des postes de durée déterminée annoncés à l’externe. En d’autres termes, le Nuage de talents ne peut pas être utilisé pour des offres d’emploi de durée indéterminée, occasionnelle, d’affectation ou de détachement."
                            ]
                        ]
                    ],
                    "2" => [
                        "type" => "accordion",
                        "label" => "Qui est responsable de la classification?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Avant de publier un poste dans le Nuage de talents, le poste classifié comportant le profil linguistique approprié doit exister. Dans le cas contraire, ou si vous éprouvez des difficultés avec la classification, nous pouvons travailler avec vous et votre conseiller en RH pour explorer les possibilités."
                            ]
                        ]
                    ],
                    "3" => [
                        "type" => "accordion",
                        "label" => "Que devrais-je faire si je cherche à embaucher pour de multiples postes complémentaires ou une équipe au moyen du Nuage de talents?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Communiquez avec l’équipe du Nuage de talents si vous cherchez à embaucher pour de multiples postes complémentaires ou une équipe. Nous travaillerons avec vous et votre conseiller en RH pour élaborer des offres d’emploi qui comporteront tous les ensembles de compétence que vous recherchez pour doter le nombre de postes ouverts que vous avez."
                            ]
                        ]
                    ],
                    "4" => [
                        "type" => "accordion",
                        "label" => "Pourquoi le Nuage de talents ne fonctionne-t-il seulement que pour les postes de durée déterminée annoncés à l’externe?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Les gestionnaires nous ont indiqué qu’il y a un besoin croissant d’embaucher rapidement des gens talentueux pour remplir des fonctions axées sur les projets. Cependant, le processus de dotation actuel pour les postes d’une durée déterminée prend autant de temps que le processus d’embauche pour les postes d’une durée indéterminée. De nombreux gestionnaires ont eu recours à des employés occasionnels ou à des agences de recrutement, qui n’offrent aucune protection aux travailleurs.\n\nLe Nuage de talents vise à concevoir un processus d’embauche d’employés nommés pour une durée déterminée si efficace qu’il deviendra la méthode de prédilection pour les gestionnaires qui veulent embaucher quelqu’un pour une période limitée.\n\nSi, après l’embauche, l’employé s’avère être un bon choix et qu’il existe un besoin permanent, nous serons heureux de collaborer avec vous et vos conseillers en RH pour explorer des possibilités."
                            ]
                        ]
                    ],
                    "5" => [
                        "type" => "accordion",
                        "label" => "Les employés nommés pour une durée indéterminée peuvent-ils présenter leur candidature à des postes dans le Nuage de talents?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Comme pour les postes de durée déterminée annoncés à l’externe, les candidatures des fonctionnaires aux postes publiés dans le Nuage de talents sont accueillies. Cependant, les employés nommés pour une durée indéterminée devront s’organiser avec les gestionnaires responsables de l’embauche s’ils deviennent les candidats choisis et s’ils souhaitent protéger leur statut d’employés nommés pour une durée indéterminée. Les gestionnaires devraient discuter avec leurs conseillers en RH pour établir les possibilités disponibles.\n\nCertains postes dans le Nuage de talents indiquent que les fonctionnaires sont leur candidat de prédilection, et, lorsque c’est le cas, des ententes d’affectation ou de détachement ont été réalisées."
                            ]
                        ]
                    ],
                    "6" => [
                        "type" => "accordion",
                        "label" => "Quelle peut être la durée des postes pour une durée déterminée?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Les emplois publiés dans le Nuage de talents varient généralement de 6 mois à 2 ans. La durée d’un poste pour une durée déterminée peut être aussi longue que le permet la %link0%. Dans la plupart des cas, cette période peut atteindre trois ans, après quoi « le ministère ou organisme doit nommer l’employé pour une période indéterminée »."
                            ]
                        ]
                    ],
                    "7" => [
                        "type" => "accordion",
                        "label" => "De quelle manière le Nuage de talents gère-t-il l’autorisation en matière de priorité?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Le Nuage de talents entreprend l’autorisation en matière de priorité au nom du ministère lorsque le poste est prêt à être publié.\n\nSi une personne ayant un droit de priorité exprime un intérêt à être prise en compte, le Nuage de talents lui demandera de prouver qu’elle est qualifiée pour le poste en répondant à l’annonce publiée dans le site Web du Nuage de talents plutôt qu’en présentant son curriculum vitae et une lettre de motivation.\n\nAprès la fermeture du poste, le Nuage de talents demandera au gestionnaire d’évaluer d’abord la personne prioritaire (et uniquement par rapport aux critères essentiels) avant d’évaluer d’autres candidats.\n\nS’il s’avère que la personne ayant un droit de priorité n’est pas qualifiée, le Nuage de talents demandera par écrit au gestionnaire les résultats de l’évaluation et soumettra des commentaires sur le Système de gestion de l’information sur les priorités.\n\nTous les documents relatifs à la priorité sont partagés avec les conseillers en RH pour leurs dossiers de dotation."
                            ]
                        ]
                    ],
                    "8" => [
                        "type" => "accordion",
                        "label" => "Les emplois publiés dans le Nuage de talents sont-ils publiés dans le site Emplois GC (précédemment emplois.gc.ca)?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Oui. Afin de satisfaire aux exigences de la politique relative aux postes annoncés à l’externe, tous les emplois du Nuage de talents sont publiés dans Emplois GC, à titre d’autre annonce de recrutement.\n\nLorsque les candidats cliquent sur une autre annonce de recrutement pour des emplois au GC, ils sont redirigés vers le portail du Nuage de talents pour terminer leur candidature.\n\n%link1%."
                            ]
                        ]
                    ],
                    "9" => [
                        "type" => "accordion",
                        "label" => "Le Nuage de talents crée-t-il des répertoires?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Oui, mais les répertoires créés au moyen du Nuage de talents fonctionneront un peu différemment.\n\nNous testons actuellement un nouveau type de répertoire qui vise à offrir une meilleure expérience aux candidats et aux gestionnaires. Les candidats seront en mesure de déterminer le gestionnaire qui aura accès à leurs renseignements et ceux-ci ne seront en relation qu’avec des candidats réellement intéressés par l’opportunité.\n\nSi vous souhaitez faire l’essai de ce nouveau type de répertoire, communiquez avec l’équipe du Nuage de talents à l’adresse suivante : %link2%."
                            ]
                        ]
                    ],
                    "10" => [
                        "type" => "accordion",
                        "label" => "Puis-je prendre en considération des candidats dans le Nuage de talents pour des emplois autres que ceux pour lesquels ils ont postulé?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Oui, l’équipe du Nuage de talents peut travailler avec vous et votre conseiller en RH pour voir la manière dont cela peut être réalisé."
                            ]
                        ]
                    ]
                ],
                "links" => [
                    "0" => "<a href=\"https://www.tbs-sct.gc.ca/pol/doc-fra.aspx?id=12584\" title=\"Learn more about the term employment policy.\" target=\"_blank\">Politique sur l’emploi pour une période déterminée</a>",
                    "1" => "<a href=\"https://emploisfp-psjobs.cfp-psc.gc.ca/psrs-srfp/applicant/page1800?poster=1276951&toggleLanguage=fr\" title=\"See an example of how cross-posting works.\" target=\"_blank\">En voici un exemple</a>",
                    "2" => "<a href=\"mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca\" title=\"Envoyer un courriel au Nuage de talents.\" target=\"_blank\">talent.cloud-nuage.de.talents@tbs-sct.gc.ca</a>"
                ]
            ],
            "tc-how" => [
                "title" => "Fonctionnement du Nuage de talents – Offre d’emploi",
                "hash" => "manager-how",
                "content" => [
                    "0" => [
                        "type" => "accordion",
                        "label" => "Quel est le rôle du gestionnaire dans la rédaction de l’offre d’emploi?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Le gestionnaire est responsable de la rédaction de l’offre d’emploi et le Nuage de talents dispose d’un outil pour l’aider! En utilisant le concepteur d’offres d’emploi, les gestionnaires ont pu créer une offre d’emploi adaptée à leurs besoins opérationnels, à la culture de leur équipe et à leur environnement de travail en environ une heure.\n\nUne fois l’ébauche terminée, le conseiller en RH du gestionnaire et l’équipe du Nuage de talents ont la possibilité de faire part de leurs commentaires. Compte tenu de cela, le gestionnaire met la touche finale à l’offre d’emploi.\n\nLe Nuage de talents traduira la version définitive et communiquera l’offre de poste bilingue avec le gestionnaire et le conseiller en RH pour une dernière révision avant la publication."
                            ]
                        ]
                    ],
                    "1" => [
                        "type" => "accordion",
                        "label" => "Pourquoi les offres d’emploi du Nuage de talents comportent-elles un énoncé des répercussions?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Notre étude auprès des utilisateurs a montré que l’une des principales raisons pour lesquelles les candidats externes envisagent de travailler pour le gouvernement est l’effet positif qu’ils peuvent avoir sur la vie des Canadiens. De nombreux candidats externes nous ont dit qu’ils seraient disposés à accepter une réduction de salaire pour ce type de travail.\n\nLa recherche auprès des utilisateurs a également montré qu’en demandant aux gestionnaires de rédiger un énoncé des répercussions, cela les aidait à faire preuve de plus de diligence dans la manière dont les mesures de dotation serviront les Canadiens."
                            ]
                        ]
                    ],
                    "2" => [
                        "type" => "accordion",
                        "label" => "Pourquoi le Nuage de talents encourage-t-il les gestionnaires à utiliser l’exigence minimale en matière d’éducation et la disposition relative à l’expérience équivalente dans les normes de qualification?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "L’utilisation de l’exigence d’éducation minimale et de l’expérience équivalente fournie dans les %link0% permet de reconnaître que les personnes peuvent accroître leur portefeuille de compétences de nombreuses manières différentes, et permet aux gestionnaires d’accéder à un vivier de talents plus large et plus diversifié. Il donne également aux demandeurs dont le cheminement de vie ou de carrière n’est pas conventionnel la chance de démontrer la manière dont ils sont qualifiés pour le poste, au lieu d’être systématiquement exclus pour ne pas avoir suivi un cheminement conventionnel."
                            ]
                        ]
                    ],
                    "3" => [
                        "type" => "accordion",
                        "label" => "Pourquoi les critères de mérite essentiels et constituant un atout ne sont-ils pas regroupés en fonction de l’« expérience », des « connaissances », des « habiletés » et des « qualités personnelles »?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Il n’existe pas de %link1% pour une offre d’emploi. Ce que nous mettons à l’essai est une approche axée sur les compétences pour décrire le critère de mérite, qui accorde aux candidats plus de flexibilité pour démontrer la manière dont ils répondent aux exigences du poste."
                            ]
                        ]
                    ],
                    "4" => [
                        "type" => "accordion",
                        "label" => "Pourquoi les « années d’expérience » ne sont-elles pas mentionnées dans l’annonce du poste dans le Nuage de talents?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "L’utilisation de l’expérience (dotation en personnel fondée sur une biographie) tend à présélectionner les candidats qui suivent les trajectoires de vie attendues et à exclure les candidats qualifiés qui ont eu une carrière ou une éducation non conventionnelle. Cela a désavantagé de manière disproportionnée les candidats des groupes sous‑représentés.\n\nAfin d’aider les gestionnaires à accéder à un répertoire de gens talentueux plus diversifié et à se concentrer sur ce que les candidats peuvent faire plutôt que sur le lieu où ils ont travaillé, le Nuage de talents teste un modèle de dotation axé sur les compétences. Cette approche demande aux gestionnaires de décrire les compétences et le niveau requis pour effectuer le travail, sans préciser la manière dont le candidat a atteint ces exigences. Cela permet aux candidats d’utiliser une grande variété d’éléments probants pour démontrer la manière dont ils satisfont à l’exigence."
                            ]
                        ]
                    ],
                    "5" => [
                        "type" => "accordion",
                        "label" => "Pourquoi les offres d’emploi du Nuage de talents contiennent-elles des renseignements sur l’environnement de travail et le style de leadership des gestionnaires?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Cela fait partie de la conception du Nuage de talents visant à faciliter l’adéquation optimale à cinq facteurs. Les cinq facteurs sont le candidat, le poste, le gestionnaire, l’environnement opérationnel et la culture de l’équipe. Fournir des renseignements sur l’environnement de travail et le style de leadership du gestionnaire permet aux candidats d’évaluer eux-mêmes si l’emploi leur correspond bien avant d’investir du temps et des efforts pour postuler à un emploi.\n\nLes candidats ayant la possibilité de s’exclure eux-mêmes s’ils estiment qu’ils ne correspondent pas, le processus d’évaluation devient ainsi plus rapide et plus simple pour le gestionnaire en réduisant le nombre de candidats qui ne correspondent pas."
                            ]
                        ]
                    ],
                    "6" => [
                        "type" => "accordion",
                        "label" => "Les gestionnaires peuvent-ils sauvegarder leurs offres d’emploi et les utiliser à nouveau?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Toutes les offres sont archivées dans le portail des gestionnaires. Si vous souhaitez réutiliser les anciennes offres d’emploi, l’équipe du Nuage de talents peut les charger manuellement pour vous au cours des quelques mois suivants. Il s’agira d’une option automatisée l’année prochaine."
                            ]
                        ]
                    ]
                ],
                "links" => [
                    "0" => "<a href=\"https://www.canada.ca/fr/secretariat-conseil-tresor/services/dotation/normes-qualification/centrale.html\" title=\"Learn more about Qualification Standards.\" target=\"_blank\">Normes de qualification</a>",
                    "1" => "<a href=\"https://twitter.com/CFPduCanada/status/1087387312336654336\" title=\"Learn more about job poster formats.\" target=\"_blank\">format prescrit</a>",
                ]
            ],
            "tc-assessment" => [
                "title" => "Fonctionnement du Nuage de talents – Évaluation",
                "hash" => "manager-assessment",
                "content" => [
                    "0" => [
                        "type" => "accordion",
                        "label" => "Qui est responsable de l’élaboration de l’outil d’évaluation?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Le gestionnaire, avec le soutien de son conseiller en RH, est responsable de l’élaboration des outils d’évaluation. Cela étant dit, l’équipe du Nuage de talents travaille avec la communauté des RH de l’ensemble du gouvernement du Canada pour recueillir les pratiques exemplaires. Le Nuage de talents recueille également des outils qui ont été utilisés par les gestionnaires qui embauchent au moyen de la plateforme.\n\nEn utilisant ces ressources et la sagesse collective de la communauté des RH, le Nuage de talents crée des outils qui faciliteront l’élaboration de plans de présélection et d’outils d’évaluation pour les gestionnaires."
                            ]
                        ]
                    ],
                    "1" => [
                        "type" => "accordion",
                        "label" => "Le Nuage de talents évalue-t-il les candidats?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Non. Le Nuage de talents ne participe pas à l’évaluation de candidats. L’évaluation est du ressort du gestionnaire et du conseiller en RH."
                            ]
                        ]
                    ],
                    "2" => [
                        "type" => "accordion",
                        "label" => "Qui est responsable d’aviser les candidats exclus?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Le Nuage de talents comporte un ensemble de modèles de courriel que les gestionnaires et leurs conseillers en RH peuvent utiliser pour informer les candidats qu’ils ont été exclus du processus. Si le gestionnaire aimait avoir de l’aide, le Nuage de talents peut également envoyer des courriels de notification aux candidats non retenus. Tous les courriels seront communiqués au gestionnaire et à son conseiller en RH pour leurs dossiers."
                            ]
                        ]
                    ],
                    "3" => [
                        "type" => "accordion",
                        "label" => "Qui est responsable de l’envoi des examens à la maison et des demandes de portfolio?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Le Nuage de talents comporte des modèles de courriel que les gestionnaires et leurs conseillers en RH peuvent utiliser pour envoyer des examens et des demandes de portefeuille. Si le gestionnaire aimait avoir de l’aide, le Nuage de talents peut également coordonner ces demandes. Tous les courriels seront communiqués au gestionnaire et à son conseiller en RH pour leurs dossiers."
                            ]
                        ]
                    ],
                    "4" => [
                        "type" => "accordion",
                        "label" => "Qui est responsable de fixer des entrevues?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Les gestionnaires et leurs conseillers en RH sont responsables de fixer les entrevues."
                            ]
                        ]
                    ],
                    "5" => [
                        "type" => "accordion",
                        "label" => "Qui est responsable de prévoir des évaluations de langue seconde?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Les gestionnaires devront assurer la coordination avec leurs conseillers en RH pour prévoir les évaluations de langue seconde."
                            ]
                        ]
                    ],
                    "6" => [
                        "type" => "accordion",
                        "label" => "Qui est responsable des demandes d’autorisation de sécurité?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Les gestionnaires devront assurer la coordination avec leurs conseillers en RH pour demander les autorisations de sécurité."
                            ]
                        ]
                    ],
                    "7" => [
                        "type" => "accordion",
                        "label" => "Qui est responsable des mesures d’adaptation?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Les demandeurs sont priés de communiquer avec le Nuage de talents s’ils ont besoin de mesures d’adaptation. Lorsque l’équipe du Nuage de talents reçoit une demande d’adaptation, nous communiquerons la demande au gestionnaire et à ses conseillers en RH afin de coordonner la mesure d’adaptation avec le candidat."
                            ]
                        ]
                    ],
                    "8" => [
                        "type" => "text",
                        "copy" => "Si vous avez des questions qui ne sont pas comprises dans cette foire aux questions, veuillez l’envoyer à l’adresse suivante : %link0% ou communiquez avec nous %link1%"
                    ]
                ],
                "links" => [
                    "0" => "<a href=\"mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca\" title=\"Envoyer un courriel au Nuage de talents.\" target=\"_blank\">talent.cloud-nuage.de.talents@tbs-sct.gc.ca</a>",
                    "1" => "<a href=\"https://twitter.com/gc_talent\" title=\"Visit Talent Cloud on Twitter.\" target=\"_blank\">sur Twitter @GCTalent</a>",
                ]
            ],
            "others" => [
                "title" => "Autres questions",
                "hash" => "manager-others",
                "content" => [
                    "0" => [
                        "type" => "accordion",
                        "label" => "Puis-je communiquer avec les candidats au moyen du portail du Nuage de talents?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Pour le moment, la plupart des communications avec les candidats auront toujours lieu par courriel."
                            ]
                        ]
                    ],
                    "1" => [
                        "type" => "accordion",
                        "label" => "Les candidats peuvent-ils téléverser des documents officiels (p. ex., diplômes, preuve de citoyenneté) dans le portail du Nuage de talents?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Pour le moment, les candidats devront continuer de présenter leurs documents officiels de la manière dont vous les demandiez précédemment (p. ex., en fournir une copie en personne ou par courriel)."
                            ]
                        ]
                    ],
                    "2" => [
                        "type" => "accordion",
                        "label" => "Si le poste est publié dans d’autres sites, pouvons-nous les lier directement au Nuage de talents?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Oui, le lien vers le Nuage de talents peut être utilisé pour promouvoir les occasions d’emplois sur d’autres sites de recherche de travail."
                            ]
                        ]
                    ],
                    "3" => [
                        "type" => "accordion",
                        "label" => "Un poste de notre ministère est actuellement publié dans Emplois GC. Est-il trop tard pour tirer profit de la plateforme?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "C’est possible, mais les gestionnaires auront du travail supplémentaire. Nous serons heureux d’en parler avec vous et de voir les possibilités. Communiquez avec nous par courriel à l’adresse suivante : %link0%."
                            ]
                        ]
                    ],
                    "4" => [
                        "type" => "accordion",
                        "label" => "Puis-je effectuer un changement à mon offre lorsqu’elle est en ligne dans le Nuage de talents?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Dans un esprit d’équité et de transparence, nous ne pouvons pas modifier une offre d’emploi lorsqu’elle est en ligne sur la plateforme du Nuage de talents. C’est pourquoi nous travaillons en étroite collaboration avec vous et votre conseiller en RH tout au long du processus de rédaction des offres. Vous et votre conseiller en RH aurez plusieurs occasions de consulter l’offre avant sa mise en ligne."
                            ]
                        ]
                    ],
                    "5" => [
                        "type" => "accordion",
                        "label" => "Combien de temps le Nuage de talents conserve-t-il les renseignements des candidats?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Les candidatures présentées dans le Nuage de talents sont conservées pendant cinq ans. Les gestionnaires responsables de l’embauche ont accès aux candidatures pendant 5 ans."
                            ]
                        ]
                    ],
                    "6" => [
                        "type" => "accordion",
                        "label" => "Est-il possible d’insérer des vidéos promotionnelles de notre ministère directement dans le profil du gestionnaire?",
                        "content" => [
                            "0" => [
                                "type" => "text",
                                "copy" => "Vous ne pouvez pas intégrer de vidéos dans le profil du gestionnaire, mais si la vidéo est hébergée ailleurs (comme YouTube), vous pouvez inclure ce lien."
                            ]
                        ]
                    ]
                ],
                "links" => [
                    "0" => "<a href=\"mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca\" title=\"Envoyer un courriel au Nuage de talents.\" target=\"_blank\">talent.cloud-nuage.de.talents@tbs-sct.gc.ca</a>"
                ]
            ]
        ]
    ],
    /* HR Advisor Content */
    "hr" => [
        "title" => "For HR Advisors",
        "hash" => "hr",
        "sections" => [
            "coming-soon" => [
                "title" => "Coming Soon!",
                "hash" => "hr-coming-soon",
                "content" => [
                    "0" => [
                        "type" => "text",
                        "copy" => "HR FAQ content for Talent Cloud is coming soon!"
                    ]
                ]
            ]
        ]
    ]
];
