/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  GBowden
 * Created: Jan 18, 2018
 */

ALTER TABLE `talentcloud`.`job_poster` 
ADD COLUMN `job_poster_remuneration_min` INT(9) NULL AFTER `job_number`,
ADD COLUMN `job_poster_remuneration_max` INT(9) NULL AFTER `job_poster_remuneration_min`;