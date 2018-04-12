INSERT INTO application_status (application_status)
VALUES
("Draft");

INSERT INTO application_status_details (application_status_id, application_status_locale_id, application_status)
VALUES
((SELECT application_status_id FROM application_status a_s WHERE a_s.application_status="Draft"), 1, "Draft"),
((SELECT application_status_id FROM application_status a_s WHERE a_s.application_status="Draft"), 2, "Provisoire");