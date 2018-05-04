DELETE FROM `talentcloud`.`relationship_details`;
DELETE FROM `talentcloud`.`relationship`;

INSERT INTO `talentcloud`.`relationship`
(`relationship_id`, `relationship_name`)
VALUES
(1, 'superior'),
(2, 'coworker'),
(3, 'subordinate');

INSERT INTO `talentcloud`.`relationship_details`
(`relationship_id`, `locale_id`, `relationship_details_name`)
VALUES
(1, 1, 'Superior'),
(1, 2, 'Supérieur'),
(2, 1, 'Coworker'),
(2, 2, 'Collaborateur'),
(3, 1, 'Subordinate'),
(3, 2, 'Subalterne');