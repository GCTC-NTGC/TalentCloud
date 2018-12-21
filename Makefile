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

	@docker run --rm -v $(shell pwd):/app composer install


docker-start:
	@docker-compose up -d

docker-stop:
	@docker-compose down

fake-data:
	@docker exec talentcloud sh -c "php artisan db:seed"

gen-certs:
	@docker run --rm -v $(shell pwd)/etc/ssl:/certificates -e "SERVER=talent.local.ca" jacoelho/generate-certificate

laravel-init:
	@docker exec talentcloud sh -c "php artisan key:generate"

logs:
	@docker-compose logs -f

phpmd:
	@docker-compose exec -T talentcloud ./vendor/bin/phpmd ./app \
	html codesize,naming,unusedcode --reportfile report/phpmd.html --ignore-violations-on-exit
phpunit:
	@docker exec talentcloud sh -c "vendor/bin/phpunit --coverage-clover=coverage.xml"

test-all: code-sniff phpmd phpunit


.PHONY: build-db clean code-sniff composer-install docker-start docker-stop fake-data gen-certs logs phpmd phpunit set-root-perms test-all
