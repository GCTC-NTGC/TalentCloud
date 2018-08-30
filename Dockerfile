FROM php:7.2-fpm-alpine3.7

RUN apk update && apk upgrade && \
    docker-php-source extract && \
    \
    apk add --no-cache \
    --virtual .build-dependencies \
    $PHPIZE_DEPS \
    zlib-dev \
    cyrus-sasl-dev \
    git \
    autoconf \
    g++ \
    libtool \
    make \
    pcre-dev && \
    \
    apk add --no-cache \
    postgresql-dev \
    imagemagick-dev \
    \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
# pecl install xdebug \
# docker-php-ext-enable xdebug \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pgsql pdo_pgsql

# Open up fcgi port
EXPOSE 9000
