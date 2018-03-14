/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  GBowden
 * Created: Mar 14, 2018
 */

ALTER TABLE `talentcloud`.`job_poster_application` 
ADD COLUMN `job_poster_application_status_id` INT(10) ZEROFILL NOT NULL AFTER `application_job_seeker_profile_id`;


