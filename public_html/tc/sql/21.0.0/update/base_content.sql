/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  gregg
 * Created: Apr 25, 2018
 */
SET SQL_SAFE_UPDATES = 0;

UPDATE `talentcloud`.`base_content`
SET `base_content_key` = "updateProfileApplicantProfileFormNameLabelSpan"
WHERE `base_content_key` = "updateProfileApplicantProfileFormFirstNameLabelSpan";

UPDATE `talentcloud`.`base_content`
SET `base_content_key` = "profileEditName"
WHERE `base_content_key` = "profileEditFirstName";