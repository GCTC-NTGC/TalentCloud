ALTER TABLE `talentcloud`.`user` 
ADD COLUMN `open_id` INT(10) NULL AFTER `user_role_id`;

ALTER TABLE `talentcloud`.`user` 
CHANGE COLUMN `password` `password` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL ;

ALTER TABLE `talentcloud`.`user` 
DROP COLUMN `lastname`;

ALTER TABLE `talentcloud`.`user` 
CHANGE COLUMN `firstname` `name` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ;

ALTER TABLE `talentcloud`.`user` 
CHANGE COLUMN `open_id` `open_id` INT(10) NOT NULL,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`user_id`, `open_id`),
ADD UNIQUE INDEX `open_id_UNIQUE` (`open_id` ASC);

ALTER TABLE `talentcloud`.`user` 
DROP COLUMN `password`;
