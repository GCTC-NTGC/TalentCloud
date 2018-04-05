ALTER TABLE `talentcloud`.`user_manager_profile` 
DROP COLUMN `user_manager_profile_department`,
ADD COLUMN `user_manager_profile_department_id` INT(10) NULL DEFAULT NULL AFTER `user_manager_profile_id`,
DROP COLUMN `user_manager_profile_branch_id`,
DROP COLUMN `user_manager_profile_division_id`;

ALTER TABle `talentcloud`.`user_manager_profile_details`
ADD COLUMN `user_manager_profile_details_branch` VARCHAR(65) DEFAULT NULL AFTER `user_manager_profile_details_proud`,
ADD COLUMN `user_manager_profile_details_division` VARCHAR(65) DEFAULT NULL AFTER `user_manager_profile_details_branch`;

