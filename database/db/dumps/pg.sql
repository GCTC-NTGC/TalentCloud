-- Database: talentcloud

-- DROP DATABASE talentcloud;

CREATE DATABASE talentcloud
  WITH OWNER = "talentcloud"
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_CA.UTF-8'
       LC_CTYPE = 'en_CA.UTF-8'
       CONNECTION LIMIT = 25;
GRANT CONNECT, TEMPORARY ON DATABASE talentcloud TO public;
GRANT ALL ON DATABASE talentcloud TO talentcloud;
GRANT ALL ON DATABASE talentcloud TO postgres;
