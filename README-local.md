# Local Installation Instructions

These instructions were written using Ubuntu 18.04 LTS

## Install nginx

*Detailed instructions available [here](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)*

```
sudo apt update
sudo apt install nginx
sudo ufw allow 'Nginx HTTP'
```

To test

```
systemctl status nginx
```

Example Expected output

```
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 13:41:04 EDT; 1min 59s ago
     Docs: man:nginx(8)
 Main PID: 23138 (nginx)
    Tasks: 7 (limit: 4662)
   CGroup: /system.slice/nginx.service
           ├─23138 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           ├─23140 nginx: worker process
           ├─23142 nginx: worker process
           ├─23144 nginx: worker process
           ├─23145 nginx: worker process
           ├─23147 nginx: worker process
           └─23149 nginx: worker process

... Starting A high performance web server and a reverse proxy server...
... Started A high performance web server and a reverse proxy server.
```

## Install PostGres

*For more detailed instructions, go [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)*

```
sudo apt install postgresql postgresql-contrib
```

Configure postgres

```
sudo -u postgres psql ## login to postgres
create database talentcloud; ### create database
create user talentcloud with encrypted password 'talentcloud'; ### create user
grant all privileges on database talentcloud to talentcloud; ### adjust access
```

## Install PHP

*For more detailed instructions, [go here](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04)*

```
sudo add-apt-repository universe
sudo apt install php-fpm php7.2-pgsql
sudo vi /etc/nginx/sites-available/talent.test
sudo ln -s /etc/nginx/sites-available/talent.test /etc/nginx/sites-enabled/
sudo unlink /etc/nginx/sites-enabled/default
sudo nginx -t ## to est new config
```

Copy in the below config into /etc/nginx/sites-available/talent.test

```
server {
        listen 80;
        root /var/www/html;
        index index.php index.html index.htm index.nginx-debian.html;
        server_name talent.test;

        location / {
                try_files $uri $uri/ =404;
        }

        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        }

        location ~ /\.ht {
                deny all;
        }
}
```

## Install composer

```
sudo apt-get install composer
```

## Download Laravel Installer

```
composer global require "laravel/installer=~1.1"
sudo apt install php-mbstring php-xml php-bcmath
```

