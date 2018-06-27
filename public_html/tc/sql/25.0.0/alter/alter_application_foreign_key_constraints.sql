ALTER TABLE `talentcloud`.`skill_declaration` 
DROP FOREIGN KEY `fk_skill_declaration_application_id`;
ALTER TABLE `talentcloud`.`skill_declaration` 
ADD CONSTRAINT `fk_skill_declaration_application_id`
  FOREIGN KEY (`job_poster_application_id`)
  REFERENCES `talentcloud`.`job_poster_application` (`job_poster_application_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

