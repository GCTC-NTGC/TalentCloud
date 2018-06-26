CREATE TABLE `talentcloud`.`citizenship_declaration` (
  `citizenship_declaration_id` INT(10) NOT NULL AUTO_INCREMENT,
  `citizenship_declaration_common_name` TEXT NOT NULL,
  PRIMARY KEY (`citizenship_declaration_id`),
  UNIQUE INDEX `citizenship_declaration_id_UNIQUE` (`citizenship_declaration_id` ASC));

CREATE TABLE `talentcloud`.`citizenship_declaration_details` (
  `citizenship_declaration_details_id` INT(10) NOT NULL AUTO_INCREMENT,
  `citizenship_declaration_id` INT(10) NOT NULL,
  `citizenship_declaration_locale_id` INT(10) NOT NULL,
  `citizenship_declaration` TEXT NOT NULL,
  PRIMARY KEY (`citizenship_declaration_details_id`),
  UNIQUE INDEX `citizenship_declaration_details_id_UNIQUE` (`citizenship_declaration_details_id` ASC),
  CONSTRAINT `fk__citizenship_declaration_details__citizenship_declaration`
     FOREIGN KEY (`citizenship_declaration_id`)
     REFERENCES `talentcloud`.`citizenship_declaration` (`citizenship_declaration_id`)
     ON DELETE NO ACTION
     ON UPDATE CASCADE);