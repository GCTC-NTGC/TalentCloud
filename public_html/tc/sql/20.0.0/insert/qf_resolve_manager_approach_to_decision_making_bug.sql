/**
 * Author:  Queenie Fung
 * Created: 29-Mar-2018
 */

UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>almost never</strong> review my team\'s work before it is shared.' WHERE `base_content_id`='0000001087';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Je ne revois <strong>presque jamais</strong> le travail de mon équipe avant qu\'il ne soit partagé.' WHERE `base_content_id`='0000001088';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>rarely</strong> review my team\'s work before it is shared' WHERE `base_content_id`='0000001089';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Je revois <strong>rarement</strong> le travail de mon équipe avant qu\'elle ne soit partagée.' WHERE `base_content_id`='0000001090';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>sometimes</strong> review my team\'s work before it is shared.' WHERE `base_content_id`='0000001091';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Je révise <strong>parfois</strong> le travail de mon équipe avant de le partager.' WHERE `base_content_id`='0000001092';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>usually</strong> review my team\'s work before it is shared.' WHERE `base_content_id`='0000001093';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='J\'examine <strong>habituellement</strong> le travail de mon équipe avant de le partager' WHERE `base_content_id`='0000001094';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>almost always</strong> review my team\'s work before it is shared.' WHERE `base_content_id`='0000001095';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Je revois <strong>presque toujours</strong> le travail de mon équipe avant de le partager.' WHERE `base_content_id`='0000001096';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>almost never</strong> get in early or stay late to get some extra work done.' WHERE `base_content_id`='0000001097';

INSERT into base_content
(base_content_type_id, base_content_key, base_content_value, base_content_locale_id)
VALUES
(1,'managerDecisions_tipWhatis','<strong>What is this?</strong>',1),
(1,'managerDecisions_tipWhatis','<strong>Qu\'est-ce que c\'est?</strong>',2),
(1,'managerDecisions_tipSummary','Managers are asked to rate themselves on these four criterias to let applicants better understand their managing style using the following choices: <br/> Almost never, Rarely, Sometimes, Usually, Almost Always',1),
(1,'managerDecisions_tipSummary','Les gestionnaires sont invités à se noter sur ces quatre critères pour permettre aux candidats de mieux comprendre leur style de gestion en utilisant les choix suivants: <br/> Presque jamais, Rarement, Parfois, Habituellement, Presque toujours',2)
;
