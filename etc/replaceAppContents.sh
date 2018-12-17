#!/bin/bash

mydir=$1
echo "Updating app with contents of ${mydir}:"

echo "Copying $mydir to backup...";
sudo cp -R $mydir "${mydir}_Backup";

echo "Deleting contents of app directory...";
sudo rm -Rf /var/www/*;

echo "Moving contents of $mydir to app directory...";
sudo mv $mydir/* /var/www/;

echo "Deleting empty $mydir";
sudo rm -R $mydir;
