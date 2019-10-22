FROM php:7.2-fpm-alpine3.7

RUN apk update && apk upgrade && \
        docker-php-source extract && \
    apk add --no-cache --virtual .build-dependencies \
        zlib-dev \
        cyrus-sasl-dev \
        git \
        autoconf \
        g++ \
        libtool \
        make \
        pcre-dev && \
    apk add --no-cache imagemagick imagemagick-dev postgresql-dev && \
        pecl install imagick && \
        pecl install xdebug && \
        docker-php-ext-enable imagick xdebug && \
        docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql && \
        docker-php-ext-install pgsql pdo_pgsql && \
    apk del .build-dependencies && \
        rm -rf /var/cache/apk/*

COPY . /var/www
WORKDIR /var/www
EXPOSE 9000
