CREATE TABLE `talentcloud`.`skill_level` (
  `id` INT(10) ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `common_description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `talentcloud`.`skill_level_details` (
  `skill_level_id` INT(10) ZEROFILL UNSIGNED NOT NULL,
  `locale_id` INT(10) ZEROFILL UNSIGNED NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`skill_level_id`, `locale_id`));