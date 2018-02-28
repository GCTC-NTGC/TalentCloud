INSERT INTO `talentcloud`.`base_content` (`base_content_id`, `base_content_type_id`, `base_content_key`, `base_content_value`, `base_content_locale_id`) VALUES ('0000000132', '0000000001', 'browseLink', 'Browse Jobs', '0000000001');
INSERT INTO `talentcloud`.`base_content` (`base_content_id`, `base_content_type_id`, `base_content_key`, `base_content_value`, `base_content_locale_id`) VALUES ('0000000133', '0000000001', 'browseLink', 'Parcourir les travaux', '0000000002');

INSERT INTO `talentcloud`.`base_content` (`base_content_id`, `base_content_type_id`, `base_content_key`, `base_content_value`, `base_content_locale_id`) VALUES ('0000000134', '0000000001', 'gctc', 'GC Talent Cloud', '0000000001');
INSERT INTO `talentcloud`.`base_content` (`base_content_id`, `base_content_type_id`, `base_content_key`, `base_content_value`, `base_content_locale_id`) VALUES ('0000000135', '0000000001', 'gctc', 'Nuage de talents GC', '0000000002');


UPDATE `talentcloud`.`base_content` SET `base_content_value`='Home' WHERE `base_content_id`='0000000018';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Accueil' WHERE `base_content_id`='0000000019';

##SELECT * FROM talentcloud.base_content;