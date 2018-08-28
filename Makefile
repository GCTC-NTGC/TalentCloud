# Makefile for Docker Nginx PHP Composer MySQL

# include .env

# MySQL
MYSQL_DUMPS_DIR=database/db/dumps

build-db:
	@docker exec -ti talentcloud sh -c "php artisan migrate"
	@docker exec -ti talentcloud-db sh -c "psql -U talentcloud -f /manual_db/insert-data.sql"

clean:
	@rm -Rf database/db/pgsql/*
	@rm -Rf vendor/
	@rm -Rf composer.lock
	@rm -Rf etc/ssl/*

code-sniff:
	@echo "Checking the standard code..."
	@docker-compose exec -T talentcloud ./vendor/bin/phpcs -v --standard=PSR2 app/src

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
	@docker-compose exec -T talentcloud \
	./vendor/bin/phpmd \
	./app/src \
	text cleancode,codesize,controversial,design,naming,unusedcode

test: code-sniff
	@docker-compose exec -T talentcloud ./vendor/bin/phpunit --colors=always --configuration ./
	@make resetOwner

resetOwner:
	@$(shell chown -Rf $(SUDO_USER):$(shell id -g -n $(SUDO_USER)) $(MYSQL_DUMPS_DIR) "$(shell pwd)/etc/ssl" "$(shell pwd):/app" 2> /dev/null)

.PHONY: clean test code-sniff
