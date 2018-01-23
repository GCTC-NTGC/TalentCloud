/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  GBowden
 * Created: Jan 18, 2018
 */

INSERT INTO `talentcloud`.`job_poster_details` (`job_poster_id`, `locale_id`, `job_poster_desc_title`, `job_poster_desc_content`) VALUES ('0000000003', '0000000001', 'Database Admin', 'This is the description for the job in English');
INSERT INTO `talentcloud`.`job_poster_details` (`job_poster_id`, `locale_id`, `job_poster_desc_title`, `job_poster_desc_content`) VALUES ('0000000003', '0000000002', 'Administrateur de base de données', 'This is the description for the job in French');

UPDATE `talentcloud`.`job_poster` SET `job_poster_remuneration_min`='50000', `job_poster_remuneration_max`='80000' WHERE `job_poster_id`='0000000001';
UPDATE `talentcloud`.`job_poster` SET `job_poster_remuneration_min`='50001', `job_poster_remuneration_max`='80001' WHERE `job_poster_id`='0000000002';
UPDATE `talentcloud`.`job_poster` SET `job_poster_remuneration_min`='50002', `job_poster_remuneration_max`='80002' WHERE `job_poster_id`='0000000003';
