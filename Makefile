# Makefile for Docker Nginx PHP Composer MySQL

# include .env

# MySQL
DB_DUMPS_DIR=database/db/dumps

ROOT=/var/www

build-db:
	@docker exec talentcloud sh -c "php artisan migrate"
	@docker exec postgres sh -c "psql -U talentcloud -f /manual_db/insert-data.sql"
	@docker exec talentcloud sh -c "php artisan db:seed"

build-db-scrutinizer:
	@php artisan migrate
	@psql -U scrutinizer -f /manual_db/insert-data.sql
	@php artisan db:seed

fake-data:
	@docker exec talentcloud sh -c "php artisan db:seed"

clean:
	@rm -Rf vendor/
	@rm -Rf composer.lock
	@rm -Rf etc/ssl/*
	@rm -Rf report/*

code-sniff:
	@docker-compose exec -T talentcloud ./vendor/bin/phpcs --config-set ignore_errors_on_exit 1
	@docker-compose exec -T talentcloud ./vendor/bin/phpcs --config-set ignore_warnings_on_exit 1
	@echo "Checking the standard code..."
	@docker-compose exec -T talentcloud ./vendor/bin/phpcs -d memory_limit=512M -v --standard=PSR2 --extensions=php app/

docker-start:
	@docker-compose up -d

docker-stop:
	@docker-compose down

gen-certs:
	@docker run --rm -v $(shell pwd)/etc/ssl:/certificates -e "SERVER=talent.local.ca" jacoelho/generate-certificate

logs:
	@docker-compose logs -f

phpmd:
	@docker-compose exec -T talentcloud ./vendor/bin/phpmd /app \
	text cleancode,codesize

set-root-perms:
	@docker exec talentcloud sh -c "chgrp -R www-data ${ROOT}/storage ${ROOT}/bootstrap/cache"
	@docker exec talentcloud sh -c "chmod -R g+w ${ROOT}/storage ${ROOT}/bootstrap/cache"

test: code-sniff
	@docker-compose exec -T talentcloud ./vendor/bin/phpunit --colors=always --configuration ./

.PHONY: build-db build-db-scrutinizer fake-data clean code-sniff docker-start docker-stop gen-certs logs phpmd set-root-perms test
