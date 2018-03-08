INSERT into base_content
(base_content_type_id, base_content_key, base_content_value, base_content_locale_id)
VALUES
(1,'announcement','This site is under construction. The jobs are not in fact real at the moment.',1),
(1,'announcement','Ce site est en construction. Les emplois ne sont pas réels en ce moment.',2)
;

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