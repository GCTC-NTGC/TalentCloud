DELETE FROM `talentcloud`.`file_type_details`;
DELETE FROM `talentcloud`.`file_type`;

INSERT INTO `talentcloud`.`file_type`
(`file_type_id`, `file_type`)
VALUES
(1, 'word document'),
(2, 'powerpoint presentation'),
(3, 'video'),
(4, 'article publication'),
(5, 'other');

INSERT INTO `talentcloud`.`file_type_details`
(`file_type_id`, `locale_id`, `file_type_details_name`)
VALUES
(1, 1, 'Word Document'),
(1, 2, 'Document Word'),
(2, 1, 'PowerPoint Presentation'),
(2, 2, 'Présentation PowerPoint'),
(3, 1, 'Video'),
(3, 2, 'Vidéo'),
(4, 1, 'Article Publication'),
(4, 2, 'Publication d\'Article'),
(5, 1, 'Other'),
(5, 2, 'Autre');