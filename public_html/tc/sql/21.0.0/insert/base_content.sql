INSERT into base_content
(base_content_type_id, base_content_key, base_content_value, base_content_locale_id)
VALUES
(1,'accommodationTextStart','Please advise',1),
(1,'accommodationTextStart','S\'il vous plaît donnez votre avis',2),
(1,'accommodationTextEnd','of any accomodations you may require during the selection.',1),
(1,'accommodationTextEnd','de tous les logements dont vous pourriez avoir besoin pendant la sélection.',2),
(1,'jobPosterKeyTasksLabel','Key Tasks', 1),
(1,'jobPosterKeyTasksLabel','Tâches clés', 2),
(1,'jobPosterCoreCompetenciesLabel','Essential Criteria', 1),
(1,'jobPosterCoreCompetenciesLabel','Critères essentiels', 2),
(1,'jobPosterDevelopingCompetenciesLabel','Asset Criteria', 1),
(1,'jobPosterDevelopingCompetenciesLabel','Critères d\'actifs', 2),
(1,'jobPosterHiringManagerLabel','Hiring Manager', 1),
(1,'jobPosterHiringManagerLabel','Gestionnaire d\'embauche', 2),
(1,'jobPosterClearanceLevelLabel','Security clearance level:', 1),
(1,'jobPosterClearanceLevelLabel','Niveau d\'autorisation de sécurité :', 2),
(1,'jobPosterStartDateLabel','Target start date:', 1),
(1,'jobPosterStartDateLabel','Niveau d\'autorisation de sécurité :', 2),
(1,'jobPosterJobLevelLabel','Classification:', 1),
(1,'jobPosterJobLevelLabel','Classification :', 2),
(1,'jobPosterLanguageLabel','Language:', 1),
(1,'jobPosterLanguageLabel','Langage :', 2),
(1,'jobPosterTermLabel','Duration:', 1),
(1,'jobPosterTermLabel','Duration :', 2)
;

UPDATE `talentcloud`.`base_content` SET `base_content_value`='Salary range:' WHERE `base_content_id`='0000000052';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Offre d\'emploi :' WHERE `base_content_id`='0000000053';

UPDATE `talentcloud`.`base_content` SET `base_content_value`='Your Manager' WHERE `base_content_id`='0000000396';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Votre gestionnaire' WHERE `base_content_id`='0000000397';
