INSERT INTO applicant_profile_questions VALUES
(1,'career_journey',current_timestamp,current_timestamp),
(2,'learning_journey',current_timestamp,current_timestamp),
(3,'bring_to_team',current_timestamp,current_timestamp),
(4,'work_best_when',current_timestamp,current_timestamp),
(5,'learn_best_when',current_timestamp,current_timestamp),
(6,'types_of_teams',current_timestamp,current_timestamp);

INSERT INTO applicant_profile_question_translations VALUES
(1,1,'en','My career journey so far...','This is your chance to share the unique story of how you got to where you are now… and where you want to go from here.',current_timestamp,current_timestamp),
(2,1,'fr','Mon parcours professionnel jusqu’à présent','Dans cette section, on t’invite à raconter le chemin unique que tu as parcouru jusqu’à maintenant, de même que tes aspirations professionnelles pour l’avenir.',current_timestamp,current_timestamp),
(3,2,'en','My learning journey so far...','Learning never stops, and it comes to all of us in different ways. Whether it comes from formal education or life lessons, knowledge passed on from elders or things you’ve picked up along the way, here’s your chance to share a bit about this side of who you are.',current_timestamp,current_timestamp),
(4,2,'fr','Mon parcours d’apprentissage jusqu’à présent','L’apprentissage ne s’arrête jamais, et il nous parvient à tous de différentes façons. Qu’il s’agisse d’une formation officielle, de leçons de vie ou encore de connaissances transmises par les aînés ou apprises en cours de route, fais-nous connaître ton parcours ici.',current_timestamp,current_timestamp),
(5,3,'en','What I bring to a team...','People take note of the rock star and forget they are nothing without the band. Help potential teams and managers see what unique skills, attributes and knowledge you bring to help a team do great work.',current_timestamp,current_timestamp),
(6,3,'fr','Ce que j’apporte à une équipe','Les gens remarquent les joueurs étoiles et oublient qu’ils ne sont rien sans les autres membres de leur équipe. Dans cette section, on t’invite à indiquer à tes équipes et gestionnaires potentiels les compétences, attributs et connaissances uniques que tu apportes aux équipes auxquelles tu te joins pour les aider à atteindre l’excellence.',current_timestamp,current_timestamp),
(7,4,'en','I work best when...','Introvert? Extrovert? Bit of both? Do you like tight deadlines or do you prefer to have time to process ideas? Do you work well independently or are team products more your thing? Here’s your chance to let a potential manager know what will let you give the team your best.',current_timestamp,current_timestamp),
(8,4,'fr','Je travaille mieux lorsque...','Tu es introverti? Extraverti? Un peu des deux? Tu aimes les délais serrés, ou, au contraire, tu préfères avoir du temps pour étudier tes options? Tu as une bonne autonomie au travail? Tu aimes travailler en équipe? Voici ta chance d’indiquer à tes gestionnaires potentiels les conditions dans lesquelles tu performes le mieux au sein d’une équipe.',current_timestamp,current_timestamp),
(9,5,'en','I learn best when...','Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.',current_timestamp,current_timestamp),
(10,5,'fr','J’apprends mieux lorsque... ','Retiens-tu mieux l’information en la lisant, en la mettant en pratique, ou encore en observant son application? Es-tu de ceux qui apprennent rapidement, ou préfères-tu acquérir une expertise approfondie au fil du temps? Se joindre à une nouvelle équipe signifie apprendre de nouvelles choses. Décris ton style d’apprentissage à tes gestionnaires potentiels pour qu’ils puissent t’aider à te mettre au diapason et à mettre tes talents à contribution rapidement.',current_timestamp,current_timestamp),
(11,6,'en','Types of teams I work well on...','Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.',current_timestamp,current_timestamp),
(12,6,'fr','Les types d’équipe dans lesquels je travaille bien ','Retiens-tu mieux l’information en la lisant, en la mettant en pratique, ou encore en observant son application? Es-tu de ceux qui apprennent rapidement, ou préfères-tu acquérir une expertise approfondie au fil du temps? Se joindre à une nouvelle équipe signifie apprendre de nouvelles choses. Décris ton style d’apprentissage à tes gestionnaires potentiels pour qu’ils puissent t’aider à te mettre au diapason et à mettre tes talents à contribution rapidement.',current_timestamp,current_timestamp);

INSERT INTO application_status VALUES
(1,'draft',current_timestamp,current_timestamp),
(2,'submitted',current_timestamp,current_timestamp),
(3,'requires_action',current_timestamp,current_timestamp),
(4,'under_review',current_timestamp,current_timestamp),
(5,'rejected',current_timestamp,current_timestamp);

INSERT INTO application_status_translations VALUES
(1,1,'en','Draft',current_timestamp,current_timestamp),
(2,1,'fr','Provisoire',current_timestamp,current_timestamp),
(3,2,'en','Submitted',current_timestamp,current_timestamp),
(4,2,'fr','Soumis',current_timestamp,current_timestamp),
(5,3,'en','Requires Action',current_timestamp,current_timestamp),
(6,3,'fr','Nécessite une action',current_timestamp,current_timestamp),
(7,4,'en','Under Review',current_timestamp,current_timestamp),
(8,4,'fr','À létude',current_timestamp,current_timestamp),
(9,5,'en','Rejected',current_timestamp,current_timestamp),
(10,5,'fr','Rejeté',current_timestamp,current_timestamp);

INSERT INTO citizenship_declarations VALUES
(1,'citizen',current_timestamp,current_timestamp),
(2,'permanent_resident',current_timestamp,current_timestamp),
(3,'work_permit_open',current_timestamp,current_timestamp),
(4,'work_permit_closed',current_timestamp,current_timestamp),
(5,'not_entitled',current_timestamp,current_timestamp);

INSERT INTO citizenship_declaration_translations VALUES
(1,1,'en','Canadian Citizen',current_timestamp,current_timestamp),
(2,1,'fr','Citoyen Canadien',current_timestamp,current_timestamp),
(3,2,'en','Permanent Resident of Canada',current_timestamp,current_timestamp),
(4,2,'fr','Résident Permanent du Canada',current_timestamp,current_timestamp),
(5,3,'en','Open - Work Permit',current_timestamp,current_timestamp),
(6,3,'fr','Open - Permis de Travail',current_timestamp,current_timestamp),
(7,4,'en','Closed - Work Permit',current_timestamp,current_timestamp),
(8,4,'fr','Fermé - Permis de Travail',current_timestamp,current_timestamp),
(9,5,'en','I am currently not entitled to work in Canada',current_timestamp,current_timestamp),
(10,5,'fr','Je nai Actuellement pas le Droit de Travailler au Canada',current_timestamp,current_timestamp);

INSERT INTO veteran_statuses VALUES
(1,'none',current_timestamp,current_timestamp),
(2,'current',current_timestamp,current_timestamp),
(3,'past',current_timestamp,current_timestamp);

INSERT INTO preferred_languages VALUES
(1,'en',current_timestamp,current_timestamp),
(2,'fr',current_timestamp,current_timestamp);

INSERT INTO criteria_types VALUES
(1,'essential',current_timestamp,current_timestamp),
(2,'asset',current_timestamp,current_timestamp);

INSERT INTO criteria_type_translations VALUES
(1,1,'en','Need to Have','',current_timestamp,current_timestamp),
(2,1,'fr','Qualifications essentielles','',current_timestamp,current_timestamp),
(3,2,'en','Nice to Have','',current_timestamp,current_timestamp),
(4,2,'fr','Qualifications constituant un atout','',current_timestamp,current_timestamp);

INSERT INTO departments VALUES
(1,'treasury_board',current_timestamp,current_timestamp),
(2,'natural_resources',current_timestamp,current_timestamp),
(3,'transport',current_timestamp,current_timestamp),
(4,'enviroment_and_climate_change',current_timestamp,current_timestamp),
(5,'employment_and_social_development',current_timestamp,current_timestamp);

INSERT INTO department_translations VALUES
(1,1,'en','Treasury Board of Canada Secretariat',current_timestamp,current_timestamp),
(2,1,'fr','Secrétariat du Conseil du Trésor du Canada',current_timestamp,current_timestamp),
(3,2,'en','Natural Resources Canada',current_timestamp,current_timestamp),
(4,2,'fr','Ressources naturelles Canada',current_timestamp,current_timestamp),
(5,3,'en','Transport Canada',current_timestamp,current_timestamp),
(6,3,'fr','Transports Canada',current_timestamp,current_timestamp),
(7,4,'en','Environment and Climate Change Canada',current_timestamp,current_timestamp),
(8,4,'fr','Environnement et Changement climatique Canada',current_timestamp,current_timestamp),
(9,5,'en','Employment and Social Development Canada',current_timestamp,current_timestamp),
(10,5,'fr','Emploi et Développement social Canada',current_timestamp,current_timestamp);

INSERT INTO experience_levels VALUES
(1,'1 or Less years',current_timestamp,current_timestamp),
(2,'2 - 3 years',current_timestamp,current_timestamp),
(3,'4 - 5 years',current_timestamp,current_timestamp),
(4,'6 - 7 years',current_timestamp,current_timestamp),
(5,'8 or More years',current_timestamp,current_timestamp);

INSERT INTO experience_level_translations VALUES
(1,'en',1,'1 or less years',current_timestamp,current_timestamp),
(2,'fr',1,'Un an ou moins',current_timestamp,current_timestamp),
(3,'en',2,'2 - 3 years',current_timestamp,current_timestamp),
(4,'fr',2,'2 - 3 ans',current_timestamp,current_timestamp),
(5,'en',3,'4 - 5 years',current_timestamp,current_timestamp),
(6,'fr',3,'4 - 5 ans',current_timestamp,current_timestamp),
(7,'en',4,'6 - 7 years',current_timestamp,current_timestamp),
(8,'fr',4,'6 - 7 ans',current_timestamp,current_timestamp),
(9,'en',5,'8 or more years',current_timestamp,current_timestamp),
(10,'fr',5,'Huit ans ou plus',current_timestamp,current_timestamp);

INSERT INTO file_types VALUES
(1,'word',current_timestamp,current_timestamp),
(2,'powerpoint',current_timestamp,current_timestamp),
(3,'video',current_timestamp,current_timestamp),
(4,'publication',current_timestamp,current_timestamp),
(5,'other',current_timestamp,current_timestamp);

INSERT INTO file_type_translations VALUES
(1,1,'en','Word Document',current_timestamp,current_timestamp),
(2,1,'fr','Document Word',current_timestamp,current_timestamp),
(3,2,'en','PowerPoint Presentation',current_timestamp,current_timestamp),
(4,2,'fr','Présentation PowerPoint',current_timestamp,current_timestamp),
(5,3,'en','Video',current_timestamp,current_timestamp),
(6,3,'fr','Vidéo',current_timestamp,current_timestamp),
(7,4,'en','Article Publication',current_timestamp,current_timestamp),
(8,4,'fr','Publication dArticle',current_timestamp,current_timestamp),
(9,5,'en','Other',current_timestamp,current_timestamp),
(10,5,'fr','Autre',current_timestamp,current_timestamp);

INSERT INTO job_terms VALUES
(1,'week',current_timestamp,current_timestamp),
(2,'month',current_timestamp,current_timestamp),
(3,'year',current_timestamp,current_timestamp),
(4,'permanent',current_timestamp,current_timestamp);

INSERT INTO job_term_translations VALUES
(1,1,'week','en',current_timestamp,current_timestamp),
(2,1,'semaine','fr',current_timestamp,current_timestamp),
(3,2,'month','en',current_timestamp,current_timestamp),
(4,2,'mois','fr',current_timestamp,current_timestamp),
(5,3,'year','en',current_timestamp,current_timestamp),
(6,3,'an','fr',current_timestamp,current_timestamp),
(7,4,'permanent','en',current_timestamp,current_timestamp),
(8,4,'permanent','fr',current_timestamp,current_timestamp);

INSERT INTO language_requirements VALUES
(1,'english',current_timestamp,current_timestamp),
(2,'french',current_timestamp,current_timestamp),
(3,'bilingual',current_timestamp,current_timestamp);

INSERT INTO language_requirement_translations VALUES
(1,'en',1,'English essential',current_timestamp,current_timestamp),
(2,'fr',1,'Anglais essentiel',current_timestamp,current_timestamp),
(3,'en',2,'French essential',current_timestamp,current_timestamp),
(4,'fr',2,'Français essentiel',current_timestamp,current_timestamp),
(5,'en',3,'Bilingual',current_timestamp,current_timestamp),
(6,'fr',3,'Bilingue',current_timestamp,current_timestamp);

INSERT INTO provinces VALUES
(1,'ab',current_timestamp,current_timestamp),
(2,'bc',current_timestamp,current_timestamp),
(3,'mb',current_timestamp,current_timestamp),
(4,'nl',current_timestamp,current_timestamp),
(5,'nb',current_timestamp,current_timestamp),
(6,'ns',current_timestamp,current_timestamp),
(7,'nu',current_timestamp,current_timestamp),
(8,'nt',current_timestamp,current_timestamp),
(9,'on',current_timestamp,current_timestamp),
(10,'pe',current_timestamp,current_timestamp),
(11,'qc',current_timestamp,current_timestamp),
(12,'sk',current_timestamp,current_timestamp),
(13,'ty',current_timestamp,current_timestamp);

INSERT INTO province_translations VALUES
(1,1,'en','Alberta',current_timestamp,current_timestamp),
(2,1,'fr','Alberta',current_timestamp,current_timestamp),
(3,2,'en','British Columbia',current_timestamp,current_timestamp),
(4,2,'fr','Colombie-Britannique',current_timestamp,current_timestamp),
(5,3,'en','Manitoba',current_timestamp,current_timestamp),
(6,3,'fr','Manitoba',current_timestamp,current_timestamp),
(7,4,'en','New Brunswick',current_timestamp,current_timestamp),
(8,4,'fr','Nouveau-Brunswick',current_timestamp,current_timestamp),
(9,5,'en','Newfoundland and Labrador',current_timestamp,current_timestamp),
(10,5,'fr','Terre-Neuve-et-Labrador',current_timestamp,current_timestamp),
(11,6,'en','Nova Scotia',current_timestamp,current_timestamp),
(12,6,'fr','Nouvelle-Écosse',current_timestamp,current_timestamp),
(13,7,'en','Northwest Territories',current_timestamp,current_timestamp),
(14,7,'fr','Territoires du Nord-Ouest',current_timestamp,current_timestamp),
(15,8,'en','Nunavut',current_timestamp,current_timestamp),
(16,8,'fr','Nunavut',current_timestamp,current_timestamp),
(17,9,'en','Ontario',current_timestamp,current_timestamp),
(18,9,'fr','Ontario',current_timestamp,current_timestamp),
(19,10,'en','Prince Edward Island',current_timestamp,current_timestamp),
(20,10,'fr','Île-du-Prince-Édouard',current_timestamp,current_timestamp),
(21,11,'en','Quebec',current_timestamp,current_timestamp),
(22,11,'fr','Québec',current_timestamp,current_timestamp),
(23,12,'en','Saskatchewan',current_timestamp,current_timestamp),
(24,12,'fr','Saskatchewan',current_timestamp,current_timestamp),
(25,13,'en','Yukon',current_timestamp,current_timestamp),
(26,13,'fr','Yukon',current_timestamp,current_timestamp);

INSERT INTO relationships VALUES
(1,'superior',current_timestamp,current_timestamp),
(2,'coworker',current_timestamp,current_timestamp),
(3,'subordinate',current_timestamp,current_timestamp);

INSERT INTO relationship_translations VALUES
(1,1,'en','Superior',current_timestamp,current_timestamp),
(2,1,'fr','Supérieur',current_timestamp,current_timestamp),
(3,2,'en','Coworker',current_timestamp,current_timestamp),
(4,2,'fr','Collaborateur',current_timestamp,current_timestamp),
(5,3,'en','Subordinate',current_timestamp,current_timestamp),
(6,3,'fr','Subalterne',current_timestamp,current_timestamp);

INSERT INTO security_clearances VALUES
(1,'reliability',current_timestamp,current_timestamp),
(2,'secret',current_timestamp,current_timestamp),
(3,'top_secret',current_timestamp,current_timestamp);

INSERT INTO security_clearance_translations VALUES
(1,'en',1,'Reliability',current_timestamp,current_timestamp),
(2,'fr',1,'Fiabilité',current_timestamp,current_timestamp),
(3,'en',2,'Secret',current_timestamp,current_timestamp),
(4,'fr',2,'Secret',current_timestamp,current_timestamp),
(5,'en',3,'Top Secret',current_timestamp,current_timestamp),
(6,'fr',3,'Très secret',current_timestamp,current_timestamp);

INSERT INTO skill_levels VALUES
(1,'basic',current_timestamp,current_timestamp),
(2,'intermediate',current_timestamp,current_timestamp),
(3,'advanced',current_timestamp,current_timestamp),
(4,'expert',current_timestamp,current_timestamp);

INSERT INTO skill_level_translations VALUES
(1,1,'en','Basic',current_timestamp,current_timestamp),
(2,1,'fr','Débutant',current_timestamp,current_timestamp),
(3,2,'en','Intermediate',current_timestamp,current_timestamp),
(4,2,'fr','Intermédiaire',current_timestamp,current_timestamp),
(5,3,'en','Advanced',current_timestamp,current_timestamp),
(6,3,'fr','Avancé',current_timestamp,current_timestamp),
(7,4,'en','Expert',current_timestamp,current_timestamp),
(8,4,'fr','Expert',current_timestamp,current_timestamp);

INSERT INTO user_roles VALUES
(1,'applicant',current_timestamp,current_timestamp),
(2,'manager',current_timestamp,current_timestamp),
(3,'admin',current_timestamp,current_timestamp);

INSERT INTO frequencies VALUES
(1,'never',current_timestamp,current_timestamp),
(2,'rarely',current_timestamp,current_timestamp),
(3,'sometimes',current_timestamp,current_timestamp),
(4,'often',current_timestamp,current_timestamp),
(5,'always',current_timestamp,current_timestamp);

INSERT INTO degree_types (name, created_at, updated_at) VALUES
('diploma', current_timestamp, current_timestamp),
('bachelors', current_timestamp, current_timestamp),
('masters', current_timestamp, current_timestamp),
('phd', current_timestamp, current_timestamp);

INSERT INTO course_status (name, created_at, updated_at) VALUES
('certificate_granted', current_timestamp, current_timestamp),
('credits_towards_degree', current_timestamp, current_timestamp),
('audited', current_timestamp, current_timestamp),
('online_no_proof', current_timestamp, current_timestamp),
('online_certificate', current_timestamp, current_timestamp),
('learning_in_progress', current_timestamp, current_timestamp);

INSERT INTO skill_statuses (name, created_at, updated_at) VALUES
('claimed', current_timestamp, current_timestamp);

INSERT INTO skill_types (id, name, created_at, updated_at) VALUES
(1, 'soft', current_timestamp, current_timestamp),
(2, 'hard', current_timestamp, current_timestamp);

INSERT INTO skills (name, skill_type_id, created_at, updated_at) VALUES
('front_end_dev', 2, current_timestamp, current_timestamp),
('web_programming', 2, current_timestamp, current_timestamp),
('server_admin', 2, current_timestamp, current_timestamp),
('linux', 2, current_timestamp, current_timestamp),
('css', 2, current_timestamp, current_timestamp),
('javascript', 2, current_timestamp, current_timestamp),
('c_plus_plus', 2, current_timestamp, current_timestamp),
('sass', 2, current_timestamp, current_timestamp),
('python', 2, current_timestamp, current_timestamp),
('php', 2, current_timestamp, current_timestamp),
('git', 2, current_timestamp, current_timestamp),
('docker', 2, current_timestamp, current_timestamp),
('html', 2, current_timestamp, current_timestamp),
('sql', 2, current_timestamp, current_timestamp),
('open_source', 2, current_timestamp, current_timestamp),
('verbal_communication', 2, current_timestamp, current_timestamp),
('written_communication', 2, current_timestamp, current_timestamp),
('ability_distributed_team', 2, current_timestamp, current_timestamp),
('ability_learn', 1, current_timestamp, current_timestamp),
('integrity', 1, current_timestamp, current_timestamp),
('ability_collaborate', 1, current_timestamp, current_timestamp),
('initiative', 1, current_timestamp, current_timestamp),
('humility', 1, current_timestamp, current_timestamp),
('passion', 1, current_timestamp, current_timestamp),
('flexibility', 1, current_timestamp, current_timestamp),
('judgement', 1, current_timestamp, current_timestamp),
('adaptability', 1, current_timestamp, current_timestamp),
('accountability', 1, current_timestamp, current_timestamp),
('attention_detail', 1, current_timestamp, current_timestamp),
('complex_problem_solving', 1, current_timestamp, current_timestamp),
('courage', 1, current_timestamp, current_timestamp),
('originality', 1, current_timestamp, current_timestamp),
('critical_thinking', 1, current_timestamp, current_timestamp),
('curiosity', 1, current_timestamp, current_timestamp),
('dependability', 1, current_timestamp, current_timestamp),
('ability_follow_instructions', 1, current_timestamp, current_timestamp),
('persistence', 1, current_timestamp, current_timestamp),
('resilience', 1, current_timestamp, current_timestamp),
('service_orientation', 1, current_timestamp, current_timestamp),
('social_perceptiveness', 1, current_timestamp, current_timestamp),
('stress_management', 1, current_timestamp, current_timestamp),
('stress_tolerance', 1, current_timestamp, current_timestamp),
('time_management', 1, current_timestamp, current_timestamp),
('willingness_learn', 1, current_timestamp, current_timestamp);
