FROM php:7.0-fpm-alpine3.7

RUN apk update && apk upgrade && \
        docker-php-source extract && \
    apk add --no-cache --virtual .build-dependencies \
        $PHPIZE_DEPS \
        zlib-dev \
        cyrus-sasl-dev \
        git \
        autoconf \
        g++ \
        libtool \
        make \
        pcre-dev && \
    apk add --no-cache \
        sudo \
        postgresql-dev \
        imagemagick-dev && \
        pecl install imagick && \
        docker-php-ext-enable imagick && \
        pecl install xdebug && \
        docker-php-ext-enable xdebug && \
        docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql && \
        docker-php-ext-install pgsql pdo_pgsql && \
    apk del .build-dependencies && \
        rm -rf /var/cache/apk/*
 #   curl -sS https://getcomposer.org/installer | php && \
 #       mv composer.phar /usr/local/bin/ && \
 #       ln -s /usr/local/bin/composer.phar /usr/local/bin/composer

COPY . /var/www
WORKDIR /var/www

RUN mkdir -p /var/www/vendor && \
    rm -rf .composer && \
    chown -R www-data /var/www && \
    sudo chown -R www-data /usr/local

USER www-data

#RUN composer install --no-interaction

USER root

# Open up fcgi port
EXPOSE 9000
