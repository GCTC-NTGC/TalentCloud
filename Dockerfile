# First stage, install composer and its dependencies and fetch vendor files
FROM alpine:3.7
RUN apk --no-cache add \
  php5 \
  php5-curl \
  php5-dom \
  php5-gd \
  php5-iconv \
  php5-json \
  php5-mysql \
  php5-openssl \
  php5-pdo \
  php5-phar \
  php5-xml \
  php5-zip \
  php5-zlib \
  curl
RUN mkdir /app && curl -sS https://getcomposer.org/installer | php5 -- --install-dir=/usr/local/bin --filename=composer
RUN ln -s /usr/bin/php5 /usr/bin/php
WORKDIR /app
COPY composer.json composer.json /app/
ARG COMPOSER_ALLOW_SUPERUSER=1
ARG COMPOSER_NO_INTERACTION=1
RUN composer install

# Second stage, build usable container
FROM alpine:3.7
LABEL maintainer="Grant Barnes <grant.d.barnes@gmail.com>"
RUN \
  apk --no-cache add \
    apache2 \
    php5 \
    php5-apache2 \
    php5-ctype \
    php5-curl \
    php5-dom \
    php5-gd \
    php5-iconv \
    php5-json \
    php5-mysql \
    php5-xml \
  && apk update \
  && apk --no-cache add php5-mysqli \
  && mkdir -p /www/vendor \
  && mkdir -p /data \
  && mkdir -p /run/apache2 \
  && chown apache /data \
  && ln -s /dev/stderr /var/log/apache2/error.log \
  && ln -s /dev/stdout /var/log/apache2/access.log \
  && sed -i '/#LoadModule rewrite_module modules\/mod_rewrite.so/c\LoadModule rewrite_module modules\/mod_rewrite.so' /etc/apache2/httpd.conf \
  && sed -i '/DocumentRoot "\/var\/www\/localhost\/htdocs"/c\DocumentRoot "\/www\/public_html"' /etc/apache2/httpd.conf \
  && sed -i '/Options Indexes FollowSymLinks/c\\' /etc/apache2/httpd.conf \
  && sed -i '/AllowOverride All/c\\' /etc/apache2/httpd.conf \
  && sed -i '/<Directory "\/var\/www\/localhost\/htdocs">/c\<Directory "\/www\/public_html">\nDirectoryIndex index.php\nOptions FollowSymLinks Indexes\nAllowOverride All\nOrder deny,allow\nallow from All\n' /etc/apache2/httpd.conf

COPY ./install/config/htaccess.dist /www/.htaccess
COPY --from=0 /app/vendor/ /www/vendor/
COPY . /www
RUN chown apache:apache /www

WORKDIR /www
EXPOSE 80
EXPOSE 443

RUN chmod +x docker/start.sh

# Start Apache in foreground mode
RUN rm -f /run/apache2/httpd.pid
ENTRYPOINT [ "docker/start.sh" ]
CMD  ["/usr/sbin/httpd -D FOREGROUND"]
