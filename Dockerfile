FROM php:7.0-fpm-alpine3.7

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
    apk add --no-cache postgresql-dev imagemagick-dev && \
        pecl install imagick && \
        pecl install xdebug && \
        docker-php-ext-enable imagick xdebug && \
        docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql && \
        docker-php-ext-install pgsql pdo_pgsql && \
    apk del .build-dependencies && \
        rm -rf /var/cache/apk/*

COPY . /var/www
WORKDIR /var/www
USER www-data
EXPOSE 9000

# Replace localhost with wildcard port
RUN sed -i 's/0.0.0.0/127.0.0.1/g' /usr/local/etc/php-fpm.d/www.conf
