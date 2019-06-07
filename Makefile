# Makefile for Docker Nginx PHP Composer

include .env

URL=$(APP_URL)

build-db:
	@docker exec talentcloud sh -c "php artisan migrate"
	@docker exec talentcloud sh -c "php artisan db:seed"

clean:
	@rm -Rf vendor/
	@rm -Rf composer.lock
	@rm -Rf etc/ssl/*
	@rm -Rf report/*

code-sniff:
	@docker exec -T talentcloud ./vendor/bin/phpcs --config-set ignore_errors_on_exit 1
	@docker exec -T talentcloud ./vendor/bin/phpcs --config-set ignore_warnings_on_exit 1
	@docker exec -T talentcloud ./vendor/bin/phpcs -d memory_limit=512M -v --standard=PSR2 --extensions=php app/

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

lighthouse:
	@lighthouse-batch --html -g -p '--chrome-flags="--headless" --only-categories=accessibility --only-categories=seo --port=9222' --sites=$(URL),$(URL)/fr,$(URL)/en/login,$(URL)/fr/login,$(URL)/en/register,$(URL)/fr/register,$(URL)/en/password/reset,$(URL)/fr/password/reset,\
	$(URL)/en/jobs,$(URL)/fr/jobs,$(URL)/en/applications,$(URL)/fr/applications,\
	$(URL)/en/jobs/23,$(URL)/fr/jobs/23,$(URL)/en/jobs/23/application/step-01,$(URL)/fr/jobs/23/application/step-01,$(URL)/en/jobs/23/application/step-02,$(URL)/fr/jobs/23/application/step-02,$(URL)/en/jobs/23/application/step-03,$(URL)/fr/jobs/23/application/step-03,$(URL)/en/jobs/23/application/step-04,$(URL)/fr/jobs/23/application/step-04,$(URL)/en/jobs/23/application/step-05,$(URL)/fr/jobs/23/application/step-05,$(URL)/en/jobs/23/application/step-06,$(URL)/fr/jobs/23/application/step-06,\
	$(URL)/en/profile,$(URL)/fr/profile,$(URL)/en/profile/experience,$(URL)/fr/profile/experience,$(URL)/en/profile/skills,$(URL)/fr/profile/skills,$(URL)/en/profile/references,$(URL)/fr/profile/references,$(URL)/en/profile/portfolio,$(URL)/fr/profile/portfolio\
	$(URL)/en/faq,$(URL)/fr/faq,$(URL)/en/tos,$(URL)/fr/tos,$(URL)/en/privacy,$(URL)/fr/privacy,$(URL)/en/indigenous,$(URL)/fr/indigenous

logs:
	@docker-compose logs -f

phpmd:
	@docker exec -T talentcloud ./vendor/bin/phpmd ./app \
	html codesize,naming,unusedcode --reportfile report/phpmd.html --ignore-violations-on-exit

phpunit:
	@docker exec talentcloud sh -c "vendor/bin/phpunit --coverage-clover=coverage.xml"

jest:
    @docker exec talentcloud sh -c "npm test"

test:
	@docker exec talentcloud sh -c "vendor/bin/phpunit --no-coverage"

set-perms:
	@docker exec talentcloud sh -c "chown -R www-data /var/www/storage /var/www/vendor /var/www/bootstrap/cache"
	@docker exec talentcloud sh -c "chmod -R 775 /var/www"

test-all: code-sniff phpmd phpunit jest

.PHONY: build-db clean code-sniff composer-install docker-start docker-stop fake-data fresh-db gen-certs lighthouse logs phpmd phpunit test set-perms test-all
