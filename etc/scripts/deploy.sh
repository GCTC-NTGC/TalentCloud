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

# Move the old Storage folder so it doesn't get deleted
echo "Saving previous Storage folder...";
sudo mv $APP_DIR/storage ./storage_backup;

# Copy to APP_DIR
echo "Deleting contents of app directory...";
sudo rm -Rf $APP_DIR/*;

echo "Moving contents of $SRC to app directory...";
sudo mv $SRC/* $APP_DIR/;

echo "Moving old Storage files back into new app directory...";
sudo rm -rf $APP_DIR/storage/*;
sudo mv ./storage_backup/* $APP_DIR/storage;
sudo rm -rf ./storage_backup;

echo "Ensure some storage directories are created now, instead of later, so permissions can be set correctly:";
echo "...framework cache data directory..."
sudo mkdir -p $SRC/storage/framework/cache/data;
echo "...and file upload directory...";
sudo mkdir -p $SRC/storage/app/public/resources;

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

# Set permissions
echo "Setting proper app permissions in $APP_DIR:"

echo "Setting directory permissions...";
sudo find $APP_DIR -type d -exec chmod 775 {} \;

echo "Setting file permissions...";
sudo find $APP_DIR -type f -exec chmod 664 {} \;

echo "Setting SELinux security context...";
sudo chcon -Rt httpd_sys_content_t $APP_DIR;

echo "Setting nginx as onwer of all files...";
sudo chown -Rf nginx:nginx $APP_DIR;

echo "Setting SELinux security context on writable directories...";
sudo chcon -Rt httpd_sys_rw_content_t $APP_DIR/storage;
