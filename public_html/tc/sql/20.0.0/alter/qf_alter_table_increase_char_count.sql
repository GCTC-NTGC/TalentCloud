/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Queenie Fung
 * Created: 3-Apr-2018
 */

ALTER TABLE `talentcloud`.`base_content` 
CHANGE COLUMN `base_content_key` `base_content_key` VARCHAR(64) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL ;
