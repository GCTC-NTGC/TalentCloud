
CREATE TABLE `talentcloud`.`user_manager_profile_details` (
`user_manager_profile_details_id` INT(10) ZEROFILL NOT NULL AUTO_INCREMENT,
`locale_id` INT(10) NOT NULL,
`user_manager_profile_details_aboutme` MEDIUMTEXT NULL,
`user_manager_profile_details_proud` MEDIUMTEXT NULL,
`user_manager_profile_details_lead_style` MEDIUMTEXT NULL,
`user_manager_profile_details_emp_learn` MEDIUMTEXT NULL,
`user_manager_profile_details_expectations` MEDIUMTEXT NULL,
`user_manager_profile_id` INT(10) NOT NULL,
PRIMARY KEY (`user_manager_profile_details_id`));