SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE IF NOT EXISTS `talentcloud`.`relationship` (
  `relationship_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `relationship_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`relationship_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `talentcloud`.`relationship_details` (
  `relationship_details_id` INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `relationship_id` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `locale_id` INT(10) ZEROFILL UNSIGNED NOT NULL,
  `relationship_details_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`relationship_details_id`),
  INDEX `fk_relationship_details_relationship_id_idx` (`relationship_id` ASC),
  INDEX `fk_relationship_locale_id_idx` (`locale_id` ASC),
  CONSTRAINT `fk_relationship_details_relationship_id`
    FOREIGN KEY (`relationship_id`)
    REFERENCES `talentcloud`.`relationship` (`relationship_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_relationship_locale_id`
    FOREIGN KEY (`locale_id`)
    REFERENCES `talentcloud`.`locale` (`locale_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
