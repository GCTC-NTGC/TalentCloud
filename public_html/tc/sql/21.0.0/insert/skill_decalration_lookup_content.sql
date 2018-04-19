TRUNCATE `talentcloud`.`skill_level`;
INSERT INTO `talentcloud`.`skill_level`
(`skill_level_id`, `skill_level_common_name`)
VALUES
(1, 'Beginner'),
(2, 'Intermediate'),
(3, 'Expert'),
(4, 'Master');

TRUNCATE `talentcloud`.`skill_level_details`;
INSERT INTO `talentcloud`.`skill_level_details`
(`skill_level_id`, `skill_level_details_locale_id`, `skill_level_details_name`)
VALUES
(1, 1, 'Beginner'),
(1, 2, 'Débutant'),
(2, 1, 'Intermediate'),
(2, 2, 'Intermédiaire'),
(3, 1, 'Expert'),
(3, 2, 'Expert'),
(4, 1, 'Master'),
(4, 2, 'Maître');

TRUNCATE `talentcloud`.`experience_level`;
INSERT INTO `talentcloud`.`experience_level`
(`experience_level_id`, `experience_level_common`)
VALUES
(1, '1 or Less years'),
(2, '2 - 3 years'),
(3, '4 - 5 years'),
(4, '6 - 7 years'),
(5, '8 or More years');

TRUNCATE `talentcloud`.`experience_level_details`;
INSERT INTO `talentcloud`.`experience_level_details`
(`experience_level_id`, `experience_level_details_locale_id`, `experience_level_details_name`)
VALUES
(1, 1, '1 or Less'),
(1, 2, '1 ou Moins'),
(2, 1, '2 - 3'),
(2, 2, '2 - 3'),
(3, 1, '4 - 5'),
(3, 2, '4 - 5'),
(4, 1, '6 - 7'),
(4, 2, '6 - 7'),
(5, 1, '8 or More'),
(5, 2, '8 ou Plus');