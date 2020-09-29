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
ALTER ROLE talentcloud SUPERUSER;
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
sudo mkdir /var/www ## create the folder we will copy our files to, and tell nginx to point to for root
```

Copy in the below config into /etc/nginx/sites-available/talent.test (borrowed from [here](https://laravel.com/docs/7.x/deployment)). The only difference between the config from the docs and the one below is changing 'php7.4-fpm.sock' => 'php7.2-fpm.sock'

```
server {

    listen 80;
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name talent.test;

    ssl_certificate /etc/ssl/certs/localhost.crt;
    ssl_certificate_key /etc/ssl/private/localhost.key;

    ssl_protocols TLSv1.2 TLSv1.1 TLSv1;

    root /var/www/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
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

## Install npm

*For more detailed instructions, please visit [here](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/)*


```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install -y nodejs
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

### Setup self signed cert

*For more details, please visit [here](https://webscoot.io/blog/create-self-signed-certificate-ubuntu-windows-nginx/)*

Paste the below config into sudo vi localhost.conf

```
[req]
default_bits       = 2048
default_keyfile    = localhost.key
distinguished_name = req_distinguished_name
req_extensions     = req_ext
x509_extensions    = v3_ca

[req_distinguished_name]
countryName                 = Country Name (2 letter code)
countryName_default         = CA
stateOrProvinceName         = State or Province Name (full name)
stateOrProvinceName_default = Ontario
localityName                = Locality Name (eg, city)
localityName_default        = Ottawa
organizationName            = Organization Name (eg, company)
organizationName_default    = localhost
organizationalUnitName      = organizationalunit
organizationalUnitName_default = Development
commonName                  = Common Name (e.g. server FQDN or YOUR name)
commonName_default          = localhost
commonName_max              = 64

[req_ext]
subjectAltName = @alt_names

[v3_ca]
subjectAltName = @alt_names

[alt_names]
DNS.1   = localhost
DNS.2   = 127.0.0.1
DNS.2   = talent.test
```

Then run

```
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -config localhost.conf
```

Enter in the appropriate information as prompted (should default to the values found in the above config)

```
sudo cp localhost.crt /etc/ssl/certs/localhost.crt
sudo cp localhost.key /etc/ssl/private/localhost.key
sudo apt install libnss3-tools
certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n "localhost" -i localhost.crt
```

### Move files to be hosted

#### Setup TalentCloud directory to be hosted

```
cd TalentCloud
composer install && npm install && npm run dev && php artisan migrate:fresh && php artisan db:seed
php artisan key:generate
composer ide-helper
```

#### Copy files over to be hosted
```
sudo cp -r . /var/www ## copy the files to be hosted by gninx (root specified in the config specified above)
```

#### Adjust permissions

```
sudo chown -R www-data /var/www/storage /var/www/vendor /var/www/bootstrap/cache
chmod -R 775 /var/www
sudo chgrp -R www-data /var/www
sudo find /var/www -type d -exec chmod g+rx {} +
sudo find /var/www -type f -exec chmod g+r {} +
sudo chown -R $USER /var/www/
sudo find /var/www -type d -exec chmod u+rwx {} +
sudo find /var/www -type f -exec chmod u+rw {} +
sudo find /var/www -type d -exec chmod g+s {} +
```
At this point, if you restart the server you should see the TC UI load, though with internal server (500) errors

##### Restart the service

```
sudo service nginx restart
```

#### Final configurations

Install magick

```
sudo apt-get install php-imagick
php -m | grep imagick ## should print out 'imagick' to the console
sudo apt install php7.2-dev
php-config --extension-dir ## should print out something similar to /usr/lib/php/20170718
ll /usr/lib/php/20170718 ## ensure imagick.so is installed here
```

Find your php.ini file. Default install location is here /etc/php/7.2/fpm/php.ini. If you cannot find it, add this line at the top of the index.php file in the /public directory

```
<?php phpinfo(); ?>
```

Then reload http://talent.test and it should display the location of your php.ini file

Open the php.ini file and add this line at the bottom of the "Dynamic Extensions" section (you can put it anywhere in the file, but best to keep things clean)

```
extension=imagick
```

Reboot your computer. Upon rebooting, the application should load as expected

### Logging in

To log in locally, use one of the following test accounts

- admin@test.com
- manager@test.com
- applicant@test.com
- hr_advisor@test.com

The password for each account is 'password'


