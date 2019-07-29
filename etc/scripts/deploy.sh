#!/bin/bash

# Extract files
echo "Setting permissions of TalentCloud.zip...";
sudo chmod 777 TalentCloud.zip;

echo "Unzipping contents of TalentCloud.zip...";
sudo unzip -qq TalentCloud.zip;

# Set permissions
echo "Setting proper app permissions in TalentCloud:"

echo "Setting directory permissions...";
sudo find TalentCloud -type d -exec chmod 775 {} \;

echo "Setting file permissions...";
sudo find TalentCloud -type f -exec chmod 664 {} \;

echo "Setting SELinux security context...";
sudo chcon -Rt httpd_sys_content_t TalentCloud;

echo "Setting SELinux security context on writable directories...";
sudo chcon -Rt httpd_sys_rw_content_t TalentCloud/storage;

echo "Setting nginx as onwer of all files...";
sudo chown -Rf nginx:nginx TalentCloud;

# Backup and copy to /var/www
echo "Updating app with contents of TalentCloud:"

echo "Copying TalentCloud to backup...";
sudo cp -R TalentCloud "TalentCloud_Backup";

echo "Deleting contents of app directory...";
sudo rm -Rf /var/www/*;

echo "Moving contents of TalentCloud to app directory...";
sudo mv TalentCloud/* /var/www/;

echo "Deleting empty TalentCloud...";
sudo rm -R TalentCloud;

# Migrations and optimizing Laravel
echo "Moving to app directory...";
cd /var/www;

echo "Executing Laravel commands...";
sudo php artisan route:clear;
sudo php artisan cache:clear;
sudo php artisan config:clear;

echo "Database migrations...";
sudo php artisan migrate -n --force;

echo "Restarting email queue...";
sudo php artisan queue:restart;
