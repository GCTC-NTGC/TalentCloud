FROM php:7.0-fpm

RUN apt-get update -y && apt-get install -y libpq-dev zlib1g-dev libmcrypt-dev openssl curl git unzip

RUN docker-php-ext-install pgsql pdo_pgsql zip && \
        docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql && \
        pecl install xdebug && \
        docker-php-ext-enable xdebug

COPY . /var/www
WORKDIR /var/www
USER www-data
EXPOSE 9000
