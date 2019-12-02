# Makefile for Docker Nginx PHP Composer

build-db:
	@docker exec talentcloud sh -c "php artisan migrate"
	@docker exec talentcloud sh -c "php artisan db:seed"

clean:
	@rm -Rf composer.lock package-lock.json etc/ssl/ node_modules/ report/ vendor/

code-sniff:
	@docker exec talentcloud sh -c "./vendor/bin/phpcs --config-set ignore_errors_on_exit 1"
	@docker exec talentcloud sh -c "./vendor/bin/phpcs --config-set ignore_warnings_on_exit 1"
	@docker exec talentcloud sh -c "./vendor/bin/phpcs -d memory_limit=512M -v --standard=PSR2 --extensions=php app/ routes/ database/migrations database/factories"

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

phpmd:
	@docker exec talentcloud sh -c "./vendor/bin/phpmd ./app \
	html codesize,naming,unusedcode --reportfile report/phpmd.html --ignore-violations-on-exit"

phpunit:
	@docker exec talentcloud sh -c "vendor/bin/phpunit --coverage-clover=coverage.xml"

test:
	@docker exec talentcloud sh -c "vendor/bin/phpunit --no-coverage"

set-perms:
	@docker exec talentcloud sh -c "chown -R www-data /var/www/storage /var/www/vendor /var/www/bootstrap/cache"
	@docker exec talentcloud sh -c "chmod -R 775 /var/www"

test-all: code-sniff phpmd phpunit

.PHONY: build-db clean code-sniff composer-install docker-start docker-stop fake-data fresh-db gen-certs logs phpmd phpunit test set-perms test-all
