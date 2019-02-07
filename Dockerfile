FROM php:7.2-fpm-alpine
# Dev dependencies
RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    curl-dev \
    imagemagick-dev \
    libtool \
    libxml2-dev \
    postgresql-dev
# Prod dependencies
RUN apk add --no-cache \
    bash \
    curl \
    g++ \
    gcc \
    git \
    imagemagick \
    libc-dev \
    libpng-dev \
    make \
    nodejs \
    nodejs-npm \
    openssh-client \
    postgresql-libs \
    rsync
# Composer dependencies
RUN apk add --no-cache \
    ca-certificates && \
    update-ca-certificates
# PHP extensions
RUN docker-php-ext-install \
    bcmath \
    curl \
    gd \
    iconv \
    mbstring \
    pcntl \
    pdo \
    pdo_pgsql \
    tokenizer \
    xml
# PECL extensions
RUN pecl install imagick && \
    pecl install xdebug && \
    docker-php-ext-enable imagick && \
    docker-php-ext-enable xdebug
# Cleanup build dependencies
RUN apk del .build-deps && \
    rm -rf /var/cache/apk/*
# Composer binaries
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
# Disable sudo warnings [https://getcomposer.org/doc/03-cli.md#composer-allow-superuser]
ENV COMPOSER_ALLOW_SUPERUSER=1
# Set working directory
WORKDIR /var/www
# Expose FastCGI port
EXPOSE 9000
