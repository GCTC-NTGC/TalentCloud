INSERT into base_content
(base_content_type_id, base_content_key, base_content_value, base_content_locale_id)
VALUES
(1,'browseLink','Browse Jobs',1),
(1,'browseLink','Parcourir les travaux',2),
(1,'gctc','GC Talent Cloud',1),
(1,'gctc','Nuage de talents du GC',2),
(1,'canadaLink','Visit Canada.ca',1),
(1,'canadaLink','Visiter Canada.ca',2),
(1,'canadaLinkHref','https://www.canada.ca/en.html',1),
(1,'canadaLinkHref','https://www.canada.ca/fr.html',2),
(1,'taglineMain','People want meaningful work.',1),
(1,'taglineMain','Les gens veulent un travail significatif.',2),
(1,'taglineSecondary','The jobs are real. The platform is experimental.',1),
(1,'taglineSecondary','Les emplois sont réels. La plateforme est expérimentale.',2),
(1,'taglineTertiary','Help us build a new hiring model for the Government of Canada.',1),
(1,'taglineTertiary','Aidez-nous à créer un nouveau modèle d\'embauche pour le gouvernement du Canada.',2),
(1,'howItWorksHeading','How It Works',1),
(1,'howItWorksHeading','Comment ça marche',2),
(1,'howItWorksLead','GC Talent Cloud connects you to teams and projects where you can use your unique skills to make a difference in the lives of Canadians.',1),
(1,'howItWorksLead','Nuage de talents GC vous met en relation avec des équipes et des projets où vous pouvez utiliser vos compétences uniques pour faire une différence dans la vie des Canadiens.',2),
(1,'logoSrc','/images/talent-cloud-logo_full.png',1),
(1,'logoSrc','/images/talent-cloud-logo_FR.png',2),
(1,'logoAlt','GC Talent Cloud graphic',1),
(1,'logoAlt','Graphique de Nuage de talents du GC',2),
(1,'browseTitle','Browse Jobs',1),
(1,'browseTitle','Parcourir les travaux',2),
(1,'ownYourStory','Own Your Story',1),
(1,'ownYourStory','Possédez votre histoire',2),
(1,'ownYourStoryText','Everyone is unique. Participate in a job selection process that lets you tell your story your way.',1),
(1,'ownYourStoryText','Tout le monde est unique. Participez à un processus de sélection d\'emploi qui vous permet de raconter votre histoire à votre façon.',2),
(1,'getFound','Get Found',1),
(1,'getFound','Trouvé',2),
(1,'getFoundText','Learn about the work environment and teams that are part of the jobs you’re interested in. Showcase your unique skills and experiences for hiring managers across the country.',1),
(1,'getFoundText','Renseignez-vous sur l\'environnement de travail et les équipes qui font partie des emplois qui vous intéressent. Présentez vos compétences et expériences uniques aux gestionnaires d\'embauche à travers le pays.',2),
(1,'contribute','Contribute',1),
(1,'contribute','Contribuer',2),
(1,'contributeText','Find meaningful work that has an impact on Canadians, and be part of the effort to design a better hiring process for Government jobs.',1),
(1,'contributeText','Trouver un travail significatif qui a un impact sur les Canadiens et faire partie de l\'effort visant à concevoir un meilleur processus d\'embauche pour les emplois du gouvernement.',2),
(1,'howItWorksLeadOut','We want GC Talent Cloud to be a drive engine that allows more Canadians to have a chance to work in Government. We want diverse talent to bring new ideas that will shape programs and services across Canada.',1),
(1,'howItWorksLeadOut','Nous voulons que Nuage de talents du GC soit un moteur qui permette à plus de Canadiens de travailler au gouvernement. Nous voulons que les talents divers apportent de nouvelles idées qui façonneront les programmes et les services partout au Canada.',2),
(1,'howItWorksLast','Interested in chatting about a potential partnership?',1),
(1,'howItWorksLast','Intéressé à discuter d\'un partenariat potentiel?',2),
(1,'contactUs','Contact Us!',1),
(1,'contactUs','Contactez-nous!',2),
(1,'transcript','Transcript',1),
(1,'transcript','Transcription',2),
(1,'ourTeam','Our Team',1),
(1,'ourTeam','Notre équipe',2),
(1,'ourTeamText','We are a small but growing team of public servants passionate about the future of talent in Canada. Learn more about us and make your own contribution to GC Talent Cloud by joining us on one of these channels.',1),
(1,'ourTeamText','Nous sommes une petite équipe grandissante de fonctionnaires passionnés par l\'avenir des talents au Canada. En savoir plus sur nous et apporter votre propre contribution à Nuage de talent du GC en nous rejoignant sur l\'un de ces canaux.',2),
(1,'announcement','This site is under construction. The jobs are not in fact real at the moment.',1),
(1,'announcement','Ce site est en construction. Les emplois ne sont pas réels en ce moment.',2)
;


UPDATE `talentcloud`.`base_content` SET `base_content_value`='Home' WHERE `base_content_key`='homeLink' AND `base_content_locale_id`='0000000001';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Accueil' WHERE `base_content_key`='homeLink' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Aller à l\'étape 2' WHERE `base_content_key`='goToStep2' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Aller à l\'étape 1' WHERE `base_content_key`='goToStep1' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Aller à l\'étape 3' WHERE `base_content_key`='goToStep3' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Aller à la revue' WHERE `base_content_key`='goToReview' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Créer une affiche d\'emploi' WHERE `base_content_key`='createJobPosterWindowTitle' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Créer / Modifier un profil' WHERE `base_content_key`='createProfileWindowTitle' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Champs obligatoires' WHERE `base_content_key`='required' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Soumettre' WHERE `base_content_key`='submit' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Soumettre pour publier une nouvelle affiche d\'emploi.' WHERE `base_content_key`='createJobPosterSubmitInstructions' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Informations générales' WHERE `base_content_key`='generalInformation' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='À propos de moi' WHERE `base_content_key`='aboutMe' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Un peu à propos de moi' WHERE `base_content_key`='aLittleBitAboutMe' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Ce dont je suis le plus fier dans ma carrière' WHERE `base_content_key`='whatImMostProudOfInCareer' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Position' WHERE `base_content_key`='position' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Département' WHERE `base_content_key`='department' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Branche' WHERE `base_content_key`='branch' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Division' WHERE `base_content_key`='division' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Style de leadership' WHERE `base_content_key`='leadershipStyle' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Mon style de leadership' WHERE `base_content_key`='myLeadershipStyle' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Mon approche de l\'apprentissage et du développement des employés' WHERE `base_content_key`='myApproachToEmployee' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Mes attentes envers les employés' WHERE `base_content_key`='myExpectationsOfEmployees' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Mon approche de la prise de décision' WHERE `base_content_key`='myApproachToDecisionMaking' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='L\'expérience professionnelle' WHERE `base_content_key`='workExperience' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Éducation' WHERE `base_content_key`='education' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='À quelle fréquence examinez-vous le travail de votre équipe avant de le partager?' WHERE `base_content_key`='howOftenDoYouReview' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='À quelle fréquence arrivez-vous tôt ou tardez-vous à faire du travail supplémentaire?' WHERE `base_content_key`='howOftenDoYouStayLate' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Presque jamais' WHERE `base_content_key`='almostNever' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Rarement' WHERE `base_content_key`='rarely' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Parfois' WHERE `base_content_key`='sometimes' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Habituellement' WHERE `base_content_key`='usually' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Presque toujours' WHERE `base_content_key`='almostAlways' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Nom' WHERE `base_content_key`='name' AND `base_content_locale_id`='0000000002';