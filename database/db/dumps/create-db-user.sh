#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL

	ALTER ROLE postgres WITH CREATEDB CREATEROLE;

	\c postgres postgres;

	DROP DATABASE IF EXISTS talentcloud;
	DROP ROLE IF EXISTS talentcloud;

	CREATE ROLE talentcloud WITH SUPERUSER LOGIN PASSWORD 'talentcloud';
	CREATE DATABASE talentcloud
	    WITH OWNER = "talentcloud"
	        ENCODING = 'UTF8'
	        TABLESPACE = pg_default
	        LC_COLLATE = 'en_CA.UTF-8'
	        LC_CTYPE = 'en_CA.UTF-8'
	        CONNECTION LIMIT = 25;
	GRANT CONNECT, TEMPORARY ON DATABASE talentcloud TO public;
	GRANT ALL ON DATABASE talentcloud TO talentcloud;

	\c talentcloud talentcloud;

EOSQL
