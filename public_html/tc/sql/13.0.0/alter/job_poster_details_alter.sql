/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Tristan O'Rourke
 * Created: 5-Feb-2018
 */

ALTER TABLE `talentcloud`.`job_poster_details` 
ADD COLUMN `job_poster_city` VARCHAR(65) NOT NULL AFTER `job_poster_desc_content`,
ADD COLUMN `job_poster_title` VARCHAR(65) NOT NULL AFTER `job_poster_city`,
ADD COLUMN `job_poster_impact` LONGTEXT NOT NULL AFTER `job_poster_title`;