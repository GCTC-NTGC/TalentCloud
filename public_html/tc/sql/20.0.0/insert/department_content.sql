TRUNCATE `talentcloud`.`department`;
INSERT INTO `talentcloud`.`department` (department_common_name, department_province_id, department_city_id)
VALUES
('Treasury Board of Canada Secretariat', 9, 1),
('Natural Resources Canada', 9, 1),
('Transport Canada', 9, 1),
('Environment and Climate Change Canada', 9, 1),
('Employment and Social Development Canada', 9, 1);

TRUNCATE `talentcloud`.`department_details`;
INSERT INTO `talentcloud`.`department_details` (department_id, department_details_locale_id, department_details_name)
VALUES
( (SELECT department_id FROM `talentcloud`.`department` WHERE department_common_name='Treasury Board of Canada Secretariat'), 1, 'Treasury Board of Canada Secretariat'),
( (SELECT department_id FROM `talentcloud`.`department` WHERE department_common_name='Treasury Board of Canada Secretariat'), 2, 'Secrétariat du Conseil du Trésor du Canada'),
( (SELECT department_id FROM `talentcloud`.`department` WHERE department_common_name='Natural Resources Canada'), 1, 'Natural Resources Canada'),
( (SELECT department_id FROM `talentcloud`.`department` WHERE department_common_name='Natural Resources Canada'), 2, 'Ressources naturelles Canada'),
( (SELECT department_id FROM `talentcloud`.`department` WHERE department_common_name='Transport Canada'), 1, 'Transport Canada'),
( (SELECT department_id FROM `talentcloud`.`department` WHERE department_common_name='Transport Canada'), 2, 'Transports Canada'),
( (SELECT department_id FROM `talentcloud`.`department` WHERE department_common_name='Environment and Climate Change Canada'), 1, 'Environment and Climate Change Canada'),
( (SELECT department_id FROM `talentcloud`.`department` WHERE department_common_name='Environment and Climate Change Canada'), 2, 'Environnement et Changement climatique Canada'),
( (SELECT department_id FROM `talentcloud`.`department` WHERE department_common_name='Employment and Social Development Canada'), 1, 'Employment and Social Development Canada'),
( (SELECT department_id FROM `talentcloud`.`department` WHERE department_common_name='Employment and Social Development Canada'), 2, 'Emploi et Développement social Canada')
;