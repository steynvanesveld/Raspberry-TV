#!/bin/sh
USER="pipi"
CLIENT="raspberrypi.local"

read -p "Build new version?  (y/n)" -n 1 -r BUILD
echo
read -p "Deploy latest build to server? (y/n)" -n 1 -r DEPLOY
echo
read -p "Replace bash folder? (y/n)" -n 1 -r BASH
echo
read -p "Reboot server? (y/n)" -n 1 -r REBOOT
echo

if [[ $BUILD =~ ^[Yy]$ ]]
then
    npm run build
fi

if [[ $DEPLOY =~ ^[Yy]$ ]]
then
    scp -r dist/raspberry/ $USER@$CLIENT:~/
    ssh  -t $USER@$CLIENT '
        sudo rm -rf /var/www/html/*.js /var/www/html/*.txt /var/www/html/*.html /var/www/html/*.css /var/www/html/assets/
        sudo mv -f ~/raspberry/* /var/www/html/
        sudo rm -rf ~/raspberry
    '
fi

if [[ $BASH =~ ^[Yy]$ ]]
then
    scp -r bash/* $USER@$CLIENT:~
fi

if [[ $REBOOT =~ ^[Yy]$ ]]
then
  ssh  -t $USER@$CLIENT 'sudo reboot'
fi

