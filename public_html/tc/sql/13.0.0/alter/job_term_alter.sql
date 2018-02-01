/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Tristan O'Rourke
 * Created: Feb 01, 2018
 */

ALTER TABLE `talentcloud`.`job_term` 
CHANGE COLUMN `job_term` `job_term_common_name` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL;
ALTER TABLE `talentcloud`.`job_term` 
DROP COLUMN `job_term_locale_id`;
