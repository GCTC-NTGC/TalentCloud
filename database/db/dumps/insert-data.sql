INSERT INTO applicant_profile_questions VALUES
(1,'career_journey',current_timestamp,current_timestamp),
(2,'learning_journey',current_timestamp,current_timestamp),
(3,'bring_to_team',current_timestamp,current_timestamp),
(4,'work_best_when',current_timestamp,current_timestamp),
(5,'learn_best_when',current_timestamp,current_timestamp),
(6,'types_of_teams',current_timestamp,current_timestamp);

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
(5,'employment_and_social_development',current_timestamp,current_timestamp),
(6,'global_affairs',current_timestamp,current_timestamp),
(7,'fisheries_and_oceans',current_timestamp,current_timestamp),
(8,'innovation_science',current_timestamp,current_timestamp),
(9,'public_service_and_procurement',current_timestamp,current_timestamp),
(10,'border_services_agency',current_timestamp,current_timestamp);

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
(10,5,'fr','Emploi et Développement social Canada',current_timestamp,current_timestamp),
(11,6,'en','Global Affairs Canada',current_timestamp,current_timestamp),
(12,6,'fr','Affaires mondiales Canada',current_timestamp,current_timestamp),
(15,7,'en','Fisheries and Oceans Canada',current_timestamp,current_timestamp),
(16,7,'fr','Pêches et Océans Canada',current_timestamp,current_timestamp),
(17,8,'en','Innovation, Science and Economic Development Canada',current_timestamp,current_timestamp),
(18,8,'fr','Innovation, Sciences et Développement économique Canada',current_timestamp,current_timestamp),
(19,9,'en','Public Services and Procurement Canada',current_timestamp,current_timestamp),
(20,9,'fr','Services publics et Approvisionnement Canada',current_timestamp,current_timestamp),
(13,10,'en','Canada Border Services Agency',current_timestamp,current_timestamp),
(14,10,'fr','Agence des services frontaliers du Canada',current_timestamp,current_timestamp);


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

INSERT INTO skills (id, name, skill_type_id, created_at, updated_at) VALUES
(1, 'front_end_dev', 2, current_timestamp, current_timestamp),
(2, 'web_programming', 2, current_timestamp, current_timestamp),
(3, 'server_admin', 2, current_timestamp, current_timestamp),
(4, 'linux', 2, current_timestamp, current_timestamp),
(5, 'css', 2, current_timestamp, current_timestamp),
(6, 'javascript', 2, current_timestamp, current_timestamp),
(7, 'c_plus_plus', 2, current_timestamp, current_timestamp),
(8, 'sass', 2, current_timestamp, current_timestamp),
(9, 'python', 2, current_timestamp, current_timestamp),
(10, 'php', 2, current_timestamp, current_timestamp),
(11, 'git', 2, current_timestamp, current_timestamp),
(12, 'docker', 2, current_timestamp, current_timestamp),
(13, 'html', 2, current_timestamp, current_timestamp),
(14, 'sql', 2, current_timestamp, current_timestamp),
(15, 'open_source', 2, current_timestamp, current_timestamp),
(16, 'verbal_communication', 2, current_timestamp, current_timestamp),
(17, 'written_communication', 2, current_timestamp, current_timestamp),
(18, 'ability_distributed_team', 2, current_timestamp, current_timestamp),
(19, 'ability_learn', 1, current_timestamp, current_timestamp),
(20, 'integrity', 1, current_timestamp, current_timestamp),
(21, 'ability_collaborate', 1, current_timestamp, current_timestamp),
(22, 'initiative', 1, current_timestamp, current_timestamp),
(23, 'humility', 1, current_timestamp, current_timestamp),
(24, 'passion', 1, current_timestamp, current_timestamp),
(25, 'flexibility', 1, current_timestamp, current_timestamp),
(26, 'judgement', 1, current_timestamp, current_timestamp),
(27, 'adaptability', 1, current_timestamp, current_timestamp),
(28, 'accountability', 1, current_timestamp, current_timestamp),
(29, 'attention_detail', 1, current_timestamp, current_timestamp),
(30, 'complex_problem_solving', 1, current_timestamp, current_timestamp),
(31, 'courage', 1, current_timestamp, current_timestamp),
(32, 'originality', 1, current_timestamp, current_timestamp),
(33, 'critical_thinking', 1, current_timestamp, current_timestamp),
(34, 'curiosity', 1, current_timestamp, current_timestamp),
(35, 'dependability', 1, current_timestamp, current_timestamp),
(36, 'ability_follow_instructions', 1, current_timestamp, current_timestamp),
(37, 'persistence', 1, current_timestamp, current_timestamp),
(38, 'resilience', 1, current_timestamp, current_timestamp),
(39, 'service_orientation', 1, current_timestamp, current_timestamp),
(40, 'social_perceptiveness', 1, current_timestamp, current_timestamp),
(41, 'stress_management', 1, current_timestamp, current_timestamp),
(42, 'stress_tolerance', 1, current_timestamp, current_timestamp),
(43, 'time_management', 1, current_timestamp, current_timestamp),
(44, 'willingness_learn', 1, current_timestamp, current_timestamp),
(45, 'management_ability', 2, current_timestamp, current_timestamp),
(46, 'experience_design', 2, current_timestamp, current_timestamp),
(47, 'project_management', 2, current_timestamp, current_timestamp),
(48, 'stakeholder_relations', 2, current_timestamp, current_timestamp),
(49, 'dot_net', 2, current_timestamp, current_timestamp),
(50, 'geospacial_programming', 2, current_timestamp, current_timestamp),
(51, 'microsoft_dynamics', 2, current_timestamp, current_timestamp),
(52, 'facilitation', 2, current_timestamp, current_timestamp),
(53, 'systems_thinking', 2, current_timestamp, current_timestamp),
(54, 'web_architecture', 2, current_timestamp, current_timestamp),
(55, 'storytelling', 2, current_timestamp, current_timestamp),
(56, 'user_design', 2, current_timestamp, current_timestamp),
(57, 'empathy', 1, current_timestamp, current_timestamp),
(58, 'analysis', 2, current_timestamp, current_timestamp),
(59, 'data_science', 2, current_timestamp, current_timestamp),
(60, 'results_oriented', 1, current_timestamp, current_timestamp),
(61, 'relationship_management', 1, current_timestamp, current_timestamp),
(62, 'data_analysis', 2, current_timestamp, current_timestamp),
(63, 'data_mining', 2, current_timestamp, current_timestamp),
(64, 'r_programming', 2, current_timestamp, current_timestamp),
(65, 'database_design_and_management', 2, current_timestamp, current_timestamp),
(66, 'scrum', 2, current_timestamp, current_timestamp),
(67, 'team_foundation_server', 2, current_timestamp, current_timestamp),
(68, 'n_unit_testing', 2, current_timestamp, current_timestamp),
(69, 'asp_net_mvc', 2, current_timestamp, current_timestamp),
(70, 'ef6', 2, current_timestamp, current_timestamp);
