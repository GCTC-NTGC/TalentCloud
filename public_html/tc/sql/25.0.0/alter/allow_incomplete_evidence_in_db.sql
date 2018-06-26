ALTER TABLE `talentcloud`.`work_sample` 
DROP FOREIGN KEY `fk_work_sample_file_type_id`;
ALTER TABLE `talentcloud`.`work_sample` 
CHANGE COLUMN `work_sample_name` `work_sample_name` VARCHAR(45) NULL ,
CHANGE COLUMN `work_sample_date_created` `work_sample_date_created` DATE NULL ,
CHANGE COLUMN `file_type_id` `file_type_id` INT(10) UNSIGNED ZEROFILL NULL ,
CHANGE COLUMN `work_sample_url` `work_sample_url` VARCHAR(65) NULL ;
ALTER TABLE `talentcloud`.`work_sample` 
ADD CONSTRAINT `fk_work_sample_file_type_id`
  FOREIGN KEY (`file_type_id`)
  REFERENCES `talentcloud`.`file_type` (`file_type_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE `talentcloud`.`skill_declaration` 
DROP FOREIGN KEY `fk_skill_declaration_experience_level_id`,
DROP FOREIGN KEY `fk_skill_declaration_skill_level_id`;
ALTER TABLE `talentcloud`.`skill_declaration` 
CHANGE COLUMN `experience_level_id` `experience_level_id` INT(10) UNSIGNED ZEROFILL NULL ,
CHANGE COLUMN `skill_level_id` `skill_level_id` INT(10) UNSIGNED ZEROFILL NULL ,
CHANGE COLUMN `description` `description` MEDIUMTEXT NULL ;
ALTER TABLE `talentcloud`.`skill_declaration` 
ADD CONSTRAINT `fk_skill_declaration_experience_level_id`
  FOREIGN KEY (`experience_level_id`)
  REFERENCES `talentcloud`.`experience_level` (`experience_level_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk_skill_declaration_skill_level_id`
  FOREIGN KEY (`skill_level_id`)
  REFERENCES `talentcloud`.`skill_level` (`skill_level_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE `talentcloud`.`micro_reference` 
DROP FOREIGN KEY `fk_micro_reference_experience_level_id`,
DROP FOREIGN KEY `fk_micro_reference_relationship_id`;
ALTER TABLE `talentcloud`.`micro_reference` 
CHANGE COLUMN `micro_reference_name` `micro_reference_name` VARCHAR(45) NULL ,
CHANGE COLUMN `micro_reference_email` `micro_reference_email` VARCHAR(45) NULL ,
CHANGE COLUMN `micro_reference_relationship_id` `micro_reference_relationship_id` INT(10) UNSIGNED ZEROFILL NULL ,
CHANGE COLUMN `micro_reference_observed_from_date` `micro_reference_observed_from_date` DATE NULL ,
CHANGE COLUMN `micro_reference_observed_until_date` `micro_reference_observed_until_date` DATE NULL ,
CHANGE COLUMN `micro_reference_experience_level_id` `micro_reference_experience_level_id` INT(10) UNSIGNED ZEROFILL NULL ;
ALTER TABLE `talentcloud`.`micro_reference` 
ADD CONSTRAINT `fk_micro_reference_experience_level_id`
  FOREIGN KEY (`micro_reference_experience_level_id`)
  REFERENCES `talentcloud`.`experience_level` (`experience_level_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT `fk_micro_reference_relationship_id`
  FOREIGN KEY (`micro_reference_relationship_id`)
  REFERENCES `talentcloud`.`relationship` (`relationship_id`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;
