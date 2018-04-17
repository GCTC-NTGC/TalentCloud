TRUNCATE `application_status`;
INSERT INTO `application_status` (application_status_id, application_status)
VALUES
(1,'Draft'),
(2,'Submitted'),
(3,'Requires Action'),
(4,'Under Review'),
(5,'Rejected');

TRUNCATE `application_status_details`;

INSERT INTO `application_status_details` (application_status_id, application_status_locale_id, application_status)
VALUES 
(1,1,'Draft'),
(1,2,'Provisoire'),
(2,1,'Submitted'),
(2,2,'Soumis'),
(3,1,'Requires Action'),
(3,2,'Nécessite une action'),
(4,1,'Under Review'),
(4,2,'À l\'étude'),
(5,1,'Rejected'),
(5,2,'Rejeté');
