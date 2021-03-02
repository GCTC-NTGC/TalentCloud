#!/bin/bash

SRC=$1
APP_DIR=$2

# If SRC includes ".zip", remove it
SRC=${SRC//[.]zip/}

# Extract files
echo "Setting permissions of $SRC.zip...";
sudo chmod 777 $SRC.zip;

echo "Unzipping contents of $SRC.zip...";
sudo unzip -qq $SRC.zip;

echo "Ensure storage/framework/cache/data directory exists...";
sudo mkdir -p $SRC/storage/framework/cache/data;

echo "Ensure file upload directory exists...";
sudo mkdir -p $SRC/storage/app/public/resources;

# Set permissions
echo "Setting proper app permissions in $SRC:"

echo "Setting directory permissions...";
sudo find $SRC -type d -exec chmod 775 {} \;

echo "Setting file permissions...";
sudo find $SRC -type f -exec chmod 664 {} \;

echo "Setting SELinux security context...";
sudo chcon -Rt httpd_sys_content_t $SRC;

echo "Setting nginx as onwer of all files...";
sudo chown -Rf nginx:nginx $SRC;

# Move the old Storage folder so it doesn't get deleted
echo "Saving previous Storage folder...";
sudo mv $APP_DIR/storage ./storage_backup;

# Copy to APP_DIR
echo "Updating app with contents of $SRC:";

echo "Deleting contents of app directory...";
sudo rm -Rf $APP_DIR/*;

echo "Moving contents of $SRC to app directory...";
sudo mv $SRC/* $APP_DIR/;

echo "Moving old Storage files back into new app directory...";
sudo rm -rf $APP_DIR/storage/*;
sudo mv ./storage_backup/* $APP_DIR/storage;
sudo rm -rf ./storage_backup;

echo "Setting permissions and owner of storage files, which came from old version of app...";
sudo find $APP_DIR/storage -type d -exec chmod 775 {} \;
sudo find $APP_DIR/storage -type f -exec chmod 664 {} \;
sudo chown -Rf nginx:nginx $APP_DIR/storage;

echo "Setting SELinux security context on writable directories...";
sudo chcon -Rt httpd_sys_rw_content_t $APP_DIR/storage;

echo "Deleting empty src directory...";
sudo rm -R $SRC;

# Migrations and optimizing Laravel
echo "Moving to app directory...";
cd $APP_DIR;

echo "Reset Laravel caches...";
sudo php artisan route:clear;
sudo php artisan cache:clear;
sudo php artisan config:clear;

sudo php artisan route:trans:cache;

echo "Database migrations...";
sudo php artisan migrate -n --force;
echo "Restarting email queue...";
sudo php artisan queue:restart;

echo "Link file storage folder with public folder...";
sudo php artisan storage:link;
