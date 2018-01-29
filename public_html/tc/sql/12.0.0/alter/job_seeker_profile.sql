ALTER TABLE `talentcloud`.`job_seeker_profile` 
ADD COLUMN `job_seeker_profile_tagline` LONGTEXT NOT NULL AFTER `job_seeker_profile_superpower`,
ADD COLUMN `job_seeker_profile_twitter_link` VARCHAR(65) NOT NULL AFTER `job_seeker_profile_tagline`,
ADD COLUMN `job_seeker_profile_linkedin_link` VARCHAR(65) NOT NULL AFTER `job_seeker_profile_twitter_link`,
ADD COLUMN `job_seeker_profile_about_me` LONGTEXT NOT NULL AFTER `job_seeker_profile_linkedin_link`;

