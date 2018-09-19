# Makefile for Docker Nginx PHP Composer MySQL

# include .env

# MySQL
DB_DUMPS_DIR=database/db/dumps

build-db:
	@docker-compose exec -T talentcloud sh -c "php artisan migrate"
	@docker-compose exec -T talentcloud-db sh -c "psql -U talentcloud -f /manual_db/insert-data.sql"
	@docker-compose exec -T talentcloud sh -c "php artisan db:seed --force"

clean:
	@rm -Rf database/db/pgsql/*
	@rm -Rf vendor/
	@rm -Rf etc/ssl/*
	@rm -Rf report/*

code-sniff:
	@docker-compose exec -T talentcloud ./vendor/bin/phpcs --config-set ignore_errors_on_exit 1
	@docker-compose exec -T talentcloud ./vendor/bin/phpcs --config-set ignore_warnings_on_exit 1
	@docker-compose exec -T talentcloud ./vendor/bin/phpcs --config-set memory_limit 512M
	@echo "Checking the standard code..."
	@docker-compose exec -T talentcloud ./vendor/bin/phpcs -v --standard=PSR2 --extensions=php app/ public/

docker-start:
	docker-compose up -d

docker-stop:
	@docker-compose down -v
	@make clean

gen-certs:
	@docker run --rm -v $(shell pwd)/etc/ssl:/certificates -e "SERVER=tc.gccollab.ca" jacoelho/generate-certificate

logs:
	@docker-compose logs -f

phpmd:
	@docker-compose exec -T talentcloud ./vendor/bin/phpmd ./app text cleancode,codesize,controversial,design,naming,unusedcode --ignore-violations-on-exit --reportfile report/phpmd.txt

test: code-sniff
	@docker-compose exec -T talentcloud ./vendor/bin/phpunit --colors=always --configuration ./

.PHONY: clean test code-sniff
