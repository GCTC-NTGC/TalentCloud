# Makefile for Docker Nginx PHP Composer MySQL

# include .env

# MySQL
DB_DUMPS_DIR=database/db/dumps

build-db:
	@docker exec -ti talentcloud sh -c "php artisan migrate"
	@docker exec -ti talentcloud-db sh -c "psql -U talentcloud -f /manual_db/insert-data.sql"
	@docker exec -ti talentcloud sh -c "php artisan db:seed"

clean:
	@rm -Rf database/db/pgsql/*
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
	docker-compose up -d

docker-stop:
	@docker-compose down -v
	@make clean

gen-certs:
	@docker run --rm -v $(shell pwd)/etc/ssl:/certificates -e "SERVER=tc.gccollab.ca" jacoelho/generate-certificate

logs:
	@docker-compose logs -f

phpmd:
	@docker-compose exec -T talentcloud ./vendor/bin/phpmd /app \
	text cleancode,codesize

test: code-sniff
	@docker-compose exec -T talentcloud ./vendor/bin/phpunit --colors=always --configuration ./

.PHONY: clean test code-sniff
