<?php

return [
    /*
    * --------------------------------------------------------------------------
    * French Profile-Skills Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are used on applicant profile Edit Skills page
    *
    */
    'title' => 'Mes compétences',
    'skills_section' => [
        'skills_title' => 'Nuage de talents | Candidat : Profil - Mes compétences',
        'soft_title' => 'Mes compétences non spécialisées',
        'hard_title' => 'Mes compétences spécialisées',
        'add_soft_button_label' => 'Ajouter une compétence non spécialisées',
        'add_hard_button_label' => 'Ajouter une compétence spécialisées',
        'null_copy' => "Vous n'avez actuellement aucune compétence sur votre profil. Utilisez le bouton ci-dessus pour ajouter une compétence.",
    ],
    // TODO: move modals to under a ViewComposer's responsability
    'modals' => [
        'delete_skill' => [
            'type' => 'deleteConfirmation',
            'title' => 'Supprimer cette compétence?',
            'content' => [
                '00' => 'Êtes-vous sûr de vouloir supprimer définitivement cette compétence de votre profil?',
                '01' => 'Toutes les applications soumises précédemment conserveront cette compétence. En supprimant cette compétence, vous reconnaissez la suppression définitive de tous les crédits obtenus pour cette compétence.',
            ],
            'id' => 'deleteSkill',
            'action_01' => 'Annuler',
            'action_02' => 'Supprimer',
            'action_02_progress' => 'Agissant...',
        ],
        'need_help' => [
            'title' => 'Rédiger ma candidature',
            'subtext' => [
                '0' => 'L’embauche basée sur les compétences signifie qu’AUCUN curriculum vitae et qu’AUCUNE lettre de présentation ne sont requis. (Sérieusement, il n’y aura aucune possibilité de soumettre l’un ou l’autre de ces documents durant le processus de demande.)',
                '1' => 'Cette section de la demande vous donne l’occasion de raconter votre histoire. Utilisez des exemples précis tirés de votre travail et de votre vie personnelle qui démontrent bien que vous possédez ces compétences. Ensuite, soumettez des références ou des échantillons de travail àl’appui de vos affirmations.',
            ],
            'header_button_text' => 'fermer',
            'close_button_text' => 'J’ai compris!',
            'example_lists' => [
                'dos_example_list' => [
                    'title' => 'Ce qu’il faut faire',
                    'examples' => [
                        'example_1' => [
                            'name' => 'Pertinent, concis, complet.',
                            'content' => 'Par exemple : « J’ai travaillé dans l’équipe du Nuage de talents pendant huit ans en tant que développeur de l’interface utilisateur. Au cours des trois dernières années, j’ai été le développeur principal pour plusieurs applications Web côté client, dont un portail de paiement et un centre d’assistance. Ces deux applications Web ont été conçues avec HTLM5 et JavaScript. En tant que développeur principal, j’ai attribué du travail à 6 développeurs débutants, surveillé leurs progrès et fourni de l’orientation pour des problèmes complexes ».',
                        ],
                    ],
                ],
                'donts_example_list' => [
                    'title'=> 'Ce qu’il ne faut pas faire',
                    'examples' => [
                        'example_1' => [
                            'name' => 'Information trop courte, vague, insuffisante.',
                            'content' => 'Par exemple : « J’ai travaillé dans l’équipe du Nuage de talents pendant 8 ans ».',
                        ],
                        'example_2' => [
                            'name' => 'Information trop longue, étirée, ou non pertinente.',
                            'content' => [
                                '0' => 'Par exemple : « Quand j’étais à l’école primaire, j’ai suivi mon premier cours d’informatique : Mavis Beacon Teaches Typing. J’ai obtenu la meilleure note de la classe et mon enseignante m’a dit qu’elle n’avait jamais vu un enfant de huit ans taper aussi bien. Pendant le reste de l’école publique et jusqu’à l’université, j’utilisais régulièrement Internet et je m’intéressais au codage et à la conception de sites Web. Quand je suis arrivé à l’université, j’ai créé un site Web de base en HTML et j’ai décidé que je voulais désormais suivre des cours d’informatique.',

                                '1' => 'Malheureusement, cela aurait ajouté une année avant ma diplomation, alors j’ai plutôt suivi quelques cours à option en informatique. Une fois diplômé, je me suis mis à la recherche d’un emploi en TI, mais on était en 2008 lors de la crise économique mondiale et donc, mes perspectives d’emploi se limitaient à des postes de service. Après avoir travaillé dans plusieurs restaurants et cafés, j’ai obtenu un emploi dans l’équipe du Nuage de talents en tant que développeur de l’interface utilisateur. J’ai passé les 6 premiers mois à travailler sur de petits éléments d’applications côté client. Pendant les premiers mois, je commençais la journée en regardant la liste de travail qui m’avait été assignée. Si je n’étais pas sûr de la façon d’établir l’ordre de priorité de mes tâches, je demandais au développeur principal qui supervisait mon travail.',

                                '2' => 'Après, je vérifiais habituellement mes courriels, ce que j’essaie de faire seulement quelques fois par jour pour éviter les distractions. Par la suite, je commençais à travailler sur des projets plus assidûment. Bien que cela m’ait permis de développer certaines compétences, je regrettais de ne pas pouvoir voir toute la variété de projets sur lesquels notre ministère travaillait. Une fois, alors que le développeur principal était en vacances et que son remplaçant était malade, j’ai pu agir comme développeur principal pendant deux jours ».',
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
];
