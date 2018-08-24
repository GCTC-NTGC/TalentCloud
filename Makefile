# Makefile for Docker Nginx PHP Composer MySQL

# include .env

# MySQL
MYSQL_DUMPS_DIR=database/db/dumps

help:
	@echo ""
	@echo "usage: make COMMAND"
	@echo ""
	@echo "Commands:"
	@echo "  code-sniff          Check the API with PHP Code Sniffer (PSR2)"
	@echo "  clean               Clean directories for reset"
	@echo "  docker-start        Create and start containers"
	@echo "  docker-stop         Stop and clear all services"
	@echo "  gen-certs           Generate SSL certificates"
	@echo "  logs                Follow log output"
	@echo "  mysql-dump          Create backup of all databases"
	@echo "  mysql-restore       Restore backup of all databases"
	@echo "  phpmd               Analyse the API with PHP Mess Detector"
	@echo "  test                Test application"

clean:
	@rm -Rf database/db/mysql/*
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

mysql-dump:
	@mkdir -p $(MYSQL_DUMPS_DIR)
	@docker exec $(shell docker-compose ps -q talentcloud-db) mysqldump --all-databases -u"talentcloud" -p"talentcloud" > $(MYSQL_DUMPS_DIR)/db.sql 2>/dev/null
	@make resetOwner

mysql-restore:
	@docker exec -i $(shell docker-compose ps -q talentcloud-db) mysql -u"talentcloud" -p"talentcloud" < $(MYSQL_DUMPS_DIR)/db.sql 2>/dev/null

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
