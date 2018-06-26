ALTER TABLE `talentcloud`.`job_poster_application` 
ADD COLUMN `citizenship_declaration_id` INT(10) NULL AFTER `last_updated`;

ALTER TABLE `talentcloud`.`job_poster_application` 
ADD INDEX `fk__job_poster_application__citizenship_declaration_idx` (`citizenship_declaration_id` ASC);
ALTER TABLE `talentcloud`.`job_poster_application` 
ADD CONSTRAINT `fk__job_poster_application__citizenship_declaration`
  FOREIGN KEY (`citizenship_declaration_id`)
  REFERENCES `talentcloud`.`citizenship_declaration` (`citizenship_declaration_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;