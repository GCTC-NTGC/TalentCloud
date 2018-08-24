#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL

	ALTER ROLE postgres WITH CREATEDB CREATEROLE;

	CREATE DATABASE testdb;

	\c postgres postgres;

	DROP DATABASE IF EXISTS testdb;
	DROP DATABASE IF EXISTS talentcloud;
	DROP ROLE IF EXISTS talentcloud;

	CREATE ROLE talentcloud WITH SUPERUSER LOGIN PASSWORD 'talentcloud';

	CREATE DATABASE talentcloud
	  WITH ENCODING='UTF8'
	  OWNER=talentcloud
	  CONNECTION LIMIT=25;

	GRANT ALL PRIVILEGES ON DATABASE talentcloud TO talentcloud;

	\c talentcloud talentcloud;

EOSQL

psql -U postgres -d talentcloud -f db/dumps/pgbackup.txt;
