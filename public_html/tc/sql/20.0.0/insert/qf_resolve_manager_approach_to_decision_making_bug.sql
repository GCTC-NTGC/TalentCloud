/**
 * Author:  Queenie Fung
 * Created: 29-Mar-2018
 */

UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>almost never</strong> review my team\'s work before it is shared.' WHERE `base_content_key`='managerProfile_review_option0' AND base_content_locale_id=1;
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Je ne revois <strong>presque jamais</strong> le travail de mon équipe avant qu\'il ne soit partagé.' WHERE `base_content_key`='managerProfile_review_option0' AND base_content_locale_id=2;
UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>rarely</strong> review my team\'s work before it is shared' WHERE `base_content_key`='managerProfile_review_option1'; /*AND Locale*/
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Je revois <strong>rarement</strong> le travail de mon équipe avant qu\'elle ne soit partagée.' WHERE `base_content_key`='managerProfile_review_option1';  /*AND Locale*/
UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>sometimes</strong> review my team\'s work before it is shared.' WHERE `base_content_key`='managerProfile_review_option2';  /*AND Locale*/
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Je révise <strong>parfois</strong> le travail de mon équipe avant de le partager.' WHERE `base_content_key`='managerProfile_review_option2';  /*AND Locale*/
UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>usually</strong> review my team\'s work before it is shared.' WHERE `base_content_key`='managerProfile_review_option3';  /*AND Locale*/
UPDATE `talentcloud`.`base_content` SET `base_content_value`='J\'examine <strong>habituellement</strong> le travail de mon équipe avant de le partager' WHERE `base_content_key`='managerProfile_review_option3';  /*AND Locale*/
UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>almost always</strong> review my team\'s work before it is shared.' WHERE `base_content_key`='managerProfile_review_option4';  /*AND Locale*/
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Je revois <strong>presque toujours</strong> le travail de mon équipe avant de le partager.' WHERE `base_content_id`='managerProfile_review_option4';  /*AND Locale*/
UPDATE `talentcloud`.`base_content` SET `base_content_value`='I <strong>almost never</strong> get in early or stay late to get some extra work done.' WHERE `base_content_id`='managerProfile_stayLate_option0';  /*AND Locale*/

DELETE FROM `talentcloud`.`base_content` WHERE `base_content_id`='managerProfile_engagement_option4';

INSERT into base_content
(base_content_type_id, base_content_key, base_content_value, base_content_locale_id)
VALUES
(1,'managerProfile_engagement_option3','I <strong>usually</strong> engage my team before responding to management.',1),
(1,'managerProfile_engagement_option3','J\'engage <strong>habituellement</strong> mon équipe avant de répondre à la direction.',2),
(1,'managerProfile_engagement_option4','I <strong>almost always</strong> engage my team before responding to management.',1),
(1,'managerProfile_engagement_option4','J\'engage <strong>presque toujours</strong> mon équipe avant de répondre à la direction.',2),
(1,'.managerProfile_acceptLowValueWorkRequests_option0','I <strong>almost never</strong> refuse low value work requests from management.',1),
(1,'.managerProfile_acceptLowValueWorkRequests_option0','Je ne refuse <strong>presque jamais</strong> les demandes de travail de faible valeur de la direction.',2),
(1,'.managerProfile_acceptLowValueWorkRequests_option1','I <strong>rarely</strong> refuse low value work requests from management.',1),
(1,'.managerProfile_acceptLowValueWorkRequests_option1','Je refuse <strong>rarement</strong> les demandes de travail de faible valeur de la direction.',2),
(1,'.managerProfile_acceptLowValueWorkRequests_option2','I <strong>sometimes</strong> refuse low value work requests from management.',1),
(1,'.managerProfile_acceptLowValueWorkRequests_option2','Je refuse <strong>parfois</strong> des demandes de travail de faible valeur de la part de la direction.',2),
(1,'.managerProfile_acceptLowValueWorkRequests_option3','I <strong>usually</strong> refuse low value work requests from management.',1),
(1,'.managerProfile_acceptLowValueWorkRequests_option3','Je refuse <strong>habituellement</strong> les demandes de travail de faible valeur de la direction.',2),
(1,'.managerProfile_acceptLowValueWorkRequests_option4','I almost <strong>always</strong> refuse low value work requests from management.',1),
(1,'.managerProfile_acceptLowValueWorkRequests_option4','Je refuse <strong>presque toujours</strong> les demandes de travail de faible valeur de la direction.',2),
;


INSERT into base_content
(base_content_type_id, base_content_key, base_content_value, base_content_locale_id)
VALUES
(1,'managerDecisions_tipWhatis','<strong>What is this?</strong>',1),
(1,'managerDecisions_tipWhatis','<strong>Qu\'est-ce que c\'est?</strong>',2),
(1,'managerDecisions_tipSummary','Managers are asked to rate themselves on these four criterias to let applicants better understand their managing style using the following choices: <br/> Almost never, Rarely, Sometimes, Usually, Almost Always',1),
(1,'managerDecisions_tipSummary','Les gestionnaires sont invités à se noter sur ces quatre critères pour permettre aux candidats de mieux comprendre leur style de gestion en utilisant les choix suivants: <br/> Presque jamais, Rarement, Parfois, Habituellement, Presque toujours',2)
;
