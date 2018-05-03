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
(1,'jobPosterTermLabel','Duration :', 2),
(1,'jobPosterTeamNarrativeText_label','About the team:', 1),
(1,'jobPosterTeamNarrativeText_label','À propos de l\'équipe :', 2),
(1,'jobPosterOperatingContext_label','Our operating context:', 1),
(1,'jobPosterOperatingContext_label','Notre contexte d\'exploitation :', 2),
(1,'jobPosterWhatWeValue_label','What we value:', 1),
(1,'jobPosterWhatWeValue_label','Ce que nous apprécions :', 2),
(1,'jobPosterHowWeWork_label','How we work:', 1),
(1,'jobPosterHowWeWork_label','Comment nous travaillons :', 2),
/* Navigation Links */
(1,'navigationHomeLink','Home',1),
(1,'navigationHomeLink','Accueil',2),
(1,'navigationBrowseLink','Browse Jobs',1),
(1,'navigationBrowseLink','Parcourir Les Travaux',2),
(1,'navigationDashboardLink','My Applications',1),
(1,'navigationDashboardLink','Mes applications',2),
(1,'navigationProfileLink','My Profile',1),
(1,'navigationProfileLink','Mon Profil',2),
(1,'navigationRegisterLink','Register',1),
(1,'navigationRegisterLink','Enregistrer',2),
(1,'navigationLoginLink','Login',1),
(1,'navigationLoginLink','S\'Identifier',2),
(1,'navigationLogoutLink','Logout',1),
(1,'navigationLogoutLink','Se Déconnecter',2),
(1,'navigationPosterLink','Job Poster',1),
(1,'navigationPosterLink','Mes affiches',2),
/* Subpage Titles */
(1,'browseHeroTitle','Browse Jobs', 1),
(1,'browseHeroTitle','Parcourir les travaux', 2),
(1,'dashboardHeroTitle','My Applications', 1),
(1,'dashboardHeroTitle','Mes applications', 2),
(1,'profileHeroTitle','My Profile', 1),
(1,'profileHeroTitle','Mon profil', 2),
(1,'applicationHeroTitle','My Job Application', 1),
(1,'applicationHeroTitle','Ma demande d\'emploi', 2),
(1,'managerProfileHeroTitle','Manager Profile', 1),
(1,'managerProfileHeroTitle','Profil du gestionnaire', 2),
(1,'posterHeroTitle','My Job Posters', 1),
(1,'posterHeroTitle','Mes affiches', 2),
(1,'faqHeroTitle','FAQs &amp; Information', 1),
(1,'faqHeroTitle','FAQ et informations', 2)
;

UPDATE `talentcloud`.`base_content` SET `base_content_value`='Salary range:' WHERE `base_content_id`='0000000052';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Offre d\'emploi :' WHERE `base_content_id`='0000000053';

UPDATE `talentcloud`.`base_content` SET `base_content_value`='Your Manager' WHERE `base_content_id`='0000000396';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Votre gestionnaire' WHERE `base_content_id`='0000000397';

UPDATE `talentcloud`.`base_content` SET `base_content_value`='Taille d\'équippe :' WHERE `base_content_id`='0000000221';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Team size:' WHERE `base_content_id`='0000000220';
