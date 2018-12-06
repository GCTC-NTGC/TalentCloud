# Makefile for Docker Nginx PHP Composer

ROOT=/var/www

build-db:
	@docker exec talentcloud sh -c "php artisan migrate"
	@docker exec postgres sh -c "psql -U talentcloud -f /manual_db/insert-data.sql"
	@docker exec talentcloud sh -c "php artisan db:seed"

clean:
	@rm -Rf vendor/
	@rm -Rf composer.lock
	@rm -Rf etc/ssl/*
	@rm -Rf report/*

code-sniff:
	@docker-compose exec -T talentcloud ./vendor/bin/phpcs --config-set ignore_errors_on_exit 1
	@docker-compose exec -T talentcloud ./vendor/bin/phpcs --config-set ignore_warnings_on_exit 1
	@docker-compose exec -T talentcloud ./vendor/bin/phpcs -d memory_limit=512M -v --standard=PSR2 --extensions=php app/

composer-install:
	@docker run --rm -v $(shell pwd):/app composer:latest install
	@docker run --rm --interactive --tty --volume $(shell pwd):/app composer "update"

docker-start:
	@docker-compose up -d

docker-stop:
	@docker-compose down

fake-data:
	@docker exec talentcloud sh -c "php artisan db:seed"

gen-certs:
	@docker run --rm -v $(shell pwd)/etc/ssl:/certificates -e "SERVER=talent.local.ca" jacoelho/generate-certificate

logs:
	@docker-compose logs -f

phpmd:
	@docker-compose exec -T talentcloud ./vendor/bin/phpmd ./app \
	html codesize,naming,unusedcode --reportfile report/phpmd.html --ignore-violations-on-exit

phpunit:
	@docker-compose exec -T talentcloud ./vendor/bin/phpunit

set-root-perms:
	#@docker exec talentcloud sh -c "chgrp -R www-data ${ROOT}/storage/logs ${ROOT}/bootstrap/cache"
	@docker exec talentcloud sh -c "chmod -R g+w ${ROOT}/storage/logs ${ROOT}/bootstrap/cache"

test-all: code-sniff phpmd phpunit

.PHONY: build-db clean code-sniff composer-install docker-start docker-stop fake-data gen-certs logs phpmd phpunit set-root-perms test-all
