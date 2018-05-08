ALTER TABLE `talentcloud`.`user_manager_profile`
DROP COLUMN `user_manager_profile_position`;

ALTER TABLE `talentcloud`.`user_manager_profile_details`
ADD COLUMN `user_manager_profile_details_position` varchar(65) NOT NULL AFTER `user_manager_profile_details_division`;
