INSERT INTO citizenship_declaration (citizenship_declaration_common_name) VALUES ('Canadian Citizen');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO citizenship_declaration_details (citizenship_declaration_id,citizenship_declaration_locale_id,citizenship_declaration) VALUES (@base_table_id,1,'Canadian Citizen'),(@base_table_id,2,'
Citoyen Canadien');

INSERT INTO citizenship_declaration (citizenship_declaration_common_name) VALUES ('Permanent Resident of Canada');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO citizenship_declaration_details (citizenship_declaration_id,citizenship_declaration_locale_id,citizenship_declaration) VALUES (@base_table_id,1,'Permanent Resident of Canada'),(@base_table_id,2,'
Résident Permanent du Canada');

INSERT INTO citizenship_declaration (citizenship_declaration_common_name) VALUES ('Open - Work Permit');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO citizenship_declaration_details (citizenship_declaration_id,citizenship_declaration_locale_id,citizenship_declaration) VALUES (@base_table_id,1,'Open - Work Permit'),(@base_table_id,2,'Open - Permis de Travail');

INSERT INTO citizenship_declaration (citizenship_declaration_common_name) VALUES ('Closed - Work Permit');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO citizenship_declaration_details (citizenship_declaration_id,citizenship_declaration_locale_id,citizenship_declaration) VALUES (@base_table_id,1,'Closed - Work Permit'),(@base_table_id,2,'Fermé - Permis de Travail');

INSERT INTO citizenship_declaration (citizenship_declaration_common_name) VALUES ('I am currently not entitled to work in Canada');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO citizenship_declaration_details (citizenship_declaration_id,citizenship_declaration_locale_id,citizenship_declaration) VALUES (@base_table_id,1,'I am currently not entitled to work in Canada'),(@base_table_id,2,'Je n\'ai Actuellement pas le Droit de Travailler au Canada');