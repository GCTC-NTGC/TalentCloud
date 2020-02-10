# Makefile for Docker Nginx PHP Composer

build-db:
	@docker exec postgres sh -c "psql -c 'create database testing with owner talentcloud;' -U talentcloud"
	@docker exec talentcloud sh -c "php artisan migrate && php artisan db:seed"

clean:
	@rm -Rf composer.lock package-lock.json etc/ssl/ node_modules/ report/ vendor/

composer-install:
	@docker run --rm -v $(shell pwd):/app composer install

docker-start:
	@docker-compose up -d

docker-stop:
	@docker-compose down

fake-data:
	@docker exec talentcloud sh -c "php artisan db:seed"

fresh-db:
	@docker exec talentcloud sh -c "php artisan migrate:fresh"

gen-certs:
	@docker run --rm -v $(shell pwd)/etc/ssl:/certificates -e "SERVER=talent.test" jacoelho/generate-certificate

logs:
	@docker-compose logs -f

phpunit:
    # uses phpdbg to generate code coverage (instead of xdebug)
	@docker exec talentcloud sh -c "phpdbg -qrr ./vendor/bin/phpunit -dmemory_limit=4G --coverage-clover=report/phpunit/coverage.xml --log-junit=report/phpunit/junit.phpunit.xml"

set-perms:
	@docker exec talentcloud sh -c "chown -R www-data /var/www/storage /var/www/vendor /var/www/bootstrap/cache"
	@docker exec talentcloud sh -c "chmod -R 775 /var/www"

test:
	@docker exec talentcloud sh -c "phpdbg -qrr ./vendor/bin/phpunit -dmemory_limit=4G --no-coverage"

.PHONY: build-db clean composer-install docker-start docker-stop fake-data fresh-db gen-certs logs phpunit set-perms test
