INSERT INTO `talentcloud`.`security_clearance`
(`security_clearance_id`, `security_clearance_common_name`)
VALUES
(1, 'Reliability'),
(2, 'Secret'),
(3, 'Top Secret');

INSERT INTO `talentcloud`.`security_clearance_details`
(`security_clearance_id`, `security_clearance_details_locale_id`, `security_clearance_details_name`)
VALUES
(1, 1, 'Reliability'),
(1, 2, 'Fiabilité'),
(2, 1, 'Secret'),
(2, 2, 'Secret'),
(3, 1, 'Top Secret'),
(3, 2, 'Très secret');

INSERT INTO `talentcloud`.`language_requirement`
(`language_requirement_id`, `language_requirement_common_name`)
VALUES
(1, 'English essential'),
(2, 'French essential'),
(3, 'Bilingual');

INSERT INTO `talentcloud`.`language_requirement_details`
(`language_requirement_id`, `language_requirement_details_locale_id`, `language_requirement_details_name`)
VALUES
(1, 1, 'English essential'),
(1, 2, 'Anglais essentiel'),
(2, 1, 'French essential'),
(2, 2, 'Français essentiel'),
(3, 1, 'Bilingual'),
(3, 2, 'Bilingue');
