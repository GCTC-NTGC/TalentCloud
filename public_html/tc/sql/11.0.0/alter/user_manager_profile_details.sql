/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  GBowden
 * Created: Feb 13, 2018
 */
  
ALTER TABLE `talentcloud`.`user_manager_profile_details` 
ADD COLUMN `user_manager_profile_review_options` VARCHAR(45) NULL AFTER `user_manager_profile_id`,
ADD COLUMN `user_manager_profile_staylate` VARCHAR(45) NULL AFTER `user_manager_profile_review_options`,
ADD COLUMN `user_manager_profile_engage` VARCHAR(45) NULL AFTER `user_manager_profile_staylate`,
ADD COLUMN `user_manager_profile_devops` VARCHAR(45) NULL AFTER `user_manager_profile_engage`,
ADD COLUMN `user_manager_profile_lvwRequests` VARCHAR(45) NULL AFTER `user_manager_profile_devops`,
ADD COLUMN `user_manager_profile_work_experience` MEDIUMTEXT NULL AFTER `user_manager_profile_lvwRequests`,
ADD COLUMN `user_manager_profile_education` MEDIUMTEXT NULL AFTER `user_manager_profile_work_experience`;