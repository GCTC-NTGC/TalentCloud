INSERT into base_content
(base_content_type_id, base_content_key, base_content_value, base_content_locale_id)
VALUES
(1,'announcement','This site is under construction. The jobs are not in fact real at the moment.',1),
(1,'announcement','Ce site est en construction. Les emplois ne sont pas réels en ce moment.',2)
;

UPDATE `talentcloud`.`base_content` SET `base_content_value`='Aller à l\'étape 2' WHERE `base_content_key`='goToStep2' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Aller à l\'étape 1' WHERE `base_content_key`='goToStep1' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Aller à l\'étape 3' WHERE `base_content_key`='goToStep3' AND `base_content_locale_id`='0000000002';
UPDATE `talentcloud`.`base_content` SET `base_content_value`='Aller à la revue' WHERE `base_content_key`='goToReview' AND `base_content_locale_id`='0000000002';