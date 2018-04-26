CREATE TABLE IF NOT EXISTS `talentcloud`.`security_clearance_details` (
    `security_clearance_details_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
    `security_clearance_details_locale_id` int(10) unsigned zerofill NOT NULL,
    `security_clearance_id` int(10) unsigned zerofill NOT NULL,
    `security_clearance_details_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (`security_clearance_details_id`)
);
