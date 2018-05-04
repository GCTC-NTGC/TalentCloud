CREATE TABLE IF NOT EXISTS `talentcloud`.`language_requirement` (
    `language_requirement_id` INT(10) ZEROFILL NOT NULL AUTO_INCREMENT,
    `language_requirement_common_name` VARCHAR(65) NOT NULL,
    PRIMARY KEY (`language_requirement_id`)
);

CREATE TABLE IF NOT EXISTS `talentcloud`.`language_requirement_details` (
    `language_requirement_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
    `language_requirement_details_locale_id` int(10) unsigned zerofill NOT NULL,
    `language_requirement_id` int(10) unsigned zerofill NOT NULL,
    `language_requirement_details_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (`language_requirement_details_id`),
    KEY `fk_language_requirement_id_idx` (`language_requirement_id`),
    CONSTRAINT `fk_language_requirement_details_language_requirement_id` FOREIGN KEY (`language_requirement_id`) REFERENCES `language_requirement` (`language_requirement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
