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
```


## Configure nginx

*For more detailed instructions, [go here](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04)*

```
sudo vi /etc/nginx/sites-available/talent.test
sudo ln -s /etc/nginx/sites-available/talent.test /etc/nginx/sites-enabled/
sudo unlink /etc/nginx/sites-enabled/default
sudo nginx -t ## to est new config
sudo mkdir /var/www/talent_test ## create the folder we will copy our files to, and tell nginx to point to for root
```

Copy in the below config into /etc/nginx/sites-available/talent.test

```
server {
    listen 80;
    server_name server_domain_or_IP;
    root /var/www/travel_test/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Restart the nginx server

```
sudo service nginx restart
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

## Run Talent Cloud

### Clone repo

#### HTTPS

```
git clone  https://github.com/GCTC-NTGC/TalentCloud.git
```

#### SSH

```
git clone git@github.com:GCTC-NTGC/TalentCloud.git
```

### Move files to be hosted

#### Setup TalentCloud directory to be hosted

```
cd TalentCloud
composer install
sudo cp -r ./* /var/www/talent_test
sudo chown -R www-data.www-data /var/www/talent_test/storage
sudo chown -R www-data.www-data /var/www/talent_test/bootstrap/cache
```

