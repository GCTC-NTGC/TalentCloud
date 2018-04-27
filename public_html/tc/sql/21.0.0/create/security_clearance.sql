CREATE TABLE IF NOT EXISTS `talentcloud`.`security_clearance` (
    `security_clearance_id` INT(10) ZEROFILL NOT NULL AUTO_INCREMENT,
    `security_clearance_common_name` VARCHAR(65) NOT NULL,
    PRIMARY KEY (`security_clearance_id`)
);

CREATE TABLE IF NOT EXISTS `talentcloud`.`security_clearance_details` (
    `security_clearance_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
    `security_clearance_details_locale_id` int(10) unsigned zerofill NOT NULL,
    `security_clearance_id` int(10) unsigned zerofill NOT NULL,
    `security_clearance_details_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (`security_clearance_details_id`),
    KEY `fk_security_clearance_id_idx` (`security_clearance_id`),
    CONSTRAINT `fk_security_clearance_details_security_clearance_id` FOREIGN KEY (`security_clearance_id`) REFERENCES `security_clearance` (`security_clearance_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
