ALTER ROLE postgres WITH CREATEDB CREATEROLE;

\c postgres postgres;

CREATE ROLE talentcloud WITH SUPERUSER LOGIN PASSWORD 'talentcloud';
CREATE DATABASE talent_reserve
    WITH OWNER = "talentcloud"
        ENCODING = 'UTF8'
        TABLESPACE = pg_default
        CONNECTION LIMIT = 25;
GRANT CONNECT, TEMPORARY ON DATABASE talent_reserve TO public;
GRANT ALL ON DATABASE talent_reserve TO talentcloud;

\c talent_reserve talentcloud;
