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
        'title' => 'Nuage de talents',
        'tagline' => 'Il est désormais plus facile de postuler un emploi au gouvernement.',
        'pilot' => 'BETA'
    ],
    'slogan' => [
        'copy' => 'Pas de lettre de présentation. Aucun curriculum vitae. Créez un profil de vos compétences et de votre expérience tout en gagnant du temps pour postuler des emplois gouvernementaux qui vous inspirent.',
        'link' => [
            'title' => 'Apprenez-en davantage sur le fonctionnement du Nuage de talents.',
            'href' => '#how',
            'label' => 'Pour en savoir davantage'
        ]
    ],
    'browse' => [
        'title' => 'Emplois récemment affichés',
        'browse_link' => [
            'title' => 'Voir tous les postes affichés dans le Nuage de talents.',
            'href' => '/jobs',
            'label' => 'Parcourir tous les emplois'
        ],
        'null' => 'D’autres emplois seront bientôt affichés!'
    ],
    'hiw' => [
        'title' => 'Comment fonctionne le Nuage de talents',
        'steps' => [
            '1' => '1. Créez un compte',
            '2' => '2. Présentez une demande',
            '3' => '3. Réutilisez',
            '4' => '4. Faites-vous reconnaître'
        ],
        'step_content' => [
            '1' => [
                'title' => 'Étape 1 : Créez un compte',
                'summary' => 'Your account contains your experience, skills, references, and samples of your work.',
                'copy' => 'Pour ouvrir un compte de Nuage de talents, vous n’avez qu’à fournir votre nom et votre adresse de courriel (puis choisir votre mot de passe). Vous n’avez pas besoin d’un compte pour parcourir les emplois que nous avons publiés, mais vous en aurez besoin pour postuler. Même si vous ne voyez pas d’emploi qui vous convient, vous pourriez vouloir remplir votre profil de candidat pour vous donner une longueur d’avance lorsque vous voyez un emploi qui semble parfait.'
            ],
            '2' => [
                'title' => 'Étape 2 : Présentez une demande',
                'summary' => 'TBD',
                'copy' => "Vous constaterez qu’il n’y a aucun endroit où télécharger votre curriculum vitæ ou votre lettre de présentation dans le cadre de notre processus de demande. Ce n’est pas un pépin, nous l’avons fait intentionnellement! Au lieu de nous parler de votre expérience, nous voulons que vous nous parliez de vous-même et que vous nous disiez en quoi vous démontrez les compétences nécessaires pour le poste. Nous croyons que cela donnera aux candidats ayant un parcours de vie ou de carrière non conventionnel l’occasion de démontrer en quoi ils sont qualifiés, plutôt que d’être systématiquement éliminés parce qu’ils n’ont pas suivi le chemin le plus emprunté.\n\nCette façon de faire est probablement très différente des autres formulaires de demande d’emploi que vous avez remplis, alors veuillez consulter notre page FAQ pour en savoir plus sur la %levels%.",
                'links' => [
                    'levels' => "<a href='faq#levels' title='Apprenez-en davantage sur les niveaux de compétences dans le Nuage de talents.' target='_blank'>façon de trouver votre niveau de compétence</a>"
                ]
            ],
            '3' => [
                'title' => 'Étape 3 : Réutilisez',
                'summary' => 'TBD',
                'copy' => "Lorsque vous remplissez un formulaire de demande d’emploi typique, vous l’envoyez dans un vide et ne le revoyez plus jamais. Cela signifie qu’il vous incombe de sauvegarder vos anciennes demandes d’emploi et de chercher dans des fichiers et des dossiers si vous voulez réutiliser une partie de ce contenu.\n\nLorsque vous remplissez un formulaire de demande d’emploi dans le Nuage de talents, l’information ne disparaît pas lorsque vous la soumettez. Nous la stockons pour vous afin que vous puissiez vous en servir dans des demandes d’emploi futures dans le Nuage de talents. Vous avez déjà rédigé un exposé génial qui démontre que vous continuez de vous instruire? Vous pouvez l’utiliser de nouveau, ou même le modifier légèrement, lorsque cette compétence est indiquée dans un autre emploi pour lequel vous voulez postuler."
            ],
            '4' => [
                'title' => 'Étape 4 : Faites-vous reconnaître',
                'summary' => 'TBD',
                'copy' => "Le Nuage de talents vous donne maintenant l’occasion de vous démarquer dans votre demande d’emploi. Cela constitue un grand changement dans la façon dont le gouvernement reconnaît le talent, mais nous nous employons à réaliser quelque chose d’encore plus grand.\n\nLorsque vous postulez un emploi par l’intermédiaire du Nuage de talents, c’est vous qui nous dites en quoi vous démontrez les compétences requises pour le poste. Si votre demande est bien rédigée, il se pourrait que vous soyez convoqué à une entrevue ou qu’on vous demande de faire un examen à la maison. Supposons que vous connaissez beaucoup de succès, mais que vous manquez d’obtenir l’emploi de peu. Nous croyons que ce succès a de la valeur et nous nous efforçons de le reconnaître.\n\nNous voulons permettre aux gestionnaires de donner un titre de compétence, ou un insigne, à ceux qui réussissent aux évaluations (comme un examen à la maison), même s’ils n’obtiennent pas l’emploi. Si vous obtenez l’un de ces titres de compétence, vous pourriez le présenter dans des demandes futures, et les gestionnaires pourraient choisir de l’accepter plutôt que de refaire un examen semblable.\n\nSupposons que vous obtenez l’emploi, que vous démontrez les compétences que vous dites posséder et que vous en acquérez de nouvelles. Votre gestionnaire pourrait vous donner des titres de compétence pour les compétences que vous avez démontrées en cours d’emploi à la fin de votre mandat. On pourrait le considérer comme un nouveau type de référence d’emploi qui n’exige pas d’envoyer un courriel ou de faire un appel téléphonique.\n\nNous sommes encore à établir les détails, mais nous tenons résolument à nous assurer que vos titres de compétences vous appartiennent et que vous pouvez les utiliser à la fois à l’intérieur et à l’extérieur du gouvernement.\n\nPour en apprendre davantage, consultez notre démonstration de faisabilité délivrant des %certs%.",
                'links' => [
                    'certs' => "<a href='https://ouvert.canada.ca/fr/blog/assurer-lavenir-de-la-mobilite-des-talents-au-gouvernement-du-canada' title='Renseignez-vous sur les justificatifs d’identité validés par blockcert.' target='_blank'>authentifiants validés appelés Blockcerts aux agents libres du gouvernement du Canada</a>"
                ]
            ]
        ]
    ],
    'bts' => [
        'title' => 'Dans les coulisses',
        'intro' => 'Le Nuage de talents est différent à bien des égards. Nous sommes ouverts et itératifs, nous tentons de réduire les préjugés en matière d’embauche et nous faisons de notre mieux pour concevoir en pensant à tout le monde.',
        'items' => [
            '1' => [
                'title' => 'La conception :',
                'copy' => 'Le Nuage de talents est conçu en fonction de la recherche des utilisateurs. Nous parlons à des gens comme vous : les candidats, les gestionnaires et les conseillers en RH pour les informer des caractéristiques nécessaires et de la façon dont elles devraient être utilisées. Tout ce que nous élaborons est conçu pour être accessible à tous.',
                'links' => [
                    '1' => [
                        'link' => 'https://github.com/GCTC-NTGC/TalentCloud',
                        'title' => 'Consultez la page Github du Nuage de talents.',
                        'label' => 'Notre code sur Github'
                    ]
                ]
            ],
            '2' => [
                'title' => 'Le financement :',
                'copy' => 'Le Nuage de talents du gouvernement du Canada est une initiative expérimentale qui repose uniquement sur l’aide financière des ministères fédéraux participants qui s’engagent à créer une solution de rechange au modèle traditionnel des RH.',
                'links' => [
                    '1' => [
                        'link' => '/faq/#partners',
                        'title' => 'Apprenez-en davantage sur le financement du Nuage de talents.',
                        'label' => 'Pour en savoir davantage'
                    ]
                ]
            ],
            '3' => [
                'title' => 'Notre mode de communication :',
                'copy' => 'Le Nuage de talents consiste à travailler ouvertement. Notre code source se trouve sur GitHub et vous pouvez communiquer avec nous en tout temps pour en apprendre davantage ou même participer à quelques essais auprès des utilisateurs afin de nous aider à continuer d’améliorer la plateforme.',
                'links' => [
                    '1' => [
                        'link' => 'https://twitter.com/gc_talent',
                        'title' => 'Consultez le Nuage de talents sur Twitter.',
                        'label' => 'Twitter'
                    ],
                    '2' => [
                        'link' => 'https://gccollab.ca/groups/profile/19750/entalent-cloud-nuage-de-talentsfrnuage-de-talents-talent-cloud',
                        'title' => 'Consultez le Nuage de talents sur GCcollab.',
                        'label' => 'GCcollab'
                    ],
                    '3' => [
                        'link' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
                        'title' => 'Courriel du Nuage de talents.',
                        'label' => 'Email'
                    ]
                ]
            ]
        ]
    ],
    'blogs' => [
        '1' => [
            'title' => 'Vous pouvez maintenant naviguer dans l’effectif',
            'link' => [
                'title' => 'Lire le billet de blogue de Val.',
                'anchor' => 'https://gccollab.ca/blog/view/2325565/enwe-did-it-canadas-free-agents-receive-validated-skill-credentials-anchored-on-the-blockchainfrlearning-machine-et-le-nuage-de-talents-u00e9mettent-des-justificatifs-du2019identitu00e9-ancru00e9s-dans-une-chau00eene-de-blocs-aux-agents-libres-du-canada-u00e0-titre-de-validation-de-principe',
                'label' => 'Lire sur GCcollab'
            ],
            'date' => 'Mardi 28 Mai 2019',
            'author' => 'Rédigé par : Val Thomas',
            'eta' => 'Une lecture d’environ 2 minutes.',
            'summary' => 'Dans le cadre d’un projet de mobilité des talents d’un an mené par le Nuage de talents et l’Unité de l’identité numérique du Secrétariat du Conseil du Trésor du Canada (SCT),  en partenariat avec la machine à apprendre, le gouvernement du Canada a délivré des authentifiants appelés Blockcerts et des chaînes de blocs à ses « agents libres »...'
        ],
        '2' => [
            'title' => 'Pouvons-nous parler de gestes symboliques?',
            'link' => [
                'title' => 'Lire le billet de blogue de Meagan.',
                'anchor' => 'https://medium.com/@meagan.commonda/et-si-on-abordait-la-question-de-gestes-purement-symboliques-88990c50d85c',
                'label' => 'Lire sur Medium'
            ],
            'date' => 'Lundi 15 Avril 2019',
            'author' => 'Rédigé par : Meagan Commonda',
            'eta' => 'Une lecture d’environ 6 minutes.',
            'summary' => 'Et oui, l’éléphant dans la pièce qui prend tellement de place et personne ne veut être celui ou celle qui aborde le sujet. Cela arrive tous les jours, parfois sous des formes latentes, et d’autres fois, c’est fort, flagrant et tapageur. Oui, nous allons parler de gestes symboliques...'
        ],
        '3' => [
            'title' => 'GovCloud – Premières impressions',
            'link' => [
                'title' => 'Lire le billet de blogue de Lauren.',
                'anchor' => 'https://gccollab.ca/blog/view/1740665/engovcloud-first-impressionsfrgovcloud-premiu00e8res-impressions',
                'label' => 'Lire sur GCcollab'
            ],
            'date' => 'Lundi 21 Janvier 2019',
            'author' => 'Rédigé par : Lauren Hunter',
            'eta' => 'Une lecture d’environ 5 minutes.',
            'summary' => 'Lorsque j’ai entendu parler pour la première fois du concept GovCloud de Deloitte, mon premier réflexe a été de dire : « Je ne comprends pas. ». Cela remonte à l’été 2013. Dans les premiers temps d’Objectif 2020, j’avais obtenu la permission du sous-ministre de Ressources naturelles Canada (RNCan) pour former un ensemble d’équipes spéciales (par rapport à...'
        ]
    ],
    'cta' => [
        'copy' => 'Vous ne pouvez pas trouver l’emploi que vous cherchez dans le Nuage de talents? %gcjobs% pour connaître d’autres possibilités dans le secteur public. Aux étudiants, n’oubliez pas de %fswep%!',
        'copy_links' => [
            'gcjobs' => "<a href='https://emploisfp-psjobs.cfp-psc.gc.ca/psrs-srfp/applicant/page2440?fromMenu=true&toggleLanguage=en' title='Consultez Emplois GC pour obtenir de plus amples renseignements.' target='_blank'>Consultez Emplois GC</a>",
            'fswep' => "<a href='https://www.canada.ca/en/public-service-commission/jobs/services/recruitment/students/federal-student-work-program.html' title='Consultez le Programme fédéral d'expérience de travail étudiant (PFETE) pour obtenir de plus amples renseignements sur les possibilités offertes aux étudiants.' target='_blank'>consulter aussi le Programme fédéral d’expérience de travail étudiant</a>"
        ]
    ],
    'home_title' => 'Nuage de talents | Candidat : Accueil',
    'about_card_copy_01' => 'De vrais emplois.',
    'about_card_copy_02' => 'Une plateforme expérimentale.',
    'about_cta' => "Le Nuage de talents du gouvernement du canada est une plateforme expérimentale d'embauche qui vise le « travail par projet » ou temporaire.  Au cours des prochains mois, le gouvernement affichera des offres sympathiques dans les domaines du numérique, de la technologie et de l'expérience utilisateur.",
    'about_copy' => 'Afin que vous puissiez réfléchir à votre contribution avant de postuler, chaque offre contiendra des informations sur sur le travail à effectuer, la composition de l’équipe et le gestionnaire responsable.',
    'about_copy_2' => 'Testez la plateforme et dites-nous ce que vous en pensez.',
    'about_copy_3' => 'Aidez-nous à bâtir un nouveau modèle d’embauche pour le gouvernement du Canada.',
    'how_title' => 'Comment ça marche?',
    'how_intro' => 'Le Nuage de talents vous permet d’entrer en contact avec des équipes qui recherchent vos compétences uniques pour faire une différence dans la vie des Canadiens.',
    'how_intro_2' => 'Tous les emplois affichés sur le Nuage de talents sont à durée déterminée et ouverts au public.',
    'how_intro_3' => 'Travaillez pour le bien commun, en bénéficiant d’un régime de pension et d’avantages sociaux.',
    'how_step01_title' => 'Soyez maître de votre histoire',
    'how_step01_copy' => 'Chaque personne est unique. Prenez part à un processus de sélection qui vous permettra de démontrer vos compétences à votre façon. Ayez accès aux détails des offres disponibles et choisissez celle qui vous convient le mieux.',
    'how_step02_title' => 'Faites-vous reconnaître',
    'how_step02_copy' => 'Grâce au Nuage de talents, vous pouvez acquérir des compétences, des connaissances et des capacités, en plus de valider celles que vous possédez déjà, en postulant des emplois, et de même qu’en cours d’emploi. Qu’est-ce que cela signifie? Les qualifications obtenues par l’entremise du Nuage de talents sont reconnues et peuvent être transférées à d’autres demandes d’emploi… et peut-être à l’ensemble du Canada, un jour.',
    'how_step03_title' => 'Contribuez',
    'how_step03_copy' => "Trouvez un travail significatif qui aura un impact sur la vie des Canadiens et faites partie intégrante de l'effort de conception d'une nouvelle plateforme pour le travail par projet au gouvernement.",
    'how_step04_title' => 'FR Credentialing TBD',
    'how_step04_copy' => 'FR Credentialing Copy TBD',
    'how_step04_link' => '/fr/credentialing',
    'how_step04_link_title' => 'FR Learn more about credentialing on Talent Cloud.',
    'how_step04_link_label' => 'FR Learn More',
    'how_copy' => "Nous désirons que le Nuage de talent permette à un plus grand nombre de Canadiens d'avoir la chance de travailler au gouvernement. Nous souhaitons que la diversité des talents apporte de nouvelles idées qui façonneront les programmes et les services partout au Canada.",
    'how_cta_copy' => "Vous voulez discuter d'un éventuel partenariat?",
    'how_cta_link' => 'talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
    'how_cta_title' => 'Communiquez avec nous!',
    'how_cta_label' => 'Contactez-nous!',
    'team_title' => 'Notre équipe',
    'team_copy' => "Nous sommes une petite équipe en pleine croissance composée de fonctionnaires passionnés par l'avenir des talents au Canada. Apprenez-en davantage sur nous et apportez votre propre contribution au Nuage de talent du GC en vous joignant à nous sur l'un des canaux suivants :",
    'team_button_gccollab_link' => 'https://gccollab.ca/groups/profile/19750/talent-cloud-nuage-de-talent',
    'team_button_gccollab_title' => "Visitez l'équipe sur GCcollab.",
    'team_button_gccollab_label' => 'GCcollab',
    'team_button_twitter_link' => 'https://twitter.com/GC_Talent',
    'team_button_twitter_title' => "Visitez l'équipe sur Twitter.",
    'team_button_twitter_label' => 'Twitter',
    'team_button_email_link' => 'talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
    'team_button_email_title' => 'Contactez-nous par courriel.',
    'team_button_email_label' => 'Courriel'
];
