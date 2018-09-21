ALTER ROLE postgres WITH CREATEDB CREATEROLE;

\c postgres postgres;

DROP DATABASE IF EXISTS talentcloud;
DROP ROLE IF EXISTS talentcloud;

CREATE ROLE talentcloud WITH SUPERUSER LOGIN PASSWORD 'talentcloud';
CREATE DATABASE talentcloud
    WITH OWNER = "talentcloud"
        ENCODING = 'UTF8'
        TABLESPACE = pg_default
        CONNECTION LIMIT = 25;
GRANT CONNECT, TEMPORARY ON DATABASE talentcloud TO public;
GRANT ALL ON DATABASE talentcloud TO talentcloud;

\c talentcloud talentcloud;
