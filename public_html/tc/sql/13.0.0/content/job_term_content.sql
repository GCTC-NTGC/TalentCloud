/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Tristan O'Rourke
 * Created: Feb 01, 2018
 */

DELETE FROM `talentcloud`.`job_term` WHERE
    job_term_id=5 OR
    job_term_id=6 OR
    job_term_id=7 OR
    job_term_id=8;

INSERT INTO `talentcloud`.`job_term_details` 
    (`job_term_id`, `job_term`, `job_term_locale_id`)
VALUES (1,'week',1);

INSERT INTO `talentcloud`.`job_term_details` 
    (`job_term_id`, `job_term`, `job_term_locale_id`)
VALUES (1,'semaine',2);

INSERT INTO `talentcloud`.`job_term_details` 
    (`job_term_id`, `job_term`, `job_term_locale_id`)
VALUES (2,'month',1);

INSERT INTO `talentcloud`.`job_term_details` 
    (`job_term_id`, `job_term`, `job_term_locale_id`)
VALUES (2,'mois',2);

INSERT INTO `talentcloud`.`job_term_details` 
    (`job_term_id`, `job_term`, `job_term_locale_id`)
VALUES (3,'year',1);

INSERT INTO `talentcloud`.`job_term_details` 
    (`job_term_id`, `job_term`, `job_term_locale_id`)
VALUES (3,'an',2);

INSERT INTO `talentcloud`.`job_term_details` 
    (`job_term_id`, `job_term`, `job_term_locale_id`)
VALUES (4,'permanent',1);

INSERT INTO `talentcloud`.`job_term_details` 
    (`job_term_id`, `job_term`, `job_term_locale_id`)
VALUES (4,'permanent',2);

