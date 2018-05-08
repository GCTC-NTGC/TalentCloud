ALTER TABLE `team_culture_details`
ADD COLUMN `operating_context` MEDIUMTEXT COLLATE utf8_unicode_ci NOT NULL AFTER `narrative_text`,
ADD COLUMN `what_we_value` MEDIUMTEXT COLLATE utf8_unicode_ci NOT NULL AFTER `operating_context`,
ADD COLUMN `how_we_work` MEDIUMTEXT COLLATE utf8_unicode_ci NOT NULL AFTER `what_we_value`;
