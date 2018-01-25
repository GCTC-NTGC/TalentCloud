CREATE TABLE `talentcloud`.`division_details` (
  `division_details_id` INT(10) ZEROFILL NOT NULL AUTO_INCREMENT,
  `division_id` INT(10) ZEROFILL NOT NULL,
  `division_locale_id` INT(10) ZEROFILL NOT NULL,
  `division_name` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`division_details_id`));