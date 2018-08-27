INSERT INTO applicant_profile_questions VALUES
(1,'My career journey so far...',NULL,NULL),
(2,'My learning journey so far...',NULL,NULL),
(3,'What I bring to a team...',NULL,NULL),
(4,'I work best when...',NULL,NULL),
(5,'I learn best when...',NULL,NULL),
(6,'Types of teams I work well on...',NULL,NULL);

INSERT INTO applicant_profile_question_translations VALUES
(1,1,'en','My career journey so far...','This is your chance to share the unique story of how you got to where you are now… and where you want to go from here.',NULL,NULL),
(2,1,'fr','Mon parcours professionnel jusqu’à présent','Dans cette section, on t’invite à raconter le chemin unique que tu as parcouru jusqu’à maintenant, de même que tes aspirations professionnelles pour l’avenir.',NULL,NULL),
(3,2,'en','My learning journey so far...','Learning never stops, and it comes to all of us in different ways. Whether it comes from formal education or life lessons, knowledge passed on from elders or things you’ve picked up along the way, here’s your chance to share a bit about this side of who you are.',NULL,NULL),
(4,2,'fr','Mon parcours d’apprentissage jusqu’à présent','L’apprentissage ne s’arrête jamais, et il nous parvient à tous de différentes façons. Qu’il s’agisse d’une formation officielle, de leçons de vie ou encore de connaissances transmises par les aînés ou apprises en cours de route, fais-nous connaître ton parcours ici.',NULL,NULL),
(5,3,'en','What I bring to a team...','People take note of the rock star and forget they are nothing without the band. Help potential teams and managers see what unique skills, attributes and knowledge you bring to help a team do great work.',NULL,NULL),
(6,3,'fr','Ce que j’apporte à une équipe','Les gens remarquent les joueurs étoiles et oublient qu’ils ne sont rien sans les autres membres de leur équipe. Dans cette section, on t’invite à indiquer à tes équipes et gestionnaires potentiels les compétences, attributs et connaissances uniques que tu apportes aux équipes auxquelles tu te joins pour les aider à atteindre l’excellence.',NULL,NULL),
(7,4,'en','I work best when...','Introvert? Extrovert? Bit of both? Do you like tight deadlines or do you prefer to have time to process ideas? Do you work well independently or are team products more your thing? Here’s your chance to let a potential manager know what will let you give the team your best.',NULL,NULL),
(8,4,'fr','Je travaille mieux lorsque...','Tu es introverti? Extraverti? Un peu des deux? Tu aimes les délais serrés, ou, au contraire, tu préfères avoir du temps pour étudier tes options? Tu as une bonne autonomie au travail? Tu aimes travailler en équipe? Voici ta chance d’indiquer à tes gestionnaires potentiels les conditions dans lesquelles tu performes le mieux au sein d’une équipe.',NULL,NULL),
(9,5,'en','I learn best when...','Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.',NULL,NULL),
(10,5,'fr','J’apprends mieux lorsque... ','Retiens-tu mieux l’information en la lisant, en la mettant en pratique, ou encore en observant son application? Es-tu de ceux qui apprennent rapidement, ou préfères-tu acquérir une expertise approfondie au fil du temps? Se joindre à une nouvelle équipe signifie apprendre de nouvelles choses. Décris ton style d’apprentissage à tes gestionnaires potentiels pour qu’ils puissent t’aider à te mettre au diapason et à mettre tes talents à contribution rapidement.',NULL,NULL),
(11,6,'en','Types of teams I work well on...','Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.',NULL,NULL),
(12,6,'fr','Les types d’équipe dans lesquels je travaille bien ','Retiens-tu mieux l’information en la lisant, en la mettant en pratique, ou encore en observant son application? Es-tu de ceux qui apprennent rapidement, ou préfères-tu acquérir une expertise approfondie au fil du temps? Se joindre à une nouvelle équipe signifie apprendre de nouvelles choses. Décris ton style d’apprentissage à tes gestionnaires potentiels pour qu’ils puissent t’aider à te mettre au diapason et à mettre tes talents à contribution rapidement.',NULL,NULL);

INSERT INTO application_status VALUES
(1,'Draft',NULL,NULL),
(2,'Submitted',NULL,NULL),
(3,'Requires Action',NULL,NULL),
(4,'Under Review',NULL,NULL),
(5,'Rejected',NULL,NULL);

INSERT INTO application_status_translations VALUES
(1,1,'en','Draft',NULL,NULL),
(2,1,'fr','Provisoire',NULL,NULL),
(3,2,'en','Submitted',NULL,NULL),
(4,2,'fr','Soumis',NULL,NULL),
(5,3,'en','Requires Action',NULL,NULL),
(6,3,'fr','Nécessite une action',NULL,NULL),
(7,4,'en','Under Review',NULL,NULL),
(8,4,'fr','À létude',NULL,NULL),
(9,5,'en','Rejected',NULL,NULL),
(10,5,'fr','Rejeté',NULL,NULL);

INSERT INTO citizenship_declarations VALUES
(1,'Canadian Citizen',NULL,NULL),
(2,'Permanent Resident of Canada',NULL,NULL),
(3,'Open - Work Permit',NULL,NULL),
(4,'Closed - Work Permit',NULL,NULL),
(5,'I am currently not entitled to work in Canada',NULL,NULL);

INSERT INTO citizenship_declaration_translations VALUES
(1,1,'en','Canadian Citizen',NULL,NULL),
(2,1,'fr','Citoyen Canadien',NULL,NULL),
(3,2,'en','Permanent Resident of Canada',NULL,NULL),
(4,2,'fr','Résident Permanent du Canada',NULL,NULL),
(5,3,'en','Open - Work Permit',NULL,NULL),
(6,3,'fr','Open - Permis de Travail',NULL,NULL),
(7,4,'en','Closed - Work Permit',NULL,NULL),
(8,4,'fr','Fermé - Permis de Travail',NULL,NULL),
(9,5,'en','I am currently not entitled to work in Canada',NULL,NULL),
(10,5,'fr','Je nai Actuellement pas le Droit de Travailler au Canada',NULL,NULL);

INSERT INTO criteria_types VALUES
(1,'Essential',NULL,NULL),
(2,'Asset',NULL,NULL);

INSERT INTO criteria_type_translations VALUES
(1,1,'en','Need to Have','',NULL,NULL),
(2,1,'fr','Qualifications essentielles','',NULL,NULL),
(3,2,'en','Nice to Have','',NULL,NULL),
(4,2,'fr','Qualifications constituant un atout','',NULL,NULL);

INSERT INTO departments VALUES
(1,'Treasury Board of Canada Secretariat',NULL,NULL),
(2,'Natural Resources Canada',NULL,NULL),
(3,'Transport Canada',NULL,NULL),
(4,'Environment and Climate Change Canada',NULL,NULL),
(5,'Employment and Social Development Canada',NULL,NULL);

INSERT INTO department_translations VALUES
(1,1,'en','Treasury Board of Canada Secretariat',NULL,NULL),
(2,1,'fr','Secrétariat du Conseil du Trésor du Canada',NULL,NULL),
(3,2,'en','Natural Resources Canada',NULL,NULL),
(4,2,'fr','Ressources naturelles Canada',NULL,NULL),
(5,3,'en','Transport Canada',NULL,NULL),
(6,3,'fr','Transports Canada',NULL,NULL),
(7,4,'en','Environment and Climate Change Canada',NULL,NULL),
(8,4,'fr','Environnement et Changement climatique Canada',NULL,NULL),
(9,5,'en','Employment and Social Development Canada',NULL,NULL),
(10,5,'fr','Emploi et Développement social Canada',NULL,NULL);

INSERT INTO experience_levels VALUES
(1,'1 or Less years',NULL,NULL),
(2,'2 - 3 years',NULL,NULL),
(3,'4 - 5 years',NULL,NULL),
(4,'6 - 7 years',NULL,NULL),
(5,'8 or More years',NULL,NULL);

INSERT INTO experience_level_translations VALUES
(1,'en',1,'1 or less years',NULL,NULL),
(2,'fr',1,'Un an ou moins',NULL,NULL),
(3,'en',2,'2 - 3 years',NULL,NULL),
(4,'fr',2,'2 - 3 ans',NULL,NULL),
(5,'en',3,'4 - 5 years',NULL,NULL),
(6,'fr',3,'4 - 5 ans',NULL,NULL),
(7,'en',4,'6 - 7 years',NULL,NULL),
(8,'fr',4,'6 - 7 ans',NULL,NULL),
(9,'en',5,'8 or more years',NULL,NULL),
(10,'fr',5,'Huit ans ou plus',NULL,NULL);

INSERT INTO file_types VALUES
(1,'word document',NULL,NULL),
(2,'powerpoint presentation',NULL,NULL),
(3,'video',NULL,NULL),
(4,'article publication',NULL,NULL),
(5,'other',NULL,NULL);

INSERT INTO file_type_translations VALUES
(1,1,'en','Word Document',NULL,NULL),
(2,1,'fr','Document Word',NULL,NULL),
(3,2,'en','PowerPoint Presentation',NULL,NULL),
(4,2,'fr','Présentation PowerPoint',NULL,NULL),
(5,3,'en','Video',NULL,NULL),
(6,3,'fr','Vidéo',NULL,NULL),
(7,4,'en','Article Publication',NULL,NULL),
(8,4,'fr','Publication dArticle',NULL,NULL),
(9,5,'en','Other',NULL,NULL),
(10,5,'fr','Autre',NULL,NULL);

INSERT INTO job_terms VALUES
(1,'week',NULL,NULL),
(2,'month',NULL,NULL),
(3,'year',NULL,NULL),
(4,'permanent',NULL,NULL);

INSERT INTO job_term_translations VALUES
(1,1,'week','en',NULL,NULL),
(2,1,'semaine','fr',NULL,NULL),
(3,2,'month','en',NULL,NULL),
(4,2,'mois','fr',NULL,NULL),
(5,3,'year','en',NULL,NULL),
(6,3,'an','fr',NULL,NULL),
(7,4,'permanent','en',NULL,NULL),
(8,4,'permanent','fr',NULL,NULL);

INSERT INTO language_requirements VALUES
(1,'English essential',NULL,NULL),
(2,'French essential',NULL,NULL),
(3,'Bilingual',NULL,NULL);

INSERT INTO language_requirement_translations VALUES
(1,'en',1,'English essential',NULL,NULL),
(2,'fr',1,'Anglais essentiel',NULL,NULL),
(3,'en',2,'French essential',NULL,NULL),
(4,'fr',2,'Français essentiel',NULL,NULL),
(5,'en',3,'Bilingual',NULL,NULL),
(6,'fr',3,'Bilingue',NULL,NULL);

INSERT INTO migrations VALUES
(1,'2018_07_12_145513_create_applicant_profile_answers_table',1),
(2,'2018_07_12_145513_create_applicant_profile_question_translations_table',1),
(3,'2018_07_12_145513_create_applicant_profile_questions_table',1),
(4,'2018_07_12_145513_create_applicants_table',1),
(5,'2018_07_12_145513_create_application_micro_references_table',1),
(6,'2018_07_12_145513_create_application_status_table',1),
(7,'2018_07_12_145513_create_application_status_translations_table',1),
(8,'2018_07_12_145513_create_application_work_samples_table',1),
(9,'2018_07_12_145513_create_citizenship_declaration_translations_table',1),
(10,'2018_07_12_145513_create_citizenship_declarations_table',1),
(11,'2018_07_12_145513_create_criteria_table',1),
(12,'2018_07_12_145513_create_criteria_translations_table',1),
(13,'2018_07_12_145513_create_criteria_type_translations_table',1),
(14,'2018_07_12_145513_create_criteria_types_table',1),
(15,'2018_07_12_145513_create_department_translations_table',1),
(16,'2018_07_12_145513_create_departments_table',1),
(17,'2018_07_12_145513_create_experience_level_translations_table',1),
(18,'2018_07_12_145513_create_experience_levels_table',1),
(19,'2018_07_12_145513_create_file_type_translations_table',1),
(20,'2018_07_12_145513_create_file_types_table',1),
(21,'2018_07_12_145513_create_job_application_answers_table',1),
(22,'2018_07_12_145513_create_job_applications_table',1),
(23,'2018_07_12_145513_create_job_poster_key_task_translations_table',1),
(24,'2018_07_12_145513_create_job_poster_key_tasks_table',1),
(25,'2018_07_12_145513_create_job_poster_question_translations_table',1),
(26,'2018_07_12_145513_create_job_poster_questions_table',1),
(27,'2018_07_12_145513_create_job_poster_translations_table',1),
(28,'2018_07_12_145513_create_job_posters_table',1),
(29,'2018_07_12_145513_create_job_term_translations_table',1),
(30,'2018_07_12_145513_create_job_terms_table',1),
(31,'2018_07_12_145513_create_language_requirement_translations_table',1),
(32,'2018_07_12_145513_create_language_requirements_table',1),
(33,'2018_07_12_145513_create_manager_translations_table',1),
(34,'2018_07_12_145513_create_managers_table',1),
(35,'2018_07_12_145513_create_micro_references_table',1),
(36,'2018_07_12_145513_create_profile_pics_table',1),
(37,'2018_07_12_145513_create_province_translations_table',1),
(38,'2018_07_12_145513_create_provinces_table',1),
(39,'2018_07_12_145513_create_relationship_translations_table',1),
(40,'2018_07_12_145513_create_relationships_table',1),
(41,'2018_07_12_145513_create_security_clearance_translations_table',1),
(42,'2018_07_12_145513_create_security_clearances_table',1),
(43,'2018_07_12_145513_create_skill_declaration_table',1),
(44,'2018_07_12_145513_create_skill_level_translations_table',1),
(45,'2018_07_12_145513_create_skill_levels_table',1),
(46,'2018_07_12_145513_create_team_culture_translations_table',1),
(47,'2018_07_12_145513_create_team_cultures_table',1),
(48,'2018_07_12_145513_create_user_roles_table',1),
(49,'2018_07_12_145513_create_users_table',1),
(50,'2018_07_12_145513_create_work_environments_table',1),
(51,'2018_07_12_145513_create_work_samples_table',1),
(52,'2018_07_12_145513_create_workplace_photo_captions_table',1),
(53,'2018_07_12_145513_create_workplace_photos_table',1),
(54,'2018_07_12_145517_add_foreign_keys_to_applicant_profile_answers_table',1),
(55,'2018_07_12_145517_add_foreign_keys_to_applicant_profile_question_translations_table',1),
(56,'2018_07_12_145517_add_foreign_keys_to_applicants_table',1),
(57,'2018_07_12_145517_add_foreign_keys_to_application_micro_references_table',1),
(58,'2018_07_12_145517_add_foreign_keys_to_application_status_translations_table',1),
(59,'2018_07_12_145517_add_foreign_keys_to_application_work_samples_table',1),
(60,'2018_07_12_145517_add_foreign_keys_to_citizenship_declaration_translations_table',1),
(61,'2018_07_12_145517_add_foreign_keys_to_criteria_table',1),
(62,'2018_07_12_145517_add_foreign_keys_to_criteria_translations_table',1),
(63,'2018_07_12_145517_add_foreign_keys_to_criteria_type_translations_table',1),
(64,'2018_07_12_145517_add_foreign_keys_to_department_translations_table',1),
(65,'2018_07_12_145517_add_foreign_keys_to_experience_level_translations_table',1),
(66,'2018_07_12_145517_add_foreign_keys_to_file_type_translations_table',1),
(67,'2018_07_12_145517_add_foreign_keys_to_job_application_answers_table',1),
(68,'2018_07_12_145517_add_foreign_keys_to_job_applications_table',1),
(69,'2018_07_12_145517_add_foreign_keys_to_job_poster_key_task_translations_table',1),
(70,'2018_07_12_145517_add_foreign_keys_to_job_poster_key_tasks_table',1),
(71,'2018_07_12_145517_add_foreign_keys_to_job_poster_question_translations_table',1),
(72,'2018_07_12_145517_add_foreign_keys_to_job_poster_questions_table',1),
(73,'2018_07_12_145517_add_foreign_keys_to_job_poster_translations_table',1),
(74,'2018_07_12_145517_add_foreign_keys_to_job_posters_table',1),
(75,'2018_07_12_145517_add_foreign_keys_to_job_term_translations_table',1),
(76,'2018_07_12_145517_add_foreign_keys_to_language_requirement_translations_table',1),
(77,'2018_07_12_145517_add_foreign_keys_to_manager_translations_table',1),
(78,'2018_07_12_145517_add_foreign_keys_to_managers_table',1),
(79,'2018_07_12_145517_add_foreign_keys_to_micro_references_table',1),
(80,'2018_07_12_145517_add_foreign_keys_to_profile_pics_table',1),
(81,'2018_07_12_145517_add_foreign_keys_to_province_translations_table',1),
(82,'2018_07_12_145517_add_foreign_keys_to_relationship_translations_table',1),
(83,'2018_07_12_145517_add_foreign_keys_to_security_clearance_translations_table',1),
(84,'2018_07_12_145517_add_foreign_keys_to_skill_declaration_table',1),
(85,'2018_07_12_145517_add_foreign_keys_to_skill_level_translations_table',1),
(86,'2018_07_12_145517_add_foreign_keys_to_team_culture_translations_table',1),
(87,'2018_07_12_145517_add_foreign_keys_to_team_cultures_table',1),
(88,'2018_07_12_145517_add_foreign_keys_to_users_table',1),
(89,'2018_07_12_145517_add_foreign_keys_to_work_environments_table',1),
(90,'2018_07_12_145517_add_foreign_keys_to_work_samples_table',1),
(91,'2018_07_12_145517_add_foreign_keys_to_workplace_photo_captions_table',1),
(92,'2018_07_19_161639_AddDepartmentForeignIdToManager',1),
(93,'2018_08_10_201854_rename_applicant_linkedin_column',1),
(94,'2018_08_16_211708_rename_manager_aboutme_col',1),
(95,'2018_08_17_203204_create_frequency_lookup_table',1),
(96,'2018_08_20_160509_reference_frequency_on_manager',1),
(97,'2018_08_20_163214_reference_frequency_on_work_environment',1);

INSERT INTO province_translations VALUES
(1,1,'en','Alberta',NULL,NULL),
(2,1,'fr','Alberta',NULL,NULL),
(3,2,'en','British Columbia',NULL,NULL),
(4,2,'fr','Colombie-Britannique',NULL,NULL),
(5,3,'en','Manitoba',NULL,NULL),
(6,3,'fr','Manitoba',NULL,NULL),
(7,4,'en','New Brunswick',NULL,NULL),
(8,4,'fr','Nouveau-Brunswick',NULL,NULL),
(9,5,'en','Newfoundland and Labrador',NULL,NULL),
(10,5,'fr','Terre-Neuve-et-Labrador',NULL,NULL),
(11,6,'en','Nova Scotia',NULL,NULL),
(12,6,'fr','Nouvelle-Écosse',NULL,NULL),
(13,7,'en','Northwest Territories',NULL,NULL),
(14,7,'fr','Territoires du Nord-Ouest',NULL,NULL),
(15,8,'en','Nunavut',NULL,NULL),
(16,8,'fr','Nunavut',NULL,NULL),
(17,9,'en','Ontario',NULL,NULL),
(18,9,'fr','Ontario',NULL,NULL),
(19,10,'en','Prince Edward Island',NULL,NULL),
(20,10,'fr','Île-du-Prince-Édouard',NULL,NULL),
(21,11,'en','Quebec',NULL,NULL),
(22,11,'fr','Québec',NULL,NULL),
(23,12,'en','Saskatchewan',NULL,NULL),
(24,12,'fr','Saskatchewan',NULL,NULL),
(25,13,'en','Yukon',NULL,NULL),
(26,13,'fr','Yukon',NULL,NULL);

INSERT INTO provinces VALUES
(1,'Alberta',NULL,NULL),
(2,'British Columbia',NULL,NULL),
(3,'Manitoba',NULL,NULL),
(4,'Newfoundland and Labrador',NULL,NULL),
(5,'New Brunswick',NULL,NULL),
(6,'Nova Scotia',NULL,NULL),
(7,'Nunavut',NULL,NULL),
(8,'North West Territories',NULL,NULL),
(9,'Ontario',NULL,NULL),
(10,'Prince Edward Island',NULL,NULL),
(11,'Quebec',NULL,NULL),
(12,'Saskatchewan',NULL,NULL),
(13,'Yukon',NULL,NULL);

INSERT INTO relationship_translations VALUES
(1,1,'en','Superior',NULL,NULL),
(2,1,'fr','Supérieur',NULL,NULL),
(3,2,'en','Coworker',NULL,NULL),
(4,2,'fr','Collaborateur',NULL,NULL),
(5,3,'en','Subordinate',NULL,NULL),
(6,3,'fr','Subalterne',NULL,NULL);

INSERT INTO relationships VALUES
(1,'superior',NULL,NULL),
(2,'coworker',NULL,NULL),
(3,'subordinate',NULL,NULL);

INSERT INTO security_clearance_translations VALUES
(1,'en',1,'Reliability',NULL,NULL),
(2,'fr',1,'Fiabilité',NULL,NULL),
(3,'en',2,'Secret',NULL,NULL),
(4,'fr',2,'Secret',NULL,NULL),
(5,'en',3,'Top Secret',NULL,NULL),
(6,'fr',3,'Très secret',NULL,NULL);

INSERT INTO security_clearances VALUES
(1,'Reliability',NULL,NULL),
(2,'Secret',NULL,NULL),
(3,'Top Secret',NULL,NULL);

INSERT INTO skill_level_translations VALUES
(1,1,'en','Basic',NULL,NULL),
(2,1,'fr','Débutant',NULL,NULL),
(3,2,'en','Intermediate',NULL,NULL),
(4,2,'fr','Intermédiaire',NULL,NULL),
(5,3,'en','Advanced',NULL,NULL),
(6,3,'fr','Avancé',NULL,NULL),
(7,4,'en','Expert',NULL,NULL),
(8,4,'fr','Expert',NULL,NULL);

INSERT INTO skill_levels VALUES
(1,'Basic',NULL,NULL),
(2,'Intermediate',NULL,NULL),
(3,'Advanced',NULL,NULL),
(4,'Expert',NULL,NULL);

INSERT INTO user_roles VALUES
(1,'applicant',NULL,NULL),
(2,'manager',NULL,NULL);
