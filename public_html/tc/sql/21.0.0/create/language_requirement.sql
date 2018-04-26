CREATE TABLE IF NOT EXISTS `talentcloud`.`language_requirement_details` (
    `language_requirement_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
    `language_requirement_details_locale_id` int(10) unsigned zerofill NOT NULL,
    `language_requirement_id` int(10) unsigned zerofill NOT NULL,
    `language_requirement_details_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (`language_requirement_details_id`)
);
