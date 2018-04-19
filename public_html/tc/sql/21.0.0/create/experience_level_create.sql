CREATE TABLE `talentcloud`.`experience_level` (
  `id` INT(10) ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `common_description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `talentcloud`.`experience_level_details` (
  `experience_level_id` INT(10) ZEROFILL UNSIGNED NOT NULL,
  `locale_id` INT(10) ZEROFILL UNSIGNED NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`experience_level_id`, `locale_id`));