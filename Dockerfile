FROM php:7.0-fpm

RUN apt-get update -y && apt-get install -y libpq-dev zlib1g-dev libmcrypt-dev openssl curl git unzip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pgsql pdo_pgsql zip && \
        docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql && \
        pecl install xdebug && \
        docker-php-ext-enable xdebug

COPY . /var/www
WORKDIR /var/www
RUN composer install
ENV PATH="~/.composer/vendor/bin:./vendor/bin"
USER www-data
EXPOSE 9000
