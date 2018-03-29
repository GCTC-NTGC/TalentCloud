ALTER TABLE `talentcloud`.`user_manager_profile` 
DROP COLUMN `user_manager_profile_department`,
ADD COLUMN `user_manager_profile_department_id` INT(10) NULL DEFAULT NULL AFTER `user_manager_profile_id`;
