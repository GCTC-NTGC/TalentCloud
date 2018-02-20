DROP TABLE IF EXISTS `talentcloud`.`user_manager_profile`;
CREATE TABLE `talentcloud`.`user_manager_profile` (
`user_manager_profile_id` INT(10) ZEROFILL NOT NULL AUTO_INCREMENT,
`user_manager_profile_department` VARCHAR(65) NULL,
`user_manager_profile_position` VARCHAR(65) NULL,
`user_manager_profile_branch_id` INT(10) NULL,
`user_manager_profile_division_id` INT(10) NULL,
`user_manager_profile_twitter` VARCHAR(65) NULL,
`user_manager_profile_linkedin` VARCHAR(65) NULL,
`user_id` INT(10) NOT NULL,
PRIMARY KEY (`user_manager_profile_id`));