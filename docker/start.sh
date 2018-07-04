#!/bin/sh

# automated install
cd /var/www/html/install/cli/
php5 ./docker_installer.php

# Start server - depending on the image, one of these will work
echo "Starting server"
$@
