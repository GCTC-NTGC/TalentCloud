SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE IF NOT EXISTS `talentcloud`.`file_type` (
  `file_type_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `file_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`file_type_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `talentcloud`.`file_type_details` (
  `file_type_details_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `file_type_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `locale_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `file_type_details_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`file_type_details_id`),
  INDEX `fk_file_type_details_file_type_id_idx` (`file_type_id` ASC),
  INDEX `fk_file_type_details_locale_id_idx` (`locale_id` ASC),
  CONSTRAINT `fk_file_type_details_file_type_id`
    FOREIGN KEY (`file_type_id`)
    REFERENCES `talentcloud`.`file_type` (`file_type_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_file_type_details_locale_id`
    FOREIGN KEY (`locale_id`)
    REFERENCES `talentcloud`.`locale` (`locale_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
