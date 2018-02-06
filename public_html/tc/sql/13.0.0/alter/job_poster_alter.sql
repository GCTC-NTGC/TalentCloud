/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Tristan O'Rourke
 * Created: 5-Feb-2018
 */

ALTER TABLE `talentcloud`.`job_poster` 
DROP COLUMN `job_poster_end_date`,
ADD COLUMN `job_poster_open_date_time` DATETIME NOT NULL AFTER `job_poster_job_max_level_id`,
CHANGE COLUMN `job_poster_close_date_time` `job_poster_close_date_time` DATETIME NOT NULL AFTER `job_poster_open_date_time`,
ADD COLUMN `job_poster_province_id` INT(10) NOT NULL AFTER `job_poster_department_id`;

