FROM php:7.2-fpm-alpine

# Install dev dependencies
RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    curl-dev \
    imagemagick-dev \
    libtool \
    libxml2-dev \
    postgresql-dev

# Install prod dependencies
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

# Install PHP extensions
RUN docker-php-ext-install \
    curl \
    iconv \
    mbstring \
    pdo \
    pdo_pgsql \
    pcntl \
    tokenizer \
    xml \
    gd \
    zip \
    bcmath

# Install PECL extensions
RUN pecl install \
    imagick \
    xdebug

# Enable PECL extensions
RUN docker-php-ext-enable \
    imagick \
    xdebug

# Cleanup dev dependencies
RUN apk del .build-deps && \
    rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /var/www

# Expose FastCGI port
EXPOSE 9000
